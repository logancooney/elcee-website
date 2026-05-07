# Website Finalisation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Fix all critical bugs, remove dead content, extract hardcoded data into config files, and write a plain-English site guide so the site is fully self-contained.

**Architecture:** Bug fixes are isolated API/component changes. Config files live in a new `content/` directory at the project root and are imported by the components that previously hardcoded the data. No new pages, no redesign.

**Tech Stack:** Next.js 16 App Router, TypeScript, Resend (already installed and domain-verified), `next/og` (built into Next.js — no install needed)

---

## File Map

**Create:**
- `app/api/contact/route.ts` — contact form email sender
- `app/api/og/route.tsx` — branded OG image generator
- `content/site.ts` — site-wide strings
- `content/prices.ts` — all service prices
- `content/releases.ts` — homepage music releases
- `content/marquee.ts` — scrolling banner items
- `content/testimonials.ts` — studio and tutoring testimonials
- `content/faqs.ts` — studio and tutoring FAQs
- `content/social.ts` — social platform links
- `SITE_GUIDE.md` — plain-English content management guide

**Delete:**
- `app/blog/page.tsx`
- `app/blog/[slug]/page.tsx`

**Modify:**
- `app/components/MobileJumpNav.tsx` — fix broken #about link
- `app/contact/page.tsx` — wire form to real API
- `app/layout.tsx` — point og image to /api/og
- `app/sitemap.ts` — add /free and /recording-studio-manchester
- `lib/email-service.ts` — fix from address
- `app/page.tsx` — import releases and marquee from content/
- `app/studio/page.tsx` — import prices from content/
- `app/studio/components/Pricing.tsx` — import prices from content/
- `app/studio/components/Testimonials.tsx` — import from content/
- `app/studio/components/FAQ.tsx` — import from content/
- `app/tutoring/page.tsx` — import prices from content/
- `app/tutoring/components/Testimonials.tsx` — import from content/
- `app/tutoring/components/FAQ.tsx` — import from content/
- `app/booking/BookingContent.tsx` — import prices from content/
- `app/recording-studio-manchester/page.tsx` — import prices from content/
- `app/components/SiteFooter.tsx` — import social from content/
- `app/contact/page.tsx` — import social from content/
- `app/links/page.tsx` — import social from content/

---

## Task 1: Quick cleanup — MobileJumpNav + blog deletion

**Files:**
- Modify: `app/components/MobileJumpNav.tsx`
- Delete: `app/blog/page.tsx`
- Delete: `app/blog/[slug]/page.tsx`

- [ ] **Step 1: Fix MobileJumpNav**

Replace the entire `JUMP_ITEMS` array in `app/components/MobileJumpNav.tsx`:

```ts
const JUMP_ITEMS: JumpItem[] = [
  { label: 'Music', href: '#releases' },
  { label: 'Studio', href: '#studio' },
  { label: 'Shop', href: '/shop' },
  { label: 'Book', href: '/booking' },
];
```

- [ ] **Step 2: Delete blog files**

```bash
rm app/blog/page.tsx
rm app/blog/[slug]/page.tsx
rmdir app/blog/[slug]
rmdir app/blog
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/components/MobileJumpNav.tsx
git rm app/blog/page.tsx app/blog/[slug]/page.tsx
git commit -m "fix: remove stale About jump nav link, delete placeholder blog"
```

---

## Task 2: Contact form API route

**Files:**
- Create: `app/api/contact/route.ts`

- [ ] **Step 1: Create the route**

Create `app/api/contact/route.ts` with this exact content:

```ts
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Elcee Website <contact@elceethealchemist.com>',
      to: 'elcee.automation@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        message,
        '',
        `---`,
        `Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
        `Reply directly to this email to respond to ${name}.`,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
```

- [ ] **Step 2: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/contact/route.ts
git commit -m "feat: contact form API route via Resend"
```

---

## Task 3: Wire contact form to the API

**Files:**
- Modify: `app/contact/page.tsx`

- [ ] **Step 1: Update state and handleSubmit**

In `app/contact/page.tsx`, replace the existing `sent` state and `handleSubmit` function with:

```ts
const [sent, setSent] = useState(false);
const [error, setError] = useState(false);
const [loading, setLoading] = useState(false);

async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
  e.preventDefault();
  setLoading(true);
  setError(false);
  const form = e.currentTarget;
  const data = {
    name: (form.elements.namedItem('name') as HTMLInputElement).value,
    email: (form.elements.namedItem('email') as HTMLInputElement).value,
    subject: (form.elements.namedItem('subject') as HTMLInputElement).value,
    message: (form.elements.namedItem('message') as HTMLTextAreaElement).value,
  };
  try {
    const res = await fetch('/api/contact', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error();
    setSent(true);
  } catch {
    setError(true);
  } finally {
    setLoading(false);
  }
}
```

- [ ] **Step 2: Add loading/error states to the submit button**

Find the submit button in `app/contact/page.tsx` and replace it with:

```tsx
{error && (
  <p style={{ fontSize: 12, color: 'rgba(255,100,100,0.8)', marginTop: 4 }}>
    Something went wrong. Try again or email elcee.mgmt@gmail.com directly.
  </p>
)}
<button
  type="submit"
  disabled={loading}
  style={{
    marginTop: 8, padding: '14px 28px',
    background: '#fafafa', color: '#080808', border: 'none',
    fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', cursor: loading ? 'not-allowed' : 'pointer',
    alignSelf: 'flex-start', opacity: loading ? 0.6 : 1,
  }}
>
  {loading ? 'Sending...' : 'Send Message →'}
</button>
```

- [ ] **Step 3: Add `loading` to the useState import**

The file already imports `useState` — no change needed there. Confirm `useRef` and `useState` are both imported.

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/contact/page.tsx
git commit -m "fix: wire contact form to Resend API — messages now actually send"
```

---

## Task 4: OG image route + update metadata

**Files:**
- Create: `app/api/og/route.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create OG image route**

Create `app/api/og/route.tsx`:

```tsx
import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080808',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#fafafa',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            lineHeight: 0.88,
            textAlign: 'center',
          }}
        >
          ELCEE THE
          <br />
          ALCHEMIST
        </div>
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            marginTop: 32,
          }}
        >
          Alternative Rap · Manchester
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
```

- [ ] **Step 2: Update metadata in layout.tsx**

In `app/layout.tsx`, find the `images` array inside `openGraph` and replace `/og-image.jpg` with `/api/og`. Also update the Twitter image. The result should be:

```ts
openGraph: {
  // ... existing fields ...
  images: [
    {
      url: '/api/og',
      width: 1200,
      height: 630,
      alt: 'Elcee the Alchemist - Manchester Rap Artist',
    },
  ],
},
twitter: {
  // ... existing fields ...
  images: ['/api/og'],
},
```

- [ ] **Step 3: Verify OG image renders**

```bash
# Dev server should already be running. Open in browser:
open http://localhost:3000/api/og
```

Expected: black image with "ELCEE THE ALCHEMIST" in large white text.

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add app/api/og/route.tsx app/layout.tsx
git commit -m "feat: branded OG image via next/og, fix missing social preview"
```

---

## Task 5: content/site.ts

**Files:**
- Create: `content/site.ts`

This file holds short site-wide strings. Components import from here instead of hardcoding.

- [ ] **Step 1: Create the file**

Create `content/site.ts`:

```ts
export const SITE = {
  tagline: 'Alternative Rap · Manchester',
  location: 'Manchester, England',
  footerQuote: 'as within, so without',
  contactResponseTime: '24 hours',
  bioSummary:
    'Elcee the Alchemist is redefining UK Alternative Rap. UK winner of the JBL Martin Garrix Music Academy, adidas Rising Star for Forum Studio, and Boiler Room performer whose debut set hit 100K views in its first week.',
} as const;
```

- [ ] **Step 2: Update SiteFooter to use SITE.footerQuote**

In `app/components/SiteFooter.tsx`, add the import and replace the hardcoded string:

```tsx
import { SITE } from '../../content/site';

