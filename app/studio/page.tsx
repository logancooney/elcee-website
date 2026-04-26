'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StructuredData from './components/StructuredData';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import BookingPrompt from '../components/BookingPrompt';
import CalendlyEmbed from '../../components/CalendlyEmbed';
import { CALENDLY_PAYMENT_LINKS } from '../../lib/calendly-config';
import { BOOK_SERVICES } from '../../lib/book-services';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const studioService = BOOK_SERVICES.find(s => s.id === 'studio')!;

const STUDIO_SERVICES = [
  {
    label: '01',
    title: 'Recording & Engineering',
    description: 'Capture your performance with clarity and precision. Professional vocal and instrument tracking in a focused environment built for quality.',
  },
  {
    label: '02',
    title: 'Mixing & Mastering',
    description: 'Transform recordings into polished, competitive releases. Technical precision meets creative vision, with up to 3 revision rounds included.',
  },
  {
    label: '03',
    title: 'Music Production',
    description: 'Custom production tailored to your sound. From full beat creation to arrangement and sonic direction. Fully collaborative.',
  },
];

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

export default function StudioPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [studioMode, setStudioMode] = useState<string | null>(null);
  const studioModeUrl = studioMode ? studioService.modes?.find(m => m.id === studioMode)?.calendlyUrl ?? null : null;

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
      <StructuredData />
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
            src="/studio/studio-interior-front.jpg"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center',
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
            01 — Studio
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
            The Alchemist<br />Studio
          </h1>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', border: 'none', textDecoration: 'none', cursor: 'pointer',
            }}>
              Book Studio Time
            </a>
            <a href="#services" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none', cursor: 'pointer',
            }}>
              See Services
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

      {/* ── TESTIMONIALS ── */}
      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      {/* ── SERVICES ── */}
      <motion.section {...fadeUp} id="services" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            02 — What We Offer
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Studio Services
          </h2>
        </div>
        <div className="grid-three-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {STUDIO_SERVICES.map((s, i) => (
            <div key={s.label} style={{
              padding: '56px 48px',
              borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
            }}>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                {s.label}
              </div>
              <p style={{ fontWeight: 900, fontSize: 'clamp(18px, 2vw, 28px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 20 }}>
                {s.title}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                {s.description}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── FACILITY ── */}
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
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 520 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
                03 — Facility
              </div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(38px, 5vw, 72px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
                The<br />Space
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', maxWidth: 380 }}>
                Professional recording environment in Manchester. Built by a working artist with 6+ years industry experience. Acoustically treated for accurate recording and mixing.
              </p>
            </div>
            <div>
              <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>Location</p>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.6)' }}>
                Cambridge Street, Manchester, M7 1UY<br />
                10 minutes from city centre
              </p>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#d8d5d0', borderLeft: '2px solid rgba(0,0,0,0.08)', minHeight: 520 }}>
            <Image
              src="/studio/studio-interior-front.jpg"
              alt="The Alchemist Studio interior"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(20%)' }}
            />
          </div>
        </div>
      </motion.section>

      {/* ── PRICING ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            04 — Rates
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Pricing
          </h2>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ padding: '56px 48px', borderRight: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Studio Sessions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Standard', price: '£35/hr' },
                { label: 'Loyalty Plan', price: '£30/hr', note: '£240/month subscription' },
              ].map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{r.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>{r.price}</span>
                  </div>
                  {r.note && <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{r.note}</p>}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '56px 48px' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Mixing &amp; Mastering</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Full Mix + Master', price: '£340' },
                { label: 'Vocal Mix', price: '£190' },
                { label: 'Mastering', price: '£40' },
              ].map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{r.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>{r.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ padding: '56px 48px', background: '#111111', borderRight: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Multi-Track Packages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: '3-Track Package', price: '£920', saving: 'Save £100' },
                { label: '5-Track Package', price: '£1,450', saving: 'Save £250' },
              ].map(p => (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{p.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>{p.price}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{p.saving}</p>
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '56px 48px' }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>Add-ons</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {[
                { label: 'Vocal Tuning', price: '£40' },
                { label: 'Stem Separation', price: '£75' },
                { label: 'Rush Delivery', price: '+40%' },
              ].map(a => (
                <div key={a.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)' }}>{a.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.02em' }}>{a.price}</span>
                </div>
              ))}
            </div>
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
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
            05 — Process
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, color: '#080808' }}>
            How It Works
          </h2>
        </div>
        <div className="grid-three-col" style={{ position: 'relative', zIndex: 1, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {[
            { step: '01', title: 'Book Your Session', desc: 'Check calendar availability and book online. Flexible scheduling with confirmation within 24 hours.' },
            { step: '02', title: 'Create', desc: 'Professional environment with experienced engineering. Focused sessions designed for results.' },
            { step: '03', title: 'Receive Final Files', desc: "Fast turnaround with professional delivery. Revisions included to ensure you're satisfied with the result." },
          ].map((item, i) => (
            <div key={item.step} style={{ padding: '56px 48px', borderLeft: i === 0 ? 'none' : '1px solid rgba(0,0,0,0.08)' }}>
              <p style={{ fontWeight: 900, fontSize: 64, letterSpacing: '-0.04em', color: 'rgba(0,0,0,0.08)', marginBottom: 20, lineHeight: 1 }}>{item.step}</p>
              <p style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 12, color: '#080808' }}>{item.title}</p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)' }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* ── BOOKING ── */}
      <motion.section {...fadeUp} id="booking" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            06 — Book
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Book a Session
          </h2>
        </div>
        <div style={{ padding: '64px 48px' }}>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36, textAlign: 'center' }}>
            Pick your session length and book online.{' '}
            Not sure? <Link href="/free" style={{ color: '#fafafa', textDecoration: 'underline' }}>Book a free call first.</Link>
          </p>
          {!studioMode && (
            <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
              {studioService.modes?.map(m => (
                <button
                  key={m.id}
                  onClick={() => setStudioMode(m.id)}
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
                  {m.label} — {m.price} →
                </button>
              ))}
            </div>
          )}
          {studioMode && studioModeUrl && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setStudioMode(null)}
                  style={{
                    appearance: 'none', cursor: 'pointer', background: 'transparent', border: 'none',
                    fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  ← Switch length
                </button>
              </div>
              <CalendlyEmbed key={studioMode} url={studioModeUrl} height={700} />
            </>
          )}
        </div>
      </motion.section>

      {/* ── REMOTE SERVICES ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            07 — Remote
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Mixing &amp; Mastering
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginTop: 12, maxWidth: 480 }}>
            Remote services. Pay upfront and send your files. Turnaround within 5 working days.
          </p>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {REMOTE_SERVICES.map((service, i) => (
            <a
              key={service.label}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'block', padding: '48px',
                borderTop: i >= 2 ? '1px solid #1a1a1a' : 'none',
                borderLeft: i % 2 === 1 ? '1px solid #1a1a1a' : 'none',
                textDecoration: 'none', color: '#fafafa',
                background: '#111111',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111111'; }}
            >
              <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>Service</p>
              <p style={{ fontWeight: 900, fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.02em', textTransform: 'uppercase', marginBottom: 12 }}>{service.label}</p>
              <p style={{ fontWeight: 900, fontSize: 32, letterSpacing: '-0.02em', marginBottom: 20 }}>{service.price}</p>
              <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Pay &amp; confirm →</p>
            </a>
          ))}
        </div>
        <div style={{ padding: '24px 48px' }}>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', letterSpacing: '0.1em' }}>
            Use code <span style={{ color: '#fafafa', fontWeight: 900 }}>WELCOME10</span> for 10% off your first order.
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
