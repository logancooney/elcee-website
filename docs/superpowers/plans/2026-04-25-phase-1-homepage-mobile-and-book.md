# Phase 1 — Homepage mobile + `/booking` service picker: Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** (1) Optimise the homepage for mobile by adding a sticky mobile jump nav + tightened section spacing + a desktop "Book" CTA in the nav. (2) Rebuild the existing `/booking` page in place as a service-picker (3 cards → inline Calendly with deep-link support). (3) `/tutoring` and `/studio` keep their inline Calendly embeds for direct frictionless booking — they are tightened in later phases, not stripped here.

**Architecture:** Mobile-only changes gated by `md:` breakpoint (768px) — desktop is untouched. `/booking` is rebuilt in place (no new route, no redirects) so existing external links keep working. Service config lives in a single new module so the page stays declarative. Tutoring's online/in-person price split is reflected via a sub-toggle inside the picker once the user chooses tutoring.

**Tech Stack:** Next.js 16 App Router, TypeScript, Tailwind 4, framer-motion 12, existing `CalendlyEmbed` component at `components/CalendlyEmbed.tsx`.

**Parent spec:** `docs/superpowers/specs/2026-04-24-website-overhaul-design.md` §6
**Design DNA reference:** `docs/design-dna.md` (Phase 0 output — read this before touching any styling)
**Pricing reference:** `~/.claude/projects/-Users-logancooney-Projects-elcee-website/memory/project_pricing_structure.md` (tutoring £45 online / £60 in-person, studio £45/hr, mix POA, bulk discounts)

---

## File Structure

| File | Action | Responsibility |
|---|---|---|
| `lib/book-services.ts` | Create | Service-card config: id, label, price (with online/in-person split for tutoring), blurb, Calendly URL(s) |
| `app/booking/page.tsx` | Modify | Keep as-is (already a Suspense shell); update metadata copy if needed |
| `app/booking/BookingContent.tsx` | Replace | Rebuilt to Design DNA: hero, 3 cards, inline Calendly, `?service=` and `&mode=` param routing |
| `app/components/MobileJumpNav.tsx` | Create | Sticky chip bar shown only ≤768px, anchors to homepage sections |
| `app/page.tsx` | Modify | Add MobileJumpNav; verify section anchor IDs; add "Book" nav CTA pill |
| `app/globals.css` | Modify | Add `.grid-three-col` rule for 3-up cards stacking on mobile; tighten `grid-two-col` cell horizontal padding on mobile |

**Explicitly NOT touched in Phase 1:**
- `app/tutoring/page.tsx`, `app/studio/page.tsx` — Calendly embeds stay. These pages get their full DNA restyle in Phases 2 and 3.
- `components/CalendlyEmbed.tsx` — unchanged; reused on `/booking`, `/tutoring`, `/studio`, `/free`.
- The desktop nav link set — keeps `Music · Studio · Shop · Contact`. The Book CTA is added as a separate pill, not a swap.

---

## Section 1 — Booking page rebuild (in place)

