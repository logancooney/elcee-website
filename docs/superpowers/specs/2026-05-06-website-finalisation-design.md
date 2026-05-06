# Website Finalisation — Design Spec
Date: 2026-05-06

## Goal
Fix all known bugs, remove dead content, extract hardcoded content into config files, and write a plain-English site guide so Logan can manage the site independently without touching component code.

---

## Section 1 — Critical Bug Fixes

### 1a. Contact form
**Problem:** `handleSubmit` in `app/contact/page.tsx` calls `setSent(true)` with no API call. Messages never reach Logan.

**Fix:**
- Create `app/api/contact/route.ts`
- Uses existing Resend SDK (`resend` npm package already installed)
- From: `contact@elceethealchemist.com` (domain already verified with Resend)
- To: `elcee.automation@gmail.com`
- Reply-To: visitor's email address (so Logan can hit reply to respond)
- Subject: `New message from [name] — [subject]`
- Body: name, email, subject, message, timestamp
- Returns `{ success: true }` on success, `{ error }` on failure
- Update `app/contact/page.tsx` to POST to `/api/contact` and show real success/error states

### 1b. og-image
**Problem:** `app/layout.tsx` references `/og-image.jpg` in OpenGraph and Twitter metadata but the file does not exist in `/public/`. All social shares show a blank preview.

**Fix:**
- Create `app/api/og/route.tsx` using Next.js built-in `ImageResponse` from `next/og`
- 1200×630px, pure black background
- Shows "ELCEE THE ALCHEMIST" in large bold white uppercase text
- Shows "Alternative Rap · Manchester" as subtitle in muted white below
- Clean, brand-consistent — no image background (ImageResponse/Satori has limited CSS support)
- Update `app/layout.tsx` metadata to point `images` to `/api/og` instead of `/og-image.jpg`

### 1c. MobileJumpNav broken link
**Problem:** `app/components/MobileJumpNav.tsx` has `{ label: 'About', href: '#about' }` — this section was removed from the homepage. The link goes nowhere.

**Fix:**
- Remove the About entry
- Replace with `{ label: 'Shop', href: '/shop' }`
- Final order: Music (`#releases`) → Studio (`#studio`) → Shop (`/shop`) → Book (`/booking`)

### 1d. Blog removal
**Problem:** `/blog` and `/blog/[slug]` contain AI-generated placeholder posts that are not maintained, not in the nav, and not in the sitemap. They are dead content.

**Fix:**
- Delete `app/blog/page.tsx`
- Delete `app/blog/[slug]/page.tsx` and the `[slug]` directory
- No sitemap or nav updates needed (blog was never included in either)

---

## Section 2 — Content Config Files

All files live in a new `content/` directory at the project root. Each file exports a typed constant. Components import from these files instead of hardcoding data inline.

### `content/site.ts`
Site-wide strings used across multiple pages or in metadata.

```ts
export const SITE = {
  tagline: 'Alternative Rap · Manchester',
  bioSummary: 'Elcee the Alchemist is redefining UK Alternative Rap...',
  location: 'Manchester, England',
  footerQuote: 'as within, so without',
  contactEmail: 'elcee.automation@gmail.com',
  contactResponseTime: '24 hours',
  studioRate: '£35/hr',
  firstSessionFree: true,
}
```

**Consumers:** `app/layout.tsx` (bio in metadata), `app/components/SiteFooter.tsx` (footer quote), `app/contact/page.tsx` (response time), `app/studio/page.tsx` (rate display), `app/page.tsx` (tagline)

### `content/prices.ts`
All service prices in one place.

```ts
export const PRICES = {
  studio: { hourly: '£35/hr', loyaltyHourly: '£30/hr', loyaltyMonthly: '£240/month' },
  tutoring: { online: '£45/hr', inPerson: '£60/hr' },
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
}
```

**Consumers:** `app/studio/page.tsx`, `app/studio/components/Pricing.tsx`, `app/booking/BookingContent.tsx`, `app/recording-studio-manchester/page.tsx`, `app/tutoring/page.tsx`

### `content/releases.ts`
Homepage music releases. Each entry maps to one row in the releases section.

