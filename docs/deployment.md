# GitHub + Netlify deployment
1. Push this repository to a PRIVATE GitHub repository named `fortboost-ai` (or connect the GitHub app and authorize repository creation).
2. Netlify: Add new project → Import existing project → GitHub → select repository. Build command: `npm run build`; publish directory: `.`; Functions: `netlify/functions`. Netlify deploy previews can be enabled for pull requests.
3. Configure Netlify environment variables from `.env.example`, using secrets in the Netlify dashboard only. Never commit `.env`.
4. Create a Supabase project and run `sql/schema.sql` in its SQL editor. Validate RLS and RPC privileges before enabling services.
5. Create Stripe test product/price and a webhook endpoint `https://YOUR_SITE/.netlify/functions/stripe-webhook`; subscribe to `checkout.session.completed` and `charge.refunded`. Enter signing secret in Netlify.
6. Keep `ENABLE_TEST_CHECKOUT=false` until verified with test cards and refund cases. Do not enable live checkout until the Windows application and legal pages are ready.
7. Check routes `/en/`, `/fr/`, `/en/pricing/`, `/en/account/`, `/en/download/` and API error responses.

Netlify Drop is insufficient for this version's server functions. Netlify and GitHub accounts require user authorization.
