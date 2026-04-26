'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import BookingPrompt from '../components/BookingPrompt';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import CalendlyEmbed from '../../components/CalendlyEmbed';
import { CALENDLY_EVENT_URLS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const ONLINE_BUNDLES = [
  { label: '5 Sessions', price: '£225', saving: 'Save £25', url: CALENDLY_BUNDLE_LINKS.online5 },
  { label: '8 Sessions', price: '£390', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.online8 },
  { label: '10 Sessions', price: '£400', saving: 'Save £100', url: CALENDLY_BUNDLE_LINKS.online10, highlight: true },
];

const IN_PERSON_BUNDLES = [
  { label: '5 Sessions', price: '£270', saving: 'Save £30', url: CALENDLY_BUNDLE_LINKS.inPerson5 },
  { label: '8 Sessions', price: '£470', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.inPerson8 },
  { label: '10 Sessions', price: '£480', saving: 'Save £120', url: CALENDLY_BUNDLE_LINKS.inPerson10, highlight: true },
];

const LEARN_ITEMS = [
  {
    title: 'Music Production',
    description: "Ableton Live from scratch. We'll make something you actually like on day one.",
  },
  {
    title: 'Mixing',
    description: "Any DAW. I teach my philosophy, not just numbers. I'll show you the rules — then teach you how to break them.",
  },
  {
    title: 'Recording & Engineering',
    description: "What actually makes the difference in a session. Spoiler: it's not the gear.",
  },
  {
    title: 'Songwriting & Lyricism',
    description: "Structure, flow, finding your voice. From someone who's been doing it professionally for years.",
  },
];

export default function TutoringPage() {
  const [bookingMode, setBookingMode] = useState<'online' | 'in-person' | null>(null);

  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Tuition
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 88px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 24 }}>
            1-1 Lessons.<br />Real Studio.<br />Real Artist.
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 520, marginBottom: 36 }}>
            Music production, mixing, recording, and songwriting. Online or in-studio in Manchester. No theory required — just the will to make something real.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', border: 'none', textDecoration: 'none', cursor: 'pointer',
            }}>
              Book Free Session
            </a>
            <a href="#what-you-learn" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none', cursor: 'pointer',
            }}>
              See What&apos;s Included
            </a>
          </div>
        </div>
      </section>

      {/* The Problem */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5, marginBottom: 20, letterSpacing: '-0.01em' }}>
            You&apos;ve got music in you. You know it.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Maybe you&apos;ve got half-finished tracks and no idea what&apos;s missing. Maybe you&apos;ve never opened a DAW but music is what you want to do with your life. Maybe you&apos;ve spent months watching tutorials and still feel like you&apos;re going nowhere.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            The problem isn&apos;t talent. It&apos;s having nobody in your corner who actually knows what they&apos;re doing. Who can look at what you&apos;re making, tell you exactly what it needs, and show you how to get there.
          </p>
          <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5, letterSpacing: '-0.01em' }}>
            These sessions change that.
          </p>
        </div>
      </motion.section>

      {/* The Guide — light section */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            02 — The Guide
          </div>
          <p style={{ fontSize: 20, fontWeight: 900, lineHeight: 1.5, marginBottom: 20, letterSpacing: '-0.01em' }}>
            I&apos;m Elcee. A recording artist, mixing engineer, and studio owner based in Manchester.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
            I&apos;m still in the room. Still making music. Which means everything I teach is tested, current, and real.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
            I&apos;ve recorded at Abbey Road. I&apos;ve been flown to Amsterdam by JBL to work in Lady Gaga&apos;s studio and break down unreleased Justin Bieber tracks. I hold a First Class degree in Electronic Music Production.
          </p>
          <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(0,0,0,0.55)' }}>
            I&apos;m not a teacher who used to make music. I&apos;m an artist who also teaches. That&apos;s a different thing entirely.
          </p>
        </div>
      </motion.section>

      {/* What You'll Learn — light section continues */}
      <motion.section {...fadeUp} id="what-you-learn" style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            03 — What You&apos;ll Learn
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 48 }}>
            Every Session<br />Is Bespoke
          </h2>
          <div className="grid-two-col" style={{ gap: 1 }}>
            {LEARN_ITEMS.map((item) => (
              <div key={item.title} style={{ padding: '32px 40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.4)' }}>
                <p style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em', marginBottom: 10 }}>{item.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)' }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* How It Works */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            04 — Process
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 56 }}>
            How It Works
          </h2>
          <div className="grid-two-col" style={{ gap: 1 }}>
            {[
              { step: '01', text: 'Book your free first session — a 20-minute call to figure out where you are and where you want to go.' },
              { step: '02', text: 'Every session is built around you. No wasted time on things you don\'t need yet.' },
              { step: '03', text: 'Make music you\'re proud of. At your pace. Online or in the studio in Manchester.' },
            ].map((item) => (
              <div key={item.step} style={{ padding: '40px', border: '1px solid #1a1a1a' }}>
                <p style={{ fontWeight: 900, fontSize: 56, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.1)', marginBottom: 16, lineHeight: 1 }}>{item.step}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Testimonials */}
      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      {/* Pricing — light section */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            05 — Pricing
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 8 }}>
            Simple Rates
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', marginBottom: 48 }}>No hidden costs. First session is always free.</p>
          <div className="grid-two-col" style={{ gap: 1, marginBottom: 48 }}>
            <div style={{ padding: '48px 40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.4)' }}>
              <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>Format</p>
              <p style={{ fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Online</p>
              <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 24 }}>Via video call</p>
              <p style={{ fontWeight: 900, fontSize: 48, letterSpacing: '-0.03em', lineHeight: 1 }}>£45</p>
              <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', marginTop: 6 }}>per hour</p>
            </div>
            <div style={{ padding: '48px 40px', border: '1.5px solid #080808', background: '#080808', color: '#fafafa' }}>
              <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Format</p>
              <p style={{ fontWeight: 900, fontSize: 20, marginBottom: 4 }}>In-Studio</p>
              <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 24 }}>Manchester</p>
              <p style={{ fontWeight: 900, fontSize: 48, letterSpacing: '-0.03em', lineHeight: 1 }}>£60</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: 6 }}>per hour</p>
            </div>
          </div>
          <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 6 }}>Bulk session packages available — save up to £120.</p>
          <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.35)' }}>First session is free. A 20-minute introductory call. No commitment.</p>
        </div>
      </motion.section>

      {/* Booking */}
      <motion.section {...fadeUp} id="booking" style={{ padding: '80px 48px', background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              06 — Book
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 16 }}>
              Book a Session
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
              First session is free — 20 minutes, no pressure. Or jump straight in and book a paid lesson.
            </p>
            {!bookingMode && (
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                {[
                  { id: 'online' as const, label: 'Online', price: '£45/hr' },
                  { id: 'in-person' as const, label: 'In-Person', price: '£60/hr' },
                ].map(opt => (
                  <button
                    key={opt.id}
                    onClick={() => setBookingMode(opt.id)}
                    style={{
                      appearance: 'none',
                      cursor: 'pointer',
                      padding: '14px 28px',
                      fontWeight: 900,
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      background: 'transparent',
                      color: '#fafafa',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#fafafa';
                      (e.currentTarget as HTMLButtonElement).style.color = '#080808';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fafafa';
                    }}
                  >
                    {opt.label} — {opt.price} →
                  </button>
                ))}
              </div>
            )}
          </div>
          {bookingMode && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setBookingMode(null)}
                  style={{
                    appearance: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  ← Switch mode
                </button>
              </div>
              <CalendlyEmbed
                key={bookingMode}
                url={bookingMode === 'online' ? CALENDLY_EVENT_URLS.tutoringOnline : CALENDLY_EVENT_URLS.tutoringInPerson}
                height={700}
              />
            </>
          )}
          <p style={{ textAlign: 'center', marginTop: 32, fontSize: 13, color: 'rgba(255,255,255,0.35)' }}>
            Prefer to message first?{' '}
            <Link href="/contact" style={{ color: '#fafafa', textDecoration: 'underline' }}>Get in touch →</Link>
          </p>
        </div>
      </motion.section>

      {/* Bulk Sessions */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              07 — Bulk Sessions
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 16 }}>
              Commit &amp; Save
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>
              Pay upfront, book at your own pace. Save up to £120 on a block of sessions.
            </p>
          </div>

          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Online</p>
          <div className="grid-two-col" style={{ gap: 1, marginBottom: 48 }}>
            {ONLINE_BUNDLES.map((pkg) => (
              <a
                key={pkg.label}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '32px 40px',
                  border: pkg.highlight ? '1.5px solid rgba(255,255,255,0.6)' : '1px solid #1a1a1a',
                  background: pkg.highlight ? '#111111' : 'transparent',
                  textDecoration: 'none', color: '#fafafa',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = pkg.highlight ? 'rgba(255,255,255,0.6)' : '#1a1a1a'; }}
              >
                <p style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>{pkg.label}</p>
                <p style={{ fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 6 }}>{pkg.price}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{pkg.saving}</p>
              </a>
            ))}
          </div>

          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>In-Person</p>
          <div className="grid-two-col" style={{ gap: 1 }}>
            {IN_PERSON_BUNDLES.map((pkg) => (
              <a
                key={pkg.label}
                href={pkg.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '32px 40px',
                  border: pkg.highlight ? '1.5px solid rgba(255,255,255,0.6)' : '1px solid #1a1a1a',
                  background: pkg.highlight ? '#111111' : 'transparent',
                  textDecoration: 'none', color: '#fafafa',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.4)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = pkg.highlight ? 'rgba(255,255,255,0.6)' : '#1a1a1a'; }}
              >
                <p style={{ fontWeight: 900, fontSize: 16, marginBottom: 6 }}>{pkg.label}</p>
                <p style={{ fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 6 }}>{pkg.price}</p>
                <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{pkg.saving}</p>
              </a>
            ))}
          </div>

          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 24, letterSpacing: '0.1em' }}>
            Use code <span style={{ color: '#fafafa', fontWeight: 900 }}>WELCOME10</span> for 10% off your first booking.
          </p>
        </div>
      </motion.section>

      <BookingPrompt />

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />
    </div>
  );
}
