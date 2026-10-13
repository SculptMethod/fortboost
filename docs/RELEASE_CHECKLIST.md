# Pre-launch checks

- [ ] Verified business identity, VAT/tax obligations, CGV, privacy, withdrawal/refund disclosures reviewed by qualified adviser.
- [ ] Supabase email provider configured; confirmation and password recovery tested end-to-end.
- [ ] Database RLS verified and no public table policies accidentally added.
- [ ] Stripe test checkout paid, canceled, duplicate webhook, webhook retries, refund and license revocation verified.
- [ ] Admin permissions and access logging tested. Admin management currently read-only; no fake statistics.
- [ ] Implement account deletion/export and data retention policy before collecting customer data at scale.
- [ ] External security review, request throttling at edge, observability, backup restore test.
- [ ] Real Windows installer signed, SHA-256 checksum, anti-cheat compatibility and restore tests.
- [ ] Replace illustrative benchmarks with measured results only where supported.
- [ ] Mobile/browser accessibility audit and production URL smoke test.
- [ ] Enable live checkout only after complete operational readiness.
