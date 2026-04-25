# Backend / CRM Audit — 2026-04-24

Scope: elceethealchemist.com, commit `dc7b1af` (branch `main`).

This is a read-only map of the current Supabase schema, API routes, Resend usage, and Calendly wiring — plus the proposed unified `contacts` + `contact_events` data model for Phase 6.

> **Caveat:** Live Supabase dashboard access was not available. Schema is inferred from code references only — column shapes match what the code reads/writes, but the actual table definition (constraints, defaults, indexes) requires dashboard confirmation.

---

## Supabase tables (current)

### `studio_leads`

The **only** Supabase table referenced anywhere in the codebase.

**Columns inferred from write sites:**

| Column | Inferred type | Source(s) |
|---|---|---|
| `email` | text | All inserts |
| `name` | text (nullable) | All inserts |
| `source` | text | All inserts (values seen: `free-page`, `free-page-discount`, `calendly`) |
| `service` | text | All inserts (free-form, ad-hoc values) |
| `status` | text | All inserts (`new`) |
| `notes` | text | All inserts (ad-hoc strings or JSON) |
| `booked_at` | timestamptz | Calendly webhook only |
| `created_at` | timestamptz | Calendly webhook explicitly; others probably DB-default |

**Reads:** none in the codebase. All API routes write to this table; no route reads from it. The CRM is therefore dashboard-only today.

**Write sites:**
- `app/api/lead-capture/route.ts:48` — POST insert. Source: `free-page`. Fired from `/free` lead-magnet form.
- `app/api/discount-email/route.ts:26` — POST insert. Source: `free-page-discount`. Fired from WELCOME10 capture.
- `app/api/webhooks/calendly/route.ts:45` — POST insert. Source: `calendly`. Fired by Calendly webhook on `invitee.created`.

**Observations:**
- Three separate code paths write similarly-shaped rows but with no shared helper — duplicated logic.
- No upsert on email — every submission creates a new row. The same person submitting twice produces two rows.
- `source` values are ad-hoc strings, not a controlled enum. `studio_leads.source` would not validate Phase 6's expected values without a CHECK constraint or Supabase enum.
- No `tags`, `first_seen_at`, `last_seen_at`, or `id` (uuid) columns inferred from writes — these may exist in the actual schema but the code doesn't touch them.

### Other tables

None referenced in the codebase. If the Supabase project has additional tables (e.g., for Stripe payments, analytics events), they are managed entirely outside this Next.js codebase.

---

## API routes (current)

| Route | Method | Purpose | Writes to | Reads from | External services |
|---|---|---|---|---|---|
| `availability` | GET | Studio booking availability check | none | none | Maton (Google Calendar gateway) |
| `availability-debug` | GET | Debug endpoint for above | none | none | Maton |
| `booking` | POST | Direct booking submission (legacy, pre-Calendly) | google-sheets, google-calendar | none | Resend (via `lib/email-service`), Google Sheets, Google Calendar |
| `chat` | POST | In-page chat widget; relays to AI / handles nurture handoff | in-memory only | none | Resend, OpenAI (presumed) |
| `create-payment-intent` | POST | Stripe payment intent for direct booking | none | none | Stripe |
| `discount-email` | POST | WELCOME10 discount-code capture | `studio_leads` | none | Supabase REST, Resend |
| `lead-capture` | POST | Lead-magnet (free guide) capture | `studio_leads` | none | Supabase REST, Resend |
| `nurture-lead` | POST | 24-hr delayed re-engagement for chat sessions | in-memory only | none | Resend (broken — see security audit M7) |
| `presave` | POST | Music release pre-save signup | in-memory only | none | Resend (presumed — code partially read) |
| `send-lead-magnet` | POST | Sends a specific lead-magnet email | none | none | Resend |
| `stripe-webhook` | POST | Stripe payment confirmation handler | indirect via `/api/lead-capture` self-fetch | none | Stripe (signature), Resend, Maton |
| `webhooks/calendly` | POST | Calendly booking webhook handler | `studio_leads` | none | Supabase JS client |

**Routes that touch Supabase:** 3 (lead-capture, discount-email, webhooks/calendly).
**Routes that send Resend emails:** 7 (chat, discount-email, lead-capture, nurture-lead, presave, send-lead-magnet, stripe-webhook).
**Routes with no persistence:** 4 (chat, nurture-lead, presave, send-lead-magnet — they fire-and-forget or use in-memory state).

---

## Resend usage (current)

11 distinct `resend.emails.send(...)` call sites across 7 routes. No shared template helper — each route inlines its own string template.

