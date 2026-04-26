# Elcee the Alchemist — Website Design System

## Project
elceethealchemist.com — official site for Elcee the Alchemist, independent rap artist and recording engineer based in Manchester. The site serves two purposes: artist identity (music, releases, EPK) and engineering business (studio bookings, tutoring, mixing/mastering).

**Stack:** Next.js 16 App Router, TypeScript, Tailwind CSS, deployed via Vercel

---

## Aesthetic

**The feel:** Premium. Sleek. Contemporary. Like a high-end record label or creative agency — not a SaaS product, not a portfolio template. Every page should feel considered, intentional, and alive.

**Keywords to design toward:** depth, dynamic flow, smooth, clear hierarchy, easy navigation, confidence.

**Reference world:** think luxury music brands, high-end creative studios, editorial fashion. Not tech startup, not hobbyist musician page.

---

## Typography

**Heading font:** Nimbus Sans Black — use for all H1, H2, H3, display text, and CTAs. Already loaded via Adobe Typekit (`https://use.typekit.net/nmf5wle.css`). Use `font-bold` in Tailwind which maps to this weight.

**Body font:** Nimbus Sans — use for all body copy, labels, captions. Same kit.

**Never use:** Inter, Roboto, Arial, system-ui, or any other font. The Typekit fonts are always available — always use them.

**Type rules:**
- Headlines should be large and commanding. Don't be timid — use 5xl, 6xl, 7xl on desktop
- Use extreme weight contrast: Black for headlines, Regular for body — never a middle weight
- Line height on large headlines: tight (leading-tight or leading-none)
- Letter spacing on headlines: slightly tight (tracking-tight)
- Body copy: comfortable line height (leading-relaxed), not too wide (max ~65 chars)

---

## Colour

**Primary palette:**
- Background: `#000000` (pure black)
- Text: `#ffffff` (pure white)
- Secondary text: `#9ca3af` (gray-400) for supporting copy
- Muted text: `#6b7280` (gray-500) for captions, small print
- Borders/dividers: `rgba(255,255,255,0.1)` — subtle, not heavy

**Accent:** Use white as the accent. Sharp white elements on black — no colour accents needed. Restraint is the brand.

**Light sections:** Some pages use white background sections (`bg-white text-black`). Keep these clean — no beige, no off-white, pure `#ffffff`.

**Never use:**
- Purple gradients
- Blue CTAs
- Colourful cards or badges
- Rainbow anything
- Heavy drop shadows

---

## Motion & Animation

The site currently has no motion. This is the single biggest improvement opportunity.

**Required installs before adding any animation:**
```
npm install framer-motion lenis
```

**Animation philosophy:** Restrained, smooth, purposeful. Motion should feel like a premium magazine coming to life — not a theme park. Reference: raviklaassens.com — that gliding, floating quality comes from Lenis smooth scroll combined with scroll-triggered reveals. Every animation should serve a purpose: reveal content, guide attention, reward scrolling.

**Lenis smooth scroll** — install this first. It makes the entire page feel like it glides rather than jumps. Wrap the app in a Lenis provider. This single change transforms the feel more than any visual design change.

```tsx
// app/layout.tsx — wrap children with ReactLenis
import { ReactLenis } from 'lenis/react';
// <ReactLenis root>{children}</ReactLenis>
```

**Priority animations (implement in this order):**
1. **Smooth scroll** — Lenis on every page (highest impact)
2. **Scroll-triggered section reveals** — fade + 24px upward translate as sections enter viewport, stagger children 0.1s apart
3. **Hero text reveal** — staggered line or word reveal on page load using Framer Motion
4. **Page transitions** — clean fade between routes using Framer Motion AnimatePresence
5. **Hover states** — subtle scale on cards (1.02 max), colour transitions on buttons

**Framer Motion patterns to use:**

Scroll reveal (use on every major section):
```tsx
<motion.div
  initial={{ opacity: 0, y: 24 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
  viewport={{ once: true, margin: '-80px' }}
/>
```

