# Phase 0 — Foundations: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Produce three reference documents — Design DNA, Security Audit findings, Backend/CRM map — that every subsequent phase (1–7) will consume. Zero code changes in this phase; all output is documentation.

**Architecture:** Three parallel tracks, each producing one committed markdown artifact under `docs/`. Tracks do not share files or depend on each other, so they can be run sequentially by one worker or dispatched to three subagents in parallel.

**Tech Stack:** Read-only. Shell + git + markdown. Runs `npm audit` for Track B.

**Parent spec:** `docs/superpowers/specs/2026-04-24-website-overhaul-design.md` §5

---

## File Structure

| File | Track | Responsibility |
|---|---|---|
| `docs/design-dna.md` | A | Typography, colour, spacing, section archetypes, component patterns, motion patterns extracted verbatim from the new homepage |
| `docs/security-audit-2026-04-24.md` | B | Severity-ranked findings: secrets, Supabase RLS, API routes, dependencies, headers, webhooks |
| `docs/backend-audit-2026-04-24.md` | C | Current Supabase schema, API routes, Resend usage, Calendly wiring, gap analysis, proposed `contacts` + `contact_events` data model |

No source files are modified in Phase 0.

---

## Track A — Design DNA Extraction

**Goal:** Produce `docs/design-dna.md` such that any interior page can be rebuilt from it alone without re-reading the homepage source.

### Task A1: Read the homepage source in full

**Files:**
- Read: `app/page.tsx` (556 lines)
- Read: `app/layout.tsx`
- Read: `app/globals.css`
- Read: `app/components/Navigation.tsx`
- Read: `app/components/SiteFooter.tsx`
- Read: `app/components/LenisProvider.tsx`

- [ ] **Step 1: Read `app/page.tsx` in its entirety**

Use Read tool on `app/page.tsx` (lines 1–556). Do not skim. Every section matters.

- [ ] **Step 2: Read `app/layout.tsx`, `app/globals.css`, `app/components/Navigation.tsx`, `app/components/SiteFooter.tsx`, `app/components/LenisProvider.tsx`**

Parallel reads.

- [ ] **Step 3: List every distinct section in `app/page.tsx`**

Scratchpad only — no file written yet. For each `<section>` (or equivalent top-level wrapper), record: approximate line range, background colour class, vertical padding class, role in page (hero / feature / testimonial / CTA / etc).

Expected output: list of ~6–10 sections with their archetype and Tailwind classes.

- [ ] **Step 4: List every component imported by `app/page.tsx`**

For each imported component: name, import path, role on the homepage (e.g., `Achievements` → social-proof strip). Don't fully read each component yet — just enumerate.

### Task A2: Extract typography patterns

**Files:**
- Read: the sections identified in A1
- Write: temporary notes (not yet committed)

- [ ] **Step 1: Identify every headline element (`<h1>`, `<h2>`, `<h3>`) in `app/page.tsx`**

For each headline: exact Tailwind class string, desktop size class, mobile size class, weight class, leading class, tracking class. Record exact class strings — no paraphrasing.

- [ ] **Step 2: Identify body copy patterns**

Same extraction for body paragraphs, captions, and labels. Record the exact class strings used most often.

- [ ] **Step 3: Identify any responsive type scale shifts**

Record every class of the shape `text-[something] md:text-[something] lg:text-[something]`. These are the type scale rules.

### Task A3: Extract colour, spacing, border, and motion patterns

- [ ] **Step 1: Record every background colour class used on a section wrapper**

Examples: `bg-black`, `bg-white`, `bg-[#0a0a0a]`. Note which sections are light and which are dark.

- [ ] **Step 2: Record every `py-*`, `px-*`, `max-w-*` value used on sections and containers**

Group by role: section vertical padding (desktop + mobile overrides), horizontal padding, content max widths, reading max widths.

- [ ] **Step 3: Record every border class used**

