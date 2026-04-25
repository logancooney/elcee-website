# Phase 1 — Homepage mobile + `/book` service picker: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (1) Optimise the homepage for mobile by adding a condensed hero variant + sticky jump nav + tightened section spacing. (2) Replace the booking flow with a single `/book` service-picker page (3 cards → inline Calendly). (3) Strip redundant per-page Calendly embeds from `/tutoring` and `/studio`.

**Architecture:** Mobile-only changes are gated by responsive utilities (`md:` breakpoint at 768px) — desktop is untouched. The new `/book` page lives alongside the existing `/booking` route, with a 301 redirect from old to new. Service config is centralised in a single new module so the page stays declarative.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind 4, framer-motion 12, existing `CalendlyEmbed` component at `components/CalendlyEmbed.tsx`.

**Parent spec:** `docs/superpowers/specs/2026-04-24-website-overhaul-design.md` §6
**Design DNA reference:** `docs/design-dna.md` (Phase 0 output — read this before touching any styling)

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `lib/book-services.ts` | Create | Service-card config: id, label, price, blurb, Calendly URL |
| `app/book/page.tsx` | Create | Server component shell, metadata, suspense boundary |
| `app/book/BookContent.tsx` | Create | Client component: hero, 3 cards, inline Calendly, `?service=` param routing |
| `app/components/MobileJumpNav.tsx` | Create | Sticky chip bar shown only ≤768px, anchors to homepage sections |
| `app/page.tsx` | Modify | Add condensed mobile hero variant; add MobileJumpNav; wire `id` anchors; add "Book" nav link; tighten mobile horizontal padding |
| `app/booking/page.tsx` | Modify (or delete) | Replace with redirect to `/book` (preserve external links) |
| `app/booking/BookingContent.tsx` | Delete | Superseded by `app/book/BookContent.tsx` |
| `app/tutoring/page.tsx` | Modify | Remove inline `CalendlyEmbed`, replace with CTA → `/book?service=tutoring` |
| `app/studio/page.tsx` | Modify | Remove inline `CalendlyEmbed`, replace with CTA → `/book?service=studio` |
| `app/globals.css` | Modify | Add mobile horizontal-padding override for section/row paddings (was a known DNA gap) |

The existing `components/CalendlyEmbed.tsx` is unchanged and reused on `/book`.

---

## Section 1 — Booking restructure

