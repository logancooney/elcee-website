# Design DNA — elceethealchemist.com

Source: `app/page.tsx` as of commit `3580959c44efb4ac7e7f997145d6fc90092d2631`. This is the authoritative design language reference for all interior pages. If a pattern is needed that is not in this document, update this document before building the page.

> **Important note on style vs CLAUDE.md:** The homepage uses inline `style={...}` objects with pixel / clamp values almost everywhere — it is NOT a Tailwind-class-driven page. CLAUDE.md describes a Tailwind-class system (`py-24`, `max-w-5xl`, `rounded-full`, `bg-black`, etc.). Where the homepage source and CLAUDE.md conflict, the **homepage source wins for visual rebuilds of interior pages to match the new aesthetic**, and both are documented below with tensions flagged.

---

## Typography

**Font source:** Adobe Typekit — `https://use.typekit.net/nmf5wle.css`, loaded in `app/layout.tsx` head.
**Font-family (body):** `'nimbus-sans', Helvetica, Arial, sans-serif` at weight `400` (from `app/globals.css`).
**Font-family (headings h1–h6):** same family at weight `900` (from `app/globals.css`).
**CLAUDE.md label:** "Nimbus Sans Black" (weight 900) for display, "Nimbus Sans" (weight 400) for body.

### H1 — Hero display (homepage line 281–291)

```tsx
<h1 style={{
  fontWeight: 900,
  fontSize: 'clamp(64px, 11vw, 148px)',
  lineHeight: 0.88,
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: '#fafafa',
  marginBottom: 20,
}}>
  Elcee<br />The Alchemist
</h1>
```

