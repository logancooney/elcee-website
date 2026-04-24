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

*To be filled in Task A3.*

## Motion patterns

*To be filled in Task A3.*

## Section archetypes

*To be filled in Task A4.*

## Component patterns

*To be filled in Task A4.*

## Light-section rule

Every interior page must contain at least one light-background section using `#f0ede8` (warm off-white, not pure white), per the Studio section pattern (homepage lines 500–550). This provides contrast rhythm against the dominant `#080808` palette.

## Mobile overrides

*To be filled in Task A4.*