```ts
export const RELEASES = [
  {
    type: 'Album · 2024',
    name: 'The Evolution of Self Destruction',
    nameDisplay: ['The Evolution', 'of Self', 'Destruction'],
    href: 'https://open.spotify.com/album/...',
    hrefLabel: 'Open on Spotify →',
    embedSrc: 'https://open.spotify.com/embed/album/...',
    embedTitle: 'The Evolution of Self Destruction',
    embedType: 'spotify',
    infoBg: '/teosd-cover.png',
    reversed: false,
    minHeight: 408,
  },
  // ... Filthy, 2bad
]
```

**Consumers:** `app/page.tsx` (releases section)

### `content/marquee.ts`
Items in the scrolling achievement banner.

```ts
export const MARQUEE_ITEMS = [
  'JBL Music Academy Winner',
  'adidas Rising Star',
  'Boiler Room',
  'Abbey Road Studios',
  'UK Rap Award with Tiffany Calver',
]
```

**Consumers:** `app/page.tsx` (marquee section — currently duplicated inline, deduplication handled by the component)

### `content/testimonials.ts`
Studio and tutoring testimonials.

```ts
export const STUDIO_TESTIMONIALS = [
  { name: 'Artist Name', detail: 'Genre / Project', quote: '...' },
]

export const TUTORING_TESTIMONIALS = [
  { name: 'Student Name', detail: 'Level / Goal', quote: '...' },
]
```

**Consumers:** `app/studio/components/Testimonials.tsx`, `app/tutoring/components/Testimonials.tsx`

### `content/faqs.ts`
Studio and tutoring FAQ entries.

```ts
export const STUDIO_FAQS = [
  { question: 'Do you offer a first session free?', answer: '...' },
]

export const TUTORING_FAQS = [
  { question: 'What DAWs do you teach?', answer: '...' },
]
```

**Consumers:** `app/studio/components/FAQ.tsx`, `app/tutoring/components/FAQ.tsx`

### `content/social.ts`
All social platform links. Single source of truth.

```ts
export const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
  { label: 'Spotify', href: 'https://open.spotify.com/artist/...' },
  { label: 'YouTube', href: 'https://youtube.com/@elceethealchemist' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist' },
  { label: 'TikTok', href: 'https://tiktok.com/@elceethealchemist' },
  { label: 'Apple Music', href: 'https://music.apple.com/gb/artist/...' },
  { label: 'Twitter / X', href: 'https://twitter.com/elceejpg' },
]
```

**Consumers:** `app/components/SiteFooter.tsx`, `app/contact/page.tsx`, `app/links/page.tsx`

---

## Section 3 — SEO & Housekeeping

### 3a. Sitemap additions
Add to `app/sitemap.ts`:
- `/free` — priority 0.7, changeFrequency monthly
- `/recording-studio-manchester` — priority 0.8, changeFrequency monthly (SEO landing page targeting local search)

### 3b. Booking notification email sender
`lib/email-service.ts` currently sends booking notifications from `onboarding@resend.dev` (Resend's test address). Update to `bookings@elceethealchemist.com`.

### 3c. Site guide
Write `SITE_GUIDE.md` at the project root. Plain English, no code knowledge required. Sections:

- **Prices** — "To change any price, open `content/prices.ts`. Find the price you want to change and edit the number."
- **New music release** — "To add a new release to the homepage, open `content/releases.ts` and add a new entry following the existing pattern."
- **Testimonials** — "To add a new testimonial, open `content/testimonials.ts`..."
- **FAQ** — same pattern
- **Marquee** — same pattern
- **Social links** — same pattern
- **Longer copy blocks** — maps each page's key prose paragraphs to the exact file and a search term (e.g., "To change the studio description paragraph, open `app/studio/page.tsx` and search for 'Professional, focused recording'")
- **Contact destination** — "To change where contact form messages go, open `app/api/contact/route.ts` and change the `to` email address"
- **Deploying changes** — brief explanation of the GitHub → Vercel flow in plain English

---

## Implementation Order
1. Bug fixes (1a contact form, 1b og-image, 1c MobileJumpNav, 1d blog removal)
2. Content config files (create files, populate with current values, update all consumers)
3. SEO & housekeeping (sitemap, email sender)
4. Site guide (written last, once all changes are in place)

---

## Out of Scope
- CMS integration
- New page designs
- Any new features
- Redesign of any existing page