| File:line | Trigger | Recipient | Subject | Notes |
|---|---|---|---|---|
| `app/api/chat/route.ts:371` | Chat session ends with email captured | Lead's email | (varies) | Inline string |
| `app/api/discount-email/route.ts:47` | `/free` discount form submission | Lead's email | "Your 10% discount code" | Inlines WELCOME10 |
| `app/api/lead-capture/route.ts:70` | `/free` lead-magnet submission | Lead's email | "Your {Magnet} is on its way" | Hardcoded magnet labels in `MAGNETS` map |
| `app/api/nurture-lead/route.ts:48` | 24-hr delayed (broken) | Chat lead's email | (varies) | Will not fire — see security audit M7 |
| `app/api/presave/route.ts:73` | Music pre-save signup | Lead's email | (varies) | |
| `app/api/send-lead-magnet/route.ts:143` | Manual / scheduled lead-magnet send | Lead's email | "Your Manchester Venues Guide is Ready! 🎵" | One template per magnet |
| `app/api/stripe-webhook/route.ts:75` | Successful payment | Customer | Booking confirmation | Inline template |
| `app/api/stripe-webhook/route.ts:85` | Successful payment | `elcee.automation@gmail.com` | "🎵 New Booking: ..." | Owner notification |
| `app/api/stripe-webhook/route.ts:222` | Failed payment | Customer | "Booking Payment Issue" | Retry email |

