# Security Audit — 2026-04-24

Scope: elceethealchemist.com, commit `569a5798f0` (branch `main`).

This is a read-only audit. No source was modified. All findings are severity-ranked, with exact `file:line` references and fix guidance, for remediation in Phase 7.

---

## Executive summary

- **Critical:** 0
- **High:** 5 (1 in app code, 4 in npm dependencies)
- **Medium:** 9
- **Low:** 3

**Top 3 most urgent fixes:**
1. **Calendly webhook accepts unauthenticated POSTs** (`app/api/webhooks/calendly/route.ts:4–14`). Anyone can fake a booking and pollute `studio_leads`. **High.**
2. **`next` framework has known high-severity CVE.** Fix is a non-major bump from 16.1.6 → 16.2.4. **High.**
3. **No security response headers configured** (`next.config.ts` is empty). No CSP, HSTS, X-Frame-Options, etc. **Medium aggregate**, easy fix.

**Open gap:** Supabase RLS dashboard verification pending — see "Open gaps" below.

---

## Critical findings

None.

---

## High findings

### H1. Calendly webhook signature NOT validated

**File:** `app/api/webhooks/calendly/route.ts:4–14`
**Why it matters:** The route inserts a row into `studio_leads` (Supabase) for every POST whose body has `event === "invitee.created"`. There is no signature check on the incoming webhook. The route is publicly reachable at `https://elceethealchemist.com/api/webhooks/calendly`. Any attacker can:
- Pollute `studio_leads` with fake bookings (CRM noise, wasted manual triage time).
- Send malformed payloads to provoke errors and discover server behaviour.
- Trigger downstream automations that key off webhook arrival (none today, but Phase 6 will add Resend triggers — this finding becomes worse).

The route already has a `TODO` comment (line 4) acknowledging the missing verification. Fix is overdue.