// Replace the hardcoded 'as within, so without' with:
{SITE.footerQuote}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add content/site.ts app/components/SiteFooter.tsx
git commit -m "feat: content/site.ts — site-wide strings config"
```

---

## Task 6: content/prices.ts + update all consumers

**Files:**
- Create: `content/prices.ts`
- Modify: `app/studio/page.tsx`
- Modify: `app/studio/components/Pricing.tsx`
- Modify: `app/tutoring/page.tsx`
- Modify: `app/booking/BookingContent.tsx`
- Modify: `app/recording-studio-manchester/page.tsx`

- [ ] **Step 1: Create content/prices.ts**

Create `content/prices.ts`:

```ts
export const PRICES = {
  studio: {
    hourly: '£35/hr',
    loyaltyHourly: '£30/hr',
    loyaltyMonthly: '£240/month',
    loyaltyLabel: '£30/hr · £240/month',
  },
  tutoring: {
    online: '£45/hr',
    inPerson: '£60/hr',
  },
  mixing: {
    fullMixMaster: '£340',
    vocalMix: '£190',
    mastering: '£40',
  },
  packages: {
    threeTrack: { price: '£920', saving: 'Save £100' },
    fiveTrack: { price: '£1,450', saving: 'Save £250' },
  },
  addons: {
    vocalTuning: '£40',
    stemSeparation: '£75',
    rushDelivery: '+40%',
  },
  production: {
    bespoke: '£400+',
    additional: '£150+',
  },
} as const;
```

- [ ] **Step 2: Update app/studio/page.tsx**

Add import at the top:
```ts
import { PRICES } from '../../content/prices';
```

Find the hero subtitle line that reads `£35/hr · First session free` and replace:
```tsx
{PRICES.studio.hourly} · First session free
```

Find the `MIX_MASTER_SERVICES` array entries and replace the hardcoded price strings:
```ts
const MIX_MASTER_SERVICES = [
  { label: 'Full Mix + Master', price: PRICES.mixing.fullMixMaster, url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: PRICES.mixing.vocalMix, url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: PRICES.mixing.mastering, url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: PRICES.packages.threeTrack.price, url: CALENDLY_PAYMENT_LINKS.multitrack3, note: PRICES.packages.threeTrack.saving },
  { label: 'Multi-track — 5 Tracks', price: PRICES.packages.fiveTrack.price, url: CALENDLY_PAYMENT_LINKS.multitrack5, note: PRICES.packages.fiveTrack.saving },
];
```

Find the Serious Artist Plan price display and replace:
```tsx
<p style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em', marginBottom: 28 }}>
  {PRICES.studio.loyaltyLabel}
</p>
```

- [ ] **Step 3: Update app/studio/components/Pricing.tsx**

Add import:
```ts
import { PRICES } from '../../../content/prices';
```

Replace the `STUDIO_RATES` array:
```ts
const STUDIO_RATES = [
  { label: 'Standard', price: PRICES.studio.hourly },
  { label: 'Loyalty Plan', price: PRICES.studio.loyaltyHourly, note: `${PRICES.studio.loyaltyMonthly} subscription` },
];
```

Replace `MIXING_RATES`:
```ts
const MIXING_RATES = [
  { label: 'Full Mix + Master', price: PRICES.mixing.fullMixMaster },
  { label: 'Vocal Mix', price: PRICES.mixing.vocalMix },
  { label: 'Mastering', price: PRICES.mixing.mastering },
];
```

Replace `PACKAGES`:
```ts
const PACKAGES = [
  { label: '3-Track Package', price: PRICES.packages.threeTrack.price, saving: PRICES.packages.threeTrack.saving },
  { label: '5-Track Package', price: PRICES.packages.fiveTrack.price, saving: PRICES.packages.fiveTrack.saving },
];
```

Replace `ADDONS`:
```ts
const ADDONS = [
  { label: 'Vocal Tuning', price: PRICES.addons.vocalTuning },
  { label: 'Stem Separation', price: PRICES.addons.stemSeparation },
  { label: 'Rush Delivery', price: PRICES.addons.rushDelivery },
];
```

- [ ] **Step 4: Update app/tutoring/page.tsx**

Add import:
```ts
import { PRICES } from '../../content/prices';
```

Find the hero subtitle `Online £45/hr · In-Person £60/hr · First session always free` and replace:
```tsx
Online {PRICES.tutoring.online} · In-Person {PRICES.tutoring.inPerson} · First session always free
```

Find `price: '£45/hr'` in the `ServiceBookingBlock` options and replace with `price: PRICES.tutoring.online`.

Find `price: '£60/hr'` and replace with `price: PRICES.tutoring.inPerson`.

- [ ] **Step 5: Update app/booking/BookingContent.tsx**

Add import:
```ts
import { PRICES } from '../../content/prices';
```

Find `price: '£45/hr'` in the tutoring online option and replace with `price: PRICES.tutoring.online`.

Find `price: '£60/hr'` in the tutoring in-person option and replace with `price: PRICES.tutoring.inPerson`.

Find `price: '£35/hr'` in the studio option and replace with `price: PRICES.studio.hourly`.

- [ ] **Step 6: Update app/recording-studio-manchester/page.tsx**

Add import:
```ts
import { PRICES } from '../content/prices';
```

Replace the `SERVICE_ITEMS` array's price values:
```ts
const SERVICE_ITEMS = [
  {
    title: 'Recording Sessions',
    prices: [
      { label: 'Ad-hoc hourly rate', value: PRICES.studio.hourly },
      { label: `Loyalty subscription (${PRICES.studio.loyaltyMonthly})`, value: PRICES.studio.loyaltyHourly },
    ],
    features: ['Vocal recording & comping', 'Live instrument tracking', 'Professional microphones & preamps', 'Real-time monitoring & feedback', 'Stems provided after session'],
  },
  {
    title: 'Mixing & Mastering',
    prices: [
      { label: 'Full Mix & Master', value: PRICES.mixing.fullMixMaster },
      { label: 'Vocal Mix (no master)', value: PRICES.mixing.vocalMix },
      { label: 'Mastering only', value: PRICES.mixing.mastering },
    ],
    features: ['Industry-standard plugins & processing', 'Up to 3 revisions included', 'Mastered for streaming platforms', 'Fast turnaround (3–7 days)'],
  },
  {
    title: 'Music Production',
    prices: [
      { label: 'Bespoke production', value: PRICES.production.bespoke },
      { label: 'Additional production', value: PRICES.production.additional },
    ],
    features: ['Custom beats from scratch', 'Arrangement & composition', 'Sound design & sampling', 'Co-production sessions available', 'Stems & project files included'],
  },
  {
    title: 'Ableton Tutoring',
    prices: [
      { label: '1-on-1 sessions', value: PRICES.tutoring.online },
    ],
    features: ['Beginner to advanced levels', 'Music production fundamentals', 'Mixing & mastering techniques', 'Workflow optimisation', 'Personalised curriculum'],
  },
];
```

- [ ] **Step 7: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add content/prices.ts app/studio/page.tsx app/studio/components/Pricing.tsx app/tutoring/page.tsx app/booking/BookingContent.tsx app/recording-studio-manchester/page.tsx
git commit -m "feat: content/prices.ts — single source of truth for all service prices"
```

