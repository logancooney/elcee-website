# Tutoring Page Design Spec
_Date: 2026-04-11_

## Overview

A new page at `/tutoring` on elceethealchemist.com. Primary purpose: convert people who scan the QR code on Elcee's business cards and flyers into booked discovery calls. Targets all skill levels. Services offered: music production (Ableton Live), mixing (any DAW), recording & engineering, songwriting & lyricism. Sessions available online or in-studio in Manchester.

---

## URL

`elceethealchemist.com/tutoring`

---

## Style

Matches the existing site exactly — black background, white text, Tailwind CSS, same Navigation and footer components as the studio page.

---

## Sections

### 1. Hero
- Headline: "Learn Music Production in Manchester"
- Subtext: one or two lines — all levels welcome, online or in-studio, one-to-one with a working artist and engineer
- Two CTAs:
  - Primary (white pill button): "Book a Free Call" — anchors to `#booking`
  - Secondary (outlined pill button): "See What's Included" — scrolls to services section

### 2. What You'll Learn
- 4-item grid (2x2 on mobile, 4-across on desktop)
- Items:
  - **Music Production** — Ableton Live, beat-making, arrangement, sound design
  - **Mixing** — Any DAW, balance, EQ, compression, getting a professional sound
  - **Recording & Engineering** — Studio technique, signal chain, getting the best takes
  - **Songwriting & Lyricism** — Structure, flow, pen game, finding your voice
- Each item: icon or simple bold title + 2-line description

### 3. How It Works
- Short section, 3 steps:
  1. Book a free 15-min call
  2. We build a session plan around your goals
  3. Learn one-to-one at your own pace
- Simple numbered layout, no images needed

### 4. Testimonials
- Same visual style as studio page testimonials
- **PLACEHOLDER:** Logan to supply student quotes before launch

### 5. Pricing
- Clean two-column card layout:
  - **Online** — £40 / hour
  - **In-Studio** — £45 / hour (Cambridge Street, Manchester)
- Below both cards: "Packages available — bulk session discounts on request"
- Small note: "First call is free. No commitment."

### 6. Book a Free Call (Booking section)
- `id="booking"` anchor
- Calendly inline embed
- **PLACEHOLDER:** Requires a new free Calendly account set up specifically for tutoring. URL to be inserted before launch.
- Fallback text while Calendly is being set up: contact link

### 7. FAQ
Suggested questions (can be adjusted):
- Do I need any experience?
- What equipment do I need?
- Which DAW do you teach?
- Can I learn online?
- How long are sessions?
- How do I pay?

### 8. Footer
- Same footer component as rest of site

---

## Metadata (SEO)

- Title: `Music Production Tutor Manchester | Elcee the Alchemist`
- Description: `One-to-one music production, mixing, and recording lessons in Manchester or online. All levels welcome. Book a free call.`

---

## Pre-Launch Checklist

- [ ] Set up new free Calendly account for tutoring bookings
- [ ] Insert Calendly URL into page
- [ ] Supply student testimonials
- [ ] Generate QR code pointing to `elceethealchemist.com/tutoring`
- [ ] Add `/tutoring` to sitemap.ts
- [ ] Update navigation if desired (optional)

---

## Out of Scope

- No payment processing on this page
- No group session booking
- No video embeds for now
