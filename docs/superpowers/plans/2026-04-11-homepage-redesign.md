# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the homepage to be artist-only — music, video, about, and platforms — with Nimbus Sans typography, monochromatic palette, smooth scroll, parallax hero, and named asset slots for Photoshop files.

**Architecture:** Homepage is assembled from focused section components in `app/components/home/`. Lenis smooth scroll is initialised once in a client wrapper mounted in the root layout. Navigation gains a `transparent` prop used only on the homepage. All texture/background assets are referenced from `/public/assets/` — the code works without them (falls back to black).

**Tech Stack:** Next.js 15 App Router, TypeScript, Tailwind CSS v4, Lenis (smooth scroll), Adobe Fonts (Nimbus Sans via `https://use.typekit.net/nmf5wle.css`).

**Spec:** `docs/superpowers/specs/2026-04-11-homepage-redesign.md`

---

## File Map

| File | Action |
|---|---|
| `app/components/SmoothScroll.tsx` | Create |
| `app/components/Navigation.tsx` | Modify |
| `app/components/home/Hero.tsx` | Create |
| `app/components/home/Music.tsx` | Create |
| `app/components/home/VideoGrid.tsx` | Create |
| `app/components/home/About.tsx` | Create |
| `app/components/home/Platforms.tsx` | Create |
| `app/globals.css` | Modify |
| `app/layout.tsx` | Modify |
| `app/page.tsx` | Modify |
| `public/assets/ASSETS.md` | Create |

---

## Task 1: Install Lenis

**Files:**
- Modify: `package.json` (via npm)

- [ ] **Step 1: Install the package**

```bash
cd /Users/logancooney/Sites/elcee-website
npm install lenis
```

Expected: `lenis` appears in `package.json` dependencies. No errors.

- [ ] **Step 2: Verify install**

```bash
cat node_modules/lenis/package.json | grep '"version"'
```

Expected: a version string, e.g. `"version": "1.x.x"`.

- [ ] **Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "install lenis for smooth scroll"
```

---

## Task 2: Create SmoothScroll component

**Files:**
- Create: `app/components/SmoothScroll.tsx`
- Modify: `app/layout.tsx`

- [ ] **Step 1: Create the component**

Create `app/components/SmoothScroll.tsx` with this exact content:

```tsx
'use client';

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    // Disable on touch devices — native iOS scroll is already smooth
    // and Lenis conflicts with it
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const id = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(id);
      lenis.destroy();
    };
  }, []);

  return null;
}
```

- [ ] **Step 2: Mount in root layout**

Open `app/layout.tsx`. Add the import after the existing imports:

```tsx
import SmoothScroll from './components/SmoothScroll';
```

Add `<SmoothScroll />` as the first child inside `<body>`:

```tsx
<body className="antialiased">
  <SmoothScroll />
  {children}
  <ChatWidget />
  <Analytics />
</body>
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: no TypeScript errors. Build completes successfully.

- [ ] **Step 4: Commit**

```bash
git add app/components/SmoothScroll.tsx app/layout.tsx
git commit -m "add Lenis smooth scroll, desktop only"
```

---

## Task 3: Update globals.css with design system

**Files:**
- Modify: `app/globals.css`

- [ ] **Step 1: Replace globals.css**

Replace the entire contents of `app/globals.css` with:

```css
@import "tailwindcss";

/* ─── BASE ─── */
@layer base {
  html {
    scroll-behavior: auto; /* Lenis handles smooth scroll; avoid double-smooth */
  }

  body {
    font-family: 'nimbus-sans', Helvetica, Arial, sans-serif;
    font-weight: 400;
    background: #000;
    color: #fff;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'nimbus-sans', Helvetica, Arial, sans-serif;
    font-weight: 900;
    text-transform: uppercase;
    letter-spacing: -0.03em;
    line-height: 0.9;
  }
}

/* ─── SECTION LABEL (small caps utility) ─── */
.label {
  font-family: 'nimbus-sans', Helvetica, Arial, sans-serif;
  font-weight: 400;
  font-size: 10px;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: #444;
}

/* ─── SCROLL REVEAL ─── */
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.85s cubic-bezier(0.16, 1, 0.3, 1),
              transform 0.85s cubic-bezier(0.16, 1, 0.3, 1);
}

.reveal.in-view {
  opacity: 1;
  transform: none;
}

/* ─── LINK UNDERLINE ANIMATION ─── */
.link-line {
  position: relative;
  text-decoration: none;
}

.link-line::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1px;
  background: currentColor;
  transition: width 0.3s ease;
}

.link-line:hover::after {
  width: 100%;
}

/* ─── NAV STATES ─── */
.nav-transparent {
  background: transparent;
  border-bottom: 1px solid transparent;
  backdrop-filter: none;
}

.nav-solid {
  background: rgba(0, 0, 0, 0.95);
  border-bottom: 1px solid #111;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}

/* ─── LEGACY (keep for other pages) ─── */
@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}

.animate-fade-in {
  animation: fade-in 0.3s ease-out;
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds, no errors.

- [ ] **Step 3: Commit**

```bash
git add app/globals.css
git commit -m "replace globals.css with Nimbus Sans design system"
```

---

## Task 4: Update Navigation for transparent mode

**Files:**
- Modify: `app/components/Navigation.tsx`

- [ ] **Step 1: Replace Navigation.tsx**

Replace the entire contents of `app/components/Navigation.tsx` with:

```tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  transparent?: boolean;
  theme?: 'dark' | 'light';
}