The existing `/booking` page is the highest-friction surface today. Rebuild it in place to Design DNA — same route (`/booking`), same shell (`app/booking/page.tsx`'s `Suspense` wrapper), but a brand-new picker UI replacing the current `BookingContent.tsx`.

### Task 1: Create the service config module

**Files:**
- Create: `lib/book-services.ts`

The tutoring service has two pricing modes (online £45/hr, in-person £60/hr) and two corresponding Calendly URLs. The data shape captures this with an optional `modes` array — services that don't have variants leave it undefined.

- [ ] **Step 1: Create `lib/book-services.ts`**

```ts
// Single source of truth for the /booking service-picker page.
// Calendly URLs come from lib/calendly-config.ts so this is the only place
// that defines the service-card UI shape.

import { CALENDLY_EVENT_URLS } from './calendly-config';

export type BookServiceId = 'tutoring' | 'studio' | 'mixing';
export type BookMode = 'online' | 'in-person';

export interface BookServiceMode {
  id: BookMode;
  label: string;
  price: string;
  priceQualifier: string;
  calendlyUrl: string;
}

export interface BookService {
  id: BookServiceId;
  label: string;
  /** Headline price shown on the card. e.g. "from £45/hr" or "POA". */
  priceLabel: string;
  blurb: string;
  /** Used when the service has no online/in-person split. */
  calendlyUrl?: string;
  /** Used when the service has a sub-toggle (e.g. tutoring). */
  modes?: BookServiceMode[];
  /** Optional small note shown below the price. */
  note?: string;
}

export const BOOK_SERVICES: BookService[] = [
  {
    id: 'tutoring',
    label: 'Tutoring',
    priceLabel: 'from £45/hr',
    blurb: 'Production, mixing, and home-studio mentorship. Online (£45/hr) or in-person in Manchester (£60/hr).',
    note: 'Bulk discounts available on 5/8/10 session bundles.',
    modes: [
      {
        id: 'online',
        label: 'Online',
        price: '£45',
        priceQualifier: '/hr',
        calendlyUrl: CALENDLY_EVENT_URLS.tutoringOnline,
      },
      {
        id: 'in-person',
        label: 'In-Person',
        price: '£60',
        priceQualifier: '/hr',
        calendlyUrl: CALENDLY_EVENT_URLS.tutoringInPerson,
      },
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    priceLabel: '£45/hr',
    blurb: 'Recording, mixing, and mastering at The Alchemist Studio in Manchester.',
    calendlyUrl: CALENDLY_EVENT_URLS.studio1hr,
  },
  {
    id: 'mixing',
    label: 'Mix & Master',
    priceLabel: 'POA',
    blurb: 'Vocal mixes, full mix + master, mastering only. Discovery call to scope the project.',
    calendlyUrl: CALENDLY_EVENT_URLS.schedulingPage,
  },
];

export function getBookService(id: string | null): BookService | undefined {
  if (!id) return undefined;
  return BOOK_SERVICES.find(s => s.id === id);
}

export function getServiceMode(service: BookService, modeId: string | null): BookServiceMode | undefined {
  if (!service.modes || !modeId) return undefined;
  return service.modes.find(m => m.id === modeId);
}

/** Resolve which Calendly URL to load given a service + optional mode. */
export function resolveCalendlyUrl(service: BookService, modeId: string | null): string | null {
  if (service.modes && service.modes.length > 0) {
    // Service has variants — must pick one before we can resolve.
    const mode = getServiceMode(service, modeId);
    return mode?.calendlyUrl ?? null;
  }
  return service.calendlyUrl ?? null;
}
```

- [ ] **Step 2: Commit**

```bash
git add lib/book-services.ts
git commit -m "feat(booking): add service config module with online/in-person modes"
```

### Task 2: Verify the existing `/booking` shell

**Files:**
- Read only: `app/booking/page.tsx`

The existing shell is already correct — it has a `Suspense` boundary and a `Navigation` import. We don't replace it.

- [ ] **Step 1: Read `app/booking/page.tsx` and confirm**

Run: `Read app/booking/page.tsx`
Expected shape (already verified during plan generation):

```tsx
import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import BookingContent from './BookingContent';
// ... metadata, default export with <Suspense> wrapping <BookingContent />
```

- [ ] **Step 2: If the shell uses a Tailwind-based wrapper (`bg-black text-white`) instead of inline style, update the wrapper to inline-style for Design DNA parity**

Replace the wrapper div in `app/booking/page.tsx` with:

```tsx
<div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
  <Navigation />
  <Suspense fallback={
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
      <div style={{
        width: 32, height: 32,
        border: '2px solid rgba(255,255,255,0.2)',
        borderTopColor: '#fafafa',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
      }} />
    </div>
  }>
    <BookingContent />
  </Suspense>
</div>
```

If `@keyframes spin` is not defined in `app/globals.css`, add:

```css
@keyframes spin {
  to { transform: rotate(360deg); }
}
```

- [ ] **Step 3: Commit (deferred — bundle with Task 3)**

### Task 3: Replace `BookingContent` with picker UI (hero + cards)

**Files:**
- Modify (full rewrite): `app/booking/BookingContent.tsx`

This is the largest file in Phase 1. Build it in two passes — first the hero + cards (this task), then the Calendly reveal with mode-toggle (Task 4).

- [ ] **Step 1: Replace `app/booking/BookingContent.tsx` with hero + cards (no embed yet)**

The hero uses Design DNA archetype A (cinematic hero) at a smaller scale (no `100vh`, just enough for a clear opener). Cards use the split-row info-cell pattern (archetype D, info side only) styled as 3-up on desktop, stacked on mobile. Note the import path for `book-services` is `../../lib/book-services` (from `app/booking/` two levels up to repo root, then into `lib/`).

```tsx
'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  BOOK_SERVICES,
  getBookService,
  type BookServiceId,
  type BookMode,
} from '../../lib/book-services';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

export default function BookingContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialService = getBookService(searchParams.get('service'))?.id ?? null;
  const initialMode = searchParams.get('mode') as BookMode | null;

  const [selected, setSelected] = useState<BookServiceId | null>(initialService);
  const [mode, setMode] = useState<BookMode | null>(
    initialMode === 'online' || initialMode === 'in-person' ? initialMode : null,
  );

  // Keep URL in sync as the user picks
  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) params.set('service', selected);
    if (selected === 'tutoring' && mode) params.set('mode', mode);
    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(next, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, mode]);

  // When the user switches to a non-tutoring service, clear mode
  useEffect(() => {
    if (selected !== 'tutoring' && mode !== null) setMode(null);
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
                appearance: 'none', cursor: 'pointer',
                textAlign: 'left',
                padding: '64px 48px',
                color: '#fafafa',
                borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
                borderTop: 'none', borderRight: 'none', borderBottom: 'none',
                opacity: isAnotherSelected ? 0.4 : 1,
                background: isSelected ? '#111111' : 'transparent',
                transition: 'opacity 0.3s ease, background 0.3s ease',
                position: 'relative',
                display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
                minHeight: 320,
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
                  {service.priceLabel}
                </div>
                <p style={{
                  fontSize: 13, lineHeight: 1.8,
                  color: 'rgba(255,255,255,0.55)',
                  marginBottom: service.note ? 12 : 28,
                }}>
                  {service.blurb}
                </p>
                {service.note && (
                  <p style={{
                    fontSize: 11, lineHeight: 1.6,
                    color: 'rgba(255,255,255,0.35)',
                    marginBottom: 28,
                    fontStyle: 'italic',
                  }}>
                    {service.note}
                  </p>
                )}
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
/* 3-up desktop, stack mobile — used by /booking service picker */
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
Open: `http://localhost:3000/booking`
Expected: Hero ("BOOK A SESSION") renders. Three service cards render: Tutoring `from £45/hr` (with bulk-discount note), Studio `£45/hr`, Mix & Master `POA`. Clicking a card visually selects it (white "Selected" pill, dimmed neighbours, slight bg shift on the selected card).

If the page errors with "module not found", check the import path in `BookingContent.tsx` for `book-services` (must be `../../lib/book-services` from `app/booking/`).

- [ ] **Step 4: Commit**

```bash
git add app/booking/page.tsx app/booking/BookingContent.tsx app/globals.css
git commit -m "feat(booking): rebuild /booking with Design-DNA service picker (no embed yet)"
```

### Task 4: Add inline Calendly reveal + tutoring mode-toggle

**Files:**
- Modify: `app/booking/BookingContent.tsx`

The reveal handles two cases:
1. **Studio / Mixing** — direct embed (single Calendly URL).
2. **Tutoring** — first show a sub-toggle (Online £45/hr / In-Person £60/hr), then the embed for the chosen mode. Pre-selecting a mode via `?mode=` skips the toggle prompt.

- [ ] **Step 1: Import `CalendlyEmbed` and the resolver helper**

At the top of `app/booking/BookingContent.tsx`, update imports:

```tsx
import CalendlyEmbed from '../../components/CalendlyEmbed';
import {
  BOOK_SERVICES,
  getBookService,
  resolveCalendlyUrl,
  type BookServiceId,
  type BookMode,
} from '../../lib/book-services';
```

Note the path: from `app/booking/` it's `../../components/CalendlyEmbed` (matches the existing consumer pattern at `app/tutoring/page.tsx:10`).

- [ ] **Step 2: Add the reveal section after the cards section**

Append inside `BookingContent`'s returned fragment, after the closing `</section>` of the service cards:

```tsx
      {/* MODE TOGGLE — only when tutoring is selected and no mode is chosen yet */}
      {selected === 'tutoring' && !mode && (() => {
        const service = BOOK_SERVICES.find(s => s.id === 'tutoring')!;
        return (
          <motion.section
            key="tutoring-mode-toggle"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              padding: '80px 48px',
              borderBottom: '1px solid #1a1a1a',
              textAlign: 'center',
            }}
          >
            <div style={{
              fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', marginBottom: 14,
            }}>
              Tutoring — Pick a mode
            </div>
            <div style={{
              display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap',
            }}>
              {service.modes!.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    appearance: 'none', cursor: 'pointer',
                    padding: '14px 28px',
                    fontWeight: 900, fontSize: 11, letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    background: 'transparent', color: '#fafafa',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = '#fafafa';
                    (e.currentTarget as HTMLButtonElement).style.color = '#080808';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                    (e.currentTarget as HTMLButtonElement).style.color = '#fafafa';
                  }}
                >
                  {m.label} — {m.price}{m.priceQualifier} →
                </button>
              ))}
            </div>
          </motion.section>
        );
      })()}

      {/* CALENDLY EMBED — when service is fully resolved (studio / mixing direct, tutoring + mode) */}
      {selected && (() => {
        const service = BOOK_SERVICES.find(s => s.id === selected)!;
        const url = resolveCalendlyUrl(service, mode);
        if (!url) return null;
        const subtitle =
          service.id === 'tutoring' && mode
            ? `Tutoring · ${mode === 'online' ? 'Online' : 'In-Person'}`
            : service.label;
        return (
          <motion.section
            key={`embed-${selected}-${mode ?? ''}`}
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
              Schedule &mdash; {subtitle}
            </div>
            {service.id === 'tutoring' && mode && (
              <div style={{
                textAlign: 'center', marginBottom: 24,
              }}>
                <button
                  onClick={() => setMode(null)}
                  style={{
                    appearance: 'none', cursor: 'pointer',
                    background: 'transparent', border: 'none',
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  ← Switch mode
                </button>
              </div>
            )}
            <CalendlyEmbed url={url} height={780} />
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

- [ ] **Step 3: Verify the flows in the browser**

Run: `npm run dev` (already running)

**Studio flow:** Open `http://localhost:3000/booking`. Click "Studio". Expected: Calendly embed loads below within 1–2 seconds. URL becomes `/booking?service=studio`.

**Tutoring flow:** Click "Tutoring". Expected: mode-toggle section appears with two buttons (`Online — £45/hr →`, `In-Person — £60/hr →`). Click "Online". Expected: toggle disappears, Calendly embed for online tutoring loads. URL becomes `/booking?service=tutoring&mode=online`. A small "← Switch mode" link sits above the embed.

**Mix & Master flow:** Click "Mix & Master". Expected: Calendly scheduling-page embed loads. URL becomes `/booking?service=mixing`.

**Deep links:** Open `http://localhost:3000/booking?service=tutoring&mode=in-person` directly. Expected: tutoring card pre-selected, mode toggle skipped, in-person Calendly embeds.

- [ ] **Step 4: Commit**

```bash
git add app/booking/BookingContent.tsx
git commit -m "feat(booking): inline Calendly reveal with tutoring mode-toggle"
```

### (Task 5 removed — no redirect needed)

The earlier draft of this plan created a new `/book` route and redirected `/booking` to it. That's been dropped per Logan's feedback ("redo the current one"). Tasks 2–4 above rebuild `/booking` in place; no redirect work is needed.

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
  { label: 'Book', href: '/booking' },
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

- [ ] **Step 4: Add the "Book" CTA to the nav**

The homepage's existing `NAV_LINKS` array (lines 100–105 of `app/page.tsx`) stays intact:

```tsx
const NAV_LINKS = [
  { label: 'Music', href: '#releases' },
  { label: 'Studio', href: '/studio' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];
```

Below the array, add a separate constant for the CTA:

```tsx
const NAV_CTA = { label: 'Book', href: '/booking' };
```

The CTA is a separate visual element (white pill) — it sits to the right of the link list, not as part of it.

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
- Desktop: nav shows `Music · Studio · Shop · Contact` plus a white "Book →" pill on the right.
- Mobile (DevTools, iPhone 14 viewport): nav has hamburger only at top. Scroll down past the hero. Jump nav appears at top with `Studio · Music · About · Book` chips. Tap any chip — page scrolls to the matching section (`#studio`, `#releases`, `#about`) or navigates to `/booking`. Tap the hamburger — fullscreen menu appears with `Music · Studio · Shop · Contact` plus a separate `BOOK →` pill at the bottom.

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

## Section 3 — `/tutoring` and `/studio` embeds stay

Per Logan's feedback ("users should still be able to book directly, frictionless on tutoring and studio"), Phase 1 does **not** strip the inline Calendly embeds from `/tutoring` or `/studio`. A user already on those pages has chosen the service — making them re-pick at `/booking` is friction.

The full visual restyle of `/tutoring` (Phase 2) and `/studio` (Phase 3) — including the embed presentation matching Design DNA — happens in their dedicated phases. **No tasks in Phase 1 touch these pages.**

The `/booking` hub serves a different audience: users who land via nav, ads, or the homepage's Book CTA — i.e., users who haven't already chosen.

---

## Section 4 — Phase 1 acceptance gate

### Task 12: Cross-device QA + final verification

- [ ] **Step 1: Run the full build to surface compile errors**

Run: `npm run build`
Expected: build succeeds. Common issues to watch:
- The `BookingContent.tsx` import path for `CalendlyEmbed` (must be `../../components/CalendlyEmbed` from `app/booking/`).
- Missing `'use client'` directive on `BookingContent.tsx` or `MobileJumpNav.tsx`.
- Unused imports flagged by ESLint.

- [ ] **Step 2: Manual QA matrix — desktop (1440px)**

Run: `npm run dev`
- `/` — homepage. Nav shows `Music · Studio · Shop · Contact` + white "Book →" pill. Hover states fire on nav links.
- `/booking` — picker hero, three cards, no embed until click. Studio click → embed loads. Mixing click → embed loads. Tutoring click → mode toggle appears (Online / In-Person), pick one → embed loads.
- `/booking?service=studio` — studio pre-selected, embed loads immediately.
- `/booking?service=mixing` — mixing pre-selected, embed loads immediately.
- `/booking?service=tutoring` — tutoring pre-selected, mode toggle visible (no auto-pick).
- `/booking?service=tutoring&mode=online` — mode pre-selected, online tutoring embed loads, "← Switch mode" link visible above the embed.
- `/booking?service=tutoring&mode=in-person` — same as above for in-person.
- `/tutoring` — unchanged from current state. Inline Calendly embed still present and functional. Phase 2 will restyle it.
- `/studio` — unchanged from current state. Inline Calendly embed still present and functional. Phase 3 will restyle it.

- [ ] **Step 3: Manual QA matrix — mobile (iPhone 14, 390 × 844)**

In DevTools mobile mode:
- `/` — hero scales down via clamp. Tap hamburger; mobile menu opens with `Music · Studio · Shop · Contact` + Book pill at the bottom. Scroll down past hero — jump nav appears at top with `Studio · Music · About · Book` chips. Tap each chip; page scrolls to anchor or navigates to `/booking`.
- `/booking` — cards stack vertically. Tap "Tutoring" → mode toggle appears below the cards. Tap a mode → embed loads. Embed has comfortable horizontal padding (not edge-touching).
- Visual check on the homepage: grid-two-col info cells (about, studio sections) have visibly tighter horizontal padding (24px) vs desktop's 48px.

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

- [ ] `/booking` renders the new Design-DNA picker (hero + 3 cards). All three services select correctly.
- [ ] Studio and Mixing cards reveal Calendly directly. Tutoring card reveals an Online/In-Person toggle, then the embed.
- [ ] Deep-links work: `/booking?service=tutoring&mode=online`, `/booking?service=tutoring&mode=in-person`, `/booking?service=studio`, `/booking?service=mixing`.
- [ ] Tutoring prices reflect the correct rates (£45 online, £60 in-person). Bulk-discount note visible on the tutoring card.
- [ ] Homepage on mobile (iPhone 14 viewport): jump nav appears past hero with `Studio · Music · About · Book`, anchors work, hamburger menu shows Book pill.
- [ ] Homepage on desktop: nav shows `Music · Studio · Shop · Contact` (Shop kept) plus a white "Book →" CTA pill on the right.
- [ ] `/tutoring` and `/studio` are unchanged — their inline Calendly embeds still work for direct booking.
- [ ] `npm run build` succeeds with no errors or warnings.
- [ ] Mobile horizontal padding is visibly tightened (24px) on grid-two-col cells without breaking desktop.

---

## Next phase

Phase 2 (tutoring page restyle) gets its own implementation plan, written **after** Phase 1 lands. Phase 2 will use the Design DNA reference and any Phase 1 lessons to rebuild `/tutoring` to match the homepage.

To generate Phase 2's plan: run `superpowers:writing-plans` against spec §7 once Phase 1's acceptance gate has passed.