Staggered children:
```tsx
<motion.div variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
```

**Never use:**
- Bouncing, elastic, or spring animations on page elements
- Spinning loaders on anything visible
- Parallax that moves more than 20px
- Animations that delay content by more than 0.6s total
- GSAP (not needed — Framer Motion handles everything in Next.js natively)

**Easing:** Always use `[0.25, 0.1, 0.25, 1]` (ease-out cubic) for reveals. Never linear.

---

## Layout & Spacing

**Depth:** Create visual depth through layered sections — vary between black, near-black (`#0a0a0a`, `#111111`), and white backgrounds as pages scroll. Sections shouldn't all feel flat at the same level.

**Whitespace:** Generous. Sections need room to breathe. Default to `py-24` or `py-32` for major sections, not `py-12`.

**Grid:** Use asymmetric layouts where possible — don't default to centred everything. Off-centre text, large type breaking out of a column, full-bleed images with text overlaid.

**Max widths:** 
- Content: `max-w-5xl` or `max-w-4xl` 
- Reading text: `max-w-3xl` or `max-w-2xl` — never let body text stretch full width

**Borders:** Prefer `border-white/10` (very subtle) over heavy visible borders. Use borders as texture, not structure.

---

## Components

**Buttons:**
- Primary: white background, black text, rounded-full, bold — `bg-white text-black px-8 py-3 rounded-full font-bold`
- Secondary: transparent with white border — `border border-white text-white px-8 py-3 rounded-full`
- Hover: primary inverts slightly (`hover:bg-gray-200`), secondary fills white (`hover:bg-white hover:text-black`)
- Always include `transition-all duration-300`

**Cards/panels:** Use `border border-white/10` with dark or transparent backgrounds. Avoid heavy box shadows. Prefer borders over shadows.

**Section headings:** Left-aligned on content pages, centred only on hero/feature sections.

---

## Navigation

Currently uses a custom `Navigation` component. Keep it minimal, dark, with clear active states. Never cluttered.

---

## Inspiration References

**raviklaassens.com** — Primary motion reference. Dark cinematic hero, warm grey mid-sections for contrast, full-bleed photography cards. Gliding scroll feel from Lenis. Text reveals from GSAP SplitText (use Framer Motion equivalent). Staggered sentences with bullet spacers in editorial sections.

**artefakt.mov** — Hero text effect (character scramble/noise reveal on load). Grain/film noise texture overlaid on dark backgrounds for depth. Take the text effect and texture — not the video excess.

**kova.masalto.studio** — Cream background, editorial serif + sans typography combination. Large stacked italic type as headline. Spacious, magazine-spread layouts. Reference for future serif accent consideration.

**lifeatspotify.com** — Rounded corners on cards and image containers. Photography woven into content blocks, not just backgrounds. Bold type scale that feels confident without shouting. Reference for the commercial/booking pages specifically.

**nikisadeki.com** — Structural reference only: clear nav to all key sections, social links consolidated, direct contact pathways. Not a visual reference.

---

## Section Contrast

Don't keep every section pure black. raviklaassens.com alternates between dark and a warm near-white/light grey (`#e8e8e8`). This contrast creates rhythm and makes the page feel like it breathes as you scroll. Introduce at least one light section per page.

---

## What This Site Is Not

- Not a SaaS landing page (no feature grids with icons and bullet points)
- Not a portfolio template (no "About Me" cards with avatars)
- Not a music streaming UI (no fake audio waveforms or player chrome)
- Not a WordPress site (no widgets, no sidebars, no obvious template patterns)

---

## Screenshots & Visual Review

After making any frontend change, take a screenshot of the page in the browser before marking the task done. Visually review what was built — don't rely only on the code being correct. If the screenshot looks off, fix it before finishing.

To preview locally: `npm run dev` then open `http://localhost:3000`
