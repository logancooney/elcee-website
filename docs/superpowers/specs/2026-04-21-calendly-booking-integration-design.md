# Calendly Booking Integration & Conversion Optimisation — Design Spec

**Date:** 2026-04-21  
**Status:** Awaiting implementation  
**Project:** elceethealchemist.com (Next.js/TypeScript, Vercel)

---

## Overview

Replace the existing custom booking form with a fully Calendly-native booking system, connected to Stripe for payments. Add a unified `/booking` page as a single external CTA destination. Add conversion triggers across the site to maximise bookings. Chatbot revisit is out of scope — separate spec to follow.

---

## 1. Pricing

### Studio Recording (in-person, hourly)

| Session | Price |
|---|---|
| 1 hour | £35 |
| 2 hours | £70 |
| 3 hours | £105 |
| 4 hours | £140 |

### Tutoring (single sessions)

| Format | Price |
|---|---|
| Online — 1 hour | £50 |
| In-person — 1 hour | £60 |

### Tutoring Bundles

| Bundle | Online | In-person |
|---|---|---|
| 5 sessions | £225 (£45/hr, save £25) | £270 (£54/hr, save £30) |
| 8 sessions *(decoy)* | £390 (£49/hr, save £10) | £470 (£59/hr, save £10) |
| 10 sessions | £400 (£40/hr, save £100) | £480 (£48/hr, save £120) |

### Remote Services (payment links, no calendar booking)

| Service | Price |
|---|---|
| Full Mix + Master | £340 |
| Vocal Mix | £190 |
| Mastering | £40 |
| Multi-track — 3 tracks | £920 |
| Multi-track — 5 tracks | £1,450 |
| Custom Production | From £400 (variable — handled via enquiry) |

### Free Call
- Free Track Review — 15 minutes (no charge)

---

## 2. Calendly Setup (Logan configures in Calendly dashboard)

### Event Types to Create

| Event Type | Duration | Price | Notes |
|---|---|---|---|
| Studio Session — 1 hour | 60 min | £35 | Paid via Stripe at booking |
| Studio Session — 2 hours | 120 min | £70 | Paid via Stripe at booking |
| Studio Session — 3 hours | 180 min | £105 | Paid via Stripe at booking |
| Studio Session — 4 hours | 240 min | £140 | Paid via Stripe at booking |
| Online Tutoring | 60 min | £50 | Paid via Stripe at booking |
| In-Person Tutoring | 60 min | £60 | Paid via Stripe at booking |
| Free Track Review | 15 min | Free | Already exists — confirm URL is correct |

### Meeting Packages to Create (Sell tab in Calendly)

| Package | Price | Links to |
|---|---|---|
| Online Tutoring — 5 sessions | £225 | Online Tutoring event type |
| Online Tutoring — 8 sessions | £390 | Online Tutoring event type |
| Online Tutoring — 10 sessions | £400 | Online Tutoring event type |
| In-Person Tutoring — 5 sessions | £270 | In-Person Tutoring event type |
| In-Person Tutoring — 8 sessions | £470 | In-Person Tutoring event type |
| In-Person Tutoring — 10 sessions | £480 | In-Person Tutoring event type |

### Payment Links to Create (Sell tab in Calendly)

| Link | Price |
|---|---|
| Full Mix + Master | £340 |
| Vocal Mix | £190 |
| Mastering | £40 |
| Multi-track Package — 3 tracks | £920 |
| Multi-track Package — 5 tracks | £1,450 |

### Discount Code to Create

- Code: `WELCOME10`
- Value: 10% off
- Applies to: all paid event types and payment links

---

## 3. Website Pages

### `/studio` (existing page, updated)

**Remove:**
- `BookingFlow.tsx` component and all related custom booking logic
- `BookingCalendar` and `StripePayment` component imports/usage

**Add:**
- Calendly scheduling page embed showing: Studio Session 1hr, 2hr, 3hr, 4hr, and Free Track Review
- Payment link buttons for remote services: Full Mix+Master, Vocal Mix, Mastering, Multi-track 3-track, Multi-track 5-track
- Copy and aesthetic cleanup throughout

**"Book Now" CTA** on this page scrolls down to the embed — no page navigation needed.

---

### `/tutoring` (existing page, updated)

**Update:**
- Calendly embed — currently pointing at wrong URL (`studio-session`), update to show: Online Tutoring, In-Person Tutoring, and Free Track Review
- Add a "Bulk Sessions" section below the embed with payment link buttons for all 6 bundles (online 5/8/10, in-person 5/8/10), each showing the price and saving
- Copy and aesthetic cleanup throughout

