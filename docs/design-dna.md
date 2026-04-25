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

The homepage uses six recurring section archetypes. Every interior page section should map to one of these. If a needed pattern is not below, **update this document before building the page** — do not invent a new pattern silently.

### A. Full-bleed cinematic hero (homepage lines 235–337)

**Purpose:** Page-opening statement. Used once per page.

**Structure:**
- `<section>` with `height: 100vh; minHeight: 640; overflow: hidden` and `display: flex; alignItems: 'flex-end'; justifyContent: 'center'; paddingBottom: 72`.
- Three stacked layers behind content: parallax photo (`top: -10%; bottom: -10%; willChange: 'transform'`), grunge texture (`opacity: 0.75; mixBlendMode: 'screen'`), bottom gradient (`linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)`).
- Centred content block (`textAlign: center; padding: '0 24px'`) containing: H1 hero → tagline → CTA pair.
- Scroll cue absolutely positioned at `bottom: 24` (vertical line + "Scroll" label, opacity 0.3).

**Variants for interior pages:** keep the structure; swap photo, copy, and CTAs. If a page does not warrant 100vh hero, drop to `minHeight: 480` but keep the layered photo + texture + gradient stack.

### B. Marquee strip (homepage lines 339–365)

**Purpose:** High-contrast horizontal interrupt between sections. Communicates achievements / brand markers.

**Structure:**
- Outer `<div>` with `background: '#fafafa'; borderTop: '2px solid #080808'; borderBottom: '2px solid #080808'; overflow: hidden; padding: '11px 0'`.
- Inner row with `display: flex; whiteSpace: nowrap; animation: 'marqueeScroll 18s linear infinite'`.
- Items repeat 2x for seamless loop; each item is a `<span>` containing the label `<span>` (marquee text rules) plus a `◆` separator (`fontSize: 14, opacity: 0.3, color: '#080808'`).
- Per-item horizontal padding `120px` (`padding: '0 120px'`).

**Use sparingly:** at most one marquee per page; not every page needs one.

### C. Section-header + split-row content (homepage lines 367–457, "Releases")

**Purpose:** Listing or grid section with a labelled header and uniform rows beneath.

**Structure:**
- Outer `<section>` with `background: '#080808'; position: relative; zIndex: 1`. Optional `id` for jump-nav.
- Header row: `motion.div {...fadeUp}` with `display: flex; alignItems: baseline; justifyContent: space-between; padding: '48px 48px 20px'; borderBottom: '1px solid #1a1a1a'; flexWrap: wrap; gap: 16`. Left: eyebrow + H2-sub-section. Right: link-out (e.g., "All Music →").
- Body: stack of `ReleaseRow` instances (see archetype D) sharing a `borderBottom: '1px solid #1a1a1a'` per row.

### D. Two-column split row (`grid-two-col`) (homepage `ReleaseRow`, About, Studio)

**Purpose:** Image/embed paired with text-info cell. Workhorse layout — every content section on the homepage uses this.

**Structure:**
- Outer wrapper has `className="grid-two-col"` (CSS in `globals.css`: `display: grid; grid-template-columns: 1fr 1fr` desktop, `1fr` ≤768px).
- Two equal cells. The image/embed cell is `position: relative; overflow: hidden; background: #000` (or `#111111`/`#d8d5d0` for placeholders) with `minHeight` set on both cells for parity.
- The info cell is `display: flex; flexDirection: column; justifyContent: space-between` with `padding: '32px 40px'` (release rows) or `'64px 48px'` (about, studio).
- Border between cells: `borderLeft: '1px solid #1a1a1a'` on the right cell (or `borderRight` if reversed). Light variant: `borderLeft: '2px solid rgba(0,0,0,0.08)'`.
- Reversible via a `reversed` prop or conditional ordering.

**Info cell content order:** eyebrow → H3-or-H2 → (optional body p) → spacer → trailing CTA at bottom (`alignSelf: flex-start` or end).

**Decorative layers (optional):**
- Background image at `opacity: 0.28` covering the cell behind content (`position: absolute; inset: 0; backgroundSize: cover`).
- `release-info-texture` div (CSS class — grunge image, normally invisible, fades in on hover).

### E. Light-section interrupt (homepage lines 500–550, "Studio")

**Purpose:** Contrast break against the dominant dark palette. Editorial rhythm.

