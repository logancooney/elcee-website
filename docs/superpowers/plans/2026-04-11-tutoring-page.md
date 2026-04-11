# Tutoring Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a `/tutoring` page on elceethealchemist.com that converts QR code scanners into booked discovery calls.

**Architecture:** Self-contained page at `app/tutoring/` following the same pattern as `app/studio/`. Stateful components (Testimonials, FAQ) are split into their own files with `"use client"`. Static sections are inlined in the page. Metadata lives in a separate `metadata.ts` file.

**Tech Stack:** Next.js App Router, TypeScript, Tailwind CSS. No new dependencies.

---

## File Map

| Action | File | Purpose |
|---|---|---|
| Create | `app/tutoring/page.tsx` | Main page — all static sections inlined, imports Testimonials + FAQ |
| Create | `app/tutoring/metadata.ts` | SEO metadata for the tutoring page |
| Create | `app/tutoring/components/Testimonials.tsx` | Carousel with placeholder student quotes |
| Create | `app/tutoring/components/FAQ.tsx` | Accordion with tutoring-specific FAQs |
| Modify | `app/sitemap.ts` | Add `/tutoring` entry |

---

## Task 1: Tutoring Testimonials component

**Files:**
- Create: `app/tutoring/components/Testimonials.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "PLACEHOLDER — replace with real student quote before launch.",
    author: "Student Name",
    location: "Manchester"
  },
  {
    quote: "PLACEHOLDER — replace with real student quote before launch.",
    author: "Student Name",
    location: "Online"
  },
  {
    quote: "PLACEHOLDER — replace with real student quote before launch.",
    author: "Student Name",
    location: "Manchester"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 px-6 bg-white text-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          What Students Say
        </h2>

        <div className="relative">
          <div className="bg-black text-white p-10 md:p-12 rounded-2xl">
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{testimonials[current].author}</p>
                <p className="text-gray-400">{testimonials[current].location}</p>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setCurrent(current === 0 ? testimonials.length - 1 : current - 1)}
                  className="w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrent(current === testimonials.length - 1 ? 0 : current + 1)}
                  className="w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition ${
                  current === index ? 'bg-black w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tutoring/components/Testimonials.tsx
git commit -m "feat: add tutoring testimonials component"
```

---

## Task 2: Tutoring FAQ component

**Files:**
- Create: `app/tutoring/components/FAQ.tsx`

- [ ] **Step 1: Create the component**

```tsx
"use client";

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: "Do I need any experience?",
    answer: "No. I work with complete beginners through to experienced producers. Sessions are tailored entirely to where you are right now and where you want to get to."
  },
  {
    question: "What equipment do I need?",
    answer: "For online sessions, just a computer, headphones, and your DAW. For in-studio sessions, just show up — everything is here. If you don't have a DAW yet, we can figure that out on your free call."
  },
  {
    question: "Which DAW do you teach?",
    answer: "I specialise in Ableton Live for production. For mixing, I can teach you in any DAW — Logic, FL Studio, Pro Tools, Ableton, whatever you're working in."
  },
  {
    question: "Can I learn online?",
    answer: "Yes. Online sessions run at £40/hour via video call. You share your screen, I guide you through everything in real time. Works just as well as in person."
  },
  {
    question: "How long are sessions?",
    answer: "Standard sessions are 1 hour. If you want longer, that can be arranged — just mention it on your free call."
  },
  {
    question: "How do I pay?",
    answer: "Payment is taken before each session. Bank transfer or card both accepted. Packages are available if you want to block book and save — ask about this on your free call."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 px-6 bg-white text-black">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
          Frequently Asked Questions
        </h2>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-black">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full text-left p-6 flex justify-between items-center hover:bg-gray-50 transition"
              >
                <h3 className="text-xl font-semibold pr-8">{faq.question}</h3>
                <span className="text-2xl shrink-0">
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 text-gray-700 leading-relaxed">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            Still have questions? Get in touch.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-black text-white px-8 py-3 font-semibold hover:bg-gray-800 transition"
          >
            Contact
          </Link>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tutoring/components/FAQ.tsx
git commit -m "feat: add tutoring FAQ component"
```

---

## Task 3: Metadata file

**Files:**
- Create: `app/tutoring/metadata.ts`

- [ ] **Step 1: Create the metadata file**

```ts
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Music Production Tutor Manchester | Elcee the Alchemist',
  description: 'One-to-one music production, mixing, and recording lessons in Manchester or online. Ableton Live, any DAW. All levels welcome. Book a free call.',
  alternates: {
    canonical: 'https://elceethealchemist.com/tutoring',
  },
  openGraph: {
    title: 'Music Production Tutor Manchester | Elcee the Alchemist',
    description: 'One-to-one music production, mixing, and recording lessons in Manchester or online. All levels welcome. Book a free call.',
    url: 'https://elceethealchemist.com/tutoring',
    siteName: 'Elcee the Alchemist',
    locale: 'en_GB',
    type: 'website',
  },
};
```

- [ ] **Step 2: Commit**