---

## Task 7: content/releases.ts + update homepage

**Files:**
- Create: `content/releases.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create content/releases.ts**

Create `content/releases.ts`:

```ts
export interface Release {
  type: string;
  name: string;
  href: string;
  hrefLabel: string;
  embedSrc: string;
  embedTitle: string;
  embedType: 'spotify' | 'youtube';
  infoBg: string;
  infoBgPosition?: string;
  reversed: boolean;
  minHeight?: number;
}

export const RELEASES: Release[] = [
  {
    type: 'Album · 2024',
    name: 'The Evolution of Self Destruction',
    href: 'https://open.spotify.com/album/7HF3AA4vFQJARAt1ivCn0w',
    hrefLabel: 'Open on Spotify →',
    embedSrc: 'https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator&theme=0',
    embedTitle: 'The Evolution of Self Destruction',
    embedType: 'spotify',
    infoBg: '/teosd-cover.png',
    reversed: false,
    minHeight: 408,
  },
  {
    type: 'Single · 2024',
    name: 'Filthy',
    href: 'https://www.youtube.com/watch?v=K9Bk3Mw7mIc',
    hrefLabel: 'Watch on YouTube →',
    embedSrc: 'https://www.youtube.com/embed/K9Bk3Mw7mIc',
    embedTitle: 'Filthy',
    embedType: 'youtube',
    infoBg: '/filthy-cover.jpg',
    reversed: true,
  },
  {
    type: 'Single · 2023',
    name: '2bad',
    href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7',
    hrefLabel: 'Stream on Spotify →',
    embedSrc: 'https://www.youtube.com/embed/KmekR33sMng',
    embedTitle: '2bad',
    embedType: 'youtube',
    infoBg: '/2bad-cover.png',
    infoBgPosition: 'center 60%',
    reversed: false,
  },
];
```

- [ ] **Step 2: Update app/page.tsx to use RELEASES**

Add import at the top of `app/page.tsx`:
```ts
import { RELEASES } from '../content/releases';
```

Replace the three hardcoded `<ReleaseRow />` calls with a map:
```tsx
{RELEASES.map((release) => (
  <ReleaseRow
    key={release.name}
    reversed={release.reversed}
    type={release.type}
    name={release.name}
    href={release.href}
    hrefLabel={release.hrefLabel}
    minHeight={release.minHeight ?? 280}
    infoBg={release.infoBg}
    infoBgPosition={release.infoBgPosition}
    embed={
      release.embedType === 'spotify' ? (
        <iframe
          title={release.embedTitle}
          style={{ border: 'none', width: '100%', height: '100%' }}
          src={release.embedSrc}
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />
      ) : (
        <iframe
          title={release.embedTitle}
          style={{ border: 'none', width: '100%', height: '100%' }}
          src={release.embedSrc}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
        />
      )
    }
  />
))}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add content/releases.ts app/page.tsx
git commit -m "feat: content/releases.ts — homepage releases as editable config"
```

---

## Task 8: content/marquee.ts + update homepage

**Files:**
- Create: `content/marquee.ts`
- Modify: `app/page.tsx`

- [ ] **Step 1: Create content/marquee.ts**

Create `content/marquee.ts`:

```ts
export const MARQUEE_ITEMS = [
  'JBL Music Academy Winner',
  'adidas Rising Star',
  'Boiler Room',
  'Abbey Road Studios',
  'UK Rap Award with Tiffany Calver',
] as const;
```

- [ ] **Step 2: Update app/page.tsx**

Add import:
```ts
import { MARQUEE_ITEMS } from '../content/marquee';
```

Find the marquee section in `app/page.tsx`. Replace the hardcoded array `['JBL Music Academy Winner', ...]` (which is currently duplicated twice inline) with `[...MARQUEE_ITEMS, ...MARQUEE_ITEMS]`:

```tsx
{[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
  <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
    <span style={{
      fontWeight: 900, fontSize: 13, letterSpacing: '0.18em',
      textTransform: 'uppercase', color: '#080808',
      padding: '0 48px', flexShrink: 0,
    }}>
      {item}
    </span>
    <span style={{ fontSize: 14, opacity: 0.3, color: '#080808' }}>◆</span>
  </span>
))}
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add content/marquee.ts app/page.tsx
git commit -m "feat: content/marquee.ts — achievement banner as editable config"
```

---

## Task 9: content/testimonials.ts + update both Testimonials components

**Files:**
- Create: `content/testimonials.ts`
- Modify: `app/studio/components/Testimonials.tsx`
- Modify: `app/tutoring/components/Testimonials.tsx`

- [ ] **Step 1: Create content/testimonials.ts**

Create `content/testimonials.ts`:

```ts
export interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

