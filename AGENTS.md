# FortBoost AI — contribution rules

- Official repository: SculptMethod/fortboost. Work on a feature branch and open a pull request; never overwrite main without review.
- Modify only files necessary for each request. Do not send unchanged files as deliverables.
- Preserve the existing Netlify Functions, Supabase schema, authentication and payment logic unless the change explicitly requires them.
- No invented benchmarks, testimonials, customer data, paid orders, licenses, software installers, or guaranteed FPS/input-lag improvements.
- The Windows optimization application is not released. Browser demonstrations must clearly state they are illustrative.
- Maintain French and English experiences. Check translated strings, accessible labels, navigation, mobile behavior, and links.
- Never commit secrets or credentials. Stripe fulfillment must depend on verified server-side webhook events, not client success pages.
- Run npm run check, npm run syntax and npm test when dependencies are available; report any tests not run.
- Prefer small, reviewable commits and document remaining integration dependencies.