export default function Navigation({ transparent = false, theme = 'dark' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  const isDark = theme === 'dark';
  const isTransparentNow = transparent && !scrolled;

  // When transparent mode: no bg until scrolled. When not transparent: existing theme behaviour.
  const navClass = isTransparentNow
    ? 'nav-transparent'
    : isDark
    ? 'nav-solid'
    : 'bg-white/90 border-b border-black/10 backdrop-blur-sm';

  const textClass = isTransparentNow || isDark ? 'text-white' : 'text-black';
  const hoverClass = isTransparentNow || isDark ? 'hover:text-gray-400' : 'hover:text-gray-600';
  const logoSrc = isDark || isTransparentNow ? '/logos/eta-logo-white-cropped.png' : '/logos/eta-logo-black.png';
  const menuBgClass = isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Elcee the Alchemist"
            width={400}
            height={100}
            className="h-14 md:h-18 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className={`hidden md:flex gap-8 label ${textClass}`}>
          <Link href="/" className={`${hoverClass} transition-colors`}>Home</Link>
          <Link href="/studio" className={`${hoverClass} transition-colors`}>Studio</Link>
          <Link href="/tutoring" className={`${hoverClass} transition-colors`}>Tutoring</Link>
          <Link href="/shop" className={`${hoverClass} transition-colors`}>Shop</Link>
          <Link href="/contact" className={`${hoverClass} transition-colors`}>Contact</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 ${textClass}`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${menuBgClass}`}>
          <div className="flex flex-col px-6 py-6 gap-5">
            {[
              { label: 'Home', href: '/' },
              { label: 'Studio', href: '/studio' },
              { label: 'Tutoring', href: '/tutoring' },
              { label: 'Shop', href: '/shop' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`label ${textClass} ${hoverClass} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds. Check that other pages using `<Navigation />` still work — they'll get `transparent={false}` (the default) so behaviour is unchanged.

- [ ] **Step 3: Commit**

```bash
git add app/components/Navigation.tsx
git commit -m "add transparent prop to Navigation for hero scroll effect"
```

---

## Task 5: Create Hero section

**Files:**
- Create: `app/components/home/Hero.tsx`

The hero background reads from `/public/assets/hero-bg.jpg`. If the file doesn't exist the section is solid black — no error thrown.

- [ ] **Step 1: Create the directory**

```bash
mkdir -p /Users/logancooney/Sites/elcee-website/app/components/home
```

- [ ] **Step 2: Create Hero.tsx**

Create `app/components/home/Hero.tsx`:

```tsx
'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax: desktop only, not on touch devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const offset = window.scrollY * 0.35;
      section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-16 overflow-hidden"
      style={{
        height: '100svh',
        backgroundImage: "url('/assets/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay so text is always readable over the background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.3) 100%)' }}
      />

      {/* Location label — top left */}
      <span
        className="label absolute top-24 left-6 md:left-10"
        style={{ color: '#555' }}
      >
        Manchester, UK
      </span>

      {/* Name */}
      <div className="relative z-10 mb-6 md:mb-8">
        <h1
          style={{
            fontSize: 'clamp(56px, 14vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
          }}
        >
          Elcee
          <br />
          <span style={{ color: '#555' }}>The Alchemist</span>
        </h1>
      </div>

      {/* CTA row */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <a
          href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
          target="_blank"
          rel="noopener noreferrer"
          className="label border border-white/30 px-8 py-4 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-center"
          style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Listen Now
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 4: Commit**

```bash
git add app/components/home/Hero.tsx
git commit -m "add Hero section with parallax background slot"
```

---

## Task 6: Create Music section

**Files:**
- Create: `app/components/home/Music.tsx`

Spotify album embed ID: `7HF3AA4vFQJARAt1ivCn0w`

- [ ] **Step 1: Create Music.tsx**

Create `app/components/home/Music.tsx`:

```tsx
export default function Music() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black">
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Music</h2>
        <span className="label">01 / Stream</span>
      </div>

      <iframe
        style={{ borderRadius: '0' }}
        src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Elcee the Alchemist on Spotify"
      />
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/components/home/Music.tsx
git commit -m "add Music section with Spotify embed"
```

---

## Task 7: Create VideoGrid section

**Files:**
- Create: `app/components/home/VideoGrid.tsx`

YouTube IDs from existing `MediaEmbeds.tsx`: `K9Bk3Mw7mIc`, `KmekR33sMng`, `7uelRgmMSCQ`, `CtM7X9UE9Ls`

- [ ] **Step 1: Create VideoGrid.tsx**

Create `app/components/home/VideoGrid.tsx`:

```tsx
const videos = [
  { id: 'K9Bk3Mw7mIc', title: 'Elcee the Alchemist — Video 1' },
  { id: 'KmekR33sMng', title: 'Elcee the Alchemist — Video 2' },
  { id: '7uelRgmMSCQ', title: 'Elcee the Alchemist — Video 3' },
  { id: 'CtM7X9UE9Ls', title: 'Elcee the Alchemist — Video 4' },
];

export default function VideoGrid() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black border-t border-white/5">
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Video</h2>
        <span className="label">02 / Watch</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#111' }}>
        {videos.map(({ id, title }) => (
          <div key={id} className="bg-black" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/components/home/VideoGrid.tsx
git commit -m "add VideoGrid section, 2-up YouTube embeds"
```

---

## Task 8: Create About section

**Files:**
- Create: `app/components/home/About.tsx`

White section. Press photo: `/public/photos/press-shot-bw.jpg` (already in project).

- [ ] **Step 1: Create About.tsx**

Create `app/components/home/About.tsx`:

```tsx
import Image from 'next/image';

export default function About() {
  return (
    <section className="bg-white text-black border-t border-black/5">
      <div className="grid md:grid-cols-2" style={{ minHeight: '70vh' }}>

        {/* Text — left on desktop, bottom on mobile */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 order-2 md:order-1">
          <span className="label mb-8" style={{ color: '#aaa' }}>03 / Artist</span>
          <h2
            className="text-black mb-8"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            About
          </h2>
          <div className="space-y-5" style={{ maxWidth: '420px' }}>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>
              Elcee the Alchemist is redefining UK Alternative Rap. Winner of the JBL Martin Garrix Music Academy,
              named an adidas Rising Star, recorded at Abbey Road Studios, and 100,000 views on his Boiler Room
              debut in a single week.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>
              Rooted in London&apos;s Grime scene. Moved to Manchester to study Electronic Music Production.
              First Class graduate. Operating completely solo. No team, no label. Pure vision.
            </p>
          </div>
          <a
            href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line label text-black mt-12 w-fit"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            Stream all music →
          </a>
        </div>

        {/* Photo — right on desktop, top on mobile */}
        <div className="relative order-1 md:order-2" style={{ minHeight: '50vh' }}>
          <Image
            src="/photos/press-shot-bw.jpg"
            alt="Elcee the Alchemist"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/components/home/About.tsx
git commit -m "add About section, white bg, photo + bio"
```

---

## Task 9: Create Platforms section

**Files:**
- Create: `app/components/home/Platforms.tsx`

- [ ] **Step 1: Create Platforms.tsx**

Create `app/components/home/Platforms.tsx`:

```tsx
const platforms = [
  { name: 'Spotify',      href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
  { name: 'Apple Music',  href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060' },
  { name: 'YouTube',      href: 'https://youtube.com/@elceethealchemist' },
  { name: 'SoundCloud',   href: 'https://soundcloud.com/elceethealchemist' },
  { name: 'Amazon Music', href: 'https://music.amazon.com/artists/B07V4F5QK4/elcee-the-alchemist' },
  { name: 'Tidal',        href: 'https://tidal.com/browse/artist/13513078' },
  { name: 'Deezer',       href: 'https://www.deezer.com/artist/67198962' },
  { name: 'Bandcamp',     href: 'https://elceethealchemist.bandcamp.com' },
];

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
  { name: 'TikTok',    href: 'https://tiktok.com/@elceethealchemist' },
  { name: 'YouTube',   href: 'https://youtube.com/@elceethealchemist' },
  { name: 'Twitter',   href: 'https://twitter.com/elceejpg' },
  { name: 'Facebook',  href: 'https://facebook.com/elceethealchemist' },
];

export default function Platforms() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black border-t border-white/5">

      {/* Streaming platforms */}
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Stream</h2>
        <span className="label">04 / Platforms</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20 md:mb-28" style={{ background: '#111' }}>
        {platforms.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-black flex items-center justify-between px-6 md:px-8 hover:bg-white hover:text-black transition-all duration-300"
            style={{ minHeight: '64px' }}
          >
            <span className="label group-hover:text-black transition-colors">{name}</span>
            <span
              className="label opacity-0 group-hover:opacity-100 group-hover:text-black transition-all"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        ))}
      </div>

      {/* Social links */}
      <div className="flex items-baseline justify-between mb-10">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Connect</h2>
        <span className="label">05 / Social</span>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-5">
        {socials.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line label hover:text-white transition-colors"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            {name}
          </a>
        ))}
      </div>

    </section>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds.

- [ ] **Step 3: Commit**

```bash
git add app/components/home/Platforms.tsx
git commit -m "add Platforms section: DSP grid + social links"
```

---

## Task 10: Assemble page.tsx and wire scroll reveals

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 1: Replace app/page.tsx**

Replace the entire contents of `app/page.tsx` with:

```tsx
'use client';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/home/Hero';
import Music from './components/home/Music';
import VideoGrid from './components/home/VideoGrid';
import About from './components/home/About';
import Platforms from './components/home/Platforms';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Scroll reveal: add .in-view to .reveal elements as they enter viewport
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navigation transparent />

      <Hero />

      <div className="reveal">
        <Music />
      </div>

      <div className="reveal">
        <VideoGrid />
      </div>

      <div className="reveal">
        <About />
      </div>

      <div className="reveal">
        <Platforms />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 md:px-10 py-10">
        <div className="flex items-center justify-between">
          <Image
            src="/logos/ankh-white.png"
            alt="Ankh"
            width={36}
            height={36}
            className="opacity-40"
          />
          <p className="label" style={{ color: '#222' }}>
            © 2026 Elcee the Alchemist
          </p>
          <Link
            href="/contact"
            className="link-line label hover:text-white transition-colors"
            style={{ color: '#333' }}
          >
            Contact →
          </Link>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Verify build**

```bash
npm run build 2>&1 | tail -20
```

Expected: build succeeds with no TypeScript errors.

- [ ] **Step 3: Check dev server**

```bash
npm run dev
```

Open `http://localhost:3000` and verify:
- Hero fills the viewport, name visible, "Listen Now" CTA present
- Scrolling down reveals Music, Video, About, Platforms sections in sequence
- Nav is transparent over hero, becomes solid black when scrolled past it
- On mobile (DevTools device emulation): single-column video grid, photo stacks above About text
- Footer visible at bottom

- [ ] **Step 4: Commit**

```bash
git add app/page.tsx
git commit -m "assemble homepage from section components, wire scroll reveals"
```

---

## Task 11: Document asset slots

**Files:**
- Create: `public/assets/ASSETS.md`
- Create: `public/assets/.gitkeep`

- [ ] **Step 1: Create the assets directory and document slots**

```bash
mkdir -p /Users/logancooney/Sites/elcee-website/public/assets
touch /Users/logancooney/Sites/elcee-website/public/assets/.gitkeep
```

Create `public/assets/ASSETS.md` with this content:

```markdown
# Asset Slots

Drop your Photoshop exports into this folder. The site references these exact filenames.
Missing files fall back to solid black — no errors.

| File | Where it appears | Recommended size | Format |
|---|---|---|---|
| `hero-bg.jpg` | Hero section full-bleed background | 2560 × 1440px minimum | JPG (compress to ~300KB) |
| `texture-overlay.png` | Fixed overlay across entire page | 800 × 800px (tiled) | PNG with transparency |

## Notes

- `hero-bg.jpg` — this is the main hero background. Will have a dark gradient overlay applied
  on top in code so the white text always reads clearly. Export dark/moody for best results.
- `texture-overlay.png` — displayed at fixed position, tiled across the whole page at low opacity.
  A grain or noise texture works well here. The code sets opacity to ~4%.

## To apply the texture overlay

Once you have `texture-overlay.png` ready, add this to `app/globals.css` under `/* ─── BASE ─── */`:

```css
body::after {
  content: '';
  position: fixed;
  top: 0; left: 0;
  width: 100%; height: 100%;
  pointer-events: none;
  z-index: 9999;
  opacity: 0.04;
  background-image: url('/assets/texture-overlay.png');
  background-repeat: repeat;
}
```
```

- [ ] **Step 2: Commit**

```bash
git add public/assets/.gitkeep public/assets/ASSETS.md
git commit -m "add asset slots directory and documentation"
```

---

## Task 12: Push and verify live

- [ ] **Step 1: Push to production**

```bash
git push origin main
```

- [ ] **Step 2: Wait for Vercel deploy (~60 seconds), then verify**

Open `https://elceethealchemist.com` and check:
- Nimbus Sans font loading (headings feel heavier/tighter than before)
- Hero fills viewport on both mobile and desktop
- Nav transparent on hero, solid on scroll
- All four sections visible with scroll reveals
- All Spotify/YouTube embeds loading
- All DSP and social links correct
- Footer present
- On mobile: no horizontal scroll, tap targets comfortable