The booking page is the highest-friction surface today (per the spec §1 and the user's `Confusion between services + Too many steps` answer). Build `/book` first so the homepage and per-page changes can route to it.

### Task 1: Create the service config module

**Files:**
- Create: `lib/book-services.ts`

- [ ] **Step 1: Create `lib/book-services.ts`**

```ts
// Single source of truth for the /book service-picker page.
// Calendly URLs are pulled from lib/calendly-config.ts so this stays the only place
// that defines the service-card UI shape.

import { CALENDLY_EVENT_URLS } from './calendly-config';

export type BookServiceId = 'tutoring' | 'studio' | 'mixing';

export interface BookService {
  id: BookServiceId;
  label: string;
  price: string;
  priceQualifier: string;
  blurb: string;
  calendlyUrl: string;
}

export const BOOK_SERVICES: BookService[] = [
  {
    id: 'tutoring',
    label: 'Tutoring',
    price: '£40',
    priceQualifier: '/hr',
    blurb: 'Production, mixing, and home-studio mentorship — online or in-person in Manchester.',
    calendlyUrl: CALENDLY_EVENT_URLS.tutoringOnline,
  },
  {
    id: 'studio',
    label: 'Studio',
    price: '£45',
    priceQualifier: '/hr',
    blurb: 'Recording, mixing, and mastering at The Alchemist Studio in Manchester.',
    calendlyUrl: CALENDLY_EVENT_URLS.studio1hr,
  },
  {
    id: 'mixing',
    label: 'Mix & Master',
    price: 'POA',
    priceQualifier: '',
    blurb: 'Vocal mixes, full mix + master, mastering only. Discovery call to scope the project.',
    calendlyUrl: CALENDLY_EVENT_URLS.schedulingPage,
  },
];

export function getBookService(id: string | null): BookService | undefined {
  if (!id) return undefined;
  return BOOK_SERVICES.find(s => s.id === id);
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/book-services.ts
git commit -m "feat(book): add service config module for /book page"
```

### Task 2: Create the `/book` page shell

**Files:**
- Create: `app/book/page.tsx`

- [ ] **Step 1: Create `app/book/page.tsx`**

```tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookContent from './BookContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee The Alchemist',
  description: 'Book studio time, tutoring, or mixing. Pick your service and choose a time.',
};

export default function BookPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Suspense fallback={<div style={{ minHeight: '60vh' }} />}>
        <BookContent />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 2: Commit (after Task 3 to keep page render-able — skip commit here)**

### Task 3: Create `BookContent` client component (hero + cards)

**Files:**
- Create: `app/book/BookContent.tsx`

This is the largest file in Phase 1. Build it in two passes — first the hero + cards (this task), then the Calendly reveal (Task 4).

- [ ] **Step 1: Create `app/book/BookContent.tsx` with hero + cards (no embed yet)**

The hero uses Design DNA archetype A (cinematic hero) at a smaller scale (no `100vh`, just enough for a clear opener). Cards use the split-row info-cell pattern (archetype D, info side only) styled as 3-up on desktop, stacked on mobile.

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { BOOK_SERVICES, getBookService, type BookServiceId } from '../../lib/book-services';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

export default function BookContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const initial = getBookService(searchParams.get('service'))?.id ?? null;
  const [selected, setSelected] = useState<BookServiceId | null>(initial);

  // Keep URL in sync when user clicks a card
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (selected) {
      params.set('service', selected);
    } else {
      params.delete('service');
    }
    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(next, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      {/* HERO */}
      <section style={{
        position: 'relative',
        padding: '160px 48px 80px',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.3)', marginBottom: 14,
        }}>
          01 — Book
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 96px)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#fafafa',
          marginBottom: 16,
        }}>
          Book a<br />Session
        </h1>
        <div style={{
          fontSize: 13, lineHeight: 1.8,
          color: 'rgba(255,255,255,0.55)',
          maxWidth: 480, margin: '0 auto',
        }}>
          Pick a service. Pick a time. We&rsquo;ll handle the rest.
        </div>
      </section>

      {/* SERVICE CARDS — 3-up desktop, stack mobile */}
      <section className="grid-three-col" style={{
        borderTop: '1px solid #1a1a1a',
        borderBottom: '1px solid #1a1a1a',
      }}>
        {BOOK_SERVICES.map((service, i) => {
          const isSelected = selected === service.id;
          const isAnotherSelected = selected !== null && !isSelected;
          return (
            <motion.button
              key={service.id}
              {...fadeUp}
              onClick={() => setSelected(service.id)}
              style={{
                appearance: 'none', background: 'transparent', cursor: 'pointer',
                textAlign: 'left',
                padding: '64px 48px',
                color: '#fafafa',
                borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                opacity: isAnotherSelected ? 0.4 : 1,
                transition: 'opacity 0.3s ease, background 0.3s ease',
                background: isSelected ? '#111111' : 'transparent',
                position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: 280,
              }}
            >
              <div>
                <div style={{
                  fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
                  color: 'rgba(255,255,255,0.3)', marginBottom: 10,
                }}>
                  0{i + 1} &mdash; {service.label}
                </div>
                <div style={{
                  fontWeight: 900,
                  fontSize: 'clamp(28px, 4vw, 52px)',
                  letterSpacing: '-0.03em',
                  textTransform: 'uppercase',
                  lineHeight: 0.88,
                  color: '#fafafa',
                  marginBottom: 12,
                }}>
                  {service.price}
                  <span style={{
                    fontSize: 14, fontWeight: 400, letterSpacing: '0', textTransform: 'lowercase',
                    color: 'rgba(255,255,255,0.45)', marginLeft: 4,
                  }}>{service.priceQualifier}</span>
                </div>
                <p style={{
                  fontSize: 13, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: 28,
                }}>
                  {service.blurb}
                </p>
              </div>
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '10px 20px',
                fontWeight: 900, fontSize: 9, letterSpacing: '0.18em',
                textTransform: 'uppercase',
                background: isSelected ? '#fafafa' : 'transparent',
                color: isSelected ? '#080808' : '#fafafa',
                border: isSelected ? '1.5px solid transparent' : '1.5px solid rgba(255,255,255,0.4)',
                alignSelf: 'flex-start',
                transition: 'background 0.2s, color 0.2s, border-color 0.2s',
              }}>
                {isSelected ? 'Selected' : 'Select'} →
              </span>
            </motion.button>
          );
        })}
      </section>
    </>
  );
}
```

- [ ] **Step 2: Add the `.grid-three-col` rule to `app/globals.css`**

```css
/* 3-up desktop, stack mobile — used by /book service picker */
.grid-three-col {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
}
@media (max-width: 768px) {
  .grid-three-col {
    grid-template-columns: 1fr;
  }
  .grid-three-col > button {
    border-left: none !important;
    border-top: 1px solid #1a1a1a;
  }
  .grid-three-col > button:first-child {
    border-top: none;
  }
}
```

- [ ] **Step 3: Verify the page renders by running the dev server**

Run: `npm run dev`
Open: `http://localhost:3000/book`
Expected: Hero ("BOOK A SESSION") renders. Three service cards render: Tutoring £40/hr, Studio £45/hr, Mix & Master POA. Clicking a card visually selects it (white "Selected" pill, dimmed neighbours, slight bg shift).

If the page errors with "module not found", check the import path in `BookContent.tsx` for `book-services` (relative path is `../../lib/book-services`, since `app/book/` is two levels above `lib/`).

- [ ] **Step 4: Commit**

```bash
git add app/book/page.tsx app/book/BookContent.tsx app/globals.css
git commit -m "feat(book): add /book page with service-picker hero and cards"
```

### Task 4: Add inline Calendly reveal below cards

**Files:**
- Modify: `app/book/BookContent.tsx`

- [ ] **Step 1: Import the existing CalendlyEmbed component**

At the top of `app/book/BookContent.tsx`, after the existing imports:

```tsx
import CalendlyEmbed from '../../../components/CalendlyEmbed';
```

(Note the path: `app/book/BookContent.tsx` → up three to repo root → into `components/`. The pattern matches the other consumers: `app/tutoring/page.tsx:10` uses `../../components/CalendlyEmbed`. From `app/book/` we need `../../../`.)

- [ ] **Step 2: Add the Calendly section after the cards section**

Append this section inside `BookContent`'s returned fragment, after the closing `</section>` of the service cards:

```tsx
      {/* CALENDLY EMBED — reveals when a service is selected */}
      {selected && (() => {
        const service = BOOK_SERVICES.find(s => s.id === selected)!;
        return (
          <motion.section
            key={selected}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ padding: '64px 48px', borderBottom: '1px solid #1a1a1a' }}
          >
            <div style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', marginBottom: 10,
              textAlign: 'center',
            }}>
              Schedule &mdash; {service.label}
            </div>
            <CalendlyEmbed url={service.calendlyUrl} height={780} />
          </motion.section>
        );
      })()}

      {/* PROMPT WHEN NOTHING SELECTED */}
      {!selected && (
        <section style={{
          padding: '80px 48px',
          textAlign: 'center',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{
            fontSize: 13, lineHeight: 1.8,
            color: 'rgba(255,255,255,0.45)',
          }}>
            Pick a service above to see available times.
          </div>
        </section>
      )}
```

- [ ] **Step 3: Verify the embed shows when a card is clicked**

Run: `npm run dev` (already running)
Open: `http://localhost:3000/book`
Click "Tutoring" card. Expected: Calendly embed loads below within 1–2 seconds. URL changes to `/book?service=tutoring` (no full page reload — `router.replace` with `scroll: false`).
Click "Studio". Expected: Calendly swaps to studio URL. The `key={selected}` on the motion.section forces a remount + the fade-up transition replays.
Open `http://localhost:3000/book?service=studio` directly. Expected: Studio card is pre-selected; embed loads immediately.

- [ ] **Step 4: Commit**

```bash
git add app/book/BookContent.tsx
git commit -m "feat(book): inline Calendly embed reveals on service select"
```

### Task 5: Redirect old `/booking` → `/book`

**Files:**
- Modify: `app/booking/page.tsx`
- Delete: `app/booking/BookingContent.tsx`

The simplest redirect is server-side using `redirect()` so external links (Instagram bio, old emails) don't 404.

- [ ] **Step 1: Replace `app/booking/page.tsx` with a redirect**

```tsx
import { redirect } from 'next/navigation';

export default function BookingRedirect() {
  redirect('/book');
}
```

- [ ] **Step 2: Delete the now-orphaned `BookingContent.tsx`**

```bash
git rm app/booking/BookingContent.tsx
```

- [ ] **Step 3: Verify**

Run: `npm run dev`
Open: `http://localhost:3000/booking`
Expected: Browser ends up at `/book` (server redirect; URL bar shows `/book`).

- [ ] **Step 4: Commit**

```bash
git add app/booking/page.tsx
git commit -m "feat(book): redirect /booking to /book and remove old BookingContent"
```

---

## Section 2 — Homepage mobile

The homepage currently scrolls long on mobile (per the user's `Sections too long / too much scroll` answer). Solution: condensed mobile hero + sticky jump nav + tighter horizontal padding. Sections stay; their visual weight on mobile drops.

### Task 6: Add mobile horizontal-padding override

**Files:**
- Modify: `app/globals.css`

Phase 0's Design DNA flagged `48px` horizontal padding as a known mobile gap (DNA doc §"Mobile overrides → Spacing"). Fix it once at the CSS level so every section benefits.

- [ ] **Step 1: Add a utility CSS rule**

Add this block to `app/globals.css` (above any existing `@media` rules so the cascade is predictable):

```css
/* Mobile padding override — was a known gap in Design DNA.
   Sections that opt in by adding the .section-pad class get 48px desktop / 24px mobile. */
.section-pad {
  padding-left: 48px;
  padding-right: 48px;
}
@media (max-width: 768px) {
  .section-pad {
    padding-left: 24px;
    padding-right: 24px;
  }
}
```

This is opt-in (via `.section-pad`) — safer than blanket-overriding `padding` everywhere. The homepage and `/book` page selectively adopt it (Tasks 7 + 8).

- [ ] **Step 2: Commit (deferred — bundle with Task 8 changes)**

### Task 7: Add the `MobileJumpNav` component

**Files:**
- Create: `app/components/MobileJumpNav.tsx`

This is mobile-only (`md:hidden` equivalent via inline display). It appears as a sticky chip bar beneath the hero on scroll, hides at the top of the page, and anchors to `#releases`, `#about`, `#studio`, and `/book`.

- [ ] **Step 1: Create `app/components/MobileJumpNav.tsx`**

```tsx
'use client';

import { useEffect, useState } from 'react';

interface JumpItem {
  label: string;
  href: string;
}

const JUMP_ITEMS: JumpItem[] = [
  { label: 'Studio', href: '#studio' },
  { label: 'Music', href: '#releases' },
  { label: 'About', href: '#about' },
  { label: 'Book', href: '/book' },
];

export default function MobileJumpNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show after user scrolls past 60% of viewport height (out of the hero)
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 90,
        background: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {JUMP_ITEMS.map(item => (
        <a
          key={item.href}
          href={item.href}
          style={{
            flexShrink: 0,
            padding: '8px 14px',
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#fafafa',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Commit (deferred — bundle with Task 8 changes)**

### Task 8: Wire the mobile jump nav into the homepage

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Import `MobileJumpNav` at the top of `app/page.tsx`**

After the existing `import SiteFooter from './components/SiteFooter';` line, add:

```tsx
import MobileJumpNav from './components/MobileJumpNav';
```

- [ ] **Step 2: Render `<MobileJumpNav />` inside the homepage tree**

Place it immediately after the closing `</nav>` of the existing nav element (around line 209 of `app/page.tsx`). The full insertion looks like this — find the existing `</nav>` and insert the line below it:

```tsx
      </nav>

      <MobileJumpNav />

      {/* Mobile fullscreen menu */}
```

- [ ] **Step 3: Confirm anchor IDs exist on every section the jump nav targets**

Verify each in `app/page.tsx`:
- `id="releases"` — exists, line 368.
- `id="about"` — exists, line 462.
- `id="studio"` — exists, line 503.

If any are missing, add them. As of commit `745173c` they all exist; this step is verification only.

- [ ] **Step 4: Add the "Book" link to the desktop nav**

The homepage's existing `NAV_LINKS` array (lines 100–105 of `app/page.tsx`) currently is:

```tsx
const NAV_LINKS = [
  { label: 'Music', href: '#releases' },
  { label: 'Studio', href: '/studio' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];
```

Replace it with:

```tsx
const NAV_LINKS = [
  { label: 'Music', href: '#releases' },
  { label: 'Studio', href: '/studio' },
  { label: 'Tutoring', href: '/tutoring' },
  { label: 'Contact', href: '/contact' },
];

const NAV_CTA = { label: 'Book', href: '/book' };
```

(`Shop` is rarely used and pushes the nav wide; `Tutoring` belongs in primary nav given the business priority. Confirm with Logan before ship if scope-sensitive.)

- [ ] **Step 5: Render the Book CTA button in the desktop nav**

Locate the desktop links `<ul>` (lines 173–190 of `app/page.tsx`). Immediately after the `</ul>` closing tag, before the mobile hamburger `<button>`, insert:

```tsx
        {/* Desktop CTA */}
        <Link
          href={NAV_CTA.href}
          className="hidden md:inline-flex"
          style={{
            alignItems: 'center', justifyContent: 'center',
            padding: '10px 22px',
            fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
            textTransform: 'uppercase', textDecoration: 'none',
            background: '#fafafa', color: '#080808',
            border: 'none', cursor: 'pointer',
            transition: 'background 0.2s',
          }}
        >
          {NAV_CTA.label} →
        </Link>
```

The desktop links `<ul>` and CTA together replace the previous nav-right area. The mobile hamburger remains untouched.

- [ ] **Step 6: Add Book item to mobile fullscreen menu**

The mobile menu currently maps over `NAV_LINKS` (lines 219–231). After the existing `.map(...)` block, before the closing `</div>`, append:

```tsx
          <a
            href={NAV_CTA.href}
            onClick={() => setMobileMenuOpen(false)}
            style={{
              fontSize: 24, fontWeight: 900, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#080808', textDecoration: 'none',
              background: '#fafafa',
              padding: '14px 28px',
              marginTop: 16,
            }}
          >
            {NAV_CTA.label} →
          </a>
```

- [ ] **Step 7: Verify in browser**

Run: `npm run dev` (already running)
Open: `http://localhost:3000/`
- Desktop: nav shows `Music · Studio · Tutoring · Contact` plus a white "Book →" pill on the right.
- Mobile (DevTools, iPhone 14 viewport): nav has hamburger only at top. Scroll down past the hero. Jump nav appears at top with `Studio · Music · About · Book` chips. Tap any chip — page scrolls to the matching section (`#studio`, `#releases`, `#about`) or navigates to `/book`. Tap the hamburger — fullscreen menu appears with `Music · Studio · Tutoring · Contact` plus a separate `BOOK →` pill at the bottom.

- [ ] **Step 8: Commit**

```bash
git add app/components/MobileJumpNav.tsx app/page.tsx app/globals.css
git commit -m "feat(homepage): mobile jump nav, desktop Book CTA, mobile padding override"
```

### Task 9: Tighten mobile homepage section spacing

**Files:**
- Modify: `app/page.tsx`

Now that `.section-pad` exists (Task 6), apply it to the homepage sections that currently hard-code `'48px'` horizontal padding. Don't touch sections that intentionally overflow (the marquee). Don't change vertical padding — only horizontal — per the spec's "tighten copy + spacing" answer.

- [ ] **Step 1: Replace hardcoded `padding: '48px 48px ...'` patterns where they sit on container divs that should be mobile-tight**

The simplest, lowest-risk edit: leave inline pixel values alone (mobile already works via the `clamp()`-based type and `grid-two-col` collapse), but reduce the homepage's grid-cell horizontal padding on mobile.

Add to `app/globals.css`, just below the `.grid-two-col` rule:

```css
/* Mobile: tighten 48px content padding inside grid-two-col cells */
@media (max-width: 768px) {
  .grid-two-col > div {
    padding-left: 24px !important;
    padding-right: 24px !important;
  }
}
```

This selectively shrinks the horizontal padding of the info cells (about, studio, release info) on mobile without affecting desktop.

- [ ] **Step 2: Verify on mobile viewport**

Open `http://localhost:3000/` in DevTools mobile mode (iPhone 14, 390px wide). Scroll through the page. Expected: info cells have visibly tighter horizontal breathing — text doesn't sit so close to the edge it feels squeezed, but the section uses ~85% of viewport width vs the previous ~75%. Desktop unaffected.

- [ ] **Step 3: Verify desktop**

Switch DevTools to 1440px. Expected: identical to before this change.

- [ ] **Step 4: Add condensed mobile hero copy**

The hero H1 currently reads "Elcee The Alchemist" (lines 290 of `app/page.tsx`). The clamp scaling already shrinks it; no change to H1 itself. The CTA pair (`Listen Now` + `Book Studio`) is fine on mobile.

The single-sentence tagline "Alternative Rap · Manchester" is fine. **No mobile-specific copy variant is needed** — the headline-tagline-CTA shape is already mobile-friendly given the clamp typography. The "tighten copy + spacing" answer applied to mobile sections that follow the hero, not the hero itself. Skip mobile-specific hero copy.

- [ ] **Step 5: Commit**

```bash
git add app/globals.css
git commit -m "feat(homepage): tighten mobile horizontal padding in grid-two-col cells"
```

---

## Section 3 — Strip per-page Calendly embeds

The spec §6.2 calls for removing inline Calendly embeds from `/tutoring` and `/studio` and replacing them with primary CTAs that route to `/book?service=...`. This eliminates the duplication and concentrates the booking flow on one page.

### Task 10: Remove tutoring page Calendly, replace with CTA

**Files:**
- Modify: `app/tutoring/page.tsx`

- [ ] **Step 1: Locate the inline `CalendlyEmbed` in `app/tutoring/page.tsx`**

The embed sits at line 221 (per the audit grep earlier):

```tsx
<CalendlyEmbed key={CALENDLY_EVENT_URLS.schedulingPage} url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
```

It is wrapped in some surrounding markup. **Read the file before editing** to understand the surrounding context.

Run: `Read app/tutoring/page.tsx` and locate the section containing the embed.

- [ ] **Step 2: Replace the embed (and any "Pick a time" header that wraps it) with a CTA block**

Replace the `<CalendlyEmbed ... />` element and its containing wrapper (the section that frames it) with a CTA block matching Design DNA's primary-CTA pattern:

```tsx
<section style={{
  padding: '96px 48px',
  textAlign: 'center',
  borderTop: '1px solid #1a1a1a',
  borderBottom: '1px solid #1a1a1a',
}}>
  <div style={{
    fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)', marginBottom: 14,
  }}>
    Ready to start?
  </div>
  <div style={{
    fontWeight: 900,
    fontSize: 'clamp(38px, 5vw, 72px)',
    letterSpacing: '-0.03em',
    textTransform: 'uppercase',
    lineHeight: 0.88,
    color: '#fafafa',
    marginBottom: 28,
  }}>
    Book a<br />Tutoring Session
  </div>
  <Link
    href="/book?service=tutoring"
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '13px 28px',
      fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
      textTransform: 'uppercase', textDecoration: 'none',
      background: '#fafafa', color: '#080808',
      border: 'none', cursor: 'pointer',
      transition: 'background 0.2s',
    }}
  >
    Choose a Time →
  </Link>
</section>
```

- [ ] **Step 3: Remove the now-unused imports**

Top of `app/tutoring/page.tsx` currently imports:
```tsx
import CalendlyEmbed from '../../components/CalendlyEmbed';
import { CALENDLY_EVENT_URLS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';
```

After removing the embed, `CalendlyEmbed` and (likely) `CALENDLY_EVENT_URLS` may become unused. Remove unused imports — ESLint will flag them on build.

`CALENDLY_BUNDLE_LINKS` is likely still used elsewhere on the page for tutoring bundles — leave it.

Ensure `Link` from `next/link` is imported. If it isn't, add it:
```tsx
import Link from 'next/link';
```

- [ ] **Step 4: Verify**

Run: `npm run dev`
Open: `http://localhost:3000/tutoring`
Scroll to where the Calendly used to be. Expected: a clean dark CTA section with "BOOK A TUTORING SESSION" headline + white "Choose a Time →" pill. Click the button. Expected: navigates to `/book?service=tutoring`, lands on the picker with Tutoring card pre-selected, embed loads.

- [ ] **Step 5: Commit**

```bash
git add app/tutoring/page.tsx
git commit -m "feat(tutoring): replace inline Calendly with CTA to /book"
```

### Task 11: Remove studio page Calendly, replace with CTA

**Files:**
- Modify: `app/studio/page.tsx`

Mirror Task 10 for `/studio`. The embed is at line 170 (per earlier audit grep).

- [ ] **Step 1: Read `app/studio/page.tsx` to find the embed and its wrapper section**

Run: `Read app/studio/page.tsx` and locate the section containing `<CalendlyEmbed ... />`.

- [ ] **Step 2: Replace with a CTA block**

Use the same pattern as Task 10 Step 2, but with the studio service name. The replacement section:

```tsx
<section style={{
  padding: '96px 48px',
  textAlign: 'center',
  borderTop: '1px solid #1a1a1a',
  borderBottom: '1px solid #1a1a1a',
}}>
  <div style={{
    fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
    color: 'rgba(255,255,255,0.3)', marginBottom: 14,
  }}>
    Ready to record?
  </div>
  <div style={{
    fontWeight: 900,
    fontSize: 'clamp(38px, 5vw, 72px)',
    letterSpacing: '-0.03em',
    textTransform: 'uppercase',
    lineHeight: 0.88,
    color: '#fafafa',
    marginBottom: 28,
  }}>
    Book a<br />Studio Session
  </div>
  <Link
    href="/book?service=studio"
    style={{
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
      padding: '13px 28px',
      fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
      textTransform: 'uppercase', textDecoration: 'none',
      background: '#fafafa', color: '#080808',
      border: 'none', cursor: 'pointer',
      transition: 'background 0.2s',
    }}
  >
    Choose a Time →
  </Link>
</section>
```

- [ ] **Step 3: Remove unused imports**

Same pattern as Task 10 Step 3 — drop `CalendlyEmbed` import if no other embed remains. Leave `CALENDLY_EVENT_URLS` if other code still references it. Ensure `Link` from `next/link` is imported.

- [ ] **Step 4: Verify**

Open: `http://localhost:3000/studio`
Scroll to where the Calendly used to be. Expected: CTA block. Click "Choose a Time →". Expected: lands on `/book?service=studio` with Studio card pre-selected.

- [ ] **Step 5: Commit**

```bash
git add app/studio/page.tsx
git commit -m "feat(studio): replace inline Calendly with CTA to /book"
```

---

## Section 4 — Phase 1 acceptance gate

### Task 12: Cross-device QA + final verification

- [ ] **Step 1: Run the full dev server build to surface compile errors**

Run: `npm run build`
Expected: build succeeds. Any TypeScript or ESLint errors must be resolved before continuing. Common issues:
- Unused imports left over from Tasks 10 / 11.
- The `BookContent.tsx` import path for `CalendlyEmbed` (must be `../../../components/CalendlyEmbed`, three levels up).
- Missing `'use client'` directive on `BookContent.tsx` or `MobileJumpNav.tsx`.

- [ ] **Step 2: Manual QA matrix — desktop**

Run: `npm run dev`
Test in DevTools at 1440px:
- `/` — homepage. Hero, marquee, releases, about, studio, footer. Nav shows desktop links + Book pill. Hover states fire on nav links.
- `/book` — picker hero, three cards, no embed shown until click. Click each card; embed loads, URL updates.
- `/book?service=tutoring` — tutoring pre-selected.
- `/book?service=studio` — studio pre-selected.
- `/book?service=mixing` — mixing pre-selected.
- `/booking` — redirects to `/book` (URL bar shows `/book`).
- `/tutoring` — page renders, no Calendly embed, CTA → `/book?service=tutoring` works.
- `/studio` — page renders, no Calendly embed, CTA → `/book?service=studio` works.

- [ ] **Step 3: Manual QA matrix — mobile (iPhone 14, 390 × 844)**

In DevTools mobile mode:
- `/` — hero scales down via clamp. Tap hamburger; mobile menu opens with `Music · Studio · Tutoring · Contact` + Book pill. Scroll down past hero — jump nav appears at top with chips. Tap each chip; page scrolls to anchor or navigates.
- `/book` — cards stack vertically. Tap a card; embed loads below.
- `/tutoring`, `/studio` — pages render at narrow width. Horizontal padding feels comfortable (24px not 48px). CTAs are tap-target-sized.

- [ ] **Step 4: Verify the homepage Lighthouse mobile score has not regressed**

Run Lighthouse in Chrome DevTools against `http://localhost:3000/` in mobile mode.
Compare Performance / Accessibility / Best Practices / SEO scores against the pre-Phase-1 baseline (if recorded). Expected: Performance ≥ baseline, Accessibility unchanged, Best Practices unchanged, SEO unchanged.

If a regression appears (most likely Performance from the new MobileJumpNav scroll listener — it's already throttled by `passive: true` so should be fine), investigate and fix before shipping.

- [ ] **Step 5: Final commit + tag**

If any small fixes were needed during QA:

```bash
git add -p   # review each fix
git commit -m "fix(phase-1): QA tweaks"
```

Then tag the phase completion:

```bash
git tag phase-1-complete
```

- [ ] **Step 6: Update master plan**

Edit `~/Claude/plans/2026-04-24-website-overhaul.md`. Change the Phase 1 row from `(not yet written)` to `✅ Complete`. Commit:

```bash
# This file lives outside the repo, so just save it directly
```

(No git commit needed — `~/Claude/plans/` is not in this repo.)

---

## Phase 1 Acceptance Gate

Phase 1 is complete when all of these pass:

- [ ] `/book` page renders, three service cards select correctly, Calendly embed loads on selection, deep-links via `?service=` work.
- [ ] `/booking` 301-redirects to `/book`.
- [ ] Homepage on mobile (iPhone 14 viewport): jump nav appears past hero, anchors work, hamburger menu shows Book pill.
- [ ] Homepage on desktop: nav shows new link set + white Book CTA pill on right.
- [ ] `/tutoring` and `/studio` pages have no inline Calendly; CTAs route to `/book?service=...` with the correct card pre-selected.
- [ ] `npm run build` succeeds with no errors or warnings.
- [ ] Mobile horizontal padding is visibly tightened (24px) on grid-two-col cells without breaking desktop.

---

## Next phase

Phase 2 (tutoring page restyle) gets its own implementation plan, written **after** Phase 1 lands. Phase 2 will use the Design DNA reference and any Phase 1 lessons to rebuild `/tutoring` to match the homepage.

To generate Phase 2's plan: run `superpowers:writing-plans` against spec §7 once Phase 1's acceptance gate has passed.
