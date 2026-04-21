# Calendly Booking Integration & Conversion Optimisation — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the custom booking system with a fully Calendly-native setup (with Stripe via Calendly), add a unified `/booking` page, and add conversion triggers to maximise bookings.

**Architecture:** A central config file holds all Calendly URLs (filled in after Logan completes Calendly setup). A shared `CalendlyEmbed` component handles the Calendly widget. Conversion triggers (exit intent popup, time-on-page prompt, email capture) are standalone components wired into the layout and service pages.

**Tech Stack:** Next.js 16 (App Router), TypeScript, Resend 6.9 (email), Supabase (lead logging), Calendly (scheduling + Stripe payments)

---

## ⚠️ PRE-REQUISITE: Logan must complete Calendly setup before code tasks 5–8 can use real URLs

All URLs in `lib/calendly-config.ts` will say `REPLACE_WITH_CALENDLY_URL` until this is done. Code tasks 2–4 can proceed immediately. Tasks 5–8 should be done after Calendly setup.

### Calendly Setup Checklist (Logan does this in Calendly dashboard)

**Step 1 — Connect Stripe**
- Go to Integrations → Payment → Connect Stripe
- Use live mode (not test mode)
- Currency: GBP

**Step 2 — Create event types** (Scheduling → Event Types → New)

| Name | Duration | Price |
|---|---|---|
| Studio Session — 1 Hour | 60 min | £35 |
| Studio Session — 2 Hours | 120 min | £70 |
| Studio Session — 3 Hours | 180 min | £105 |
| Studio Session — 4 Hours | 240 min | £140 |
| Online Tutoring | 60 min | £50 |
| In-Person Tutoring | 60 min | £60 |
| Free Track Review *(already exists)* | 15 min | Free |

For each paid event type: toggle on "Require payment" and set price.

**Step 3 — Create Meeting Packages** (Sell tab → Packages → New)

| Name | Price | Links to event |
|---|---|---|
| Online Tutoring — 5 Sessions | £225 | Online Tutoring |
| Online Tutoring — 8 Sessions | £390 | Online Tutoring |
| Online Tutoring — 10 Sessions | £400 | Online Tutoring |
| In-Person Tutoring — 5 Sessions | £270 | In-Person Tutoring |
| In-Person Tutoring — 8 Sessions | £470 | In-Person Tutoring |
| In-Person Tutoring — 10 Sessions | £480 | In-Person Tutoring |

**Step 4 — Create Payment Links** (Sell tab → Payment Links → New)

| Name | Price |
|---|---|
| Full Mix + Master | £340 |
| Vocal Mix | £190 |
| Mastering | £40 |
| Multi-track Package — 3 Tracks | £920 |
| Multi-track Package — 5 Tracks | £1,450 |

**Step 5 — Create Discount Code** (Sell tab → Discount Codes → New)
- Code: `WELCOME10`
- Value: 10% off
- Apply to: all paid event types

**Step 6 — Collect the URLs**
After creating everything, collect the shareable URL for each event type, package, and payment link. You'll paste these into `lib/calendly-config.ts` in Task 2.

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `lib/calendly-config.ts` | **Create** | Single source of truth for all Calendly URLs |
| `components/CalendlyEmbed.tsx` | **Create** | Shared Calendly widget component |
| `app/api/discount-email/route.ts` | **Create** | Sends WELCOME10 code via Resend + logs to Supabase |
| `app/studio/page.tsx` | **Modify** | Swap custom booking for Calendly embed + payment links |
| `app/studio/components/BookingFlow.tsx` | **Delete** | Replaced by Calendly |
| `components/BookingCalendar.tsx` | **Delete** | No longer used |
| `components/BookingCalendar.jsx` | **Delete** | No longer used |
| `components/StripePayment.tsx` | **Delete** | No longer used (Stripe via Calendly) |
| `app/tutoring/page.tsx` | **Modify** | Fix prices, fix Calendly URL, add bundle links |
| `app/free/page.tsx` | **Modify** | Add discount email capture section |
| `app/booking/page.tsx` | **Create** | Unified booking page with URL param routing |
| `app/components/ExitIntentPopup.tsx` | **Create** | Exit intent + returning visitor popup |
| `app/components/BookingPrompt.tsx` | **Create** | 45-second time-on-page sticky prompt |
| `app/layout.tsx` | **Modify** | Add ExitIntentPopup globally |
| `app/booking-success/page.tsx` | **Modify** | Update copy for Calendly (no Stripe payment_intent) |