Most will be `border-white/10` or `border-black/10` per CLAUDE.md. Note anything else.

- [ ] **Step 4: Record every `motion.*` element and its variants**

For each Framer Motion use: exact `initial`, `animate`/`whileInView`, `transition` values, `viewport` config, stagger config. The `ease` array is load-bearing — record it verbatim.

### Task A4: Extract component patterns

- [ ] **Step 1: Read each homepage-used component in `app/components/`**

Read the imports enumerated in A1 Step 4. For each component, record its role and the exact prop shape.

- [ ] **Step 2: Identify the canonical primary CTA button**

Copy its exact JSX including every class. This becomes the authoritative primary button spec.

- [ ] **Step 3: Identify the canonical secondary CTA button**

Same. If the homepage has no secondary button, derive one from the CLAUDE.md guidance (`border border-white text-white px-8 py-3 rounded-full hover:bg-white hover:text-black transition-all duration-300`) and mark it as "derived from CLAUDE.md — no homepage example."

- [ ] **Step 4: Identify the canonical card/panel pattern**

Copy the exact outer classes and structure. This is the authoritative card spec.

- [ ] **Step 5: Identify the heading+eyebrow pattern**

If used. If not, skip this and note its absence.

### Task A5: Write `docs/design-dna.md`

**Files:**
- Create: `docs/design-dna.md`

- [ ] **Step 1: Write the document following this structure**

```markdown
# Design DNA — elceethealchemist.com

Source: `app/page.tsx` as of commit [current HEAD sha]. This is the authoritative design language reference for all interior pages. If a pattern is needed that is not in this document, update this document before building the page.

## Typography
[H1 / H2 / H3 / body / caption with exact Tailwind class strings and responsive variants, taken from Task A2]

## Colour tokens
[Backgrounds (dark and light), text, secondary text, muted text, borders — from Task A3 Step 1 + Step 3]

## Spacing rhythm
[Section py-* desktop and mobile, horizontal padding, max-widths — from Task A3 Step 2]

## Motion patterns
[Scroll reveal variant with exact easing, stagger children config — from Task A3 Step 4]

## Section archetypes
[One subsection per archetype identified in A1 Step 3, each with: purpose, canonical classes, an example JSX snippet copied from app/page.tsx]

## Component patterns
### Primary CTA button
[Exact JSX and classes — from Task A4 Step 2]

### Secondary CTA button
[Exact JSX — from Task A4 Step 3]

### Card / panel
[Exact JSX — from Task A4 Step 4]

### Heading + eyebrow (if present)
[From Task A4 Step 5, else omit]

## Light-section rule
Every interior page must contain at least one light-background section (per CLAUDE.md contrast guidance).

## Mobile overrides
[Every responsive class variant found in Task A2 Step 3 and A3 Step 2]
```

Fill every section with the literal class strings and JSX snippets recorded in Tasks A1–A4. No paraphrasing, no "similar to X" references — copy the code.

- [ ] **Step 2: Self-review against acceptance criteria**

Read `docs/design-dna.md` with fresh eyes. Ask: could I rebuild the tutoring page using only this doc + tutoring's existing content? If there's a section archetype used on the homepage that isn't documented, add it.

- [ ] **Step 3: Commit**

```bash
git add docs/design-dna.md
git commit -m "docs: extract homepage Design DNA reference

Authoritative typography, colour, spacing, section archetypes,
component patterns, and motion patterns extracted verbatim from
app/page.tsx. Phase 2-5 interior page rebuilds conform to this doc."
```

---

## Track B — Full Security Audit (read-only)

**Goal:** Produce `docs/security-audit-2026-04-24.md` — severity-ranked findings ready for Phase 7 fixes.

### Task B1: Secrets and gitignore check

- [ ] **Step 1: Verify `.env*` files are gitignored**

Run: `cat .gitignore | grep -i env`
Expected: lines for `.env`, `.env.local`, `.env*.local` or similar.
Record: what is ignored and what is not.