**Structure:**
- `<motion.section {...fadeUp}>` with `background: '#f0ede8'; position: relative; overflow: hidden; zIndex: 1`.
- Grunge texture overlay: `position: absolute; inset: 0; opacity: 0.06; mixBlendMode: 'multiply'`.
- Inside: a `grid-two-col` (archetype D) with light-mode info cell (`color: '#080808'`, body `rgba(0,0,0,0.5)`, eyebrow `rgba(0,0,0,0.4)`) and image cell with light placeholder bg `#d8d5d0`.

**Rule:** every interior page must include at least one section using archetype E. (See "Light-section rule" below.)

### F. CTA / closing block

**Note:** The current homepage does NOT have a dedicated final-CTA archetype — the Studio section serves that role for the homepage. For interior pages (tutoring, studio, free, links) that need a focused closing CTA, use archetype D (split row) with a single CTA in the info cell and a relevant photo on the other side.

---

## Component patterns

### Primary CTA — filled, on-dark

Used on the hero for the strongest action (homepage lines 299–311):

```tsx
<a
  href="..."
  target="_blank" rel="noopener noreferrer"
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
  Listen Now
</a>
```

### Primary CTA — filled, on-light (inverted)

Used in the Studio light section (homepage lines 527–539):

```tsx
<Link
  href="/studio"
  style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 28px',
    fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', textDecoration: 'none',
    background: '#080808', color: '#fafafa',
    border: 'none', cursor: 'pointer', alignSelf: 'flex-start',
    transition: 'opacity 0.2s',
  }}
>
  Book a Session →
</Link>
```

### Secondary CTA — outline, on-dark (large)

Hero secondary action (homepage lines 312–324):

```tsx
<Link
  href="/studio"
  style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    padding: '13px 28px',
    fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
    textTransform: 'uppercase', textDecoration: 'none',
    background: 'transparent', color: '#fafafa',
    border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer',
    transition: 'border-color 0.2s',
  }}
>
  Book Studio
</Link>
```

### Secondary CTA — outline, on-dark (small, in-card)

The shared `outlineBtnStyle` (homepage lines 10–26) used inside release info cells. Same as above but `padding: '10px 20px'`, `fontSize: 9`, `alignSelf: 'flex-start'`. Used as the trailing link inside split-row info cells.

```tsx
const outlineBtnStyle: React.CSSProperties = {
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  padding: '10px 20px',
  fontWeight: 900, fontSize: 9, letterSpacing: '0.18em',
  textTransform: 'uppercase', textDecoration: 'none',
  background: 'transparent', color: '#fafafa',
  border: '1.5px solid rgba(255,255,255,0.4)',
  cursor: 'pointer', transition: 'border-color 0.2s',
  alignSelf: 'flex-start',
};
```

**Hover behaviour for all CTAs:** declared inline via `transition`; actual hover state colour change is currently not implemented for the buttons (the homepage uses the natural `border-color`/`background` properties without setting a `:hover` state). For interior pages, you may add `onMouseEnter`/`onMouseLeave` handlers if a more visible hover is desired — match the nav-link pattern (lines 183–184).

### Eyebrow + heading pair

Canonical section-opener:

```tsx
<div style={{
  fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase',
  color: 'rgba(255,255,255,0.3)', marginBottom: 10,
}}>
  02 — Music
</div>
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

Light-mode swap: eyebrow `rgba(0,0,0,0.4)`, heading `#080808`.

### Type-label + name pair (in-card)

Used inside split-row info cells (homepage lines 75–82):

```tsx
<div style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
  Album · 2024
</div>
<div style={{ fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 34px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, color: '#fafafa' }}>
  The Evolution of Self Destruction
</div>
```

### Image cell (split-row right or left)

```tsx
<div style={{
  position: 'relative', overflow: 'hidden',
  background: '#111111',
  borderLeft: '1px solid #1a1a1a',
  minHeight: 380,
}}>
  <Image
    src="/path.jpg"
    alt="…"
    fill
    style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%) contrast(1.1)' }}
  />
</div>
```

Light-mode swap: `background: '#d8d5d0'`, `borderLeft: '2px solid rgba(0,0,0,0.08)'`, `filter: 'grayscale(100%) contrast(1.05)'`.

### Marquee item

```tsx
<span style={{ display: 'inline-flex', alignItems: 'center' }}>
  <span style={{
    fontWeight: 900, fontSize: 13, letterSpacing: '0.18em',
    textTransform: 'uppercase', color: '#080808',
    padding: '0 120px', flexShrink: 0,
  }}>
    {label}
  </span>
  <span style={{ fontSize: 14, opacity: 0.3, color: '#080808' }}>◆</span>
</span>
```

### Scroll cue (hero)