export const STUDIO_TESTIMONIALS: Testimonial[] = [
  {
    quote: "I've been working with Elcee for the past year, you won't find a better space to build your craft.",
    author: 'Malaki',
    location: 'Salford',
  },
  {
    quote: "Elcee provides not only an exceptional studio environment with everything an artist might need, but he's also an excellent creative partner to bounce ideas off. It's really useful to talk to someone who has direct experience producing music for brands.",
    author: 'Fieves',
    location: 'Manchester',
  },
  {
    quote: 'Elcee is a true multi-disciplinary creative and master of his crafts — from creative direction, song-writing, production, mixing and mastering and more.',
    author: 'Ninja Tea',
    location: 'Manchester',
  },
];

export const TUTORING_TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Absolutely delighted with the new vocal engineering course from Logan. He is great at breaking down complex topics, explaining them in a way I can easily understand. Really enjoyable. He built a plan around my needs and mapped out how we will get there over the course of the sessions. Great teacher.',
    author: 'Caroline',
    location: 'Student',
  },
  {
    quote: 'Always very helpful, able to cover all topics and recommend best ways to learn.',
    author: 'Yuting',
    location: 'Student',
  },
  {
    quote: 'Great teacher, only had a few lessons but already increased to twice a week.',
    author: 'Aaliyah',
    location: 'Student',
  },
];
```

- [ ] **Step 2: Update app/studio/components/Testimonials.tsx**

Replace the local `interface Testimonial` definition and the hardcoded `testimonials` array with imports:

```ts
import { STUDIO_TESTIMONIALS, type Testimonial } from '../../../content/testimonials';
```

Then replace the `const testimonials: Testimonial[] = [...]` array with:
```ts
const testimonials = STUDIO_TESTIMONIALS;
```

- [ ] **Step 3: Update app/tutoring/components/Testimonials.tsx**

Same pattern:
```ts
import { TUTORING_TESTIMONIALS, type Testimonial } from '../../../content/testimonials';
```

Replace:
```ts
const testimonials = TUTORING_TESTIMONIALS;
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add content/testimonials.ts app/studio/components/Testimonials.tsx app/tutoring/components/Testimonials.tsx
git commit -m "feat: content/testimonials.ts — testimonials as editable config"
```

---

## Task 10: content/faqs.ts + update both FAQ components

**Files:**
- Create: `content/faqs.ts`
- Modify: `app/studio/components/FAQ.tsx`
- Modify: `app/tutoring/components/FAQ.tsx`

- [ ] **Step 1: Create content/faqs.ts**

Create `content/faqs.ts`:

```ts
export interface FAQItem {
  question: string;
  answer: string;
}

