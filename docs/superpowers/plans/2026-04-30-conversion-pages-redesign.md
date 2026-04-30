# Conversion Pages Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the tutoring, studio, /booking, and /free pages for maximum conversion — direct Calendly links, no embedded widgets, mobile-first, free call as the dominant CTA on every page.

**Architecture:** Two new shared components (`ServiceBookingBlock`, `StickyCallBar`) used across all four pages. CSS utilities added to `globals.css`. Each page fully rewritten to the new structure. No Calendly embeds remain after this work.

**Tech Stack:** Next.js 16 App Router, TypeScript, inline styles, Framer Motion (existing), Tailwind not used — all styling via inline styles and globals.css utility classes.

**Spec:** `docs/superpowers/specs/2026-04-30-conversion-pages-redesign.md`

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Modify | `app/globals.css` | Add `.hero-compact`, `.booking-options-grid`, `.sticky-call-bar` |
| Create | `app/components/ServiceBookingBlock.tsx` | Reusable booking CTA block — free call + options + packs |
| Create | `app/components/StickyCallBar.tsx` | Mobile-only fixed bar that appears on scroll |
| Rewrite | `app/tutoring/page.tsx` | 5-section layout, no embeds |
| Rewrite | `app/studio/page.tsx` | 7-section layout, no embeds |
| Rewrite | `app/booking/BookingContent.tsx` | 3 service blocks, no hero, no multi-step flow |
| Simplify | `app/booking/page.tsx` | Remove Suspense (no longer needed) |
| Update | `app/free/page.tsx` | Compact header, direct free call link, keep email forms |

---

## Task 1: Add CSS utilities to globals.css

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Add utilities to the bottom of globals.css**

Open `app/globals.css` and append the following at the end of the file:

```css
/* Compact hero — 440px min desktop, auto on mobile */
.hero-compact {
  min-height: 440px;
}
@media (max-width: 768px) {
  .hero-compact {
    min-height: unset;
    padding-bottom: 48px !important;
    padding-left: 24px !important;
  }
}

/* Booking options grid — 2-col desktop, 1-col mobile */
.booking-options-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}
@media (max-width: 480px) {
  .booking-options-grid {
    grid-template-columns: 1fr;
  }
}

/* Sticky call bar — hidden desktop, shown mobile only */
.sticky-call-bar {
  display: none;
}
@media (max-width: 768px) {
  .sticky-call-bar {
    display: block;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add app/globals.css
git commit -m "feat: add hero-compact, booking-options-grid, sticky-call-bar CSS utilities"
```

---

## Task 2: Create ServiceBookingBlock component

**Files:**
- Create: `app/components/ServiceBookingBlock.tsx`

This component renders the standard booking pattern across all pages:
1. Full-width white button for the free call (most prominent)
2. 2-col grid for paid options (stacks to 1-col on mobile via `.booking-options-grid`)
3. Dashed-border row(s) for packs (always visible)

The `freeCallUrl` is optional — when omitted (e.g. M&M block), only the options grid renders.

- [ ] **Step 1: Create the file**

Create `app/components/ServiceBookingBlock.tsx` with this exact content:

```tsx
interface BookingOption {
  label: string;
  sublabel?: string;
  price?: string;
  url: string;
  isPacks?: boolean;
}

interface ServiceBookingBlockProps {
  freeCallUrl?: string;
  freeCallLabel?: string;
  freeCallSublabel?: string;
  options: BookingOption[];
}

export default function ServiceBookingBlock({
  freeCallUrl,
  freeCallLabel = 'Book a Free Call →',
  freeCallSublabel,
  options,
}: ServiceBookingBlockProps) {
  const paidOptions = options.filter(o => !o.isPacks);
  const packsOptions = options.filter(o => o.isPacks);

  return (
    <div style={{
      padding: 'clamp(20px, 5vw, 48px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
    }}>
      {freeCallUrl && (
        <a
          href={freeCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '18px 24px',
            background: '#fafafa',
            color: '#080808',
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          <span style={{
            display: 'block',
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: '-0.01em',
          }}>
            {freeCallLabel}
          </span>
          {freeCallSublabel && (
            <span style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'rgba(0,0,0,0.5)',
              marginTop: 3,
            }}>
              {freeCallSublabel}
            </span>
          )}
        </a>
      )}

      {paidOptions.length > 0 && (
        <div className="booking-options-grid">
          {paidOptions.map(opt => {
            const isExternal = opt.url.startsWith('http');
            const Tag = isExternal ? 'a' : 'a';
            const extraProps = isExternal
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};
            return (
              <a
                key={opt.url}
                href={opt.url}
                {...extraProps}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: '#fafafa',
                  textDecoration: 'none',
                }}
              >
                <span style={{ display: 'block', fontWeight: 900, fontSize: 13 }}>
                  {opt.label}{opt.price ? ` — ${opt.price}` : ''} →
                </span>
                {opt.sublabel && (
                  <span style={{
                    display: 'block',
                    fontWeight: 400,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 3,
                  }}>
                    {opt.sublabel}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {packsOptions.map(opt => {
        const isExternal = opt.url.startsWith('http');
        const extraProps = isExternal
          ? { target: '_blank' as const, rel: 'noopener noreferrer' }
          : {};
        return (
          <a
            key={opt.url}
            href={opt.url}
            {...extraProps}
            style={{
              display: 'block',
              padding: '16px 20px',
              border: '1.5px dashed rgba(255,255,255,0.25)',
              color: '#fafafa',
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'block', fontWeight: 900, fontSize: 13 }}>
              {opt.label}{opt.price ? ` — ${opt.price}` : ''} →
            </span>
            {opt.sublabel && (
              <span style={{
                display: 'block',
                fontWeight: 400,
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                marginTop: 3,
              }}>
                {opt.sublabel}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/ServiceBookingBlock.tsx
git commit -m "feat: add ServiceBookingBlock component — free call + options + packs pattern"
```

---

## Task 3: Create StickyCallBar component

**Files:**
- Create: `app/components/StickyCallBar.tsx`

Mobile-only bar, fixed to the bottom. Hidden via `.sticky-call-bar` CSS class on desktop. Slides in after 400px scroll.

- [ ] **Step 1: Create the file**

Create `app/components/StickyCallBar.tsx`:

```tsx
'use client';

import { useState, useEffect } from 'react';

interface StickyCallBarProps {
  url: string;
  label?: string;
}

export default function StickyCallBar({ url, label = 'Book Free Call →' }: StickyCallBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="sticky-call-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fafafa',
        color: '#080808',
        textAlign: 'center',
        padding: '16px 24px',
        fontWeight: 900,
        fontSize: 13,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        zIndex: 50,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      {label}
    </a>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/components/StickyCallBar.tsx
git commit -m "feat: add StickyCallBar — mobile-only fixed bottom CTA, appears after scroll"
```

---

## Task 4: Rewrite tutoring page

**Files:**
- Rewrite: `app/tutoring/page.tsx`

New structure:
1. Hero (compact, parallax desktop-only, big headline)
2. Booking section (ServiceBookingBlock)
3. What You Get (3 bullet rows)
4. Testimonials (existing component)
5. FAQ (existing component)

Removes: BookingPrompt, CalendlyEmbed, What You'll Learn grid, Pricing section, Bulk Sessions section, The Case section, The Guide section, How It Works section, scroll indicator, `useState` for booking mode.

