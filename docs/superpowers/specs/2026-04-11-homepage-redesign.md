# Homepage Redesign — Design Spec

## Goal
Redesign the homepage of elceethealchemist.com to reflect Elcee's identity as a recording artist. The page is artist-only — no engineering or tutoring services. Bold, clear, not flashy. Monochromatic. Spacious. Music and video front and centre.

## Pages in Scope
- **Homepage** (`app/page.tsx`) — this spec only
- Studio, Tutoring, and Shop pages are out of scope here; they will be restyled separately to match the design system established here.

---

## Design System

### Typography
- **Headings:** `nimbus-sans`, weight 900 (Black), uppercase, tight tracking
- **Body:** `nimbus-sans`, weight 400 (Regular)
- Font loaded via Adobe Fonts kit: `https://use.typekit.net/nmf5wle.css` (already in `app/layout.tsx`)

### Colour
- Background: `#000000`
- Primary text: `#ffffff`
- Secondary text / labels: `#444444`
- Dividers: `#1a1a1a`
- No accent colours. Strictly monochromatic.

### Texture & Assets
All texture, grain, and hand-drawn elements are created by Logan in Photoshop and dropped into named slots. The code references these paths — Logan replaces the placeholder files.

| Slot | Path | Usage |
|---|---|---|
| Hero background | `/public/assets/hero-bg.jpg` | Full-bleed background behind hero section |
| Page texture overlay | `/public/assets/texture-overlay.png` | Fixed overlay across entire page, low opacity |
| Section divider asset | `/public/assets/divider.png` | Optional decorative element between sections |

Until assets are provided, slots render with a solid black background. The texture overlay slot accepts PNG with transparency.

### Animation
- **Smooth scroll:** Lenis library. Momentum-based, natural feel. No snapping.
- **Background parallax:** Hero background image drifts very slowly on scroll (CSS `background-attachment: fixed` or JS parallax at ~0.3x scroll speed). Subtle — gives life, not distraction.
- **Section reveals:** Elements fade and translate up 20px as they enter the viewport. `IntersectionObserver`. One reveal per section, not per element.
- **No other animations.** No marquees, no looping effects, no hover gimmicks.

---

## Page Structure

### 1. Navigation
- Fixed, top of page
- Transparent over hero, transitions to solid black on scroll past hero
- Logo left (existing ETA logo asset)
- Links right: Music · Studio · Tutoring · Contact
- Mobile: hamburger, full-screen dropdown

### 2. Hero
- Full viewport height (`100vh`)
- Artist name in Nimbus Sans Black, very large — `clamp(72px, 16vw, 220px)`
- One-line descriptor below: e.g. `Manchester · Recording Artist`
- Single CTA: **Listen Now** → Spotify
- Hero background uses `/public/assets/hero-bg.jpg` with slow parallax
- No other content

### 3. Music
- Section heading: `Music` in Nimbus Sans Black
- Embedded music player (existing `FeaturedRelease` / `MediaGrid` components, restyled to match new design)
- Black background, full width

### 4. Video
- Section heading: `Video` in Nimbus Sans Black
- 2-column grid of YouTube embeds on desktop, single column on mobile
- Existing YouTube embed URLs from the current site
- Black background

### 5. About
- Section heading: `About` in Nimbus Sans Black
- Two columns: text left, press photo right
- Text: 3–4 sentences max, Nimbus Sans Regular
- Photo: `/public/photos/press-shot-bw.jpg`, grayscale, fills column height
- White background (sole white section — creates a natural break)

### 6. Platforms & Socials
- Section heading: `Stream` in Nimbus Sans Black
- All 8 DSP links in a clean grid (Spotify, Apple Music, YouTube, SoundCloud, Amazon Music, Tidal, Deezer, Bandcamp)
- Below: Social handles in a row (Instagram, TikTok, YouTube, Twitter, Facebook)
- No icons — text links only, small caps
- Black background

### 7. Footer
- Ankh logo centred
- Copyright line: `© 2026 Elcee the Alchemist`
- Contact link right-aligned
- Minimal, no clutter

---

## Technical Notes

### Lenis Smooth Scroll
Install `lenis` package. Initialise in a client component wrapper at the root layout level so smooth scroll applies across all pages, not just homepage.

```
npm install lenis
```

Create `app/components/SmoothScroll.tsx` — a client component that wraps Lenis initialisation in `useEffect`. Import into `app/layout.tsx`.

### Font Usage in Tailwind
Since Nimbus Sans is loaded via Adobe Fonts (not `next/font`), reference it via inline style or a global CSS class:

```css
.heading { font-family: 'nimbus-sans', Helvetica, Arial, sans-serif; font-weight: 900; }
.body    { font-family: 'nimbus-sans', Helvetica, Arial, sans-serif; font-weight: 400; }
```

Or via Tailwind `@layer`:
```css
@layer base {
  h1, h2, h3 { font-family: 'nimbus-sans', Helvetica, Arial, sans-serif; font-weight: 900; }
  body        { font-family: 'nimbus-sans', Helvetica, Arial, sans-serif; font-weight: 400; }
}
```

### Existing Components to Reuse
- `app/components/MediaEmbeds.tsx` — `FeaturedRelease`, `MediaGrid` — keep logic, restyle
- `app/components/Navigation.tsx` — update to support transparent-on-hero behaviour
- `/public/photos/press-shot-bw.jpg` — press photo, already in project
- `/public/logos/ankh-white.png` — ankh, already in project
- `/public/logos/eta-logo-white-cropped.png` — nav logo, already in project

### What Gets Removed from Current Homepage
- Avatar overlay (`/public/elcee-avatar.png`) — removed
- `Achievements` component — removed from homepage (can be used elsewhere)
- Rounded pill buttons — replaced with minimal rectangular/text-based CTAs
- `text-gray-400` body copy — replaced with Nimbus Sans Regular at proper weight

---

## Asset Checklist (Logan to provide)
- [ ] `/public/assets/hero-bg.jpg` — hero background image
- [ ] `/public/assets/texture-overlay.png` — full-page grain/texture overlay (PNG with alpha)
- [ ] `/public/assets/divider.png` — optional decorative divider element

Code will function without these — slots fall back to solid black.