---

## Task 1: Create `lib/calendly-config.ts`

**Files:**
- Create: `lib/calendly-config.ts`

This is the single file to update once Calendly setup is complete. All other files import from here.

- [ ] **Step 1: Create the config file**

```typescript
// lib/calendly-config.ts
// After completing Calendly setup, replace all REPLACE_WITH_CALENDLY_URL values
// with the actual shareable URLs from your Calendly dashboard.

export const CALENDLY_EVENT_URLS = {
  // Studio session event types
  studio1hr: 'REPLACE_WITH_CALENDLY_URL', // e.g. https://calendly.com/elcee-mgmt/studio-1hr
  studio2hr: 'REPLACE_WITH_CALENDLY_URL',
  studio3hr: 'REPLACE_WITH_CALENDLY_URL',
  studio4hr: 'REPLACE_WITH_CALENDLY_URL',
  // Tutoring event types
  tutoringOnline: 'REPLACE_WITH_CALENDLY_URL',
  tutoringInPerson: 'REPLACE_WITH_CALENDLY_URL',
  // Free call (already exists)
  free: 'https://calendly.com/elcee-mgmt/free-mix-review-track-feedback',
  // Full scheduling page (shows all event types)
  schedulingPage: 'https://calendly.com/elcee-mgmt',
};

export const CALENDLY_PAYMENT_LINKS = {
  fullMixMaster: 'REPLACE_WITH_CALENDLY_URL',
  vocalMix: 'REPLACE_WITH_CALENDLY_URL',
  mastering: 'REPLACE_WITH_CALENDLY_URL',
  multitrack3: 'REPLACE_WITH_CALENDLY_URL',
  multitrack5: 'REPLACE_WITH_CALENDLY_URL',
};

export const CALENDLY_BUNDLE_LINKS = {
  online5: 'REPLACE_WITH_CALENDLY_URL',
  online8: 'REPLACE_WITH_CALENDLY_URL',
  online10: 'REPLACE_WITH_CALENDLY_URL',
  inPerson5: 'REPLACE_WITH_CALENDLY_URL',
  inPerson8: 'REPLACE_WITH_CALENDLY_URL',
  inPerson10: 'REPLACE_WITH_CALENDLY_URL',
};
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add lib/calendly-config.ts
git commit -m "feat: add Calendly URL config"
```

---

## Task 2: Create `components/CalendlyEmbed.tsx`

**Files:**
- Create: `components/CalendlyEmbed.tsx`

Shared component used by studio, tutoring, free, and booking pages. Handles loading the Calendly script exactly once.

- [ ] **Step 1: Create the component**

```tsx
// components/CalendlyEmbed.tsx
'use client';

import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

export default function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-lg overflow-hidden mx-auto"
      data-url={url}
      style={{ minWidth: '320px', height: `${height}px`, maxWidth: '900px' }}
    />
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add components/CalendlyEmbed.tsx
git commit -m "feat: add shared CalendlyEmbed component"
```

---

## Task 3: Create `app/api/discount-email/route.ts`

**Files:**
- Create: `app/api/discount-email/route.ts`

API route called when someone submits their email on the `/free` page to receive the WELCOME10 discount code. Logs the lead to Supabase and sends the code via Resend.

- [ ] **Step 1: Create the API route**

