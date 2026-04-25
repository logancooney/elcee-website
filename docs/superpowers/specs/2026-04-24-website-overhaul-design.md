# Website Overhaul — Design Spec

**Date:** 2026-04-24
**Target completion:** ~2026-05-01 (1 working week, soft target)
**Owner:** Logan (Elcee)
**Scope:** elceethealchemist.com

---

## 1. Context

The homepage has been rebuilt to a high standard and is now the visual and tonal foundation of the site. Previous attempts to rebuild the interior pages (tutoring, studio, etc.) did not hold to the new homepage's design language, and the result was stylistically inconsistent. The site also has friction in the booking flow, a weak link-in-bio page, an unoptimised homepage on mobile, and a backend/CRM stack that is not yet pulling its weight.

This spec consolidates the work into a phased plan that:

1. Extracts the new homepage's design language into a shared reference before touching interior pages.
2. Fixes the highest-friction user journeys first (mobile homepage, booking flow).
3. Rebuilds interior pages one at a time in priority order, each matching the Design DNA reference.
4. Audits the backend and builds a unified lead/booking data layer with automated email flows.
5. Runs a full security audit in parallel, with fixes applied before ship.

---

## 2. Goals

- **Visual consistency.** Every page feels like it belongs to the same brand as the new homepage.
- **Reduced booking friction.** A user who arrives intending to book a session reaches a calendar within two clicks and with zero ambiguity about which service to pick.
- **Mobile-first homepage.** The homepage works on a phone without requiring a user to scroll through a desktop-length page to find what they need.
- **Unified CRM.** Every lead, booking, enquiry, and free-resource download lands in one Supabase table, tagged by source.
- **Automated nurture.** Every touchpoint (booking, free download, enquiry) triggers an appropriate Resend email sequence without manual intervention.
- **Hardened security.** Full audit of secrets, Supabase RLS, API routes, and dependencies, with findings fixed before ship.

## 2.1 Priority order

**Function and design first. Copy is fine-tuned later.** Every rebuilt page carries over existing copy verbatim from the current version; no copy rewrites block a phase. A follow-up copy pass happens after this overhaul ships.

## 3. Non-Goals