```tsx
<div style={{
  position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
  zIndex: 2, opacity: 0.3,
}}>
  <div style={{ width: 1, height: 32, background: 'white', animation: 'scrollPulse 2s ease-in-out infinite' }} />
  <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
</div>
```

### Nav (`Navigation.tsx` is currently unused — homepage inlines its own nav)

The homepage defines its nav inline (lines 153–233), not via the shared `Navigation` component. Interior pages should either:
1. Adopt the homepage's inline nav verbatim (preferred for visual parity), or
2. Refactor the inline nav into a shared component as part of Phase 1 — the cleaner long-term move. Either way, the look must be identical: `padding: navScrolled ? '14px 48px' : '20px 48px'`, `background: navScrolled ? 'rgba(8,8,8,0.96)' : 'transparent'`, `backdropFilter: navScrolled ? 'blur(12px)' : 'none'`, `borderBottom: navScrolled ? '1px solid rgba(255,255,255,0.07)' : 'transparent'`, transitions on `background 0.4s ease, padding 0.4s ease, border-color 0.4s ease`.

**Nav state:** scrolled flips at `scrollY > 60`. Mobile menu is fullscreen overlay (`rgba(8,8,8,0.98)`) with H1-style stacked links (`fontSize: 24, fontWeight: 900, letterSpacing: '0.12em'`).

### Avatar watermark (page-fixed)

```tsx
<div style={{
  position: 'fixed', right: 0, top: 0,
  width: '50%', height: '100vh',
  pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
  opacity: showAvatar ? 1 : 0, transition: 'opacity 0.6s ease',
}}>
  <Image
    src="/white-avatar.png"
    alt=""
    fill
    style={{ objectFit: 'contain', objectPosition: 'right center', opacity: 0.09, mixBlendMode: 'screen' }}
  />
</div>
```

Appears after scrolling past 95% of hero height. Optional on interior pages — use only on artist-identity pages (e.g., EPK), skip on commercial pages (tutoring, studio).

---

## Light-section rule

Every interior page must contain at least one section using archetype E (light-section interrupt) with `background: '#f0ede8'`. This provides the contrast rhythm that distinguishes elceethealchemist.com from a flat all-dark portfolio template. The Studio section (lines 500–550) is the canonical example.

The light section may carry the page's primary CTA (as on the homepage) or be a standalone editorial / quote / testimonial block — choice depends on the page's narrative.

---

## Mobile overrides

The homepage is largely responsive via fluid `clamp()` typography and the single `grid-two-col` column-collapse rule. Specific overrides:

### Layout
- **`grid-two-col` collapses to single column at `≤ 768px`** (`app/globals.css`).
  - On collapse, the right cell stacks below the left. The border between cells (vertical on desktop) is not adjusted to a horizontal divider — accept this. If a page needs a horizontal divider on mobile, add a media-query rule and document it here.
- **`.marquee-hide-mobile`** — utility class to hide selected marquee items at `≤ 768px`. Use to thin marquee content for narrow viewports.

### Nav
- Desktop link list (`<ul className="hidden md:flex">`) is hidden on mobile.
- Hamburger button (`<button className="md:hidden">`) toggles a fullscreen overlay (`md:hidden` so it never shows on desktop).
- Mobile menu items: `fontSize: 24, fontWeight: 900, letterSpacing: '0.12em'`, `gap: 40` between items, centred.

### Hero
- Hero content has `padding: '0 24px'` for mobile horizontal breathing.
- H1 floor `64px` ensures legibility on phones.
- Tagline `fontSize: 10` is the same desktop and mobile (already small, no shrink needed).

### Spacing
- Section horizontal padding stays at `48px` desktop. **Known gap:** there is no mobile override — `48px` may feel tight on narrow phones. Phase 1 mobile work should add `@media (max-width: 768px) { padding-left: 24px; padding-right: 24px; }` to section/row paddings, then update this doc.
- Vertical paddings (`64px` on info cells, `48px` on header rows) stay the same across breakpoints. Acceptable.

### Type
- All headlines use `clamp()` so they scale automatically. No `md:` Tailwind variants needed.

### Touch targets
- All buttons use `padding: '13px 28px'` or `'10px 20px'` — sufficient touch height (≥ 44px after font size). No mobile-specific button sizing required.

### Things explicitly NOT done on mobile (yet)
- No mobile-specific hero copy variant.
- No sticky / jump nav (this is Phase 1 work).
- No accordion collapse on long sections.
- No reduced-motion variant of the hero parallax.

These are out of scope for the DNA doc — they are additive interior-page features, documented in Phase 1's plan when the time comes.