export const STUDIO_FAQS: FAQItem[] = [
  {
    question: 'What equipment do you use?',
    answer: 'Professional-grade signal chain and industry-standard plugins. The room is acoustically treated for accurate recording and mixing.',
  },
  {
    question: "What's your turnaround time?",
    answer: 'Standard turnaround is 3–5 days for mixing. Rush delivery (24–48 hours) is available with a 40% surcharge for time-sensitive projects.',
  },
  {
    question: 'Do you work with all genres?',
    answer: 'Yes. While I specialise in rap, hip-hop, and alternative music, I work across all genres with the same professional standard.',
  },
  {
    question: 'How many revisions are included?',
    answer: 'Up to 3 revision rounds are included with mixing services. Additional revisions can be arranged if needed.',
  },
  {
    question: 'Can I attend mixing sessions?',
    answer: 'Sessions are typically completed independently for efficiency, but in-person mix sessions can be arranged if preferred.',
  },
  {
    question: 'What formats do you deliver?',
    answer: 'All industry-standard formats: WAV, MP3, stems, and any specific formats required for your distribution or label.',
  },
  {
    question: 'Do you offer production services?',
    answer: 'Yes. Custom production starts at £400 for fully bespoke beats. Additional production work on existing tracks starts at £150.',
  },
  {
    question: 'Where is the studio located?',
    answer: 'Cambridge Street, Manchester, M7 1UY — approximately 10 minutes from Manchester city centre. Easily accessible by public transport or car with nearby parking.',
  },
];

export const TUTORING_FAQS: FAQItem[] = [
  {
    question: 'Do I need any experience?',
    answer: "None. I've worked with people who've never opened a DAW before and people with years of experience who just felt stuck. Sessions start wherever you are.",
  },
  {
    question: 'What equipment do I need?',
    answer: "For online sessions you need a computer, headphones, and your DAW. For in-studio, just show up. Everything's here. No DAW yet? We'll sort that on the call.",
  },
  {
    question: 'Which DAW do you teach?',
    answer: "I teach production in Ableton Live. For mixing I can work with you in any DAW. Logic, FL Studio, Pro Tools, whatever you're on.",
  },
  {
    question: 'Can I learn online?',
    answer: '£45/hour via video call. You share your screen, I walk you through everything live. Works just as well as being here in person.',
  },
  {
    question: 'How long are sessions?',
    answer: 'Standard sessions are 1 hour. If you want longer, that can be arranged. Just mention it on your free session.',
  },
  {
    question: 'How do I pay?',
    answer: 'Payment is taken before each session. Bank transfer or card both accepted. Packages are available if you want to block book and save. Ask about this on your free session.',
  },
];
```

- [ ] **Step 2: Update app/studio/components/FAQ.tsx**

Replace the local `interface FAQItem` and hardcoded `faqs` array with:

```ts
import { STUDIO_FAQS, type FAQItem } from '../../../content/faqs';
```

Replace `const faqs: FAQItem[] = [...]` with:
```ts
const faqs = STUDIO_FAQS;
```

- [ ] **Step 3: Update app/tutoring/components/FAQ.tsx**

Same pattern:
```ts
import { TUTORING_FAQS, type FAQItem } from '../../../content/faqs';
```

Replace:
```ts
const faqs = TUTORING_FAQS;
```

- [ ] **Step 4: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add content/faqs.ts app/studio/components/FAQ.tsx app/tutoring/components/FAQ.tsx
git commit -m "feat: content/faqs.ts — FAQs as editable config"
```

---

## Task 11: content/social.ts + update all consumers

**Files:**
- Create: `content/social.ts`
- Modify: `app/components/SiteFooter.tsx`
- Modify: `app/contact/page.tsx`
- Modify: `app/links/page.tsx`

