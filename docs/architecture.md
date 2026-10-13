# Architecture
Existing bilingual static frontend is retained because it runs on Netlify without framework hydration. Netlify Functions implement privileged operations; Supabase Auth issues access tokens; Postgres stores orders, licenses and support tickets. Stripe Checkout is test-only. This is not a complete Windows optimization product.

## Trust boundaries
The browser is untrusted. Never trust client-supplied user IDs or successful redirect URLs. Every customer function verifies Supabase bearer tokens. Only server functions use the service-role key. Stripe webhook signatures are validated on raw payloads. The Postgres fulfillment RPC is idempotent by event ID and checkout session.

## Known limitations
No production deployment, no external end-to-end test, no hardware scanner. Account UI and admin features require live Supabase configuration. UI is not yet independently audited for accessibility.