- Mobile floor: `64px`. Desktop ceiling: `148px`. Fluid: `11vw`.
- Line-height `0.88` (tighter than CLAUDE.md's `leading-tight`). Tracking `-0.03em`. Always uppercase.

### H2 — Section title (homepage lines 381, 471, 521)

Three variants observed, all sharing the same core recipe — only the clamp scale differs:

**Releases H2 (line 381):**
```tsx
<div style={{
  fontWeight: 900,
  fontSize: 'clamp(28px, 4vw, 52px)',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  color: '#fafafa',
}}>
  Latest Releases
</div>
```

**About H2 (line 471):**
```tsx
<div style={{
  fontWeight: 900,
  fontSize: 'clamp(40px, 5.5vw, 80px)',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  lineHeight: 0.88,
  color: '#fafafa',
  marginBottom: 28,
}}>
  Raw.<br />Real.<br />Alchemical.
</div>
```

**Studio H2 (line 521, on LIGHT background):**
```tsx
<div style={{
  fontWeight: 900,
  fontSize: 'clamp(38px, 5vw, 72px)',
  letterSpacing: '-0.03em',
  textTransform: 'uppercase',
  lineHeight: 0.88,
  color: '#080808',
  marginBottom: 20,
}}>
  The<br />Alchemist<br />Studio
</div>
```

**Canonical H2 rules:**
- `fontWeight: 900`
- `letterSpacing: '-0.03em'`
- `textTransform: 'uppercase'`
- `lineHeight: 0.88` (when multi-line)
- Size: small sub-heading → `clamp(28px, 4vw, 52px)`; standard section → `clamp(38px, 5vw, 72px)`; large statement → `clamp(40px, 5.5vw, 80px)`.
- Dark section colour `#fafafa`; light section colour `#080808`.

### H3 — Release name / card title (homepage line 79, inside `ReleaseRow`)

```tsx
<div style={{
  fontWeight: 900,
  fontSize: 'clamp(20px, 2.5vw, 34px)',
  letterSpacing: '-0.02em',
  textTransform: 'uppercase',
  lineHeight: 1,
  color: '#fafafa',
}}>
  {name}
</div>
```

- `letterSpacing: '-0.02em'` (tighter than H1/H2's `-0.03em`? No — it's looser; H1/H2 are `-0.03em`).
- `lineHeight: 1` exactly.
- Size range `20px → 34px`.

### Eyebrow label (homepage lines 76, 378, 468, 518)

```tsx
<div style={{
  fontSize: 9,
  letterSpacing: '0.3em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)',
  marginBottom: 10,
}}>
  02 — Music
</div>
```

Light-section variant (line 518):
```tsx
color: 'rgba(0,0,0,0.4)',
```

Inside release info cell (line 76, dimmer):
```tsx
fontSize: 8,
letterSpacing: '0.3em',
color: 'rgba(255,255,255,0.25)',
marginBottom: 8,
```

**Canonical eyebrow rules:**
- `fontSize: 8` or `9` (px). Never larger.
- `letterSpacing: '0.3em'` — wide.
- `textTransform: 'uppercase'`.
- Dim: 25–30% opacity on dark, 40% on light.
- Pattern: `"[number] — [label]"` (e.g., `02 — Music`) for numbered sections.

### Body copy (homepage lines 474, 524)

Dark section (line 474):
```tsx
<p style={{
  fontSize: 14,
  lineHeight: 1.8,
  color: 'rgba(255,255,255,0.45)',
  maxWidth: 380,
}}>
  Alternative rap artist from Manchester...
</p>
```

Light section (line 524):
```tsx
<p style={{
  fontSize: 13,
  lineHeight: 1.8,
  color: 'rgba(0,0,0,0.5)',
  marginBottom: 28,
  maxWidth: 340,
}}>
  Professional recording, mixing and mastering...
</p>
```

**Canonical body rules:**
- `fontSize: 13` or `14` (px). Small — this is an editorial site, not a blog.
- `lineHeight: 1.8` (generous for readability).
- Colour: `rgba(255,255,255,0.45)` on dark, `rgba(0,0,0,0.5)` on light.
- `maxWidth: 340–380px` — never full-width body text.

### Label / caption — tagline (homepage line 292)

```tsx
<div style={{
  fontSize: 10,
  fontWeight: 400,
  letterSpacing: '0.35em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.35)',
  marginBottom: 32,
}}>
  Alternative Rap &nbsp;·&nbsp; Manchester
</div>
```

### Nav link (homepage line 178, `Navigation.tsx` line 40)

```tsx
style={{
  fontSize: 11,
  fontWeight: 400,
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.55)',
}}
```

### Link-out / trailing link (homepage line 388)

```tsx
<a style={{
  fontSize: 9,
  letterSpacing: '0.2em',
  textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)',
  textDecoration: 'none',
  transition: 'color 0.2s',
}}>
  All Music →
</a>
```

### Marquee text (homepage line 354)

```tsx
fontSize: 13,
fontWeight: 900,
letterSpacing: '0.18em',
textTransform: 'uppercase',
color: '#080808',
```

### Type scale — summary table

| Role | Size (min → max) | Weight | Tracking | Leading | Transform |
|---|---|---|---|---|---|
| H1 hero | `clamp(64px, 11vw, 148px)` | 900 | `-0.03em` | `0.88` | uppercase |
| H2 large statement | `clamp(40px, 5.5vw, 80px)` | 900 | `-0.03em` | `0.88` | uppercase |
| H2 section | `clamp(38px, 5vw, 72px)` | 900 | `-0.03em` | `0.88` | uppercase |
| H2 sub-section | `clamp(28px, 4vw, 52px)` | 900 | `-0.03em` | normal | uppercase |
| H3 card title | `clamp(20px, 2.5vw, 34px)` | 900 | `-0.02em` | `1` | uppercase |
| Body | `13–14px` | 400 | normal | `1.8` | none |
| Tagline | `10px` | 400 | `0.35em` | normal | uppercase |
| Nav link | `11px` | 400 | `0.15em` | normal | uppercase |
| Marquee item | `13px` | 900 | `0.18em` | normal | uppercase |
| Eyebrow | `8–9px` | 400 | `0.3em` | normal | uppercase |
| Link-out | `9px` | 400 | `0.2em` | normal | uppercase |
| CTA primary | `10px` | 900 | `0.18em` | normal | uppercase |
| CTA outline (release row) | `9px` | 900 | `0.18em` | normal | uppercase |

### Responsive type shifts

All headline sizing is handled by `clamp(min, vw, max)` inside inline styles. No `md:` / `lg:` Tailwind breakpoints are used for type on the homepage. Mobile shrinkage is automatic via the `clamp` min value.

> **Tension with CLAUDE.md:** CLAUDE.md recommends `text-5xl md:text-6xl lg:text-7xl`. Homepage uses fluid `clamp()` exclusively. For interior-page rebuilds that match the homepage aesthetic, prefer the `clamp()` pattern.

---

## Colour tokens

### Backgrounds

| Token | Value | Usage |
|---|---|---|
| `bg-dark-primary` | `#080808` | Root page background, hero bottom, releases, about, footer |
| `bg-dark-panel` | `#111111` | Release info cell, about image placeholder, hero photo base |
| `bg-dark-divider` | `#1a1a1a` | Rarely as background — see borders |
| `bg-light-primary` | `#f0ede8` | Studio section (warm off-white) |
| `bg-light-panel` | `#d8d5d0` | Studio image panel placeholder |
| `bg-invert` | `#fafafa` | Marquee strip background, primary CTA |
| `bg-nav-scrolled` | `rgba(8,8,8,0.96)` with `backdropFilter: blur(12px)` | Scrolled nav + mobile menu (`rgba(8,8,8,0.98)`) |

> **Tension with CLAUDE.md:** CLAUDE.md declares `#000000` / `#ffffff`. Homepage uses `#080808` / `#fafafa`. The homepage values are intentionally slightly warmer and softer. **Use the homepage values for interior pages.** CLAUDE.md's `bg-black` / `bg-white` Tailwind tokens should be read as aliases for `#080808` / `#fafafa` in this codebase.

### Text colours

| Token | Value | Usage |
|---|---|---|
| `text-primary` | `#fafafa` | Headings and CTAs on dark |
| `text-primary-invert` | `#080808` | Headings on light |
| `text-body-dark` | `rgba(255,255,255,0.45)` | Body copy on dark |
| `text-body-light` | `rgba(0,0,0,0.5)` | Body copy on light |
| `text-muted-dark` | `rgba(255,255,255,0.3)` | Eyebrows, link-outs on dark |
| `text-muted-light` | `rgba(0,0,0,0.4)` | Eyebrows on light |
| `text-faint-dark` | `rgba(255,255,255,0.25)` | In-card eyebrows on dark |
| `text-whisper-dark` | `rgba(255,255,255,0.15)` | Copyright, tiny legal |
| `text-nav-dark` | `rgba(255,255,255,0.55)` | Nav link idle state |
| `text-nav-hover` | `#fafafa` | Nav link hover state |

### Borders

| Token | Value | Usage |
|---|---|---|
| `border-dark-line` | `1px solid #1a1a1a` | All section and row dividers on dark |
| `border-dark-hairline` | `1px solid rgba(255,255,255,0.07)` | Nav bottom border, footer horizontal rule |
| `border-light-line` | `2px solid rgba(0,0,0,0.08)` | Studio photo panel left border |
| `border-btn-outline` | `1.5px solid rgba(255,255,255,0.4)` | Outline button on dark |
| `border-marquee` | `2px solid #080808` | Marquee top/bottom (against `#fafafa`) |

> **Tension with CLAUDE.md:** CLAUDE.md says `border-white/10` (≈ `rgba(255,255,255,0.1)`). Homepage uses solid `#1a1a1a` (denser, visible as a crisp hairline). Both read visually similar on `#080808` — use either, but prefer `#1a1a1a` for exact homepage parity.

### Overlays and effects

- Hero photo tint: `filter: grayscale(100%) contrast(1.08); opacity: 0.45`
- About portrait: `filter: grayscale(100%) contrast(1.1)`
- Studio photo: `filter: grayscale(100%) contrast(1.05)`
- Grunge texture (hero): `opacity: 0.75, mixBlendMode: 'screen'`
- Grunge texture (light section): `opacity: 0.06, mixBlendMode: 'multiply'`
- Grunge texture (release-info hover): `opacity: 0.55, mixBlendMode: 'screen'`
- Hero bottom gradient: `linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)`
- Avatar watermark: `opacity: 0.09, mixBlendMode: 'screen'`

---

## Spacing rhythm

All spacing on the homepage is pixel-based in inline `style={...}`. No `py-*` / `px-*` Tailwind utilities are used.

### Section vertical padding

| Section | Padding | Notes |
|---|---|---|
| Hero | `height: 100vh; minHeight: 640; paddingBottom: 72` | Full viewport, content bottom-anchored with 72px breathing room |
| Marquee | `padding: 11px 0` | Thin horizontal band |
| Releases header row | `padding: 48px 48px 20px` | Top 48, sides 48, bottom 20 (tight to the rows below) |
| Release info cell | `padding: 32px 40px` | Vertical 32, horizontal 40 |
| About info cell | `padding: 64px 48px` | Larger vertical breathing room |
| Studio info cell | `padding: 64px 48px` | Same as About |
| Footer | `padding: 48px 48px 36px` | Top 48, sides 48, bottom 36 |
| Nav (scrolled) | `padding: 14px 48px` | |
| Nav (idle) | `padding: 20px 48px` | |

> **Tension with CLAUDE.md:** CLAUDE.md says "Default to `py-24` or `py-32` for major sections, not `py-12`" (i.e. 96–128px). Homepage uses `64px` vertical on info cells. Sections feel tighter than CLAUDE.md prescribes. For interior-page rebuilds, match the homepage density (64px info-cell padding) over CLAUDE.md's generous `py-24` — the homepage is the source of truth for the current aesthetic.

### Horizontal padding

- Section / row outer horizontal padding: `48px` (desktop).
- No explicit mobile override observed — the two-column grid collapses to one column via `.grid-two-col` media query at `max-width: 768px` but the `48px` horizontal padding remains (potential squeeze on mobile — flag for Phase 1 mobile work).

### Max-widths

| Context | Max-width | Source |
|---|---|---|
| Hero content | none (centred in full-viewport) | Hero `textAlign: center` |
| Body paragraph on dark | `380px` | About paragraph |
| Body paragraph on light | `340px` | Studio paragraph |
| Hero content padding | `0 24px` | Inline on hero content wrapper |

> **Tension with CLAUDE.md:** CLAUDE.md recommends `max-w-5xl` / `max-w-4xl` for content (≈ 1024/896px) and `max-w-3xl` / `max-w-2xl` for reading (≈ 768/672px). Homepage body copy is much narrower (`340–380px`). This narrower reading measure is an editorial / fashion-mag signal, not a blog signal. **Use the homepage `340–380px` for body copy.**

### Gaps

- Hero CTA row: `gap: 14` (between buttons).
- Nav desktop links: `gap: 36`.
- Mobile menu items: `gap: 40`.
- Footer social links: `gap: 28`.

### Two-column grid (`.grid-two-col`)

Defined in `app/globals.css`:
```css
.grid-two-col {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
@media (max-width: 768px) {
  .grid-two-col {
    grid-template-columns: 1fr;
  }
  .marquee-hide-mobile {
    display: none;
  }
}
```

Used by every split row on the homepage (Releases, About, Studio). Mobile collapses to single column at `≤ 768px`.

---

## Motion patterns

### Framer Motion — `fadeUp` variant (homepage lines 28–33)

The single canonical scroll-reveal variant used across the homepage:

```tsx
const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};
```

Applied via spread:
```tsx
<motion.div {...fadeUp}>…</motion.div>
<motion.section {...fadeUp}>…</motion.section>
```

**Load-bearing values — copy verbatim:**
- `opacity: 0 → 1`
- `y: 24 → 0` (24px upward translate)
- `duration: 0.7` (NB: CLAUDE.md says 0.6; homepage is 0.7 — use 0.7 for parity)
- `ease: [0.25, 0.1, 0.25, 1]` (ease-out cubic — identical to CLAUDE.md)
- `viewport.once: true` (reveal only on first entry)
- `viewport.margin: '-80px'` (fire when 80px before the element enters viewport)

### Elements that use `fadeUp` on the homepage

| Element | Line |
|---|---|
| Each `ReleaseRow` outer `motion.div` | 90 |
| Releases section header `motion.div` | 369 |
| About `motion.section` | 460 |
| Studio `motion.section` | 501 |

### Stagger

No `staggerChildren` is used on the homepage. CLAUDE.md references `staggerChildren: 0.1` as a pattern — **derived from CLAUDE.md, no homepage example.** If interior pages introduce stagger, use:

```tsx
variants={{ visible: { transition: { staggerChildren: 0.1 } } }}
```

### Smooth scroll — Lenis

Wrapped at root in `app/layout.tsx` via `LenisProvider`:
```tsx
<LenisProvider>
  {children}
</LenisProvider>
```

`LenisProvider` implementation (`app/components/LenisProvider.tsx`):
```tsx
import { ReactLenis } from 'lenis/react';
return <ReactLenis root>{children}</ReactLenis>;
```

No configuration options are passed — default Lenis easing applies globally.

### Scroll-driven parallax (hero)

Implemented **manually** via `useEffect` + refs in `app/page.tsx` lines 115–133 — not via Framer Motion scroll APIs:

```tsx
const handleScroll = () => {
  const y = window.scrollY;
  setNavScrolled(y > 60);
  if (heroParallaxRef.current) {
    heroParallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
  }
  if (heroImgRef.current && heroRef.current) {
    const heroH = heroRef.current.offsetHeight;
    const fade = Math.max(0, 0.45 - (y / (heroH * 0.55)) * 0.45);
    heroImgRef.current.style.opacity = String(fade);
  }
  if (heroRef.current) {
    setShowAvatar(y > heroRef.current.offsetHeight * 0.95);
  }
};
window.addEventListener('scroll', handleScroll, { passive: true });
```

**Rules:**
- Parallax multiplier `0.35` — photo translates 35% of scroll distance. (CLAUDE.md "parallax that moves more than 20px" — on a tall hero, 35% can exceed 20px at the lower scroll range; accept as-is since this is the current canonical aesthetic.)
- Hero photo opacity fades from `0.45 → 0` over the lower 55% of hero height.
- Nav state flips to scrolled at `scrollY > 60`.
- Avatar watermark appears after scrolling past ~95% of hero height.

### CSS keyframe animations (`app/globals.css`)

```css
@keyframes marqueeScroll {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}

@keyframes scrollPulse {
  0%, 100% { opacity: 0.3; transform: scaleY(1); }
  50%       { opacity: 0.7; transform: scaleY(0.6); }
}

@keyframes fade-in {
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0); }
}
```

- `marqueeScroll` — 18s linear infinite, applied to the marquee inner row (homepage line 347).
- `scrollPulse` — 2s ease-in-out infinite, applied to the hero scroll-cue line (homepage line 334).
- `fade-in` — 0.3s ease-out, utility class `.animate-fade-in` for widget mounts.

### Hover transitions

Every interactive element declares `transition` inline:
- Nav links: `transition: 'color 0.2s'`
- Outline buttons: `transition: 'border-color 0.2s'`
- Primary button: `transition: 'background 0.2s'`
- Studio CTA: `transition: 'opacity 0.2s'`
- Release info cell bg image (via CSS): `transition: opacity 0.4s ease`

Standard hover duration: **`0.2s`** for colour/background swaps, **`0.4s`** for image cross-fades.

## Section archetypes

*To be filled in Task A4.*

## Component patterns

*To be filled in Task A4.*

## Light-section rule

Every interior page must contain at least one light-background section using `#f0ede8` (warm off-white, not pure white), per the Studio section pattern (homepage lines 500–550). This provides contrast rhythm against the dominant `#080808` palette.

## Mobile overrides

*To be filled in Task A4.*