- [ ] **Step 1: Create content/social.ts**

Create `content/social.ts`:

```ts
export interface SocialLink {
  label: string;
  href: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  { label: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
  { label: 'YouTube', href: 'https://youtube.com/@elceethealchemist' },
  { label: 'TikTok', href: 'https://tiktok.com/@elceethealchemist' },
  { label: 'Apple Music', href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1507887824' },
  { label: 'Twitter / X', href: 'https://twitter.com/elceejpg' },
];
```

- [ ] **Step 2: Update SiteFooter**

In `app/components/SiteFooter.tsx`, add import:
```ts
import { SOCIAL_LINKS } from '../../content/social';
```

Replace the hardcoded array `[{ label: 'Instagram', href: ... }, ...]` in the `.map()` call with `SOCIAL_LINKS`. Note: the footer currently shows 5 links. To keep that, filter to the first 5 or slice: `SOCIAL_LINKS.slice(0, 5)`. Use `SOCIAL_LINKS.slice(0, 5)` to match the existing footer display.

- [ ] **Step 3: Update app/contact/page.tsx**

Add import:
```ts
import { SOCIAL_LINKS } from '../../content/social';
```

Find the hardcoded `SOCIAL_LINKS` const in `app/contact/page.tsx` (named locally) and remove it. Replace its usage with the imported `SOCIAL_LINKS`. Note the contact page currently shows only 4 links (Instagram, Twitter/X, TikTok, SoundCloud). To keep that filter, replace the local array with a filtered version:

```ts
const contactSocialLinks = SOCIAL_LINKS.filter(l =>
  ['Instagram', 'Twitter / X', 'TikTok', 'SoundCloud'].includes(l.label)
);
```

Then use `contactSocialLinks` in the `.map()` call instead of the local `SOCIAL_LINKS`.

- [ ] **Step 4: Update app/links/page.tsx**

The links page has its own `SOCIAL_ICONS` array (with SVG icons) and a separate `STREAMING_LINKS` array — these serve a different purpose (icons + specific streaming context) and should stay as-is. Only the `STREAMING_LINKS` simple list should be checked for consistency; it's fine to leave it since it has custom ordering for the links page context.

No change needed to `app/links/page.tsx` for this task.

- [ ] **Step 5: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 6: Commit**

```bash
git add content/social.ts app/components/SiteFooter.tsx app/contact/page.tsx
git commit -m "feat: content/social.ts — social links as single source of truth"
```

---

## Task 12: Sitemap additions + email sender fix

**Files:**
- Modify: `app/sitemap.ts`
- Modify: `lib/email-service.ts`

- [ ] **Step 1: Add pages to sitemap**

In `app/sitemap.ts`, add two new entries to the returned array:

```ts
{
  url: `${baseUrl}/free`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.7,
},
{
  url: `${baseUrl}/recording-studio-manchester`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.8,
},
```

- [ ] **Step 2: Fix email-service.ts from address**

In `lib/email-service.ts`, find the two occurrences of `onboarding@resend.dev` and replace both with the verified domain address:

First occurrence (booking notification):
```ts
from: 'Elcee Studio Bookings <bookings@elceethealchemist.com>',
```

Second occurrence (customer confirmation):
```ts
from: 'Elcee the Alchemist Studio <bookings@elceethealchemist.com>',
```