```typescript
// app/api/discount-email/route.ts
import { NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function POST(request: Request) {
  try {
    const { email, name } = await request.json();

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email required' }, { status: 400 });
    }

    const db = getSupabase();
    if (db) {
      await fetch(`${db.url}/rest/v1/studio_leads`, {
        method: 'POST',
        headers: {
          apikey: db.key,
          Authorization: `Bearer ${db.key}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email,
          name: name || null,
          source: 'free-page-discount',
          service: 'discount-capture',
          status: 'new',
          notes: 'Requested WELCOME10 discount code',
        }),
      });
    }

    if (process.env.RESEND_API_KEY) {
      const { Resend } = require('resend');
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Elcee <noreply@elceethealchemist.com>',
        to: email,
        subject: 'Your 10% discount code',
        text: [
          `Hey${name ? ' ' + name : ''},`,
          '',
          "Here's your 10% off code for your first booking:",
          '',
          '    WELCOME10',
          '',
          'Use it when booking any studio session, mix, master, or tutoring:',
          'https://elceethealchemist.com/booking',
          '',
          "No expiry. Works on everything.",
          '',
          '~ Elcee x',
        ].join('\n'),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discount email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/api/discount-email/route.ts
git commit -m "feat: add discount-email API route"
```

---

## Task 4: Delete obsolete booking files

**Files:**
- Delete: `app/studio/components/BookingFlow.tsx`
- Delete: `components/BookingCalendar.tsx`
- Delete: `components/BookingCalendar.jsx`
- Delete: `components/StripePayment.tsx`

- [ ] **Step 1: Delete the files**

```bash
rm /Users/logancooney/Projects/elcee-website/app/studio/components/BookingFlow.tsx
rm /Users/logancooney/Projects/elcee-website/components/BookingCalendar.tsx
rm /Users/logancooney/Projects/elcee-website/components/BookingCalendar.jsx
rm /Users/logancooney/Projects/elcee-website/components/StripePayment.tsx
```

- [ ] **Step 2: Verify no remaining imports reference these files**

```bash
cd /Users/logancooney/Projects/elcee-website && grep -r "BookingFlow\|BookingCalendar\|StripePayment" app/ components/ --include="*.tsx" --include="*.ts"
```

Expected: no results

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```

Expected: no errors (if errors appear, they'll point to remaining imports that need removing)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: remove obsolete custom booking components"
```

---

## Task 5: Update `app/studio/page.tsx`

**Files:**
- Modify: `app/studio/page.tsx`

Replace the booking section with a CalendlyEmbed for studio sessions. Add a remote services section with payment link buttons for mix/mastering. Update copy throughout. Remove the manual Calendly script-loading useEffect (now handled by CalendlyEmbed).

- [ ] **Step 1: Replace the file with the updated version**

```tsx
// app/studio/page.tsx
import Image from "next/image";
import Link from "next/link";
import StructuredData from "./components/StructuredData";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Navigation from "../components/Navigation";
import CalendlyEmbed from "../../components/CalendlyEmbed";
import {
  CALENDLY_EVENT_URLS,
  CALENDLY_PAYMENT_LINKS,
} from "../../lib/calendly-config";

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <StructuredData />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Professional Recording Studio in Manchester
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Artist-run studio delivering release-ready quality — recording, mixing, and mastering
            for artists who take their craft seriously.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#booking"
              className="bg-white text-black px-12 py-4 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Book Studio Time
            </a>
            <a
              href="#services"
              className="border-2 border-white px-12 py-4 font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              See Services & Pricing
            </a>
          </div>
        </div>
      </section>

      <Testimonials />

      <div id="services">
        <Services />
      </div>

      <Pricing />

      {/* CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Book studio time online 24/7. Check availability and secure your session.
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-black px-12 py-5 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Book Your Session
          </a>
          <p className="text-gray-500 mt-6">Flexible scheduling · Fast turnaround · Professional results</p>
        </div>
      </section>

      {/* Facility */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Facility</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Professional recording environment in Manchester. Built by a working artist with 6+ years industry experience.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Image
              src="/studio/studio-interior-front.jpg"
              alt="Studio interior - front view with mixing desk and monitors"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <Image
              src="/studio/studio-interior-back.jpg"
              alt="Studio interior - back view with recording equipment"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-12 text-left max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-3">Location</h3>
            <p className="text-gray-700 leading-relaxed">
              Cambridge Street, Manchester, M7 1UY<br />
              10 minutes from city centre · Accessible by tram, bus, car
            </p>
          </div>
        </div>
      </section>

      <Process />

      {/* In-Studio Booking */}
      <section id="booking" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book a Studio Session</h2>
          <p className="text-xl text-gray-400">
            Pick your session length and pay to confirm. Not sure? Book a free call first.
          </p>
        </div>
        <CalendlyEmbed url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Questions?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* Remote Services */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Mixing & Mastering</h2>
          <p className="text-xl text-gray-400">
            Remote services. Pay upfront and send your files. Turnaround within 5 working days.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REMOTE_SERVICES.map((service) => (
            <a
              key={service.label}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-6 py-6 hover:border-white transition group"
            >
              <p className="font-semibold text-lg mb-1 group-hover:text-white transition">{service.label}</p>
              <p className="text-2xl font-bold mb-4">{service.price}</p>
              <p className="text-sm text-gray-400 group-hover:text-white transition">Pay & confirm →</p>
            </a>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          Use code <span className="text-white font-semibold">WELCOME10</span> for 10% off your first order.
        </p>
      </section>

      <FAQ />

      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Image
            src="/logos/ankh-white.png"
            alt="Ankh"
            width={50}
            height={50}
            className="mx-auto mb-6"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

**Note:** The embed uses `schedulingPage` which shows all event types (studio, tutoring, free call). This is intentional — Calendly doesn't support filtering by event type in an embed on the Standard plan. Logan should organise event types clearly in the Calendly dashboard (e.g. name them "Studio Session — 1 Hour" etc.) so visitors can easily pick the right one. If this becomes an issue, individual event type URLs can be swapped in from `CALENDLY_EVENT_URLS`.

- [ ] **Step 3: Commit**

```bash
git add app/studio/page.tsx
git commit -m "feat: update studio page with Calendly booking and payment links"
```

---

## Task 6: Update `app/tutoring/page.tsx`

**Files:**
- Modify: `app/tutoring/page.tsx`

Update prices (£40→£50 online, £45→£60 in-person), fix the Calendly embed URL, add a bulk sessions section, clean up copy throughout. Remove the manual useEffect script loading.

- [ ] **Step 1: Read the current full file before editing**

```bash
cat /Users/logancooney/Projects/elcee-website/app/tutoring/page.tsx
```

- [ ] **Step 2: Update the pricing section (lines ~150–172)**

Find this block:
```tsx
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
            <div className="border border-white/20 p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Online</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Via video call</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£40</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
            <div className="border border-white p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">In-Studio</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Manchester</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£45</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm md:text-base mb-2">Packages available. Bulk session discounts on request.</p>
          <p className="text-gray-500 text-sm">First session is free. A 20-minute introductory call. No commitment.</p>
```

Replace with:
```tsx
          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
            <div className="border border-white/20 p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Online</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Via video call</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£50</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
            <div className="border border-white p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">In-Studio</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Manchester</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£60</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm md:text-base mb-2">Bulk session packages available — save up to £120.</p>
          <p className="text-gray-500 text-sm">First session is free. A 20-minute introductory call. No commitment.</p>
```

- [ ] **Step 3: Update the booking section**

Find this block:
```tsx
      {/* Booking */}
      <section id="booking" className="py-16 md:py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Book Your Free Session
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            20 minutes. No pressure. We&apos;ll figure out if we&apos;re a good fit.
          </p>
        </div>

        {/* PLACEHOLDER: Replace the href below with your tutoring Calendly URL once set up */}
        {/* e.g. data-url="https://calendly.com/YOUR-NEW-ACCOUNT/tutoring-call" */}
        <div
          className="calendly-inline-widget rounded-lg overflow-hidden mx-auto"
          data-url="https://calendly.com/elcee-mgmt/studio-session"
          style={{ minWidth: '320px', height: '700px', maxWidth: '900px' }}
        />

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Prefer to message first?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>
```

Replace with:
```tsx
      {/* Booking */}
      <section id="booking" className="py-16 md:py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Book a Session
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            First session is free — 20 minutes, no pressure. Or jump straight in and book a paid lesson.
          </p>
        </div>

        <CalendlyEmbed url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Prefer to message first?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* Bulk Sessions */}
      <section className="py-16 md:py-24 px-4 md:px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Bulk Sessions</h2>
          <p className="text-gray-400 text-lg">
            Commit to more sessions and pay less per hour. Pay upfront, book at your own pace.
          </p>
        </div>
        <div className="max-w-4xl mx-auto">
          <h3 className="text-lg font-semibold mb-4 text-gray-300">Online</h3>
          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { label: '5 Sessions', price: '£225', saving: 'Save £25', url: CALENDLY_BUNDLE_LINKS.online5 },
              { label: '8 Sessions', price: '£390', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.online8 },
              { label: '10 Sessions', price: '£400', saving: 'Save £100', url: CALENDLY_BUNDLE_LINKS.online10, highlight: true },
            ].map((pkg) => (
              <a
                key={pkg.label}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`border px-6 py-6 hover:border-white transition group ${pkg.highlight ? 'border-white' : 'border-white/20'}`}
              >
                <p className="font-semibold text-lg mb-1">{pkg.label}</p>
                <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                <p className="text-sm text-gray-400">{pkg.saving}</p>
              </a>
            ))}
          </div>
          <h3 className="text-lg font-semibold mb-4 text-gray-300">In-Person</h3>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { label: '5 Sessions', price: '£270', saving: 'Save £30', url: CALENDLY_BUNDLE_LINKS.inPerson5 },
              { label: '8 Sessions', price: '£470', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.inPerson8 },
              { label: '10 Sessions', price: '£480', saving: 'Save £120', url: CALENDLY_BUNDLE_LINKS.inPerson10, highlight: true },
            ].map((pkg) => (
              <a
                key={pkg.label}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`border px-6 py-6 hover:border-white transition group ${pkg.highlight ? 'border-white' : 'border-white/20'}`}
              >
                <p className="font-semibold text-lg mb-1">{pkg.label}</p>
                <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                <p className="text-sm text-gray-400">{pkg.saving}</p>
              </a>
            ))}
          </div>
          <p className="text-center text-gray-500 text-sm mt-8">
            Use code <span className="text-white font-semibold">WELCOME10</span> for 10% off your first booking.
          </p>
        </div>
      </section>
```

- [ ] **Step 4: Add imports at the top of the file**

Find the existing imports block and add:
```tsx
import CalendlyEmbed from '../../components/CalendlyEmbed';
import { CALENDLY_EVENT_URLS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';
```

- [ ] **Step 5: Remove the useEffect and its import**

Remove the `useEffect` import from `'react'` and remove this entire block:
```tsx
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);
```

If `useEffect` was the only hook imported from react, remove `"use client"` and the react import. If other hooks remain, keep the import but remove `useEffect` from it.

- [ ] **Step 6: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add app/tutoring/page.tsx
git commit -m "feat: update tutoring page with new prices, Calendly embed, and bundle links"
```

---

## Task 7: Update `app/free/page.tsx`

**Files:**
- Modify: `app/free/page.tsx`

Replace the manual Calendly script loading with `CalendlyEmbed`. Add a discount email capture section. Clean up copy.

- [ ] **Step 1: Add imports at the top of the file**

Find:
```tsx
import { useEffect, useState } from "react";
```

Replace with:
```tsx
import { useState } from "react";
import CalendlyEmbed from "../../components/CalendlyEmbed";
```

- [ ] **Step 2: Remove the useEffect script-loading block**

Remove this entire block:
```tsx
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);

    if (document.referrer.includes("reddit.com")) {
      track("visit_from_reddit");
    }

    return () => {
      document.body.removeChild(script);
    };
  }, []);
```

Add back just the Reddit tracking (without the script loading) by adding a new `useEffect` for tracking only:
```tsx
  useEffect(() => {
    if (document.referrer.includes("reddit.com")) {
      track("visit_from_reddit");
    }
  }, []);
```

This requires keeping `useEffect` in the import:
```tsx
import { useEffect, useState } from "react";
import CalendlyEmbed from "../../components/CalendlyEmbed";
```

- [ ] **Step 3: Replace the Calendly div with the CalendlyEmbed component**

Find:
```tsx
          <div
            className="calendly-inline-widget rounded-lg overflow-hidden"
            data-url="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback"
            style={{ minWidth: "320px", height: "700px" }}
          />
```

Replace with:
```tsx
          <CalendlyEmbed url="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback" height={700} />
```

- [ ] **Step 4: Add the discount email capture section**

Add this section between the "Free Track Review" section and the "Free Downloads" section:

```tsx
      {/* Discount Code Capture */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% off your first booking</h2>
          <p className="text-lg text-gray-400 mb-8">
            Drop your email and I&apos;ll send the discount code straight over. Works on any session, mix, master, or tutoring.
          </p>
          <DiscountCaptureForm />
        </div>
      </section>
```

- [ ] **Step 5: Add the DiscountCaptureForm component at the top of the file (above FreePage)**

Add this before the `export default function FreePage()` line:

```tsx
function DiscountCaptureForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/discount-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="text-green-400 font-medium">
        ✓ On its way — check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
      />
      {state === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
      )}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-white text-black font-semibold py-2 rounded text-sm hover:bg-gray-200 transition disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending...' : 'Send me the code'}
      </button>
    </form>
  );
}
```

- [ ] **Step 6: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 7: Commit**

```bash
git add app/free/page.tsx
git commit -m "feat: update free page with CalendlyEmbed and discount code capture"
```

---

## Task 8: Create `app/booking/page.tsx`

**Files:**
- Create: `app/booking/page.tsx`

Unified booking page. Reads `?service=` URL param and pre-loads the relevant embed or payment links. If no param, shows a service selector. Always shows the free call option.

- [ ] **Step 1: Create the booking page**

```tsx
// app/booking/page.tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee the Alchemist',
  description: 'Book a studio session, tutoring lesson, mixing, or mastering service. Or start with a free call.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
        </div>
      }>
        <BookingContent />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 2: Create `app/booking/BookingContent.tsx`**

