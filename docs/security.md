# Security review (pre-release)
Implemented: Supabase bearer-token validation, server-only service role, webhook signature verification, database RPC idempotency, RLS, device HMAC, response no-store.
Not completed: production pentest, global rate limiting, CSRF analysis for any cookie-based future auth, audit trails, security incident response, account erasure, webhook replay/inconsistency tests, verified email configuration, dependency audit, Content Security Policy tightening, signed Windows installers, release signing, backup restoration drills.
Do not store or commit secrets. Configure environment variables in Netlify dashboard.
