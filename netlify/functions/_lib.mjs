import { createClient } from '@supabase/supabase-js';
export const json=(body,status=200,headers={})=>new Response(JSON.stringify(body),{status,headers:{'content-type':'application/json; charset=utf-8','cache-control':'no-store',...headers}});
export function db(){if(!process.env.SUPABASE_URL||!process.env.SUPABASE_SERVICE_ROLE_KEY)throw Error('Backend not configured');return createClient(process.env.SUPABASE_URL,process.env.SUPABASE_SERVICE_ROLE_KEY,{auth:{persistSession:false,autoRefreshToken:false}})}
export async function user(req){const auth=req.headers.get('authorization')||'';if(!auth.startsWith('Bearer '))return null;const client=db();const {data,error}=await client.auth.getUser(auth.slice(7));return error?null:data.user;}
export async function admin(req){const u=await user(req);if(!u)return null;const {data,error}=await db().from('admins').select('user_id').eq('user_id',u.id).maybeSingle();return !error&&data?u:null;}
export async function body(req){if(Number(req.headers.get('content-length')||0)>20000)throw Error('Request too large');const raw=await req.text();if(raw.length>20000)throw Error('Request too large');return JSON.parse(raw||'{}')}
export function fail(e){console.error('Request failed',e?.name||'Error');return json({error:e?.message==='Backend not configured'?'Service not configured':'Request could not be completed'},503)}