```tsx
// app/booking/BookingContent.tsx
'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CalendlyEmbed from '../../components/CalendlyEmbed';
import {
  CALENDLY_EVENT_URLS,
  CALENDLY_PAYMENT_LINKS,
  CALENDLY_BUNDLE_LINKS,
} from '../../lib/calendly-config';

type Service = 'studio' | 'tutoring' | 'free' | 'mixing' | null;

const SERVICE_LABELS: Record<NonNullable<Service>, string> = {
  studio: 'Studio Sessions',
  tutoring: 'Tutoring',
  free: 'Free Call',
  mixing: 'Mixing & Mastering',
};

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

const ONLINE_BUNDLES = [
  { label: '5 Sessions', price: '£225', saving: 'Save £25', url: CALENDLY_BUNDLE_LINKS.online5 },
  { label: '8 Sessions', price: '£390', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.online8 },
  { label: '10 Sessions', price: '£400', saving: 'Save £100', url: CALENDLY_BUNDLE_LINKS.online10 },
];

const INPERSON_BUNDLES = [
  { label: '5 Sessions', price: '£270', saving: 'Save £30', url: CALENDLY_BUNDLE_LINKS.inPerson5 },
  { label: '8 Sessions', price: '£470', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.inPerson8 },
  { label: '10 Sessions', price: '£480', saving: 'Save £120', url: CALENDLY_BUNDLE_LINKS.inPerson10 },
];

export default function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') as Service;
  const service: Service = ['studio', 'tutoring', 'free', 'mixing'].includes(serviceParam ?? '')
    ? serviceParam
    : null;

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {service ? SERVICE_LABELS[service] : 'Book a Session'}
          </h1>
          <p className="text-xl text-gray-400">
            {service
              ? 'Use code WELCOME10 for 10% off your first booking.'
              : 'Choose a service below to get started.'}
          </p>
        </div>

        {/* Service selector — shown when no param */}
        {!service && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
            {[
              { label: 'Studio Sessions', href: '/booking?service=studio', desc: 'Recording — £35/hr' },
              { label: 'Tutoring', href: '/booking?service=tutoring', desc: 'Online £50/hr · In-person £60/hr' },
              { label: 'Mixing & Mastering', href: '/booking?service=mixing', desc: 'Remote services from £40' },
              { label: 'Free Call', href: '/booking?service=free', desc: '15 minutes, no commitment' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border border-white/20 px-6 py-8 hover:border-white transition text-center"
              >
                <p className="font-bold text-xl mb-2">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        )}

        {/* Studio: Calendly embed */}
        {service === 'studio' && (
          <CalendlyEmbed url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
        )}

        {/* Tutoring: Calendly embed + bundle links */}
        {service === 'tutoring' && (
          <>
            <CalendlyEmbed url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Bulk Session Packages</h2>
              <div className="mb-8">
                <h3 className="text-base font-semibold text-gray-300 mb-4">Online</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ONLINE_BUNDLES.map((pkg) => (
                    <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer"
                      className="border border-white/20 px-6 py-6 hover:border-white transition">
                      <p className="font-semibold mb-1">{pkg.label}</p>
                      <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                      <p className="text-sm text-gray-400">{pkg.saving}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-300 mb-4">In-Person</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {INPERSON_BUNDLES.map((pkg) => (
                    <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer"
                      className="border border-white/20 px-6 py-6 hover:border-white transition">
                      <p className="font-semibold mb-1">{pkg.label}</p>
                      <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                      <p className="text-sm text-gray-400">{pkg.saving}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Free call: Calendly embed */}
        {service === 'free' && (
          <CalendlyEmbed url={CALENDLY_EVENT_URLS.free} height={700} />
        )}

        {/* Mixing & Mastering: payment links */}
        {service === 'mixing' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {REMOTE_SERVICES.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="border border-white/20 px-6 py-6 hover:border-white transition">
                <p className="font-semibold text-lg mb-1">{s.label}</p>
                <p className="text-2xl font-bold mb-4">{s.price}</p>
                <p className="text-sm text-gray-400">Pay & confirm →</p>
              </a>
            ))}
          </div>
        )}

        {/* Always show free call CTA (except on the free page itself) */}
        {service && service !== 'free' && (
          <div className="text-center mt-16 pt-12 border-t border-white/10">
            <p className="text-gray-400 mb-4">Not sure yet?</p>
            <Link
              href="/booking?service=free"
              className="inline-block border border-white/30 px-8 py-3 hover:border-white hover:bg-white hover:text-black transition font-semibold"
            >
              Book a free 15-minute call first
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 4: Commit**

```bash
git add app/booking/page.tsx app/booking/BookingContent.tsx
git commit -m "feat: add unified /booking page with URL param routing"
```

---

## Task 9: Create `app/components/ExitIntentPopup.tsx`

**Files:**
- Create: `app/components/ExitIntentPopup.tsx`

Shows a 10% discount popup on exit intent (mouse leaving viewport). Shows on arrival for returning visitors. Only fires once per session.

- [ ] **Step 1: Create the component**

```tsx
// app/components/ExitIntentPopup.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SESSION_KEY = 'elcee_popup_dismissed';
const VISITOR_KEY = 'elcee_visited';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const isReturning = localStorage.getItem(VISITOR_KEY) === 'true';
    localStorage.setItem(VISITOR_KEY, 'true');

    if (isReturning) {
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }

    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div
        className="relative bg-black border border-white/20 p-8 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-3">Before you go</h2>
        <p className="text-gray-400 mb-6">
          10% off your first booking — studio, mixing, mastering, or tutoring.
        </p>
        <div className="bg-white/5 border border-white/20 px-6 py-4 mb-6">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Your discount code</p>
          <p className="text-2xl font-bold tracking-widest">WELCOME10</p>
        </div>
        <Link
          href="/booking"
          onClick={dismiss}
          className="block w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition"
        >
          Book now
        </Link>
        <button
          onClick={dismiss}
          className="mt-4 text-sm text-gray-500 hover:text-white transition"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/ExitIntentPopup.tsx
