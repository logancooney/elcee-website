'use client';

import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import { track } from '@vercel/analytics';
import CalendlyEmbed from '../../components/CalendlyEmbed';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const MAGNETS = [
  {
    id: 'release-checklist',
    title: 'Music Release Checklist',
    desc: 'Everything you need before, during, and after a release — in order.',
  },
  {
    id: 'stem-prep-guide',
    title: 'Stem Prep Guide for Mix Engineers',
    desc: 'How to prep your session so the mix goes smoothly. No wasted revisions.',
  },
  {
    id: 'home-recording-guide',
    title: 'Home Recording Guide for Rappers',
    desc: 'Get a clean vocal recording at home without paying studio rates.',
  },
  {
    id: 'mix-ready-checklist',
    title: 'Mix-Ready Track Checklist',
    desc: 'The checklist every artist should run before sending stems to an engineer.',
  },
];

const inputStyle: React.CSSProperties = {
  width: '100%',
  background: '#111',
  border: '1px solid #2a2a2a',
  padding: '14px 16px',
  fontSize: 13,
  color: '#fafafa',
  outline: 'none',
  boxSizing: 'border-box',
};

function DownloadCard({ id, title, desc }: { id: string; title: string; desc: string }) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, magnet: id }),
      });
      if (!res.ok) throw new Error();
      track('pdf_download', { magnet: id });
      setState('done');
    } catch {
      setState('error');
    }
  }

  return (
    <div style={{ padding: '48px', background: '#111111', borderTop: '1px solid #1a1a1a' }}>
      <p style={{ fontWeight: 900, fontSize: 'clamp(16px, 2vw, 22px)', letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 12 }}>{title}</p>
      <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 28 }}>{desc}</p>
      {state === 'done' ? (
        <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.05em' }}>On its way — check your inbox.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={inputStyle}
          />
          {state === 'error' && (
            <p style={{ fontSize: 11, color: 'rgba(255,100,100,0.8)' }}>Something went wrong. Try again.</p>
          )}
          <button
            type="submit"
            disabled={state === 'loading'}
            style={{
              padding: '13px 24px', background: '#fafafa', color: '#080808',
              border: 'none', fontWeight: 900, fontSize: 10,
              letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
              opacity: state === 'loading' ? 0.5 : 1,
              alignSelf: 'flex-start',
            }}
          >
            {state === 'loading' ? 'Sending...' : 'Send it to me →'}
          </button>
        </form>
      )}
    </div>
  );
}

function DiscountCaptureForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/discount-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.6)', letterSpacing: '0.05em' }}>
        On its way — check your inbox.
      </p>
    );
  }

  const lightInput: React.CSSProperties = {
    ...inputStyle,
    border: '1px solid rgba(0,0,0,0.2)',
    background: 'rgba(255,255,255,0.5)',
    color: '#080808',
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={lightInput}
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={lightInput}
      />
      {state === 'error' && (
        <p style={{ fontSize: 11, color: 'rgba(200,0,0,0.7)' }}>Something went wrong. Try again.</p>
      )}
      <button
        type="submit"
        disabled={state === 'loading'}
        style={{
          padding: '13px 24px', background: '#080808', color: '#fafafa',
          border: 'none', fontWeight: 900, fontSize: 10,
          letterSpacing: '0.18em', textTransform: 'uppercase', cursor: 'pointer',
          opacity: state === 'loading' ? 0.5 : 1,
          alignSelf: 'flex-start',
        }}
      >
        {state === 'loading' ? 'Sending...' : 'Send me the code →'}
      </button>
    </form>
  );
}

export default function FreePage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (document.referrer.includes('reddit.com')) {
      track('visit_from_reddit');
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (heroParallaxRef.current) {
        heroParallaxRef.current.style.transform = `translateY(${y * 0.35}px)`;
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
          background: '#0d0d0d', willChange: 'transform',
        }} />

        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.75, mixBlendMode: 'screen', pointerEvents: 'none',
        } as React.CSSProperties} />

        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.4) 0%, rgba(8,8,8,0.1) 40%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        <div style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Free Resources
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 20,
          }}>
            Free Tools<br />for Artists
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 440 }}>
            Genuinely useful resources. Free track reviews, discount codes, and guides — no gimmicks.
          </p>
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

      {/* ── FREE TRACK REVIEW ── */}
      <motion.section {...fadeUp} id="track-review" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            02 — Track Review
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Free Track Review
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginTop: 12, maxWidth: 520 }}>
            15 minutes. I listen to your track before the call and come prepared with specific notes. No pitch — just honest feedback from a working engineer.
          </p>
        </div>
        <div style={{ padding: '64px 48px' }}>
          <CalendlyEmbed
            key="free-track-review"
            url="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback"
            height={700}
          />
        </div>
      </motion.section>

      {/* ── DISCOUNT — light section ── */}
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
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 400 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              03 — Discount
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
              10% Off Your<br />First Booking
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', maxWidth: 400, marginBottom: 36 }}>
              Drop your email and I&apos;ll send the discount code straight over. Works on any session, mix, master, or tutoring.
            </p>
            <DiscountCaptureForm />
          </div>
          <div style={{
            borderLeft: '2px solid rgba(0,0,0,0.08)',
            background: 'rgba(0,0,0,0.04)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: '64px 48px',
          }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 900, fontSize: 'clamp(64px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#080808' }}>10%</p>
              <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>Off Your First Booking</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ── FREE DOWNLOADS ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            04 — Downloads
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Free Downloads
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginTop: 12 }}>
            Drop your email and I&apos;ll send it straight over.
          </p>
        </div>
        <div className="grid-two-col">
          {MAGNETS.map((m, i) => (
            <div key={m.id} style={{ borderLeft: i % 2 === 1 ? '1px solid #1a1a1a' : 'none' }}>
              <DownloadCard {...m} />
            </div>
          ))}
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
