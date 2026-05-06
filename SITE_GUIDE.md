# Site Guide — How to Manage Your Website

This guide covers everything you're likely to want to change on the site, written in plain English. No code knowledge required — just find the file, make the change, save it, and commit.

---

## How to deploy a change

1. Open the file in any code editor (VS Code is recommended — it's free)
2. Make your change
3. Save the file
4. In your terminal, run:
   ```
   git add -A
   git commit -m "describe what you changed"
   git push
   ```
5. Vercel picks it up automatically. Live within 60–90 seconds.

If you're not comfortable with git, ask Claude Code to make the change and deploy it for you.

---

## Prices

**File:** `content/prices.ts`

Change any number in this file and it updates everywhere on the site at once — studio page, tutoring page, booking page, and the Manchester SEO page.

Example — to change the studio rate from £35/hr to £40/hr:
```
hourly: '£40/hr',
```

---

## Homepage releases (Music section)

**File:** `content/releases.ts`

Each entry in `RELEASES` is one row in the music section on the homepage. To add a new release, copy an existing entry and update:
- `type` — e.g. `'Single · 2025'`
- `name` — the track/album name
- `href` — the Spotify or YouTube link
- `hrefLabel` — the button text
- `embedSrc` — the embed URL (Spotify embed URL or YouTube embed URL)
- `embedTitle` — accessible title for the iframe
- `embedType` — `'spotify'` or `'youtube'`
- `infoBg` — path to the cover art in `/public/` (e.g. `'/my-cover.jpg'`)
- `reversed` — `true` means info panel is on the left, `false` means embed is on the left

To remove a release, delete its entry from the array.

---

## Achievement banner (scrolling text strip)

**File:** `content/marquee.ts`

Add or remove items from the `MARQUEE_ITEMS` array. Each string is one item in the scrolling strip.

---

## Testimonials

**Files:**
- Studio testimonials: `content/testimonials.ts` → `STUDIO_TESTIMONIALS`
- Tutoring testimonials: `content/testimonials.ts` → `TUTORING_TESTIMONIALS`

Each entry has three fields: `quote`, `author`, `location`. Add a new entry, delete an old one, or edit any of the three fields.

---

## FAQs

**Files:**
- Studio FAQs: `content/faqs.ts` → `STUDIO_FAQS`
- Tutoring FAQs: `content/faqs.ts` → `TUTORING_FAQS`

Each entry has `question` and `answer`. Edit, add, or remove entries freely.

---

## Social links

**File:** `content/social.ts`

All social platform links in one place. If you change a handle, update the `href` here and it updates across the footer and contact page.

---

## Site-wide strings

**File:** `content/site.ts`

- `tagline` — "Alternative Rap · Manchester" (appears under the hero and in SEO)
- `location` — "Manchester, England"
- `footerQuote` — "as within, so without"
- `contactResponseTime` — "24 hours" (shown on contact page)
- `bioSummary` — your short bio used in SEO metadata

---

## Longer copy blocks (page descriptions, paragraphs)

These are in the page files themselves. Search for the first few words of the text you want to change:

| What to change | File to open | Search for |
|---|---|---|
| Studio page description | `app/studio/page.tsx` | `Professional, focused recording` |
| Studio "What You Get" items | `app/studio/page.tsx` | `WHAT_YOU_GET` |
| Tutoring page description | `app/tutoring/page.tsx` | `Every session built around you` |
| Free page intro | `app/free/page.tsx` | `Tell me what you're working on` |
| Contact page tagline | `app/contact/page.tsx` | `For bookings, collaborations` |
| Homepage hero tagline | `app/page.tsx` | `Alternative Rap` |
| Serious Artist Plan copy | `app/studio/page.tsx` | `Not for everyone` |

---

## Contact form destination

**File:** `app/api/contact/route.ts`

The `to:` field controls where contact form messages are sent. Change the email address on that line.

---

## Booking email sender

**File:** `lib/email-service.ts`

Booking notifications go to the `BOOKING_EMAIL` environment variable (set in Vercel). The sender address is `bookings@elceethealchemist.com`.

---

## Adding a new press photo

1. Drop the image file into `/public/photos/`
2. Reference it in code as `/photos/your-filename.jpg`

---

## Updating the EPK

**File:** `app/epk/page.tsx`

The EPK page has its own hardcoded data for achievements, press quotes, featured-in list, and live credits. Search for the item you want to update.