git commit -m "feat: add exit intent popup with WELCOME10 discount"
```

---

## Task 10: Create `app/components/BookingPrompt.tsx`

**Files:**
- Create: `app/components/BookingPrompt.tsx`

Sticky bar shown after 45 seconds on a page if the user hasn't scrolled to `#booking`. Prompts them to book a free call.

- [ ] **Step 1: Create the component**

```tsx
// app/components/BookingPrompt.tsx
'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SESSION_KEY = 'elcee_prompt_dismissed';

export default function BookingPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      if (!bookingSection) return;
      const { top } = bookingSection.getBoundingClientRect();
      if (top > window.innerHeight) setVisible(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
      <div className="bg-black border border-white/30 px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
        <p className="text-sm text-gray-300">
          Not sure yet?{' '}
          <Link
            href="/booking?service=free"
            className="text-white font-semibold underline hover:no-underline"
          >
            Book a free call
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="text-gray-500 hover:text-white text-xl leading-none flex-shrink-0"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Commit**

```bash
git add app/components/BookingPrompt.tsx
git commit -m "feat: add time-on-page booking prompt"
```

---

## Task 11: Wire conversion triggers into pages

**Files:**
- Modify: `app/layout.tsx` — add `ExitIntentPopup` globally
- Modify: `app/studio/page.tsx` — add `BookingPrompt`
- Modify: `app/tutoring/page.tsx` — add `BookingPrompt`

- [ ] **Step 1: Add ExitIntentPopup to layout**

In `app/layout.tsx`, add the import:
```tsx
import ExitIntentPopup from './components/ExitIntentPopup';
```

Then add `<ExitIntentPopup />` inside `<body>`, after `{children}`:
```tsx
      <body className="antialiased">
        {children}
        <ExitIntentPopup />
        <ChatWidget />
        <Analytics />
      </body>