**Templates seen:**
- Booking confirmation (session)
- Booking confirmation (deposit / project)
- Owner notification
- Payment failed retry
- Lead-magnet delivery (per-magnet, 4 magnets in `lead-capture`'s `MAGNETS` map)
- Discount code (WELCOME10)
- Pre-save thanks
- Chat handoff / nurture
- Manchester Venues Guide

**Observations:**
- No central template store. Inlined strings are spread across routes.
- No multi-step sequence wiring — every send is a single email triggered by a single event. There's no concept of "T+0 then T+2 then T+5" today.
- No upsert / dedup before send — duplicate submissions trigger duplicate emails.

---

## Calendly wiring (current)

### URL config — `lib/calendly-config.ts`

Central config file. Exports four maps:
- `CALENDLY_EVENT_URLS` — scheduling URLs by service (studio1hr, studio2hr, …, tutoringOnline, tutoringInPerson, free, schedulingPage). 9 entries.
- `CALENDLY_PAYMENT_LINKS` — paid services with up-front payment (fullMixMaster, vocalMix, mastering, multitrack3, multitrack5). 5 entries.
- `CALENDLY_BUNDLE_LINKS` — tutoring bundles (online5/8/10, inPerson5/8/10). 6 entries.
- (Possibly more — full file not read in this audit, but the imports above cover the call sites observed.)

### Embed component — `app/components/CalendlyEmbed.tsx` (referenced from spec, file presence to confirm)

Used by the unified `/booking` page (`app/booking/BookingContent.tsx`) and inline on `/free`, `/studio`, `/tutoring`.

### Webhook — `app/api/webhooks/calendly/route.ts`

- Receives `invitee.created` events.
- Inserts a row into `studio_leads` with `source: "calendly"` and `service` derived from the event name (`studio` substring → `studio-session`, else `free-track-review`).
- **No signature verification** — flagged as Phase 7 H1 in the security audit.
- **No Resend follow-up trigger** — webhook only persists the row; the post-booking confirmation/reminder chain Phase 6 specifies does not exist yet. Currently, Calendly itself sends a basic confirmation email; we don't.

### Embed call sites
- `app/booking/BookingContent.tsx:10` — main booking page (uses URL param routing).
- `app/free/page.tsx:218–219` — embedded free-track-review Calendly.
- `app/studio/page.tsx:19` — imports config; embed location not re-read in this audit.
- `app/tutoring/page.tsx:11` — imports config; embed location not re-read.

---

## Other backend layers

### `lib/email-service.ts`

Used by `app/api/booking/route.ts` (the legacy direct-booking flow that pre-dates Calendly). Provides `sendBookingNotification` and `sendCustomerConfirmation`. Phase 6 likely supersedes this.

### `lib/google-sheets.ts`

`saveToGoogleSheets` — used only by legacy `/api/booking`. CRM-style sheet-as-database. Phase 6 unifies away from this.

### `lib/google-calendar.ts` + `lib/calendar-availability.ts`

Maton-API-backed calendar availability checks and event creation. Used by `/api/booking`, `/api/availability`, `/api/availability-debug`, and `/api/stripe-webhook`. Out of scope for the Phase 6 CRM rebuild — these stay as-is.

---

## Gap analysis vs Phase 6 unified CRM

| Phase 6 requirement (spec §11) | Current state | Gap | Phase 6 work |
|---|---|---|---|
| Single `contacts` table with email uniqueness | Only `studio_leads`; no email uniqueness; duplicates allowed | Yes | Create `contacts` table, migrate `studio_leads` data |
| `source` enum: `booking-tutoring`, `booking-studio`, `booking-mixing`, `free-guide-waitlist`, `contact-form`, `enquiry`, `other` | Free-form text in `studio_leads.source`; values used: `free-page`, `free-page-discount`, `calendly` | Yes | Add CHECK constraint, remap legacy values during migration |
| `status` field: `new`, `engaged`, `client`, `unsubscribed` | `studio_leads.status` exists but only `new` is ever written | Partial | Wire status transitions in Phase 6 (booking confirmed → `client`, etc.) |
| `contact_events` table for timeline | Does not exist | Yes | Create table, write event row from every webhook/form |
| Idempotent upsert on email (no duplicates) | Every submission inserts new row | Yes | Use `ON CONFLICT (email) DO UPDATE last_seen_at` |
| Calendly webhook → Resend post-booking sequence | Webhook persists only; no Resend trigger | Yes | Add Resend chain: T+0 confirmation, T-24h reminder, T+24h thank-you |
| `/free` waitlist → Resend acknowledgement | Closest match: `lead-capture` writes + sends (1 email) | Partial | Repoint `/free` waitlist to new flow; remap `source=free-guide-waitlist` |
| Webhook signature validation | Stripe ✅; Calendly ❌ | Yes | Phase 7 finding H1 |
| RLS posture: service-role only | Inferred service-role only in code; dashboard not verified | Pending | Phase 7 finding M1 — verify before Phase 6 ships |
| Centralised email templates / sequence orchestration | None — inlined per-route | Yes | Build small template registry (Phase 6 design TBD) |

---

## Proposed data model for Phase 6

Reproduced verbatim from spec §11.

### `contacts`

| column | type | notes |
|---|---|---|
| `id` | uuid | pk, default `gen_random_uuid()` |
| `email` | text | unique, indexed, lowercase normalised at write time |
| `name` | text | nullable |
| `source` | text | one of: `booking-tutoring`, `booking-studio`, `booking-mixing`, `free-guide-waitlist`, `contact-form`, `enquiry`, `other`. Enforced via CHECK constraint or Postgres enum |
| `status` | text | one of: `new`, `engaged`, `client`, `unsubscribed` |
| `tags` | text[] | default `'{}'` |
| `first_seen_at` | timestamptz | default `now()`, never updated |
| `last_seen_at` | timestamptz | default `now()`, updated on every touch |
| `notes` | text | nullable |

**Indexes:** unique on `email`, btree on `source`, btree on `last_seen_at` desc (for recency queries).

### `contact_events`

| column | type | notes |
|---|---|---|
| `id` | uuid | pk, default `gen_random_uuid()` |
| `contact_id` | uuid | fk → `contacts.id`, indexed, ON DELETE CASCADE |
| `event_type` | text | one of: `booking_made`, `booking_completed`, `guide_downloaded`, `email_sent`, `email_opened`, `form_submitted`. CHECK constraint or enum |
| `metadata` | jsonb | event-specific payload (booking ID, email subject, magnet ID, etc.) |
| `created_at` | timestamptz | default `now()` |

**Indexes:** btree on `(contact_id, created_at desc)` for timeline queries; btree on `event_type` for cross-contact aggregation.

### RLS posture

Both tables: **service-role only for writes and reads**. No anon access. All API routes that touch these tables run server-side and use `SUPABASE_SERVICE_ROLE_KEY`.

### Migration strategy

Additive. `studio_leads` is untouched in Phase 6 — new writes go to `contacts` and `contact_events`. A backfill query maps existing `studio_leads` rows to `contacts`:

```sql
-- Phase 6 backfill (run once)
INSERT INTO contacts (email, name, source, status, first_seen_at, last_seen_at, notes)
SELECT
  lower(trim(email)),
  name,
  CASE
    WHEN source = 'free-page' THEN 'free-guide-waitlist'
    WHEN source = 'free-page-discount' THEN 'free-guide-waitlist'
    WHEN source = 'calendly' AND service = 'studio-session' THEN 'booking-studio'
    WHEN source = 'calendly' AND service = 'free-track-review' THEN 'enquiry'
    ELSE 'other'
  END,
  COALESCE(status, 'new'),
  COALESCE(created_at, now()),
  COALESCE(booked_at, created_at, now()),
  notes
FROM studio_leads
ON CONFLICT (lower(trim(email))) DO UPDATE SET
  last_seen_at = greatest(contacts.last_seen_at, EXCLUDED.last_seen_at);
```

After Phase 6 ships and runs cleanly for a soak period, `studio_leads` can be marked deprecated (Phase 6.5+) and eventually dropped.

---

## Summary stats

- **Supabase tables in code:** 1 (`studio_leads`)
- **API routes audited:** 12
- **Resend send call sites:** 11 across 7 routes
- **Calendly URLs configured:** 20 (9 events + 5 payment + 6 bundle)
- **Calendly embed call sites:** 4 pages (`/booking`, `/free`, `/studio`, `/tutoring`)
- **Top 3 Phase 6 gaps:**
  1. No unified `contacts` table — single source of truth doesn't exist.
  2. Calendly webhook does not trigger Resend post-booking sequence — bookings land in DB silently.
  3. No upsert/dedup on email — every submission creates a duplicate row, distorting CRM counts.