```bash
git add app/tutoring/metadata.ts
git commit -m "feat: add tutoring page metadata"
```

---

## Task 4: Main page

**Files:**
- Create: `app/tutoring/page.tsx`

- [ ] **Step 1: Create the page**

```tsx
"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

export default function TutoringPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Learn Music Production in Manchester
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            One-to-one sessions with a working artist and engineer. All levels welcome — online or in-studio in Manchester.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#booking"
              className="bg-white text-black px-12 py-4 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Book a Free Call
            </a>
            <a
              href="#what-you-learn"
              className="border-2 border-white px-12 py-4 font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              See What&apos;s Included
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="what-you-learn" className="py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Music Production',
                description: 'Ableton Live, beat-making, arrangement, sound design. Build tracks from scratch.',
              },
              {
                title: 'Mixing',
                description: 'Any DAW. Balance, EQ, compression, and getting a professional sound.',
              },
              {
                title: 'Recording & Engineering',
                description: 'Studio technique, signal chain, mic placement, getting the best takes.',
              },
              {
                title: 'Songwriting & Lyricism',
                description: 'Structure, flow, pen game, finding your voice and building your craft.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-black p-8">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', text: 'Book a free 15-minute call — no commitment, no pressure.' },
              { step: '02', text: 'We build a session plan around your goals and your level.' },
              { step: '03', text: 'Learn one-to-one at your own pace, online or in the studio.' },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-6xl font-bold text-gray-700 mb-4">{item.step}</p>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pricing
          </h2>
          <p className="text-gray-400 mb-16">Simple hourly rates. No hidden costs.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="border border-white/20 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Online</h3>
              <p className="text-gray-400 mb-6">Via video call, share your screen</p>
              <p className="text-5xl font-bold mb-1">£40</p>
              <p className="text-gray-400">per hour</p>
            </div>
            <div className="border border-white p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">In-Studio</h3>
              <p className="text-gray-400 mb-6">Cambridge Street, Manchester</p>
              <p className="text-5xl font-bold mb-1">£45</p>
              <p className="text-gray-400">per hour</p>
            </div>
          </div>

          <p className="text-gray-400 mb-2">Packages available — bulk session discounts on request.</p>
          <p className="text-gray-500 text-sm">First call is free. No commitment.</p>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book a Free Call
          </h2>
          <p className="text-xl text-gray-400">
            15 minutes. No pressure. We&apos;ll figure out if we&apos;re a good fit.
          </p>
        </div>

        {/* PLACEHOLDER: Replace the href below with your tutoring Calendly URL once set up */}
        {/* e.g. data-url="https://calendly.com/YOUR-NEW-ACCOUNT/tutoring-call" */}
        <div
          className="calendly-inline-widget rounded-lg overflow-hidden mx-auto"
          data-url="https://calendly.com/elcee-mgmt/studio-session"
          style={{ minWidth: '320px', height: '700px', maxWidth: '900px' }}
        />

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Prefer to message first?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tutoring/page.tsx
git commit -m "feat: add tutoring page"
```

---

## Task 5: Export metadata from page

Next.js App Router requires metadata to be exported from the page file or a `layout.tsx`. Since the page uses `"use client"`, export metadata from a separate layout file.

**Files:**
- Create: `app/tutoring/layout.tsx`

- [ ] **Step 1: Create layout file that exports metadata**

```tsx
import { metadata } from './metadata';
export { metadata };

export default function TutoringLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

- [ ] **Step 2: Commit**

```bash
git add app/tutoring/layout.tsx
git commit -m "feat: export tutoring page metadata via layout"
```

---

## Task 6: Add /tutoring to sitemap

**Files:**
- Modify: `app/sitemap.ts`

- [ ] **Step 1: Add the tutoring entry**

In `app/sitemap.ts`, add this entry to the returned array after the `/studio` entry:

```ts
{
  url: `${baseUrl}/tutoring`,
  lastModified: new Date(),
  changeFrequency: 'monthly',
  priority: 0.9,
},
```

- [ ] **Step 2: Commit**

```bash
git add app/sitemap.ts
git commit -m "feat: add /tutoring to sitemap"
```

---

## Task 7: Verify the build

- [ ] **Step 1: Run the dev server and check the page**

```bash
cd /Users/logancooney/Sites/elcee-website
npm run dev
```

Open `http://localhost:3000/tutoring` and check:
- Page loads with no errors
- All sections render correctly
- "Book a Free Call" button scrolls to the Calendly embed
- "See What's Included" scrolls to the subjects grid
- FAQ accordion opens and closes
- Testimonial carousel arrows work

- [ ] **Step 2: Run the production build to catch any type errors**

```bash
npm run build
```

Expected: build completes with no errors.

---

## Post-Launch Checklist (manual steps)

- [ ] Set up new free Calendly account for tutoring, update `data-url` in `app/tutoring/page.tsx`
- [ ] Replace placeholder testimonials in `app/tutoring/components/Testimonials.tsx` with real student quotes
- [ ] Generate QR code pointing to `https://elceethealchemist.com/tutoring` and add to business cards / flyers