- [ ] **Step 2: Grep the tracked source tree for hardcoded secrets**

Run each and record every match (file + line + matched pattern, redacting the actual secret):
- `git grep -nE "(sk_live|sk_test|pk_live|rk_live)_[A-Za-z0-9]{20,}"` — Stripe keys
- `git grep -nE "re_[A-Za-z0-9]{20,}"` — Resend keys
- `git grep -nE "eyJ[A-Za-z0-9_-]{20,}"` — JWTs / Supabase anon keys
- `git grep -nE "https://[a-z0-9-]+\.supabase\.co"` — Supabase project URLs (note if these appear outside `NEXT_PUBLIC_*`)

- [ ] **Step 3: Check git history for previously committed secrets**

Run: `git log --all -p -- '.env*' 2>/dev/null | head -50`
Expected: empty or only harmless references.
If any key-shaped string appears in history, flag as Critical.

### Task B2: Supabase RLS and schema check

- [ ] **Step 1: Identify the Supabase project via env references**

Run: `git grep -l "SUPABASE" app/ lib/ 2>/dev/null`
Read each file and record what Supabase client uses which keys (anon vs service role) and from where (server vs client).

- [ ] **Step 2: Query Supabase for table list and RLS status**

User must provide Supabase project access for this step. Record: every table name, whether RLS is enabled, and every policy per table.

If direct Supabase access is unavailable, note "RLS review pending — requires dashboard access" and mark as a Critical gap.

- [ ] **Step 3: Flag any table with RLS disabled or with a permissive policy**

A policy of `USING (true)` or `WITH CHECK (true)` on an `anon`-readable table is a High finding. Record each.

### Task B3: API route authentication and validation audit

- [ ] **Step 1: List every API route**

Run: `find app/api -name "route.ts" -o -name "route.tsx" | sort`
Expected: list of route files.

- [ ] **Step 2: For each route, record**

- Methods exported (GET, POST, etc.)
- Whether request body is validated (look for Zod, manual checks, or none)
- Whether any form of auth is required (session check, API key, signature)
- Whether the response could leak stack traces or env info on error
- Whether any DB write is gated on auth

For each route, one paragraph in the audit doc.

- [ ] **Step 3: Flag routes that accept unauthenticated writes with unvalidated input as High**

### Task B4: Webhook signature validation

- [ ] **Step 1: Identify every webhook route**

Already known: `app/api/stripe-webhook/route.ts` and `app/api/webhooks/calendly/route.ts`. Confirm no others.

- [ ] **Step 2: Verify Stripe webhook signature validation**

Read the route file. Look for `stripe.webhooks.constructEvent(...)` or equivalent. Confirm signature is verified before any side effect. Flag Critical if not.

- [ ] **Step 3: Verify Calendly webhook signature validation**

Read `app/api/webhooks/calendly/route.ts`. Calendly signs webhooks with an `Calendly-Webhook-Signature` header. Confirm verification is present. Flag High if not.

### Task B5: Dependency vulnerability scan

- [ ] **Step 1: Run `npm audit`**

Run: `npm audit --json > /tmp/npm-audit.json`

Parse the output. For each vulnerability with severity `high` or `critical`: record the package name, severity, CVE if listed, whether a fix is available via `npm audit fix`, and whether the fix requires a breaking major version bump.

- [ ] **Step 2: Record results in audit doc**

Include the full critical+high list in a table. Note how many mediums and lows exist but don't enumerate them.

### Task B6: Response headers audit

- [ ] **Step 1: Read `next.config.ts` (or `.js`)**

Run: `cat next.config.*`
Record whether `headers()` is configured and which headers it sets.

- [ ] **Step 2: Flag missing security headers**