**"Book a Lesson" CTA** scrolls down to the embed.

---

### `/free` (existing page, minor updates)

**Update:**
- Confirm Calendly embed URL is pointing at the correct Free Track Review event type
- Add email capture section: "Get 10% off your first booking" — email submitted → discount code delivered via Resend
- Copy and aesthetic cleanup

---

### `/booking` (new page)

**Purpose:** Single URL for all external CTAs (Reddit, Instagram bio, DMs). Not the primary booking path for website visitors — that happens inline on each service page.

**Behaviour:**
- Reads `?service=` URL query parameter on load
- Pre-loads the relevant embed or payment links based on the param
- If no param, shows a service selector

**URL params and what they load:**

| URL | Loads |
|---|---|
| `/booking?service=studio` | Studio session embed + mix/mastering payment links |
| `/booking?service=tutoring` | Tutoring session embed + bundle payment links |
| `/booking?service=free` | Free Track Review embed |
| `/booking?service=mixing` | Mix+master, vocal mix, mastering payment links |
| `/booking` (no param) | Service selector |

**Free Track Review** is always shown as an option regardless of which service loads.

---

## 4. Shared Component

A shared `CalendlyEmbed` component is created to avoid duplicating the Calendly script-loading logic across pages. It accepts a `url` prop and handles loading the external Calendly script cleanly.

---

## 5. Conversion Triggers

### Trigger 1 — Exit Intent Pop-up
- **When:** User's mouse moves toward leaving the page (exit intent detection)
- **Where:** All pages
- **What:** Modal with headline "Before you go — 10% off your first booking", shows `WELCOME10` code, includes CTA to `/booking`
- **Shown once per session** — does not repeat if dismissed

### Trigger 2 — Time-on-Page Prompt
- **When:** User has been on `/studio` or `/tutoring` for 45 seconds without scrolling to the booking section
- **What:** Subtle sticky bar or toast at the bottom: "Not sure yet? Book a free call — no commitment." Links to `/booking?service=free`

### Trigger 3 — Returning Visitor
- **When:** User has visited the site before (tracked via localStorage — we cannot detect whether they completed a Calendly booking, so this fires for all return visitors)
- **What:** Exit intent pop-up shown on arrival rather than on exit — catches them earlier

### Trigger 4 — Abandoned Calendly Booking
- **When:** User starts a Calendly booking flow but does not complete it
- **How:** Calendly fires a `calendly.event_scheduled` or page close event; if no completion event is received, trigger the follow-up
- **What:** Follow-up email sent via Resend 30 minutes later: "You were close — here's 10% off to help you take the step" with `WELCOME10` code
- **Note:** Calendly does not expose partial booking data. This trigger requires capturing the user's email before or during the Calendly flow, or using Calendly's own no-show/cancellation email features as a fallback.

### Trigger 5 — Email Capture on `/free` Page
- **When:** User submits email in the new "Get 10% off" capture form on `/free`
- **What:** Resend sends an automated email with the `WELCOME10` discount code and a link to `/booking`
- **Uses:** Existing Resend setup already on the stack

---

## 6. Out of Scope

- **Chatbot** — previously set up, needs revisiting. Separate spec to follow once booking system is live.
- **Custom Production enquiry flow** — variable pricing means this can't be a standard payment link. Handled via contact form for now.
- **Calendly API integration** — all Calendly event types, packages, and payment links are configured manually inside the Calendly dashboard, not via code.

---

## 7. Files Changed

| File | Change |
|---|---|
| `app/studio/components/BookingFlow.tsx` | Deleted |
| `app/studio/page.tsx` | Remove BookingFlow, add CalendlyEmbed + payment link buttons, copy cleanup |
| `app/tutoring/page.tsx` | Update Calendly URL, add bundle buttons, copy cleanup |
| `app/free/page.tsx` | Confirm embed URL, add email capture section, copy cleanup |
| `app/booking/page.tsx` | New page — service selector with URL param pre-loading |
| `components/CalendlyEmbed.tsx` | New shared component |
| `app/components/ExitIntentPopup.tsx` | New component — exit intent + returning visitor trigger |
| `app/components/BookingPrompt.tsx` | New component — time-on-page sticky prompt |
| `app/api/discount-email/route.ts` | New API route — sends WELCOME10 code via Resend on email capture |