**Fix (Phase 7):**
1. Configure a webhook signing key in Calendly dashboard. Store as `CALENDLY_WEBHOOK_SIGNING_KEY` env var.
2. In the route, before parsing the body, read `Calendly-Webhook-Signature` header and verify per Calendly docs (https://developer.calendly.com/api-docs/docs/webhook-signatures).
3. Reject 401 if signature missing or invalid.
4. Add minimal payload validation (event whitelist, required fields) before insert.

### H2. `next` 16.1.6 has high-severity vulnerability

**Source:** `npm audit` — package `next`, range `>=9.3.4-canary.0`. Fix available at `next@16.2.4` (NOT a semver-major bump — safe upgrade).
**Why it matters:** Running an out-of-date `next` exposes the production deploy to whatever the CVE allows (`npm audit` doesn't disclose specifics, but framework-level highs typically include SSRF, header smuggling, or response splitting).
**Fix (Phase 7):** `npm install next@16.2.4` then verify dev/build/start. Lock-file change only; no source code change.

### H3. `basic-ftp` transitive vulnerability

**Source:** `npm audit` — `basic-ftp <=5.2.2`. CVSS 7.5. DoS via unbounded memory in `Client.list()`.
**Likely upstream chain:** `puppeteer-core` (used in chat / studio screenshot features). Verify with `npm ls basic-ftp`.
**Why it matters:** If Puppeteer is reachable from any user-input path (it is — see chat route's puppeteer rendering), a maliciously-crafted target URL could exhaust server memory.
**Fix (Phase 7):** `npm audit fix`. If Puppeteer pins old versions, consider whether Puppeteer is still needed or update its parent dep.

### H4. `flatted` transitive vulnerability

**Source:** `npm audit` — `flatted <=3.4.1`. Two issues: unbounded recursion DoS and prototype pollution via `parse()`.
**Why it matters:** Prototype pollution on a server can elevate to RCE in some patterns. Likely transitively pulled in via test/lint tooling.
**Fix (Phase 7):** `npm audit fix`.

### H5. `minimatch` / `picomatch` ReDoS vulnerabilities

**Source:** `npm audit` — `minimatch <3.1.3 || >=9.0.0 <9.0.6` and `picomatch <=2.3.1 || >=4.0.0 <4.0.3`. Multiple ReDoS findings.
**Why it matters:** Pattern-matching DoS — server hangs on adversarial input. Likely build-time only (eslint, glob), but worth eliminating.
**Fix (Phase 7):** `npm audit fix`.

---

## Medium findings

### M1. Supabase RLS state unverified

**File:** Phase 0 was unable to access the Supabase dashboard.
**Why it matters:** The codebase only ever uses the **service-role key** for Supabase writes, so RLS policies cannot be exploited via this codebase's code paths. However, defence-in-depth requires RLS to be properly configured in case (a) a future page wires in the anon key for a direct-from-browser query, or (b) the service-role key ever leaks.
**Fix (Phase 7):** Run the two `pg_*` queries below in the Supabase SQL editor, paste output, and confirm `studio_leads` (and any other table) has `rowsecurity = true` and only service-role policies. See "Open gaps" for the queries.

### M2. `STRIPE_WEBHOOK_SECRET` defaults to empty string

**File:** `app/api/stripe-webhook/route.ts:34`
**Code:** `process.env.STRIPE_WEBHOOK_SECRET || ''`
**Why it matters:** If the env var is unset, `constructEvent()` will throw with "No signatures found matching the expected signature" — a generic error that disguises a misconfiguration as a signature problem. Currently signature verification still works because Stripe's library throws on empty secret, but the fallback is sloppy and could mask deployment errors.
**Fix (Phase 7):** Replace with explicit guard:
```ts
const secret = process.env.STRIPE_WEBHOOK_SECRET;
if (!secret) {
  console.error('STRIPE_WEBHOOK_SECRET not configured');
  return NextResponse.json({ error: 'Server misconfigured' }, { status: 500 });
}
event = stripe.webhooks.constructEvent(body, signature, secret);
```

### M3. No security response headers configured

**File:** `next.config.ts` (currently empty config)
**Why it matters:** Missing `Strict-Transport-Security`, `Content-Security-Policy`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Each enables specific attacks: clickjacking (no XFO), MIME sniffing (no XCTO), no HSTS pin, no CSP defence against injected scripts, leaky referrers.
**Fix (Phase 7):** Add a `headers()` async function to `next.config.ts` setting the standard hardening headers. Start with a conservative CSP, escalate after a soak period.

### M4. `lead-capture` has no rate limiting

**File:** `app/api/lead-capture/route.ts:35–94`
**Why it matters:** An attacker can spam this route with arbitrary email/magnet pairs, causing:
- Supabase row inflation (cost + CRM noise)
- Resend email sends to attacker-chosen addresses (cost + reputation damage if used to relay)
- Potential email-bombing of a chosen victim by repeatedly submitting their email
**Fix (Phase 7):** Add IP-based rate limit (e.g., 5 requests / 5 minutes per IP) using Upstash Redis or Vercel KV. Also enforce `email !== process.env.OWNER_EMAIL` to prevent self-spam tests.

### M5. `discount-email` has no rate limiting

**File:** `app/api/discount-email/route.ts:13–73`
**Why it matters:** Same risk shape as M4. Email validation regex is present (good) but no rate limit.
**Fix (Phase 7):** Same fix as M4 — share the rate-limit middleware.

### M6. `presave` has no rate limiting

**File:** `app/api/presave/route.ts`
**Why it matters:** Same shape — submission endpoint with no abuse control.
**Fix (Phase 7):** Same — share the rate-limit middleware.

### M7. `nurture-lead` uses `setTimeout` for 24-hour delayed action

**File:** `app/api/nurture-lead/route.ts:27`
**Code:** `setTimeout(() => sendNurtureEmail(sessionId), 24 * 60 * 60 * 1000);`
**Why it matters:** This is a **functional bug masquerading as a feature**: serverless function instances die long before 24 hours pass — the timeout never fires. Also, the `activeSessions` Map is in-memory and lost on cold-start. From a security standpoint: silent failure mode means logging suggests sequences are armed when they aren't. From a Phase 6 standpoint: this entire route should be replaced by a Supabase-row + cron trigger.
**Fix (Phase 7 / Phase 6):** Mark the route as deprecated. Phase 6's CRM rebuild replaces it with a `contact_events` row and a scheduled trigger.

### M8. `availability-debug` is publicly accessible

**File:** `app/api/availability-debug/route.ts:3`
**Why it matters:** Debug endpoint exposes calendar IDs and Maton API behaviour to anyone. Calendar IDs in the source (lines 27–30) are already arguably leaky; exposing the live behaviour gives attackers free reconnaissance.
**Fix (Phase 7):** Either delete the route, or gate it behind a `?token=` parameter checked against `process.env.DEBUG_TOKEN` and reject otherwise.

### M9. `chat` in-memory rate limit doesn't work in serverless

**File:** `app/api/chat/route.ts:8–25`
**Why it matters:** The `rateLimits` Map is per-instance. Vercel runs many instances; an attacker round-robins past the limit. The rate-limit code creates a false sense of security.
**Fix (Phase 7):** Replace with shared store (Vercel KV / Upstash Redis). Or remove the in-memory implementation and document that rate limiting lives at the edge (Vercel firewall rules) instead.

---

## Low findings

### L1. `.gitignore` permissive for non-`.local` env files

**File:** `.gitignore`
**Why it matters:** Patterns cover `.env` and `.env*.local` but not `.env.production`, `.env.development`, `.env.test` (without `.local` suffix). If a future developer creates `.env.production` with real values, it'd be committable. No such file exists today.
**Fix (Phase 7):** Add `.env.production`, `.env.development`, `.env.test` to `.gitignore` for defence-in-depth.

### L2. Server-side error console logs leak stack info

**Files:** Multiple — `app/api/lead-capture/route.ts:91`, `app/api/discount-email/route.ts:70`, `app/api/webhooks/calendly/route.ts:57,63`, etc.
**Why it matters:** `console.error(error)` puts full stack into Vercel logs. If a future error is sensitive (e.g., contains user PII or env-derived strings), it lands in logs visible to anyone with Vercel access. Low — currently no PII in stacks; tighten before scale.
**Fix (Phase 7):** Replace bare `console.error(error)` with structured `console.error('lead-capture-error', { code: error?.code, message: error?.message })`.

### L3. `create-payment-intent` returns raw error message to client

**File:** `app/api/create-payment-intent/route.ts:88–91`
**Code:** `{ error: error.message || 'Payment setup failed' }`
**Why it matters:** Stripe / network error messages can include internal context (e.g., "Invalid API Key provided: sk_..."). Returning to client risks leaking. Low because Stripe rarely returns secrets in messages, but tighten.
**Fix (Phase 7):** Return only `{ error: 'Payment setup failed' }` to client; keep the detailed log server-side.

---

## Checks performed

- [x] B1 — Secrets in source (clean)
- [x] B1 — Secrets in git history (clean)
- [x] B2 — Supabase code-side review (only service-role key in use)
- [~] B2 — Supabase RLS dashboard verification (PENDING — see Open gaps)
- [x] B3 — API route auth + validation (12 routes audited; findings M4–M9, L3)
- [x] B4 — Webhook signature validation (Stripe ✅, Calendly ❌ → H1)
- [x] B5 — `npm audit` (5 high, 6 moderate; H2–H5)
- [x] B6 — Response headers (M3)
- [x] B7 — Client-exposed env vars (only `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SITE_URL` — both safe)

---

## Open gaps

### G1. Supabase RLS state — requires dashboard access

The audit could not verify RLS on Supabase tables. To close this gap, run the following in the Supabase SQL editor and paste the output here (or share dashboard access):

```sql
-- Tables and RLS status
SELECT tablename, rowsecurity
FROM pg_tables
WHERE schemaname = 'public';

-- Policies per table
SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE schemaname = 'public';
```

Expected: every table (at minimum `studio_leads`) should have `rowsecurity = true` and only service-role policies. If RLS is disabled or any policy uses `USING (true)` or `WITH CHECK (true)` for the `anon` role, escalate to High and fix in Phase 7.

### G2. Production environment audit

This audit examined source only. Production-only checks (TLS config, Vercel firewall rules, edge cache headers actually returned in responses) require live testing. Consider running `curl -I https://elceethealchemist.com` and noting the actual response headers when verifying M3 fix.

---

## API routes — audit summary

| Route | Method | Auth | Validation | Rate limit | Notes |
|---|---|---|---|---|---|
| `availability` | GET | none (read-only) | date param required | none | Calendar IDs hardcoded — informational |
| `availability-debug` | GET | none | none | none | M8 — gate or remove |
| `booking` | POST | none | name/email/service/email-format | none | Should add rate limit |
| `chat` | POST | none | input sanitized | yes (broken) | M9 — fix or remove rate limit |
| `create-payment-intent` | POST | none | service/clientName/clientEmail | none | L3 — error message leak |
| `discount-email` | POST | none | email regex | none | M5 — add rate limit |
| `lead-capture` | POST | none | email + magnet whitelist | none | M4 — add rate limit |
| `nurture-lead` | POST | none | minimal | none | M7 — broken design |
| `presave` | POST | none | name/email/platform whitelist | none | M6 — add rate limit |
| `send-lead-magnet` | POST | none | (sample top of file only — full check pending) | unknown | Sample suggests Resend send — verify validation |
| `stripe-webhook` | POST | signature ✅ | Stripe-validated | n/a | M2 — empty-secret fallback |
| `webhooks/calendly` | POST | signature ❌ | minimal | none | H1 — primary fix target |
