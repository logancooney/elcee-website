# Deployment Guide - elceethealchemist.com

## Current Status
✅ Website built and running locally (http://localhost:3000)  
✅ Homepage complete with hero, bio, music links, social links  
✅ Studio page complete with services, pricing, booking form  
✅ Shop page redirects to Shopify store  
⚠️ Needs deployment to Vercel  
⚠️ Needs DNS configuration  
⚠️ Needs form backend integration  

## Quick Deploy (Recommended)

### Step 1: Deploy to Vercel
```bash
cd /Users/logancooney/.openclaw/workspace/elcee-website

# Login to Vercel (creates account if needed - FREE)
npx vercel login

# Deploy
npx vercel --prod
```

Follow prompts:
- Set up and deploy? **Yes**
- Which scope? **Your account**
- Link to existing project? **No**
- Project name? **elcee-website**
- Directory? **./** (default)
- Override settings? **No**

### Step 2: Configure Domain
After deployment, Vercel gives you a URL like: `elcee-website.vercel.app`

To use your domain `elceethealchemist.com`:

1. **In Vercel Dashboard:**
   - Go to Project Settings > Domains
   - Add custom domain: `elceethealchemist.com`
   - Follow DNS instructions

2. **In Domain Registrar (wherever you bought the domain):**
   - Update DNS records as instructed by Vercel
   - Usually: Add CNAME record pointing to `cname.vercel-dns.com`
   - **IMPORTANT:** Your Shopify store will need to be moved to a subdomain (e.g., `shop.elceethealchemist.com`)

## What's Working Now

### ✅ Homepage (/)
- Hero section with press photo
- Bio section
- Music platform links (Spotify, Apple Music, YouTube)
- Social media links
- Responsive design
- Black & white branding

### ✅ Studio Page (/studio)
- Services listing with accurate pricing:
  - Recording & Engineering: £35/hr (ad-hoc) | £30/hr (subscription)
  - Full Mix & Master: £340
  - Vocal Mix: £190
  - Mastering: £40
  - Music Production: £400+ (bespoke)
  - Ableton Tutoring: £35/hr
- Add-ons: Vocal tuning £40, Stem separation £75, Rush +40%
- Bulk packages: 3-track £920, 5-track £1,450
- Booking form (name, email, phone, service, date, time, message)
- Form validation
- Service agreement reference

### ✅ Shop Page (/shop)
- Auto-redirects to `elceethealchemist.com` (Shopify store)

## Critical TODOs (Before Going Live)

### 1. Form Backend Integration
The booking form currently sends to `/api/booking` but doesn't store data anywhere.

**Option A: Google Sheets CRM (Simplest)**
```bash
# Install dependencies
npm install googleapis

# Set up Google Sheets API:
# 1. Go to Google Cloud Console
# 2. Create project
# 3. Enable Google Sheets API
# 4. Create service account
# 5. Download credentials JSON
# 6. Share Google Sheet with service account email
```

Then update `/app/api/booking/route.ts` to write to Google Sheets.

**Option B: Airtable**
- Create Airtable base
- Use Airtable API
- Simpler auth

**Option C: Email Notifications**
Use a service like SendGrid/Resend to email bookings to yourself.

### 2. Real Links (Replace Placeholders)
Update `app/page.tsx` with real URLs:
- Spotify artist page
- Apple Music artist page
- YouTube channel
- Instagram handle
- TikTok handle
- Twitter handle

### 3. Google Calendar Integration
For studio availability on booking form:
- Set up Google Calendar API
- Query available time slots
- Display in booking form
- Auto-create tentative bookings

### 4. Service Agreement PDF
Create and upload service agreement PDF to `/public/service-agreement.pdf`

### 5. Studio Photos
Add studio photos to `/public/photos/studio-*.jpg` and display on studio page

## File Structure
```
elcee-website/
├── app/
│   ├── page.tsx                 # Homepage
│   ├── studio/page.tsx          # Studio booking page
│   ├── shop/page.tsx            # Shop redirect
│   ├── api/booking/route.ts     # Booking API endpoint
│   ├── layout.tsx               # Root layout
│   └── globals.css              # Global styles
├── public/
│   ├── logos/
│   │   ├── eta-logo-black.png
│   │   ├── eta-logo-white.png
│   │   ├── ankh.png
│   │   └── moso-avatar.png
│   ├── photos/
│   │   ├── press-shot-1.jpg
│   │   ├── press-shot-bw.jpg
│   │   ├── headshot.jpg
│   │   └── full-fit.jpg
│   └── BRAND-GUIDELINES.md
├── package.json
└── next.config.ts
```

## Environment Variables (For Production)
Create `.env.local` for sensitive keys:
```
GOOGLE_SHEETS_PRIVATE_KEY=...
GOOGLE_SHEETS_CLIENT_EMAIL=...
GOOGLE_SHEET_ID=...
```

Add to Vercel:
- Project Settings > Environment Variables
- Add each variable
- Redeploy after adding

## Domain Setup Notes

### Current State
`elceethealchemist.com` → Shopify store

### After Website Deployment
You have 2 options:

**Option 1: Main domain for website, subdomain for shop**
- `elceethealchemist.com` → Vercel (new website)
- `shop.elceethealchemist.com` → Shopify store
- Requires updating Shopify domain settings

**Option 2: Keep Shopify on main domain**
- `elceethealchemist.com` → Shopify store (keep as is)
- `www.elceethealchemist.com` → Vercel (new website)
- Less ideal for SEO

**Recommendation:** Option 1 (main domain for website)

## Costs
- **Vercel Hosting:** FREE (generous free tier)
- **Domain:** Already owned
- **Google APIs:** FREE (within generous limits)
- **Total additional cost:** £0/month

## Next Steps (Priority Order)
1. ✅ Deploy to Vercel
2. ✅ Test live site
3. ⚠️ Set up form backend (Google Sheets or email)
4. ⚠️ Add real music/social links
5. ⚠️ Configure custom domain
6. ⚠️ Add Google Calendar integration
7. ⚠️ Upload service agreement PDF
8. ⚠️ Add studio photos
9. ⚠️ SEO optimization (meta tags, Open Graph)
10. ⚠️ Analytics (Google Analytics or Vercel Analytics)

## Testing Locally
```bash
cd /Users/logancooney/.openclaw/workspace/elcee-website
npm run dev
# Visit http://localhost:3000
```

## Support
- Next.js Docs: https://nextjs.org/docs
- Vercel Docs: https://vercel.com/docs
- Tailwind CSS: https://tailwindcss.com/docs
