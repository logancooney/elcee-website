# Elcee the Alchemist - Official Website

Professional website for Manchester alternative rap artist Elcee the Alchemist.

## 🎯 Features

- **Artist Homepage** - Hero section, bio, music links, social media
- **Studio Booking System** - Professional recording services with online booking
- **Shop Integration** - Seamless redirect to Shopify merch store
- **Responsive Design** - Mobile-first, works on all devices
- **Black & White Branding** - Clean, minimal aesthetic

## 🛠 Tech Stack

- **Framework:** Next.js 16 (React)
- **Styling:** Tailwind CSS
- **Language:** TypeScript
- **Hosting:** Vercel (free tier)
- **Domain:** elceethealchemist.com

## 📁 Project Structure

```
elcee-website/
├── app/
│   ├── page.tsx              # Homepage
│   ├── studio/page.tsx       # Studio booking
│   ├── shop/page.tsx         # Shopify redirect
│   └── api/booking/          # Booking API
├── public/
│   ├── logos/                # Brand assets
│   └── photos/               # Press photos
└── docs/
    ├── DEPLOYMENT-GUIDE.md   # Deployment instructions
    └── FORM-INTEGRATION-TODO.md  # Backend integration guide
```

## 🚀 Quick Start

### Development
```bash
npm install
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel --prod
```

## 📋 TODOs Before Launch

### Critical
- [ ] Set up form backend (Resend/Google Sheets)
- [ ] Add real music platform links
- [ ] Add real social media links
- [ ] Configure custom domain DNS
- [ ] Upload service agreement PDF

### Optional
- [ ] Add Google Calendar integration
- [ ] Add studio photos to gallery
- [ ] Set up Google Analytics
- [ ] Add contact page
- [ ] SEO optimization

## 🎨 Branding

- **Colors:** Black (#000000) & White (#FFFFFF)
- **Logo:** ETA logo (black/white variants)
- **Symbol:** Ankh (brand icon)
- **Typography:** Clean sans-serif (Inter, Helvetica)

See `public/BRAND-GUIDELINES.md` for full details.

## 📧 Contact

Bookings: Form on /studio page  
Email: elcee.mgmt@gmail.com  
Social: @elceethealchemist (IG, TikTok, Twitter)

## 📄 License

© 2026 Elcee the Alchemist. All rights reserved.
