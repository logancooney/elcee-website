# Security Audit — 2026-04-24

Scope: elceethealchemist.com, commit `3580959c44efb4ac7e7f997145d6fc90092d2631` (branch `main`).

This is a read-only audit. No source was modified. All findings are severity-ranked, with exact `file:line` references and fix guidance, for remediation in Phase 7.

> Status: **IN PROGRESS** — document is being built incrementally as tasks complete. See "Checks performed" for completion state.

---

## Executive summary

> _To be finalised in Task B8. Running counts updated after each section._

- Critical: _pending B8 tally_
- High: _pending B8 tally_
- Medium: _pending B8 tally_
- Low: _pending B8 tally_

---

## Task B1 — Secrets and gitignore

### B1.1 `.gitignore` coverage

`.gitignore` contains:

```
# local env files
.env*.local
.env
```

This covers `.env`, `.env.local`, `.env.production.local`, etc. It does **not** explicitly ignore `.env.production`, `.env.development`, or `.env.test` (non-`.local` variants). Low severity — Next.js convention is to use `.local` suffix for secrets, and no such file currently exists in the repo, but the pattern is permissive.

### B1.2 Hardcoded secrets in tracked source

All four grep patterns ran clean — no matches in the current tree:

| Pattern | Purpose | Hits |
|---|---|---|
| `(sk_live\|sk_test\|pk_live\|rk_live)_[A-Za-z0-9]{20,}` | Stripe keys | 0 |
| `re_[A-Za-z0-9]{20,}` | Resend keys | 0 |
| `eyJ[A-Za-z0-9_-]{20,}` | JWT / Supabase anon keys | 0 |
| `https://[a-z0-9-]+\.supabase\.co` | Supabase project URLs | 0 |

No findings. All credentials are loaded from `process.env` at runtime.

### B1.3 Git history

`git log --all -p -- '.env*'` returned only `.env.example` (commit `16bda2f`, 2026-02-18) containing placeholder strings (`re_your_api_key_here`, literal comments). No real secret values have ever been committed.

**Result: CLEAN.** No findings from B1.

---

## Task B2 — Supabase RLS and schema

### B2.1 Supabase client usage (code-side)

Three server-side files reference Supabase:

| File | Lines | Client style | Key used |
|---|---|---|---|
| `app/api/discount-email/route.ts` | 6–11, 26–43 | Raw REST `fetch` to `/rest/v1/studio_leads` | `SUPABASE_SERVICE_ROLE_KEY` |
| `app/api/lead-capture/route.ts` | 3–8, 46–65 | Raw REST `fetch` to `/rest/v1/studio_leads` | `SUPABASE_SERVICE_ROLE_KEY` |
| `app/api/webhooks/calendly/route.ts` | 2, 9–12, 45 | `@supabase/supabase-js` `createClient` | `SUPABASE_SERVICE_ROLE_KEY` |

Observations:
- Service role key is only ever read on the server (inside `app/api/*` route handlers). It is never exposed to the browser.
- `NEXT_PUBLIC_SUPABASE_URL` is public (expected).
- No anon-key usage exists anywhere in the tracked tree. All Supabase writes are service-role. This means RLS policies, even if permissive, cannot be exploited via code paths in this repo — but they still matter for any direct-from-browser client that may be added later, and for defence in depth.
- Single table referenced from code: `studio_leads`.

### B2.2 Table + RLS enumeration (dashboard)

**PENDING — requires human action.** Agent does not have Supabase dashboard access. To complete this step, run the following from the Supabase SQL editor and paste the output into this document:

```sql
-- Enumerate tables and RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Enumerate policies per table
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public';
```

Flagged as a **Critical gap** in "Open gaps" below — cannot confirm RLS is enabled on `studio_leads` (or any other table) without dashboard access. If RLS is disabled on `studio_leads` and the anon key is ever wired into a browser client, the entire lead list becomes world-readable.

### B2.3 Permissive-policy flagging

Deferred to when B2.2 data is available.

---

## Checks performed

- [x] B1 — Secrets in source
- [x] B1 — Secrets in git history
- [~] B2 — Supabase RLS (code-side done; dashboard side pending)
- [ ] B3 — API route auth + validation
- [ ] B4 — Webhook signature validation
- [ ] B5 — npm audit
- [ ] B6 — Response headers
- [ ] B7 — Client-exposed env vars
- [ ] B8 — Final severity tally + executive summary

---

## Open gaps

- **Supabase RLS enumeration (B2.2)** — requires human with dashboard access to run the two `pg_*` queries above and paste results here. Until then, we cannot confirm `studio_leads` RLS status.