- [ ] **Step 1: Replace app/tutoring/page.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { CALENDLY_EVENT_URLS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const WHAT_YOU_GET = [
  {
    label: '01',
    title: 'Production, mixing, recording & songwriting',
    desc: "Ableton, any DAW, vocal engineering, flow and lyricism. Your music is the lesson — we work on what you're actually making, from day one.",
  },
  {
    label: '02',
    title: 'Every session built around you',
    desc: "What you're working on is what we work on. No course, no curriculum — just direct, honest feedback that moves you forward.",
  },
  {
    label: '03',
    title: '6+ years. Real credits. Still making music.',
    desc: "Recording artist, mixing engineer, studio owner. The experience to know what works — and the honesty to tell you when something doesn't.",
  },
];

export default function TutoringPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      const y = window.scrollY;
      if (heroParallaxRef.current) {
        heroParallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      if (heroImgRef.current && heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const fade = Math.max(0, 0.45 - (y / (heroH * 0.55)) * 0.45);
        heroImgRef.current.style.opacity = String(fade);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="hero-compact"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 72,
          paddingLeft: 'clamp(20px, 5vw, 48px)' as unknown as number,
        }}
      >
        <div ref={heroParallaxRef} style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111', willChange: 'transform',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            src="/elcee-portrait.jpg"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 15%',
              filter: 'grayscale(100%) contrast(1.08)',
              opacity: 0.45,
            }}
          />
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.75, mixBlendMode: 'screen', pointerEvents: 'none',
        } as React.CSSProperties} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Tuition — Manchester
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
            Learn From An Artist.<br />Not An Algorithm.
          </h1>
          <p style={{
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}>
            1-1 Lessons. Real Studio. Real Artist.
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 28,
            letterSpacing: '0.05em',
          }}>
            Online £45/hr · In-Person £60/hr · First session always free
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Book a Free Call →
            </a>
            <a href="#what-you-get" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              See Options ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <motion.section {...fadeUp} id="booking" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Book
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Book a Session
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeTutoringConsultation}
          freeCallLabel="Book a Free Tutoring Consultation →"
          freeCallSublabel="20 minutes. Tell me where you're at and where you want to go."
          options={[
            {
              label: 'Online Tutoring',
              price: '£45/hr',
              url: CALENDLY_EVENT_URLS.tutoringOnline,
            },
            {
              label: 'In-Person Tutoring',
              price: '£60/hr',
              url: CALENDLY_EVENT_URLS.tutoringInPerson,
            },
            {
              label: 'Session packs — save up to £120',
              url: CALENDLY_BUNDLE_LINKS.online10,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── WHAT YOU GET ── */}
      <motion.section {...fadeUp} id="what-you-get" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            What You Get
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
          }}>
            Built Around You
          </h2>
        </div>
        {WHAT_YOU_GET.map(item => (
          <div
            key={item.label}
            style={{
              padding: 'clamp(24px, 6vw, 48px) clamp(20px, 5vw, 48px)',
              borderBottom: '1px solid #1a1a1a',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', paddingTop: 4 }}>
              {item.label}
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: 'clamp(15px, 2vw, 20px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 10 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.section>

      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeTutoringConsultation}
        label="Book Free Tutoring Consultation →"
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors. If TypeScript complains about `paddingLeft: 'clamp(...)'`, change those lines to use `style={{ ... } as React.CSSProperties}`.

- [ ] **Step 3: Start dev server and check the tutoring page visually**

```bash
npm run dev
```

Open `http://localhost:3000/tutoring` in a browser. Verify:
- Hero shows "LEARN FROM AN ARTIST. NOT AN ALGORITHM." big, "1-1 Lessons. Real Studio. Real Artist." smaller below
- Price line "Online £45/hr · In-Person £60/hr · First session always free" visible
- Booking section below hero with white full-width free call button
- 2-col options grid for online/in-person
- Dashed row for session packs
- 3 bullet rows in "What You Get"
- No CalendlyEmbed, no multi-step modal
- On mobile: parallax image is static (no JS movement), hero height is auto

- [ ] **Step 4: Commit**

```bash
git add app/tutoring/page.tsx
git commit -m "feat: rewrite tutoring page — direct booking links, compact hero, What You Get section"
```

---

## Task 5: Rewrite studio page

**Files:**
- Rewrite: `app/studio/page.tsx`

New structure:
1. Hero (compact, parallax desktop-only, studio image)
2. Booking section (ServiceBookingBlock)
3. What You Get (3 bullets)
4. Mixing & Mastering (direct payment links, id="mix-master")
5. Testimonials (existing component)
6. Serious Artist Plan (dark premium section)
7. FAQ (existing component)

Removes: Services grid, Pricing tables, Facility section, How It Works section, CalendlyEmbed, BookingPrompt, scroll indicator, `useState` for studioMode, `BOOK_SERVICES` import.

- [ ] **Step 1: Replace app/studio/page.tsx**

```tsx
'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StructuredData from './components/StructuredData';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import { CALENDLY_EVENT_URLS, CALENDLY_PAYMENT_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const WHAT_YOU_GET = [
  {
    label: '01',
    title: 'Acoustically treated Manchester studio',
    desc: 'Professional, focused recording environment. Not just a room with a mic — built for accurate results whether you\'re tracking vocals, instruments, or mixing.',
  },
  {
    label: '02',
    title: 'A working artist with 6+ years experience',
    desc: "Not a session engineer who clocks in and out. Someone who's still making music, with the taste and technical skills to get the best out of your session.",
  },
  {
    label: '03',
    title: 'Fast delivery, revisions included',
    desc: 'Mixes and masters back within 5 working days. You sign off — not me. Revisions until it\'s right.',
  },
];

const MIX_MASTER_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3, note: 'Save £100' },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5, note: 'Save £250' },
];

export default function StudioPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
      const y = window.scrollY;
      if (heroParallaxRef.current) {
        heroParallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      if (heroImgRef.current && heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const fade = Math.max(0, 0.45 - (y / (heroH * 0.55)) * 0.45);
        heroImgRef.current.style.opacity = String(fade);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <StructuredData />
      <Navigation />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        className="hero-compact"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 72,
          paddingLeft: 'clamp(20px, 5vw, 48px)' as unknown as number,
        }}
      >
        <div ref={heroParallaxRef} style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111', willChange: 'transform',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            src="/studio/studio-interior-front.jpg"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
              filter: 'grayscale(100%) contrast(1.08)',
              opacity: 0.45,
            }}
          />
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.75, mixBlendMode: 'screen', pointerEvents: 'none',
        } as React.CSSProperties} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Studio
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 112px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 12,
          }}>
            The Alchemist<br />Studio
          </h1>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 28,
            letterSpacing: '0.05em',
          }}>
            £35/hr · First session free
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Book a Free Call →
            </a>
            <a href="#mix-master" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              Mix / Master ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <motion.section {...fadeUp} id="booking" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Book
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Book a Session
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeStudioEnquiry}
          freeCallLabel="Book a Free Studio Enquiry →"
          freeCallSublabel="20 minutes. Tell me about your project and we'll work out the best plan."
          options={[
            {
              label: 'Book Studio Time',
              price: '£35/hr',
              url: CALENDLY_EVENT_URLS.studio1hr,
              sublabel: 'You pick the duration on Calendly',
            },
            {
              label: 'Mix / Master',
              sublabel: 'Jump to prices ↓',
              url: '#mix-master',
            },
            {
              label: 'Multi-track packs — save up to £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── WHAT YOU GET ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            What You Get
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
          }}>
            The Studio
          </h2>
        </div>
        {WHAT_YOU_GET.map(item => (
          <div
            key={item.label}
            style={{
              padding: 'clamp(24px, 6vw, 48px) clamp(20px, 5vw, 48px)',
              borderBottom: '1px solid #1a1a1a',
              display: 'grid',
              gridTemplateColumns: '40px 1fr',
              gap: 24,
            }}
          >
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', paddingTop: 4 }}>
              {item.label}
            </div>
            <div>
              <p style={{ fontWeight: 900, fontSize: 'clamp(15px, 2vw, 20px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 10 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </motion.section>

      {/* ── MIXING & MASTERING ── */}
      <motion.section {...fadeUp} id="mix-master" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Remote
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 12,
          }}>
            Mixing &amp; Mastering
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Pay upfront and send your files. Turnaround within 5 working days.
          </p>
        </div>
        <div style={{ borderBottom: '1px solid #1a1a1a' }}>
          {MIX_MASTER_SERVICES.map((service, i) => (
            <a
              key={service.label}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(16px, 3vw, 24px) clamp(20px, 5vw, 48px)',
                borderTop: i === 0 ? 'none' : '1px solid #1a1a1a',
                color: '#fafafa',
                textDecoration: 'none',
                background: '#111111',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111111'; }}
            >
              <div>
                <span style={{ fontWeight: 900, fontSize: 15 }}>{service.label}</span>
                {service.note && (
                  <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    {service.note}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{service.price} →</span>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      {/* ── SERIOUS ARTIST PLAN ── */}
      <motion.section
        {...fadeUp}
        style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.08)',
          margin: '0',
        }}
      >
        <div style={{ padding: 'clamp(40px, 6vw, 72px) clamp(20px, 5vw, 48px)' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Serious Artist Plan
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 20,
            maxWidth: 520,
          }}>
            Not for everyone. For artists ready to commit.
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', maxWidth: 480, marginBottom: 24 }}>
            Consistent studio time is how careers are built. Monthly access, priority booking, and a rate that reflects your seriousness.
          </p>
          <p style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em', marginBottom: 28 }}>
            £30/hr · £240/month
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
            fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#fafafa', color: '#080808', textDecoration: 'none',
          }}>
            Apply →
          </Link>
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeStudioEnquiry}
        label="Book Free Studio Enquiry →"
      />
    </div>
  );
}
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 3: Check studio page visually**

Open `http://localhost:3000/studio`. Verify:
- Hero shows "The Alchemist Studio" + "£35/hr · First session free"
- Booking section with free studio enquiry white button
- Studio time + mix/master options in 2-col grid
- Dashed packs row
- What You Get has 3 bullet rows
- Mixing & Mastering list with prices, clickable
- Serious Artist Plan section (dark, after testimonials)
- No CalendlyEmbed, no pricing tables, no services grid

- [ ] **Step 4: Commit**

```bash
git add app/studio/page.tsx
git commit -m "feat: rewrite studio page — direct links, Serious Artist Plan, no embeds"
```

---

## Task 6: Rewrite booking pages

**Files:**
- Rewrite: `app/booking/BookingContent.tsx`
- Simplify: `app/booking/page.tsx`

New booking page: compact header, then 3 service blocks immediately. No hero, no multi-step flow, no embed. Navigation and SiteFooter added here (previously missing from this page).

- [ ] **Step 1: Replace app/booking/BookingContent.tsx**

```tsx
'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import { CALENDLY_EVENT_URLS, CALENDLY_PAYMENT_LINKS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

export default function BookingContent() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 48px) clamp(40px, 6vw, 64px)',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Book
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 96px)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#fafafa',
          marginBottom: 12,
        }}>
          Book a Session.
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.01em' }}>
          Pick a service &amp; choose a time.
        </p>
      </section>

      {/* ── TUTORING BLOCK ── */}
      <motion.section {...fadeUp} style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            01 — Tutoring
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            1-1 Music Lessons
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeTutoringConsultation}
          freeCallLabel="Book a Free Tutoring Consultation →"
          freeCallSublabel="20 minutes. Tell me where you're at and where you want to go."
          options={[
            {
              label: 'Online',
              price: '£45/hr',
              url: CALENDLY_EVENT_URLS.tutoringOnline,
            },
            {
              label: 'In-Person',
              price: '£60/hr',
              url: CALENDLY_EVENT_URLS.tutoringInPerson,
            },
            {
              label: 'Session packs — save up to £120',
              url: CALENDLY_BUNDLE_LINKS.online10,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── STUDIO RECORDING BLOCK ── */}
      <motion.section {...fadeUp} style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            02 — Studio
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Studio Recording
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeStudioEnquiry}
          freeCallLabel="Book a Free Studio Enquiry →"
          freeCallSublabel="20 minutes. Tell me about your project and we'll work out the best plan."
          options={[
            {
              label: 'Book Studio Time',
              price: '£35/hr',
              url: CALENDLY_EVENT_URLS.studio1hr,
              sublabel: 'Pick duration on Calendly',
            },
            {
              label: 'Mix / Master',
              sublabel: 'See prices below ↓',
              url: '#mix-master',
            },
            {
              label: 'Multi-track packs — save up to £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── MIXING & MASTERING BLOCK ── */}
      <motion.section {...fadeUp} id="mix-master" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            03 — Remote
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Mixing &amp; Mastering
          </h2>
        </div>
        <ServiceBookingBlock
          options={[
            {
              label: 'Full Mix + Master',
              price: '£340',
              url: CALENDLY_PAYMENT_LINKS.fullMixMaster,
            },
            {
              label: 'Vocal Mix',
              price: '£190',
              url: CALENDLY_PAYMENT_LINKS.vocalMix,
            },
            {
              label: 'Mastering',
              price: '£40',
              url: CALENDLY_PAYMENT_LINKS.mastering,
            },
            {
              label: '3-Track Package',
              price: '£920',
              sublabel: 'Save £100',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
            {
              label: '5-Track Package',
              price: '£1,450',
              sublabel: 'Save £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack5,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeIntroCall}
        label="Book a Free Call →"
      />
    </div>
  );
}
```

- [ ] **Step 2: Replace app/booking/page.tsx**

```tsx
import type { Metadata } from 'next';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee The Alchemist',
  description: 'Book studio time, tutoring, or a mix and master. Pick your service and choose a time.',
};

export default function BookingPage() {
  return <BookingContent />;
}
```

- [ ] **Step 3: Verify build passes**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 4: Check booking page visually**

Open `http://localhost:3000/booking`. Verify:
- Navigation bar present at top
- Compact page header "BOOK A SESSION." immediately below nav
- Three service blocks stacked: tutoring, studio, mixing & mastering
- Each has white free call button (except M&M block which has no free call)
- Paid options in 2-col grid
- Dashed packs row
- No 640px hero, no click-to-select, no CalendlyEmbed

- [ ] **Step 5: Commit**

```bash
git add app/booking/BookingContent.tsx app/booking/page.tsx
git commit -m "feat: rewrite booking page — 3 direct-link service blocks, no hero, no embed"
```

---

## Task 7: Update free page

**Files:**
- Update: `app/free/page.tsx`

Changes:
- Replace the 640px hero with a compact text header
- Replace the CalendlyEmbed section with a direct link CTA block
- Keep `DiscountCaptureForm` and `DownloadCard` components exactly as-is
- Keep Reddit tracking

- [ ] **Step 1: Replace the hero section and free track review section in app/free/page.tsx**

The `DiscountCaptureForm` and `DownloadCard` components (lines 51–189) stay exactly the same.
Only `FreePage` (lines 191–360) changes. Replace the `FreePage` function with:

```tsx
export default function FreePage() {
  useEffect(() => {
    if (document.referrer.includes('reddit.com')) {
      track('visit_from_reddit');
    }
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 48px) clamp(40px, 6vw, 64px)',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Free
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(36px, 6vw, 80px)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#fafafa',
        }}>
          Free resources<br />&amp; a free call.
        </h1>
      </section>

      {/* ── FREE INTRO CALL ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            01 — Free Call
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 16,
          }}>
            Free Intro Call
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', maxWidth: 520, marginBottom: 32 }}>
            20 minutes. Tell me what you&apos;re working on, and I&apos;ll tell you exactly how I can help — whether that&apos;s tutoring, studio time, or mixing. No commitment.
          </p>
          <a
            href="https://calendly.com/elcee-mgmt/free-intro-call"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background: '#fafafa',
              color: '#080808',
              textDecoration: 'none',
            }}
          >
            Book a Free Intro Call →
          </a>
        </div>
      </motion.section>

      {/* ── DISCOUNT — light section ── */}
      <motion.section
        {...fadeUp}
        style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover',
          opacity: 0.06,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 400 }}>
          <div style={{ padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              02 — Discount
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
              10% Off Your<br />First Booking
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', maxWidth: 400, marginBottom: 36 }}>
              Drop your email and I&apos;ll send the discount code straight over. Works on any session, mix, master, or tutoring.
            </p>
            <DiscountCaptureForm />
          </div>
          <div style={{
            borderLeft: '2px solid rgba(0,0,0,0.08)',
            background: 'rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 48px)',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 900, fontSize: 'clamp(64px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#080808' }}>10%</p>
              <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>Off Your First Booking</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── FREE DOWNLOADS ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 6vw, 48px) clamp(20px, 5vw, 48px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            03 — Downloads
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Free Downloads
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>
            Drop your email and I&apos;ll send it straight over.
          </p>
        </div>
        <div className="grid-two-col">
          {MAGNETS.map((m, i) => (
            <div key={m.id} style={{ borderLeft: i % 2 === 1 ? '1px solid #1a1a1a' : 'none' }}>
              <DownloadCard {...m} />
            </div>
          ))}
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
```

Note: the `useRef` and parallax `useEffect` from the original are removed. The `heroParallaxRef` and `heroRef` refs are no longer needed.

Also remove unused imports at the top of the file — remove `useRef` from the `useEffect, useRef` import since we only use `useEffect` now. The CalendlyEmbed import also needs to be removed.

The full updated imports block should be:

```tsx
'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import { track } from '@vercel/analytics';
```

- [ ] **Step 2: Verify build passes**

```bash
cd /Users/logancooney/Projects/elcee-website && npx tsc --noEmit 2>&1 | head -40
```

Expected: no errors.

- [ ] **Step 3: Check free page visually**

Open `http://localhost:3000/free`. Verify:
- No 640px hero — just compact text header "FREE RESOURCES & A FREE CALL."
- Free Intro Call section with white button "Book a Free Intro Call →"
- 10% discount section (light background) with email form
- Free downloads section with email capture cards
- No CalendlyEmbed anywhere on the page

- [ ] **Step 4: Commit**

```bash
git add app/free/page.tsx
git commit -m "feat: update free page — compact header, direct free call link, remove embed"
```

---

## Self-Review Checklist

After all tasks are committed, run through the spec against what was built:

**Spec coverage:**
- [ ] Tutoring hero: "LEARN FROM AN ARTIST. NOT AN ALGORITHM." ✓
- [ ] Tutoring booking: free consultation + online + in-person + packs ✓
- [ ] Tutoring: What You Get 3 bullets ✓
- [ ] Studio hero: "The Alchemist Studio" + price line ✓
- [ ] Studio booking: free enquiry + studio time + mix/master anchor + packs ✓
- [ ] Studio: Mixing & Mastering payment link list ✓
- [ ] Studio: Serious Artist Plan section ✓
- [ ] Booking: no hero, compact header ✓
- [ ] Booking: 3 service blocks with direct links ✓
- [ ] Free: compact header ✓
- [ ] Free: Free Intro Call as most prominent CTA ✓
- [ ] Mobile: `.hero-compact` collapses hero height on mobile ✓
- [ ] Mobile: `.sticky-call-bar` shows fixed bar after scroll on mobile ✓
- [ ] Mobile: `.booking-options-grid` stacks to 1-col at 480px ✓
- [ ] Mobile: parallax disabled on screens ≤768px ✓
- [ ] No CalendlyEmbed on any of the 4 pages ✓
- [ ] No BookingPrompt on any of the 4 pages ✓
- [ ] All Calendly links use correct event URLs from calendly-config.ts ✓