- [ ] **Step 3: Type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts lib/email-service.ts
git commit -m "fix: add /free and /recording-studio-manchester to sitemap, fix booking email sender domain"
```

---

## Task 13: Site guide

**Files:**
- Create: `SITE_GUIDE.md`

- [ ] **Step 1: Create SITE_GUIDE.md**

Create `SITE_GUIDE.md` at the project root:

````markdown
# Site Guide — How to Manage Your Website

This guide covers everything you're likely to want to change on the site, written in plain English. No code knowledge required — just find the file, make the change, save it, and commit.

---

## How to deploy a change

1. Open the file in any code editor (VS Code is recommended — it's free)
2. Make your change
3. Save the file
4. In your terminal, run:
   ```
   git add -A
   git commit -m "describe what you changed"
   git push
   ```
5. Vercel picks it up automatically. Live within 60–90 seconds.

If you're not comfortable with git, ask Claude Code to make the change and deploy it for you.

---

## Prices

**File:** `content/prices.ts`

Change any number in this file and it updates everywhere on the site at once — studio page, tutoring page, booking page, and the Manchester SEO page.

Example — to change the studio rate from £35/hr to £40/hr:
```
hourly: '£40/hr',
```

---

## Homepage releases (Music section)

**File:** `content/releases.ts`

Each entry in `RELEASES` is one row in the music section on the homepage. To add a new release, copy an existing entry and update:
- `type` — e.g. `'Single · 2025'`
- `name` — the track/album name
- `href` — the Spotify or YouTube link
- `hrefLabel` — the button text
- `embedSrc` — the embed URL (Spotify embed URL or YouTube embed URL)
- `embedTitle` — accessible title for the iframe
- `embedType` — `'spotify'` or `'youtube'`
- `infoBg` — path to the cover art in `/public/` (e.g. `'/my-cover.jpg'`)
- `reversed` — `true` means info panel is on the left, `false` means embed is on the left

To remove a release, delete its entry from the array.

---

## Achievement banner (scrolling text strip)

**File:** `content/marquee.ts`

Add or remove items from the `MARQUEE_ITEMS` array. Each string is one item in the scrolling strip.

---

## Testimonials

**Files:**
- Studio testimonials: `content/testimonials.ts` → `STUDIO_TESTIMONIALS`
- Tutoring testimonials: `content/testimonials.ts` → `TUTORING_TESTIMONIALS`

Each entry has three fields: `quote`, `author`, `location`. Add a new entry, delete an old one, or edit any of the three fields.

---

## FAQs

**Files:**
- Studio FAQs: `content/faqs.ts` → `STUDIO_FAQS`
- Tutoring FAQs: `content/faqs.ts` → `TUTORING_FAQS`

Each entry has `question` and `answer`. Edit, add, or remove entries freely.

---

## Social links

**File:** `content/social.ts`

All social platform links in one place. If you change a handle, update the `href` here and it updates across the footer and contact page.

---

## Site-wide strings

**File:** `content/site.ts`

- `tagline` — "Alternative Rap · Manchester" (appears under the hero and in SEO)
- `location` — "Manchester, England"
- `footerQuote` — "as within, so without"
- `contactResponseTime` — "24 hours" (shown on contact page)
- `bioSummary` — your short bio used in SEO metadata

---

## Longer copy blocks (page descriptions, paragraphs)

These are in the page files themselves. Search for the first few words of the text you want to change:

| What to change | File to open | Search for |
|---|---|---|
| Studio page description | `app/studio/page.tsx` | `Professional, focused recording` |
| Studio "What You Get" items | `app/studio/page.tsx` | `WHAT_YOU_GET` |
| Tutoring page description | `app/tutoring/page.tsx` | `Every session built around you` |
| Free page intro | `app/free/page.tsx` | `Tell me what you're working on` |
| Contact page tagline | `app/contact/page.tsx` | `For bookings, collaborations` |
| Homepage hero tagline | `app/page.tsx` | `Alternative Rap` |
| Serious Artist Plan copy | `app/studio/page.tsx` | `Not for everyone` |

---

## Contact form destination

**File:** `app/api/contact/route.ts`

The `to:` field on line 14 controls where contact form messages are sent. Change the email address there.

---

## Adding a new press photo

1. Drop the image file into `/public/photos/`
2. Reference it in code as `/photos/your-filename.jpg`

---

## Updating the EPK

**File:** `app/epk/page.tsx`

The EPK page has its own hardcoded data for achievements, press quotes, featured-in list, and live credits. Search for the item you want to update.
````

- [ ] **Step 2: Commit**

```bash
git add SITE_GUIDE.md
git commit -m "docs: plain-English site guide for self-managed content updates"
```

---

## Task 14: Final deploy

- [ ] **Step 1: Run full type check**

```bash
npx tsc --noEmit
```

Expected: no errors.

- [ ] **Step 2: Start dev server and verify key pages**

```bash
npm run dev
```

Manually check in browser:
- `http://localhost:3000` — homepage loads, releases render, marquee scrolls
- `http://localhost:3000/studio` — prices correct
- `http://localhost:3000/tutoring` — prices correct
- `http://localhost:3000/contact` — form submits (check Network tab shows 200 from /api/contact)
- `http://localhost:3000/api/og` — black image with white text renders
- `http://localhost:3000/booking` — no dead links

- [ ] **Step 3: Push to deploy**

```bash
git push origin main
```

Expected: Vercel deploys automatically. Live within 90 seconds.
````