```

- [ ] **Step 2: Add BookingPrompt to studio page**

In `app/studio/page.tsx`, add the import:
```tsx
import BookingPrompt from '../components/BookingPrompt';
```

Add `<BookingPrompt />` just before the closing `</div>` of the page (before the footer):
```tsx
      <FAQ />
      <BookingPrompt />
      <footer ...>
```

- [ ] **Step 3: Add BookingPrompt to tutoring page**

In `app/tutoring/page.tsx`, add the import:
```tsx
import BookingPrompt from '../components/BookingPrompt';
```

Add `<BookingPrompt />` just before the `<FAQ />` component:
```tsx
      <BookingPrompt />
      <FAQ />
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 5: Commit**

```bash
git add app/layout.tsx app/studio/page.tsx app/tutoring/page.tsx
git commit -m "feat: wire ExitIntentPopup and BookingPrompt into pages"
```

---

## Task 12: Update `app/booking-success/page.tsx`

**Files:**
- Modify: `app/booking-success/page.tsx`

Remove the Stripe `payment_intent` reference. Update copy to be appropriate for a Calendly booking confirmation.

- [ ] **Step 1: Update the success page**

Replace the file with:
```tsx
// app/booking-success/page.tsx
'use client';

import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">You&apos;re booked.</h1>

        <p className="text-xl text-gray-400 mb-8">
          Confirmation details are on their way to your inbox. I&apos;ll be in touch before the session.
        </p>

        <div className="mb-12 text-left max-w-md mx-auto">
          <p className="text-gray-300 font-semibold mb-3">What&apos;s next:</p>
          <ul className="space-y-2 text-gray-400">
            <li>· Check your email for the confirmation</li>
            <li>· You&apos;ll get a reminder 24 hours before</li>
            <li>· Any questions — reply to the confirmation email</li>
          </ul>
        </div>

        <div className="space-x-4">
          <Link
            href="/studio"
            className="inline-block bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition"
          >
            Back to Studio
          </Link>
          <Link
            href="/"
            className="inline-block bg-white/10 text-white px-8 py-3 font-bold hover:bg-white/20 transition"
          >
            Home
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Questions?{' '}
          <a href="mailto:elcee.mgmt@gmail.com" className="text-white hover:underline">
            elcee.mgmt@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

Expected: no errors

- [ ] **Step 3: Run a full build to catch any remaining issues**

```bash
cd /Users/logancooney/Projects/elcee-website && npm run build
```

Expected: successful build with no errors

- [ ] **Step 4: Commit**

```bash
git add app/booking-success/page.tsx
git commit -m "feat: update booking success page for Calendly"
```

---

## Task 13: Fill in real Calendly URLs (after Logan completes Calendly setup)

**Files:**
- Modify: `lib/calendly-config.ts`

Once Logan has completed the Calendly setup checklist at the top of this plan, replace all `REPLACE_WITH_CALENDLY_URL` values in `lib/calendly-config.ts` with the real URLs from the Calendly dashboard.

- [ ] **Step 1: Open Calendly dashboard and copy each URL**

For event types: Scheduling → Event Types → click the share button next to each event type.

For packages: Sell → Packages → click the share/copy link button.

For payment links: Sell → Payment Links → click the share/copy link button.

- [ ] **Step 2: Update `lib/calendly-config.ts` with real URLs**

Replace each `'REPLACE_WITH_CALENDLY_URL'` string with the real URL.

- [ ] **Step 3: Verify TypeScript compiles**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit
```

- [ ] **Step 4: Run a full build**

```bash
npm run build
```

Expected: successful build

- [ ] **Step 5: Commit and push to deploy**

```bash
git add lib/calendly-config.ts
git commit -m "feat: add real Calendly URLs — booking system live"
git push origin main
```

Expected: Vercel deploys automatically within ~2 minutes.
