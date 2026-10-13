# FortBoost API v0.3 — integration contract

Base: `https://<site>/api/`. All private endpoints require `Authorization: Bearer <Supabase access token>`. JSON responses, `Cache-Control: no-store`. Tokens are obtained via Supabase Auth after verified email sign-in. Never embed the service role key or device hash secret in the Windows app.

- `GET config`: public flags + public Supabase URL/anon key; no private secrets.
- `GET portal`: user orders, licenses, tickets. `401` when unauthenticated.
- `POST support`: `{subject:string (5..150),message:string (20..4000)}`; returns `{ticketId}`. Auth required. Max three tickets per hour per user.
- `POST checkout`: authenticated; returns `{url}` only when `ENABLE_TEST_CHECKOUT=true`, Stripe **test** key and configured Stripe price. Checkout is intentionally unavailable by default. Webhook signature is verified server-side.
- `POST license`: `{licenseId:uuid}`; returns `{valid,status,deviceLimit}` for the signed-in owner.
- `POST activate`: `{licenseId:uuid,deviceId:string}`; returns `{activated:boolean}`. Device identifier is hashed server-side with HMAC before storage. 409 means inactive or device limit reached. This is a preliminary contract requiring integration/security tests with the actual Windows client.
- `GET admin`: read-only recent orders, licenses, support tickets; requires a row in `admins` table. `403` otherwise.
- `POST stripe-webhook`: Stripe-signed server-to-server event endpoint; **no browser session**. Checkout paid event triggers atomic, idempotent fulfillment. `charge.refunded` revokes licenses by payment intent.

Never infer a successful payment from the browser redirect. The database is authoritative. All operational secrets live only in Netlify environment variables. For production, add distributed edge rate limiting, operational alerting, audit logging, deletion/export workflow, refund reconciliation, and external security review.
