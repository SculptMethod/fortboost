-- Run in Supabase SQL editor. Server service role only; all application tables use RLS.
create extension if not exists pgcrypto;
create table if not exists public.admins(user_id uuid primary key references auth.users(id) on delete cascade);
create table if not exists public.orders(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id),stripe_session_id text not null unique,amount integer not null check(amount>=0),currency text not null,status text not null default 'paid',created_at timestamptz not null default now());
create table if not exists public.licenses(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id),order_id uuid not null unique references public.orders(id),status text not null default 'active' check(status in ('active','revoked')),device_limit int not null default 1 check(device_limit between 1 and 10),created_at timestamptz not null default now());
create table if not exists public.support_tickets(id uuid primary key default gen_random_uuid(),user_id uuid not null references auth.users(id),subject text not null,message text not null,status text not null default 'open',created_at timestamptz not null default now());
create table if not exists public.webhook_events(event_id text primary key,received_at timestamptz not null default now());
create index if not exists orders_user_idx on public.orders(user_id);
create index if not exists licenses_user_idx on public.licenses(user_id);
create index if not exists tickets_user_idx on public.support_tickets(user_id,created_at desc);
alter table public.admins enable row level security;
alter table public.orders enable row level security;
alter table public.licenses enable row level security;
alter table public.support_tickets enable row level security;
alter table public.webhook_events enable row level security;
alter table public.orders add column if not exists stripe_payment_intent_id text unique;
-- Deliberately no policies: only service-role access from authenticated, validated Netlify functions.
create or replace function public.fulfill_paid_checkout(p_event_id text,p_session_id text,p_user_id uuid,p_amount int,p_currency text,p_payment_intent_id text)
returns void language plpgsql security invoker as $$
declare v_order uuid;
begin
  insert into public.webhook_events(event_id) values(p_event_id) on conflict do nothing;
  if not found then return; end if;
  insert into public.orders(user_id,stripe_session_id,amount,currency,stripe_payment_intent_id)
  values(p_user_id,p_session_id,p_amount,p_currency,p_payment_intent_id)
  on conflict(stripe_session_id) do update set stripe_session_id=excluded.stripe_session_id
  returning id into v_order;
  insert into public.licenses(user_id,order_id) values(p_user_id,v_order)
  on conflict(order_id) do nothing;
end $$;
revoke all on function public.fulfill_paid_checkout(text,text,uuid,int,text,text) from public,anon,authenticated;
grant execute on function public.fulfill_paid_checkout(text,text,uuid,int,text,text) to service_role;
-- Refund processing uses a Stripe payment intent ID associated with the original order.
create or replace function public.revoke_refunded_charge(p_payment_intent_id text)
returns void language plpgsql security invoker as $$
begin
  update public.orders set status='refunded' where stripe_payment_intent_id=p_payment_intent_id;
  update public.licenses set status='revoked' where order_id in (select id from public.orders where stripe_payment_intent_id=p_payment_intent_id);
end $$;
revoke all on function public.revoke_refunded_charge(text) from public,anon,authenticated;
grant execute on function public.revoke_refunded_charge(text) to service_role;
create table if not exists public.license_activations(id uuid primary key default gen_random_uuid(),license_id uuid not null references public.licenses(id),device_hash text not null,created_at timestamptz not null default now(),unique(license_id,device_hash));
alter table public.license_activations enable row level security;
create or replace function public.activate_device(p_license_id uuid,p_user_id uuid,p_device_hash text)
returns boolean language plpgsql security invoker as $$
declare v_limit int; v_count int;
begin
  select device_limit into v_limit from public.licenses where id=p_license_id and user_id=p_user_id and status='active' for update;
  if v_limit is null then return false; end if;
  if exists(select 1 from public.license_activations where license_id=p_license_id and device_hash=p_device_hash) then return true; end if;
  select count(*) into v_count from public.license_activations where license_id=p_license_id;
  if v_count>=v_limit then return false; end if;
  insert into public.license_activations(license_id,device_hash) values(p_license_id,p_device_hash);
  return true;
end $$;
revoke all on function public.activate_device(uuid,uuid,text) from public,anon,authenticated;
grant execute on function public.activate_device(uuid,uuid,text) to service_role;
