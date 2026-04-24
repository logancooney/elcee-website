# Design DNA — Task A1 Scratch Notes

> Temporary working notes from Task A1 (exploration). Delete after A5 completes.

Source: `app/page.tsx` at commit `3580959`.

## Sections enumerated from `app/page.tsx`

| # | Archetype | Line range | Background | Vertical padding | Role |
|---|---|---|---|---|---|
| 1 | Fixed avatar watermark | 138–151 | transparent over page | n/a (fixed, `100vh`) | Brand watermark, appears after hero scrolls past |
| 2 | Fixed nav bar | 153–209 | `transparent` → `rgba(8,8,8,0.96)` with `blur(12px)` on scroll | `20px 48px` → `14px 48px` | Site navigation (on-page variant, not the shared `Navigation` component) |
| 3 | Mobile fullscreen menu | 211–233 | `rgba(8,8,8,0.98)` | full viewport | Mobile nav overlay |
| 4 | Hero | 235–337 | `#111111` base with parallax landscape photo, grunge texture, bottom gradient to `#080808` | `height: 100vh; minHeight: 640`, `paddingBottom: 72` | Title + tagline + dual CTA (Listen Now / Book Studio) with scroll cue |
| 5 | Marquee strip | 339–365 | `#fafafa` (light, inverted) | `padding: 11px 0`, `border-top: 2px solid #080808`, `border-bottom: 2px solid #080808` | Social-proof scroller (achievements / credits) |
| 6 | Releases header | 368–395 | `#080808` | `padding: 48px 48px 20px`, `border-bottom: 1px solid #1a1a1a` | Section title with eyebrow + link-out |
| 7 | Release row ×3 (`ReleaseRow` component) | 397–456 | `#000` for embed cell, `#111111` for info cell | `minHeight: 280` or `408` (row 1), info cell `padding: 32px 40px`, `border-bottom: 1px solid #1a1a1a` | Two-column split: media embed + metadata/CTA |
| 8 | About | 459–498 | `#080808` with `#111111` image panel | `minHeight: 380`, info cell `padding: 64px 48px` | Two-column split: copy + portrait |
| 9 | Studio (LIGHT SECTION) | 500–550 | `#f0ede8` (warm off-white) with grunge texture at `opacity: 0.06, mixBlendMode: multiply` | `minHeight: 360`, info cell `padding: 64px 48px` | Two-column split: copy + studio photo — the mandated light section |
| 10 | `SiteFooter` | 552 | `#080808` with border-top | `padding: 48px 48px 36px` | Footer |

## Section archetypes identified

1. **Hero (full-bleed with parallax + texture overlay)** — `100vh`, dark, gradient bottom, content bottom-anchored.
2. **Marquee strip (light contrast band)** — `#fafafa` background, thick black borders top/bottom, infinite-scroll animation.
3. **Section header row (eyebrow + title + link-out)** — flex baseline row, left-aligned eyebrow/title, right-aligned "All X →" link.
4. **Two-column split row (`grid-two-col`)** — 50/50 desktop, 1-column mobile; one side media, one side copy + CTA. Used by Releases, About, Studio.
5. **Light section** — warm off-white `#f0ede8` with subtle multiply-grunge texture.

## Components imported by `app/page.tsx`

| Import | Path | Role |
|---|---|---|
| `useEffect`, `useRef`, `useState` | `react` | Scroll/parallax state |
| `Image` | `next/image` | Optimised images (avatar watermark, logo, portrait, studio) |
| `Link` | `next/link` | Internal routing |
| `motion` | `framer-motion` | Scroll-triggered reveals on `ReleaseRow`, releases header, About, Studio |
| `ReactNode` | `react` | Type for embed prop |
| `SiteFooter` | `./components/SiteFooter` | Footer block |

Note: `app/page.tsx` does NOT import the shared `Navigation` component — it rolls its own scroll-aware nav inline. This is a tension with the component library.

## Other components in `app/components/` (NOT imported by homepage)

- `Achievements.tsx` — social-proof strip (possibly superseded by inline marquee on homepage).
- `BookingPrompt.tsx` — time-on-page booking modal (wired at page-level elsewhere).
- `ChatWidget.tsx` — chat widget, mounted in root layout.
- `ExitIntentPopup.tsx` — exit intent modal, mounted in root layout.
- `MediaEmbeds.tsx` — likely pre-ReleaseRow helper.
- `Navigation.tsx` — shared site nav (used on interior pages only).
- `Signature.tsx` — signature block (not on homepage).
- `StructuredDataPerson.tsx` — SEO JSON-LD in head.

## Font / typography source

- Loaded via `<link rel="stylesheet" href="https://use.typekit.net/nmf5wle.css" />` in `app/layout.tsx`.
- `globals.css`: body `font-family: 'nimbus-sans'`, weight 400; H1–H6 weight 900.

## Colour tokens observed in `app/page.tsx`

- Background primary: `#080808` (near-black, NOT `#000000` as CLAUDE.md claims)
- Foreground primary: `#fafafa` (near-white, NOT `#ffffff` as CLAUDE.md claims)
- Dark panel: `#111111`
- Border (dark sections): `#1a1a1a` (solid hex, NOT `rgba(255,255,255,0.1)` — tension with CLAUDE.md)
- Light section: `#f0ede8` (warm off-white, explicitly anti-pure-white — tension with CLAUDE.md "pure #ffffff")
- Light section dark panel: `#d8d5d0`
- Secondary text on dark: `rgba(255,255,255,0.45)` body, `rgba(255,255,255,0.3)` / `0.25` eyebrows
- Secondary text on light: `rgba(0,0,0,0.4)` / `0.5`
- Light panel borders: `#1a1a1a` on dark, `rgba(0,0,0,0.08)` on light

## Motion observations

- Single `fadeUp` variant object at lines 28–33:
  ```
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] },
  viewport: { once: true, margin: '-80px' },
  ```
- Spread onto each `motion.div` / `motion.section`.
- NO stagger config observed on homepage (CLAUDE.md mentions staggerChildren: 0.1 — derived, not present).
- Manual scroll-based parallax via `useEffect` (hero photo translates 0.35 × scrollY, opacity fades).
- CSS keyframes in `globals.css`: `marqueeScroll` (18s linear infinite), `scrollPulse` (2s ease-in-out infinite), `fade-in` (for chat widget).

## Flags / tensions with CLAUDE.md

1. CLAUDE.md says background `#000000`, homepage uses `#080808`.
2. CLAUDE.md says text `#ffffff`, homepage uses `#fafafa`.
3. CLAUDE.md says "pure #ffffff" light sections, homepage uses warm `#f0ede8`.
4. CLAUDE.md says borders `rgba(255,255,255,0.1)`, homepage uses solid `#1a1a1a`.
5. CLAUDE.md mandates Tailwind classes (`py-24`, `max-w-5xl`, `rounded-full`, etc). Homepage uses inline `style={}` with pixel/clamp values — almost no Tailwind. Very few components use Tailwind classes; only `hidden md:flex`, `md:hidden`, and custom `grid-two-col`.
6. CLAUDE.md says primary CTA = `rounded-full`. Homepage CTAs are square (no border-radius).
7. CLAUDE.md says duration 0.6. Homepage `fadeUp` uses duration 0.7.
8. CLAUDE.md says homepage should wrap `Navigation` component. Homepage inlines its own.