Headers to verify: `Content-Security-Policy`, `Strict-Transport-Security`, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`. Each missing header is a Low-to-Medium finding (document severity per context — `Strict-Transport-Security` missing on an HTTPS site is Medium; CSP missing is Medium).

### Task B7: Client-exposed env vars audit

- [ ] **Step 1: Grep for every `NEXT_PUBLIC_*` usage**

Run: `git grep -nE "NEXT_PUBLIC_[A-Z_]+"`

- [ ] **Step 2: Confirm nothing secret is exposed**

For each `NEXT_PUBLIC_*` variable: name it, state what it holds, confirm it is not a server-side secret (Stripe secret key, Resend key, Supabase service role key). Any secret with `NEXT_PUBLIC_` prefix is a Critical finding.

### Task B8: Write `docs/security-audit-2026-04-24.md`

**Files:**
- Create: `docs/security-audit-2026-04-24.md`

- [ ] **Step 1: Write the report with this structure**

```markdown
# Security Audit — 2026-04-24

Scope: elceethealchemist.com, commit [current HEAD sha].

## Executive summary
- Critical: N findings
- High: N
- Medium: N
- Low: N

## Critical findings
[One subsection per finding, each with: Title, File + line reference, Why it matters, Fix]

## High findings
[Same shape]

## Medium findings
[Same shape]

## Low findings
[Same shape]

## Checks performed
- Secrets in source (Task B1)
- Secrets in git history (Task B1)
- Supabase RLS (Task B2)
- API route auth + validation (Task B3)
- Webhook signature validation (Task B4)
- npm audit (Task B5)
- Response headers (Task B6)
- Client-exposed env vars (Task B7)

## Open gaps
[Anything that could not be checked — e.g., if Supabase dashboard access was unavailable during audit]
```

Populate each finding from Tasks B1–B7. No placeholders — if a finding has no line reference, explicitly say "No source reference — [reason]".

- [ ] **Step 2: Commit**

```bash
git add docs/security-audit-2026-04-24.md
git commit -m "docs: add security audit findings for 2026-04-24

Severity-ranked findings across secrets, Supabase RLS, API routes,
webhook signatures, dependencies, headers, and client-exposed envs.
Fixes applied in Phase 7 of the website overhaul."
```

---

## Track C — Backend / CRM Stack Audit

**Goal:** Produce `docs/backend-audit-2026-04-24.md` — current-state map of Supabase, API routes, Resend usage, and Calendly wiring, plus the proposed unified `contacts` + `contact_events` data model for Phase 6.

### Task C1: Map current Supabase schema

- [ ] **Step 1: List every Supabase table referenced in the codebase**

Run: `git grep -nE "from\\(['\"][a-z_]+['\"]\\)" app/ lib/ 2>/dev/null`

This catches `supabase.from('table_name')` calls. Record every distinct table name.

- [ ] **Step 2: For each table, record**

- Columns referenced in reads
- Columns referenced in writes
- Which API routes read it
- Which API routes write to it

- [ ] **Step 3: If live Supabase access is available, confirm schema matches**

Otherwise note "Schema mapped from code references only — dashboard confirmation deferred."

### Task C2: Map every API route's role

- [ ] **Step 1: For each route listed in Task B3 Step 1, write a one-sentence summary**

Purpose, input shape, output shape, external services it calls (Supabase / Resend / Stripe / Calendly / Telegram etc).

Record in the audit doc as a table.

### Task C3: Map current Resend usage

- [ ] **Step 1: Find every Resend send call**

Run: `git grep -nE "resend\\.emails\\.send" app/ lib/ 2>/dev/null`

For each hit: which file, what triggers it (API route / user action), what template or inline HTML is sent, who receives it.

- [ ] **Step 2: Catalogue templates**

List every distinct email the system can send today: name, purpose, trigger, source file.

### Task C4: Map current Calendly wiring

- [ ] **Step 1: Find every Calendly reference**

Run: `git grep -nE "calendly" app/ lib/ 2>/dev/null`

- [ ] **Step 2: Document**

- Where URLs are configured
- Where the shared `CalendlyEmbed` component is used
- What the webhook route does today (`app/api/webhooks/calendly/route.ts`) — read the file in full

### Task C5: Gap analysis vs unified CRM requirements

- [ ] **Step 1: Compare current state to Phase 6 requirements**

Phase 6 requires (from spec §11):
- A single `contacts` table with `email` uniqueness
- `source` tagging across leads, bookings, enquiries, free-downloads
- An `contact_events` table for per-contact timeline
- Every Calendly booking writes a contact + event and triggers post-booking Resend sequence
- Every `/free` submission writes a contact + event and triggers acknowledgement

For each requirement, state: already exists / partially exists (in which tables) / does not exist.

- [ ] **Step 2: Write the gap list as a table in the audit doc**

### Task C6: Write `docs/backend-audit-2026-04-24.md`

**Files:**
- Create: `docs/backend-audit-2026-04-24.md`

- [ ] **Step 1: Write the document with this structure**

```markdown
# Backend / CRM Audit — 2026-04-24