- EPK, contact, recording-studio-manchester, and blog page restyles (deferred to a later phase — not in this week's scope).
- Migrating off Supabase or Resend. Stack stays the same.
- Building a full custom CRM admin UI (may appear as a stretch goal in Phase 6, but not required).
- Third-party penetration testing or formal external security review.
- New brand work (logo, photography) — using existing assets only.

---

## 4. Phase Overview

| Phase | Work | Target day |
|---|---|---|
| 0 | Foundations: Design DNA + Security Audit + Backend Audit (parallel) | Day 1 |
| 1 | Homepage mobile optimisation + new `/book` service picker | Day 2 |
| 2 | Tutoring page restyle | Day 3 |
| 3 | Studio page restyle | Day 3–4 |
| 4 | Free page rebuild (design + lead capture + nurture trigger) | Day 4–5 |
| 5 | Links page rework (premium link-in-bio) | Day 5 |
| 6 | Resend + unified Supabase CRM wiring | Day 5–6 |
| 7 | Security fixes + cross-device QA + ship | Day 7 |

Each phase has its own gate. Nothing in a later phase starts until the prior phase's acceptance criteria are met.

---

## 5. Phase 0 — Foundations

Three parallel tracks. All three produce reference documents that every subsequent phase consumes.

### 5.1 Track A — Design DNA extraction

**Purpose:** Lock the new homepage's design language into an unambiguous reference so interior pages cannot drift.

**Output file:** `docs/design-dna.md`

**Contents:**
- Typography scale with exact classes: H1 / H2 / H3 / body / caption — mobile and desktop sizes, weights, line-heights, letter-spacing.
- Colour tokens — background, text, secondary text, muted text, border-white/10.
- Spacing rhythm — section `py-*` values for desktop vs mobile, horizontal padding rules, max-width values for content vs reading vs feature.
- Section patterns — the 3–5 recurring section archetypes on the homepage (e.g., full-bleed hero, dark-on-dark feature, light-section interrupt, CTA block). Each documented with a canonical example including every Tailwind class.
- Component patterns — primary CTA button, secondary CTA button, card, heading+eyebrow pair. Copy the exact JSX + classes from the current homepage.
- Motion patterns — the Framer Motion variants used (scroll reveal, stagger), with exact easing and timing. Must match the homepage.
- Light-section rule — at least one light-background section per page, per the CLAUDE.md contrast guidance.
- Mobile rules — section padding overrides, type scale shifts, component size shifts.

**Method:** read `app/page.tsx`, `app/layout.tsx`, `app/globals.css`, and every component used on the homepage. Extract patterns literally (copy-paste-worthy), not paraphrased.

**Acceptance:** I can rebuild any interior page by only referencing `docs/design-dna.md` and the page's content, without looking at the homepage source.

### 5.2 Track B — Full security audit (read-only)

**Purpose:** Identify every security weakness before we modify production code. Fixes happen in Phase 7.

**Output file:** `docs/security-audit-2026-04-24.md`

**Checks:**
- **Secrets.** Grep for hardcoded API keys, tokens, Supabase URLs/anon keys, Stripe keys, Resend keys, Calendly tokens. Verify `.env*` files are in `.gitignore` and not committed. Check the git history for any committed secret.
- **Supabase RLS.** List every table, check row-level security policies on each. Flag tables with RLS disabled or with policies that are effectively `true`.
- **API routes.** For every route under `app/api/`: check authentication, input validation, rate limiting, error handling that leaks info. Flag anything that accepts user input without validation or allows unauthenticated writes.
- **Dependency scan.** Run `npm audit`. Record all high/critical vulnerabilities, note which are upgradeable vs stuck.
- **Headers.** Check `next.config.ts` / middleware for `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`.
- **Client exposure.** Check `NEXT_PUBLIC_*` env vars — ensure nothing secret has been prefixed publicly.
- **Webhook endpoints.** `stripe-webhook`, `webhooks/*` — verify signature validation, replay protection.
- **CORS / origins.** Any API route accepting cross-origin requests — confirm allowed origins are locked.

**Severity ranking:** Critical / High / Medium / Low. Each finding includes: what, where, why it matters, how to fix.

**Acceptance:** A severity-ranked markdown report with line-number references for each finding, ready to feed Phase 7.

### 5.3 Track C — Backend / CRM stack audit

**Purpose:** Map what exists today so the Phase 6 CRM data model is a deliberate design, not an accident.

**Output file:** `docs/backend-audit-2026-04-24.md`

**Contents:**
- Current Supabase schema — every table, its columns, its purpose, who writes to it, who reads from it.
- Current API routes — `app/api/*` one-line summaries: what it does, what it writes, what it reads.
- Current Resend usage — grep for `resend` imports, list every email-sending call site and template.
- Current Calendly integration — config, embeds, webhook consumers.
- **Gap analysis.** What a unified CRM requires vs what exists. Identify: missing unified `contacts` table, missing source tagging, missing booking-to-contact link, missing email-sequence trigger hooks.
- **Proposed data model.** `contacts` table schema (id, email, name, source, status, tags, first_seen_at, last_seen_at, notes), plus `contact_events` table for timeline (booking made, email opened, guide downloaded, session completed).

**Acceptance:** Phase 6 can be implemented by reading only this file and the design spec — no further discovery needed.

---

## 6. Phase 1 — Homepage mobile + booking flow

### 6.1 Homepage mobile optimisation

**Problem:** Too much scroll on mobile. Sections are all needed but compressed for phone.

**Changes:**
- **Condensed mobile hero.** Replace the desktop hero with a shorter mobile variant: headline + single sentence + primary CTA. Desktop unchanged.
- **Sticky jump nav.** Mobile-only sticky chip bar beneath the hero on scroll: `Studio · Tutoring · Music · Book`. Scrolls to anchor sections. Auto-hides at top of page, sticks when user scrolls past hero.
- **Section-by-section tighten.** Mobile overrides: reduced `py-*`, shorter line counts, tighter paragraphs. No sections removed — every section keeps its purpose, just less visual weight on mobile.
- **Preserve desktop.** No regression on desktop. All changes gated on Tailwind mobile breakpoints.

**Acceptance:**
- Scroll distance on iPhone 14 viewport is reduced by ≥30% from current.
- Jump nav reaches each target section correctly.
- Desktop renders identically to current homepage.
- Lighthouse mobile performance score ≥ current.

### 6.2 Restyled `/booking` service picker (rebuilt in place)

**Problem:** Users who land on the booking hub don't know which service to pick. Per-page bookings on tutoring and studio work fine, but the central hub adds friction with mixed CTAs and visual mismatch with the new homepage.

**Design:**
- Rebuild the existing `/booking` route in place — do **not** create a parallel `/book` route. Existing links from socials, emails, and old shares stay intact.
- Page follows Design DNA archetypes (cinematic hero scaled, then split-row cards on light/dark).
- Hero: "Book a session" + one-sentence intro.
- Three cards in a row (stack on mobile):
  - **Tutoring** — `from £45/hr` (online) · `£60/hr` (in-person) — bulk discounts on 5/8/10 session bundles.
  - **Studio** — `£45/hr` — Manchester only.
  - **Mix & Master** — `POA` — discovery call to scope.
- Selecting a card reveals the Calendly embed inline below (no page nav). Selected card highlights; others fade.
- For tutoring: a sub-toggle inside the revealed area picks Online vs In-Person, switching the Calendly URL between `tutoringOnline` and `tutoringInPerson`.
- URL reflects selection: `/booking?service=tutoring` (and `&mode=online|in-person` for tutoring) deep-links straight to that embed.
- Light-section interrupt below the embed with trust signals (short testimonial / equipment / WELCOME10 hint if applicable).

**Nav changes:**
- Main nav adds a "Book" CTA pill on the right → `/booking`.
- Existing nav items (`Music · Studio · Shop · Contact`) all stay. Shop is non-negotiable per Logan.

**Per-page Calendly embeds — explicitly KEPT:**
- `/tutoring` and `/studio` pages keep their inline Calendly embeds. Direct booking from those pages remains frictionless — a user who already chose tutoring shouldn't have to re-pick the service.
- The cleanup work on those pages (Phases 2 + 3) tightens the embed presentation to match Design DNA, but does **not** remove the embed itself.
- The `/booking` hub serves users who land via nav, ads, or general intent — i.e. those who haven't already chosen.

**Acceptance:**
- A user landing on the homepage can reach a service-specific Calendly in ≤2 clicks (homepage → tutoring/studio page → embed, OR homepage → /booking → card → embed).
- `/booking?service=tutoring&mode=online`, `/booking?service=tutoring&mode=in-person`, `/booking?service=studio`, `/booking?service=mixing` each render the correct embed on page load.
- `/tutoring` and `/studio` retain their inline embeds, restyled to Design DNA.
- Service cards on `/booking` match Design DNA exactly.

---

## 7. Phase 2 — Tutoring page restyle

**Input:** Design DNA + existing tutoring content.

**Structure:**
- Hero — headline, one-sentence pitch, primary CTA to `/book?service=tutoring`.
- What you get — structured feature block (3–4 items) explaining the tutoring offer (technique, mixing, home-studio setup, artist development — confirm with Logan).
- Social proof — short testimonial(s) or credential block, light-section interrupt.
- Pricing block — £40/hr clear, bundle options if applicable.
- FAQ (if needed) — accordion, Design DNA styling.
- CTA block — final "Book a session" CTA to `/book?service=tutoring`.

**Rules:**
- No inline Calendly. All CTAs route to `/book`.
- Every section uses a Design DNA archetype.
- At least one light-section interrupt.
- Copy: keep existing copy unless Logan flags it for rewrite.

**Acceptance:**
- Page renders Design DNA patterns with zero custom per-page styling.
- Desktop and mobile both pass visual review.
- All CTAs route correctly to `/book?service=tutoring`.

---

## 8. Phase 3 — Studio page restyle

**Input:** Design DNA + existing studio content (gear list, rates, what's included).

**Structure:**
- Hero — studio positioning + primary CTA to `/book?service=studio`.
- What's included — structured block (recording time, engineer, tea, vibes — confirm list with Logan).
- Gear / equipment — clean structured block. Not a bullet dump. Group by category (mics, monitors, interfaces, software) if feasible.
- Rates — £45/hr clear, session-length pricing if applicable.
- Studio photography — full-bleed image section with overlaid text (per Design DNA full-bleed archetype).
- Testimonial / social proof — light-section interrupt.
- FAQ (if needed).
- CTA block — final booking CTA.

**Rules:** same as Phase 2.

**Acceptance:** same shape as Phase 2.

**Note:** the existing `/recording-studio-manchester` SEO page is out of scope for this phase but will need restyling in a later pass. Do not delete it; leave it as-is.

---

## 9. Phase 4 — Free page: shell + infra (waitlist mode)

**Context:** The free resources themselves are being built in a separate project. This phase builds the page and the full lead-capture/email infrastructure so that when the resources drop, only the email content needs swapping in — no new engineering.

**Problem:** Current page doesn't match homepage. Once free resources exist, we need the page and the backend ready to receive, store, and email leads.

**Changes:**
- Full visual rebuild to Design DNA.
- **Waitlist framing.** Hero copy: "Free guides coming soon — get early access." Plain value prop (one sentence). Soft language, no false urgency.
- **Lead capture block.** Single email input, single primary CTA ("Get early access"). No name field. One action.
- **Success state.** Post-submit: "You're on the list. We'll email you the moment the first guide drops." Secondary CTA (follow on Instagram, book a session).
- **Backend wiring (full).** Form submits to `/api/lead-capture`-style route that: (a) upserts contact in Supabase `contacts` with `source='free-guide-waitlist'`; (b) triggers Resend to send a simple acknowledgement email ("You're on the list").
- **Nurture sequence scaffold.** Set up the Resend sequence structure but with minimal content — an acknowledgement email only. When the free resource is ready, swap in the real delivery email + multi-step nurture without changing the form, route, or Supabase schema.

**Explicitly deferred (until free resource exists in other project):**
- The actual guide delivery email with attachment/link.
- The value-email + soft-CTA nurture steps (T+2, T+5 days).
- The "guide delivered" success state copy.

**Acceptance:**
- Page visually indistinguishable from homepage in styling quality.
- Submitting the form writes to Supabase `contacts` with `source='free-guide-waitlist'` within 5 seconds.
- Resend acknowledgement email sends on submission.
- Duplicate submissions (same email) update `last_seen_at` without re-sending the acknowledgement.
- Swapping the acknowledgement template for a full delivery email requires zero code changes — only Resend template edits.

---

## 10. Phase 5 — Links page rework

**Problem:** Current links page is weak. Instagram / TikTok traffic lands somewhere that doesn't convert or reflect the brand.

**Design: premium branded link-in-bio.**
- Single-viewport-first design (most links visible without scroll on mobile).
- Top: Elcee portrait or logo block, handle, one-sentence tagline.
- List of links. Each link is a Design DNA card, full-width, large tap target, subtle hover/active state. Keep visual hierarchy minimal — the brand does the work.
- **Link set (confirm with Logan):**
  - Latest release / music
  - Book a studio session → `/book?service=studio`
  - Tutoring → `/book?service=tutoring`
  - Free guide → `/free`
  - Instagram @elceethealchemist
  - Instagram @elceetheengineer
  - YouTube
  - Contact
- Click tracking — every link click fires an analytics event (Umami is already installed) so Logan can see which links pull weight.
- Fast load — this is the primary IG/TikTok landing. Hero image optimised, no heavy scripts, no Calendly embed, no Lenis overhead (consider skipping Lenis on this page).

**Acceptance:**
- Page is under 80KB HTML+CSS on first load (excluding hero image).
- Every link click appears in Umami with a distinguishable event name.
- Visually matches Design DNA.

---

## 11. Phase 6 — Resend + unified Supabase CRM

**Input:** Phase 0 Track C backend audit and data model.

### 11.1 Data layer — Supabase

**New table: `contacts`**
- `id` (uuid, pk)
- `email` (text, unique, indexed)
- `name` (text, nullable)
- `source` (text — `booking-tutoring`, `booking-studio`, `booking-mixing`, `free-guide`, `contact-form`, `enquiry`, `other`)
- `status` (text — `new`, `engaged`, `client`, `unsubscribed`)
- `tags` (text[])
- `first_seen_at` (timestamptz)
- `last_seen_at` (timestamptz)
- `notes` (text, nullable)

**New table: `contact_events`**
- `id` (uuid, pk)
- `contact_id` (uuid, fk → contacts)
- `event_type` (text — `booking_made`, `booking_completed`, `guide_downloaded`, `email_sent`, `email_opened`, `form_submitted`)
- `metadata` (jsonb)
- `created_at` (timestamptz)

**RLS:** locked to service-role only for writes. No anon access.

**Migration strategy:** additive. Existing tables untouched. New writes go to `contacts` and `contact_events`; reads can union with legacy tables if needed during transition.

### 11.2 Email layer — Resend

**Sequences (each defined as a single Resend template or a chain triggered via cron/edge function):**

1. **Post-booking (all services).** Triggered by Calendly webhook.
   - T+0: Booking confirmation (booking details, what to prepare, location).
   - T-24h before session: Reminder.
   - T+24h after session: Thank-you + soft "book next" CTA.

2. **Free-guide waitlist (Phase 4 scope).** Triggered by `/free` submission.
   - T+0: Acknowledgement ("You're on the list — we'll email the moment the first guide drops").
   - Full nurture sequence (guide delivery + T+2 value + T+5 soft CTA) is deferred until the free resource exists in the other project. The scaffold is built so swapping this in later requires no engineering changes.

3. **Contact-form enquiry.** Triggered by `/contact` submission.
   - T+0: Acknowledgement ("got it, I'll reply within 24h").
   - Manual reply from Logan handles the rest.

**Webhook: Calendly → Supabase → Resend.**
- New endpoint: `app/api/webhooks/calendly/route.ts`.
- Validates Calendly signature.
- Upserts contact by email. Writes `contact_events` row. Triggers post-booking sequence.
- Idempotent on `event_uuid`.

### 11.3 Stretch — simple admin view

- Route: `/admin/contacts` (protected by a simple env-var password or Supabase auth — confirm with Logan).
- Table view of contacts sortable by source, status, last_seen_at.
- Click a contact → timeline view of their `contact_events`.
- Out of scope if time is tight; write an issue and move on.

**Acceptance:**
- A new Calendly booking writes a `contacts` row, a `contact_events` row, and triggers the first post-booking email within 30 seconds.
- A `/free` submission writes a `contacts` row tagged `source=free-guide`, triggers the guide delivery email immediately, and enrols them in the nurture sequence.
- No duplicate contacts — same email upserts.

---

## 12. Phase 7 — Security fixes + QA + ship

### 12.1 Security fixes

For each Critical and High finding from Phase 0 Track B: fix. For Medium: fix if trivial, issue if not. For Low: issue.

Verification: re-run `npm audit`, re-grep for the fixed patterns, re-test the fixed endpoints.

### 12.2 Cross-device QA

Manual test matrix:
- iPhone 14 Safari
- iPhone SE Safari (small viewport)
- Pixel 7 Chrome
- Desktop Chrome (1440px)
- Desktop Safari (1440px)

Pages tested: homepage, `/book`, tutoring, studio, free, links.

For each: hero renders, nav works, jump nav works (homepage), forms submit, Calendly embed loads, primary CTAs route correctly.

### 12.3 Visual regression vs Design DNA

Each rebuilt page spot-checked against `docs/design-dna.md`. Any drift → fix before ship.

### 12.4 Deploy

Merge to main. Vercel auto-deploys. Verify production URL renders each page correctly. Verify webhooks fire against production Supabase.

**Acceptance:**
- Zero Critical or High security findings remain open.
- All 5 pages (+ book, + homepage) pass the cross-device matrix.
- Production verified.

---

## 13. Risks and mitigations

- **Phase 0 security findings are severe.** Mitigation: Phase 7 fixes move earlier; Phase 2–5 pause if a finding requires urgent action (e.g., leaked key → rotate immediately).
- **Design DNA doc is incomplete.** Mitigation: Phases 2–5 each start with a 10-minute DNA-compliance check; if the doc is missing a pattern the page needs, update the doc first, not the page.
- **Calendly webhook reliability.** Mitigation: idempotent upserts, log every webhook payload for 7 days, dead-letter queue for failed writes.
- **Scope creep on interior pages.** Mitigation: strict "one page per phase", no unrelated refactors, no "while I'm here" fixes. Each phase has a gate.
- **1-week timeline slips.** Mitigation: Phase 6 admin-view is a stretch; Phase 4 and 5 can be trimmed to MVP waitlist capture + Linktree-parity if Day 5 is crunched.
- **Free-resource project timing.** The actual free guides are being built in a separate project. Mitigation: Phase 4 ships waitlist mode only. When the free resource is ready, the delivery email + nurture content plug into the existing sequence without touching the page or route.

## 14. Out of scope for this overhaul

- EPK, contact, recording-studio-manchester, blog restyles.
- Rebuilding the Calendly integration — we're restructuring how it's used, not replacing it.
- Artist profile content work (music uploads, press kit, photography).
- Paid-ad landing pages.
- Deep analytics / attribution tooling beyond Umami.

---

## 15. Deliverables

By end of week:

1. `docs/design-dna.md` — single source of truth for interior page styling.
2. `docs/security-audit-2026-04-24.md` — severity-ranked audit.
3. `docs/backend-audit-2026-04-24.md` — current-state map + target data model.
4. Homepage with mobile hero, jump nav, tightened sections.
5. `/book` service picker page.
6. Restyled tutoring, studio, free, links pages.
7. Supabase `contacts` + `contact_events` tables live.
8. Resend sequences live for post-booking, free-guide, contact-form.
9. Calendly webhook writing to Supabase and triggering emails.
10. Security fixes deployed.
11. Implementation plan document (created after this spec is approved, via `writing-plans` skill).
