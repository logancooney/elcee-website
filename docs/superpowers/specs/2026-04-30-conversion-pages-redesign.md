# Conversion Pages Redesign — Design Spec
**Date:** 2026-04-30  
**Scope:** Tutoring, Studio, Booking (/booking), Free (/free) pages  
**Goal:** Maximise conversion to bookings and sales. Mobile-first. No fluff.

---

## Core principles (apply to all pages)

- Every section must directly earn a booking. If it doesn't, it's cut.
- All booking actions are **direct Calendly/payment links** — no embedded Calendly widgets, no multi-step selection UI.
- **Mobile-first responsive layout** — replace all fixed `48px` padding with `clamp(20px, 5vw, 48px)`. No three-column grids on mobile.
- **Sticky "Book Free Call" bar** on mobile — appears after user scrolls past the hero, links to the relevant free call Calendly URL.
- Section padding tightened on mobile throughout.
- Remove: all `BookingPrompt` component usage, scroll indicators, cinematic parallax complexity on mobile.

---

## Booking section pattern (shared)

Used on Tutoring, Studio, and Booking pages. Three options per service:

```
[WHITE FULL-WIDTH BUTTON] Book a Free 20-Min Call
                           Not sure where to start? No pitch, no pressure. →

[OUTLINE BUTTON]  Option A — £XX/hr →
[OUTLINE BUTTON]  Option B — £XX/hr →
[DASHED OUTLINE]  Packs — save up to £XXX →   ← fourth row, always visible
```

Free call button is full-width, white background, black text — visually dominant.  
Paid options sit beneath in a 2-column grid (desktop) / stacked (mobile).  
Packs row uses dashed border to signal it's a bundle, not a one-off.

---

## Calendly events — three separate links

| Event | Used on | Purpose |
|---|---|---|
| Free Tutoring Consultation (20 min) | Tutoring page, /booking | Qualify tutoring leads |
| Free Studio Enquiry (20 min) | Studio page, /booking | Qualify studio/mixing leads |
| Free Intro Call (20 min) | /free page, bot leads, anywhere general | Catch-all for undecided visitors |

**Questions are set up in Calendly admin by Logan.** All Q&A answers are automatically captured in Supabase `contact_events.metadata` via the existing webhook at `/api/webhooks/calendly/route.ts`.

**Code changes required:**
- Add three new URL constants to `lib/calendly-config.ts` (one per event)
- Update `deriveService()` in the webhook to correctly tag each new event type
- Update all page CTAs to point to the correct event URL per context

**Question frameworks (Logan finalises in Calendly):**

*Free Tutoring Consultation:* What to learn (dropdown) · Journey level (dropdown) · What they're working on (text) · Location (dropdown) · How they found me (dropdown)

*Free Studio Enquiry:* What they want to do (dropdown) · Studio experience (dropdown) · Project brief (text) · Track count (text) · How they found me (dropdown)

*Free Intro Call:* What brings them (dropdown) · About themselves + project (text) · Location (dropdown) · How they found me (dropdown)

---

## Tutoring page

**Page order:**
1. Hero
2. Booking section
3. What you get (3 bullets)
4. Testimonials
5. FAQ

