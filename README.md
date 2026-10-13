# FortBoost AI — commercial website foundation v0.4

Bilingual static website + Netlify Functions + Supabase + Stripe TEST-mode integration scaffolding. This is a continuation of the existing FortBoost project, not a production-ready paid product. The real Windows app does not exist yet.

## Local verification
`npm install --no-audit --no-fund` (requires npm network access and a lockfile), `npm run check`, `npm run syntax`, `npm test`. The external integration tests require your own Stripe/Supabase test credentials.

## Deployment
See `docs/deployment.md`. The site must be imported from GitHub into Netlify for server functions. No public deployment is claimed.

## Project files
`en/` and `fr/`: site pages; `netlify/functions/`: server APIs; `sql/schema.sql`: database; `tests/`: tests; `docs/`: operational documentation.

## Important
Checkout is disabled until explicit test configuration. Legal text needs legal review. No real benchmark results or software downloads are claimed.
