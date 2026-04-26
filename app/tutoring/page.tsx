'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
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
  { label: '01', title: 'Music Production', description: "Ableton Live from scratch. We'll make something you actually like on day one." },
  { label: '02', title: 'Mixing', description: "Any DAW. I teach my philosophy, not just numbers. I'll show you the rules — then teach you how to break them." },
  { label: '03', title: 'Recording & Engineering', description: "What actually makes the difference in a session. Spoiler: it's not the gear." },
  { label: '04', title: 'Songwriting & Lyricism', description: "Structure, flow, finding your voice. From someone who's been doing it professionally for years." },
];

export default function TutoringPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [bookingMode, setBookingMode] = useState<'online' | 'in-person' | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (heroParallaxRef.current) {
        heroParallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
      }
      if (heroImgRef.current && heroRef.current) {
        const heroH = heroRef.current.offsetHeight;
        const fade = Math.max(0, 0.45 - (y / (heroH * 0.55)) * 0.45);
        heroImgRef.current.style.opacity = String(fade);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section
        ref={heroRef}
        style={{
          position: 'relative', width: '100%', height: '100vh', minHeight: 640,
          overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
          paddingBottom: 72, paddingLeft: 48,
        }}
      >
        <div ref={heroParallaxRef} style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111', willChange: 'transform',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            src="/elcee-portrait.jpg"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 15%',
              filter: 'grayscale(100%) contrast(1.08)',
              opacity: 0.45,
            }}
          />
        </div>

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.75, mixBlendMode: 'screen', pointerEvents: 'none',
        } as React.CSSProperties} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Tuition
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 28,
          }}>
            1-1 Lessons.<br />Real Studio.<br />Real Artist.
          </h1>
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

        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          zIndex: 2, opacity: 0.3,
        }}>
          <div style={{ width: 1, height: 32, background: 'white', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── WHAT YOU'LL LEARN ── */}
      <motion.section {...fadeUp} id="what-you-learn" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            02 — What You&apos;ll Learn
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Every Session<br />Is Bespoke
          </h2>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {LEARN_ITEMS.map((item, i) => (
            <div key={item.label} style={{
              padding: '56px 48px',
              borderLeft: i % 2 === 1 ? '1px solid #1a1a1a' : 'none',
              borderTop: i >= 2 ? '1px solid #1a1a1a' : 'none',
              background: i % 2 === 1 ? '#111111' : 'transparent',
            }}>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>{item.label}</div>
              <p style={{ fontWeight: 900, fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 16 }}>{item.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>{item.description}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── PRICING ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>03 — Pricing</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>Simple Rates</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 10 }}>No hidden costs. First session is always free.</p>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ padding: '56px 48px', borderRight: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Format</p>
            <p style={{ fontWeight: 900, fontSize: 20, marginBottom: 4 }}>Online</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Via video call</p>
            <p style={{ fontWeight: 900, fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>£45</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: 8 }}>per hour</p>
          </div>
          <div style={{ padding: '56px 48px', background: '#111111' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Format</p>
            <p style={{ fontWeight: 900, fontSize: 20, marginBottom: 4 }}>In-Studio</p>
            <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 28 }}>Manchester</p>
            <p style={{ fontWeight: 900, fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-0.03em', lineHeight: 1 }}>£60</p>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.1em', marginTop: 8 }}>per hour</p>
          </div>
        </div>
        <div style={{ padding: '24px 48px' }}>
          <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.3)' }}>Bulk session packages available — save up to £120. First session is free. No commitment.</p>
        </div>
      </motion.section>

      {/* ── BOOKING ── */}
      <motion.section {...fadeUp} id="booking" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>04 — Book</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>Book a Session</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>First session is free — 20 minutes, no pressure. Or jump straight in.</p>
        </div>
        <div style={{ padding: '64px 48px' }}>
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
                    appearance: 'none', cursor: 'pointer',
                    padding: '14px 28px', fontWeight: 900, fontSize: 11,
                    letterSpacing: '0.18em', textTransform: 'uppercase',
                    background: 'transparent', color: '#fafafa',
                    border: '1.5px solid rgba(255,255,255,0.4)',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#fafafa'; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#fafafa'; }}
                >
                  {opt.label} — {opt.price} →
                </button>
              ))}
            </div>
          )}
          {bookingMode && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setBookingMode(null)}
                  style={{
                    appearance: 'none', cursor: 'pointer', background: 'transparent', border: 'none',
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
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

      {/* ── BULK SESSIONS ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>05 — Bulk Sessions</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>Commit &amp; Save</h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginTop: 10 }}>Pay upfront, book at your own pace. Save up to £120 on a block of sessions.</p>
        </div>
        <div style={{ padding: '32px 48px 8px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>Online</p>
        </div>
        <div className="grid-three-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {ONLINE_BUNDLES.map((pkg, i) => (
            <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', padding: '48px',
              borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
              background: pkg.highlight ? '#111111' : 'transparent',
              textDecoration: 'none', color: '#fafafa',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pkg.highlight ? '#111111' : 'transparent'; }}
            >
              <p style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>{pkg.label}</p>
              <p style={{ fontWeight: 900, fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.02em', marginBottom: 10 }}>{pkg.price}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{pkg.saving}</p>
            </a>
          ))}
        </div>
        <div style={{ padding: '32px 48px 8px', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>In-Person</p>
        </div>
        <div className="grid-three-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {IN_PERSON_BUNDLES.map((pkg, i) => (
            <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer" style={{
              display: 'block', padding: '48px',
              borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
              background: pkg.highlight ? '#111111' : 'transparent',
              textDecoration: 'none', color: '#fafafa',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = pkg.highlight ? '#111111' : 'transparent'; }}
            >
              <p style={{ fontWeight: 900, fontSize: 18, marginBottom: 12 }}>{pkg.label}</p>
              <p style={{ fontWeight: 900, fontSize: 'clamp(28px, 3vw, 44px)', letterSpacing: '-0.02em', marginBottom: 10 }}>{pkg.price}</p>
              <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.35)', letterSpacing: '0.1em' }}>{pkg.saving}</p>
            </a>
          ))}
        </div>
        <div style={{ padding: '24px 48px' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            Use code <span style={{ color: '#fafafa', fontWeight: 900 }}>WELCOME10</span> for 10% off your first booking.
          </p>
        </div>
      </motion.section>

      {/* ── THE CASE ── */}
      <motion.section
        {...fadeUp}
        className="grid-two-col"
        style={{ background: '#080808', borderTop: '1px solid #1a1a1a', minHeight: 360 }}
      >
        <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <p style={{ fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 24 }}>
            You&apos;ve got music in you.<br />You know it.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            Maybe you&apos;ve got half-finished tracks and no idea what&apos;s missing. Maybe you&apos;ve never opened a DAW but music is what you want to do with your life. Maybe you&apos;ve spent months watching tutorials and still feel like you&apos;re going nowhere.
          </p>
          <p style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.01em' }}>
            These sessions change that.
          </p>
        </div>
        <div style={{
          borderLeft: '1px solid #1a1a1a', padding: '64px 48px',
          display: 'flex', flexDirection: 'column', justifyContent: 'center',
          background: '#111111',
        }}>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', marginBottom: 16 }}>
            The problem isn&apos;t talent. It&apos;s having nobody in your corner who actually knows what they&apos;re doing. Who can look at what you&apos;re making, tell you exactly what it needs, and show you how to get there.
          </p>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)' }}>
            I&apos;m not a teacher who used to make music. I&apos;m an artist who also teaches. That&apos;s a different thing entirely.
          </p>
        </div>
      </motion.section>

      {/* ── THE GUIDE — light section ── */}
      <motion.section
        {...fadeUp}
        style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}
      >
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover',
          opacity: 0.06,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 480 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              06 — The Guide
            </div>
            <p style={{ fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 34px)', letterSpacing: '-0.02em', lineHeight: 1.4, marginBottom: 20 }}>
              I&apos;m Elcee. Recording artist, mixing engineer, and studio owner based in Manchester.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
              I&apos;m still in the room. Still making music. Which means everything I teach is tested, current, and real.
            </p>
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(0,0,0,0.55)', marginBottom: 16 }}>
              I&apos;ve recorded at Abbey Road. Flown to Amsterdam by JBL to work in Lady Gaga&apos;s studio and break down unreleased Justin Bieber tracks. First Class degree in Electronic Music Production.
            </p>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#d8d5d0', borderLeft: '2px solid rgba(0,0,0,0.08)', minHeight: 480 }}>
            <Image
              src="/elcee-portrait.jpg"
              alt="Elcee The Alchemist"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 15%', filter: 'grayscale(20%)' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── HOW IT WORKS ── */}
      <motion.section {...fadeUp} style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover',
          opacity: 0.06,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        } as React.CSSProperties} />
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid rgba(0,0,0,0.08)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>07 — Process</div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, color: '#080808' }}>How It Works</h2>
        </div>
        <div className="grid-three-col" style={{ position: 'relative', zIndex: 1, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {[
            { step: '01', text: "Book your free first session — a 20-minute call to figure out where you are and where you want to go." },
            { step: '02', text: "Every session is built around you. No wasted time on things you don't need yet." },
            { step: '03', text: "Make music you're proud of. At your pace. Online or in the studio in Manchester." },
          ].map((item, i) => (
            <div key={item.step} style={{ padding: '56px 48px', borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontWeight: 900, fontSize: 64, letterSpacing: '-0.04em', color: 'rgba(0,0,0,0.08)', marginBottom: 20, lineHeight: 1 }}>{item.step}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)' }}>{item.text}</p>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      <BookingPrompt />

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />
    </div>
  );
}