**Hero:**
- Headline (large): `LEARN FROM AN ARTIST. NOT AN ALGORITHM.`
- Subheading (small, below): `1-1 Lessons. Real Studio. Real Artist.`
- Price line: `Online £45/hr · In-Person £60/hr · First session always free`
- Primary CTA: `Book a Free Call →` (white button, scrolls to #booking)
- Secondary CTA: `See Options ↓` (outline)
- Desktop: keep parallax hero image, min-height 440px (reduced from 640px)
- Mobile: min-height auto — content drives height, no fixed min

**Booking section:**
- Free Tutoring Consultation → Calendly link
- Online Tutoring £45/hr → existing `tutoringOnline` Calendly link
- In-Person £60/hr → existing `tutoringInPerson` Calendly link
- Session Packs (dashed) → links to the 10-session online bundle as default (£400, save £100)

**What you get (3 bullets):**
- `Production, mixing, recording & songwriting` — Ableton, any DAW, vocal engineering, flow and lyricism. Your music is the lesson — we work on what you're actually making, from day one.
- `Every session built around you` — What you're working on is what we work on. No course, no curriculum — just direct, honest feedback that moves you forward.
- `6+ years. Real credits. Still making music.` — Recording artist, mixing engineer, studio owner. The experience to know what works — and the honesty to tell you when something doesn't.

*(Logan to fine-tune copy directly on GitHub)*

**Removed:** The Case section · The Guide section · How It Works section · Bulk Sessions section · BookingPrompt · MobileJumpNav

---

## Studio page

**Page order:**
1. Hero
2. Booking section
3. What you get (3 bullets)
4. Mixing & Mastering (direct payment links)
5. Testimonials
6. Serious Artist Plan
7. FAQ

**Hero:**
- Keep existing "The Alchemist Studio" headline
- Price line: `£35/hr · First session free`
- Primary CTA: `Book a Free Call →`
- Shorter than current — min-height 440px desktop, auto mobile

**Booking section:**
- Free Studio Enquiry → new Calendly link
- Book Studio Time £35/hr → existing `studio1hr` Calendly link (user picks duration on Calendly)
- Mix/Master ↓ → anchor link to section ④ below
- Multi-track Packs (dashed) → existing `multitrack3` payment link (£920, 3 tracks)

**What you get (3 bullets):** copy to be written — covering: the space (acoustically treated Manchester studio), the engineer (working artist, 6+ years), and turnaround (fast delivery, revisions included).

**Mixing & Mastering section:**
Direct payment links laid out as a simple list:
- Full Mix + Master — £340
- Vocal Mix — £190
- Mastering — £40
- 3-Track Package — £920
- 5-Track Package — £1,450

**Serious Artist Plan:**
Separate dark section (background `#0a0a0a`, subtle white border). Positioned after Testimonials.
- Label: `Serious Artist Plan`
- Headline: `Not for everyone. For artists ready to commit.`
- Body: Consistent studio time is how careers are built. Monthly access, priority booking, and a rate that reflects your seriousness.
- Rate: £30/hr · £240/month
- CTA: `Apply →` (links to /contact page)

**Removed:** Services grid · Pricing tables · Facility section · How It Works section · separate Remote Services section

---

## Booking page (/booking)

**Goal:** Hub page for all services. Everything visible immediately. No steps, no hero.

**Structure:**
1. Compact page header (~180px) — `Book a Session. Pick a service & choose a time.`
2. Tutoring block
3. Studio Recording block
4. Mixing & Mastering block

Each block follows the booking section pattern above.

**Tutoring block:**
- Free Tutoring Consultation → Calendly
- Online £45/hr → Calendly
- In-Person £60/hr → Calendly
- Session Packs (dashed) — links to 10-session online bundle (£400, best value). Label: "Session packs — save up to £120 →"

**Studio Recording block:**
- Free Studio Enquiry → Calendly
- Book Studio Time £35/hr → Calendly
- Multi-track Packs (dashed) — links to 3-track package (£920). Label: "Multi-track packs — save up to £250 →"

**Mixing & Mastering block:**
- Full Mix + Master £340 → payment link
- Vocal Mix £190 → payment link
- Mastering £40 → payment link
- 3-Track Package £920 (dashed) → payment link
- 5-Track Package £1,450 (dashed) → payment link

**Removed:** 640px hero · Calendly embed · click-to-select service step · mode selection step

---

## Free page (/free)

**Goal:** Get visitors onto a free call (primary), then email list (secondary).

**Structure:**
1. Compact header — no 640px hero. Short heading: `Free resources & a free call.`
2. Free Intro Call — most prominent. White button layout matching other pages. Direct link to Free Intro Call Calendly event.
3. 10% discount — email capture (keep as-is, tighten mobile padding)
4. Free downloads — keep email capture cards. Mark PDFs as coming soon or hold until ready.

---

## Responsive / mobile spec (all pages)

| Current | New |
|---|---|
| `padding: '48px'` fixed | `padding: clamp(20px, 5vw, 48px)` |
| `padding: '56px 48px'` sections | `padding: clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)` |
| `.grid-three-col` always 3 columns | stacks to 1 column below 768px |
| `.grid-two-col` always 2 columns | stacks to 1 column below 640px |
| Hero min-height 640px | 440px desktop, auto mobile |
| No sticky CTA | Sticky `Book Free Call` bar, mobile only, after hero |
| Calendly embed on pages | Removed — direct links only |

---

## What stays unchanged

- Navigation component
- SiteFooter component
- Testimonials components (mobile padding tightened only)
- FAQ components (mobile padding tightened only)
- Grunge texture / parallax hero visual on desktop
- All existing Calendly/payment URLs (new ones added, existing ones kept)
- Supabase CRM webhook — already captures all Q&A automatically