## Supabase tables (current)
[Per-table section from Task C1]

## API routes (current)
[Table from Task C2]

## Resend usage (current)
[List from Task C3]

## Calendly wiring (current)
[From Task C4]

## Gap analysis vs unified CRM
[Table from Task C5]

## Proposed data model for Phase 6

### `contacts`
| column | type | notes |
|---|---|---|
| id | uuid | pk |
| email | text | unique, indexed |
| name | text | nullable |
| source | text | `booking-tutoring`, `booking-studio`, `booking-mixing`, `free-guide-waitlist`, `contact-form`, `enquiry`, `other` |
| status | text | `new`, `engaged`, `client`, `unsubscribed` |
| tags | text[] | |
| first_seen_at | timestamptz | |
| last_seen_at | timestamptz | |
| notes | text | nullable |

### `contact_events`
| column | type | notes |
|---|---|---|
| id | uuid | pk |
| contact_id | uuid | fk → contacts |
| event_type | text | `booking_made`, `booking_completed`, `guide_downloaded`, `email_sent`, `email_opened`, `form_submitted` |
| metadata | jsonb | |
| created_at | timestamptz | |

### RLS posture
Both tables: service-role writes only. No anon access.

### Migration strategy
Additive. Legacy tables untouched. Union reads during transition if needed.
```

- [ ] **Step 2: Commit**

```bash
git add docs/backend-audit-2026-04-24.md
git commit -m "docs: add backend/CRM audit and proposed data model

Maps current Supabase tables, API routes, Resend usage, and
Calendly wiring. Proposes contacts + contact_events data model
for the Phase 6 unified CRM."
```

---

## Phase 0 Acceptance Gate

Phase 0 is complete when all three of these pass:

- [ ] `docs/design-dna.md` exists, committed, and covers every section archetype used on the homepage. Smoke test: pick one interior page (tutoring) and verify every heading, CTA, card, and section in its planned layout has a corresponding pattern in the DNA doc.
- [ ] `docs/security-audit-2026-04-24.md` exists, committed, and has zero placeholders. Every finding has a severity, a file reference (or explicit "no source reference — [reason]"), and a fix description.
- [ ] `docs/backend-audit-2026-04-24.md` exists, committed, and contains a complete proposed data model for `contacts` and `contact_events` matching the spec §11.

Once all three pass, Phase 1 planning begins (see "Next phase" below).

---

## Next phase

Phase 1 (homepage mobile + `/book` service picker) gets its own implementation plan, written **after** Phase 0 completes. That plan will reference `docs/design-dna.md` directly, so it must exist first.

To generate Phase 1's plan: run `superpowers:writing-plans` skill against spec §6 once Phase 0's acceptance gate has passed.

The same pattern applies for Phases 2–7: write each plan when its predecessor lands, informed by the real artifacts in hand.
