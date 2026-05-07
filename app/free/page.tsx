'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ExitIntentPopup from '../components/ExitIntentPopup';
import { track } from '@vercel/analytics';
import { CALENDLY_EVENT_URLS } from '../../lib/calendly-config';

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
      <div>
        <div style={{
          background: 'rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.12)',
          padding: '20px 24px',
          marginBottom: 12,
          display: 'inline-block',
        }}>
          <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 6 }}>Your discount code</p>
          <p style={{ fontWeight: 900, fontSize: 22, letterSpacing: '0.15em', color: '#080808' }}>WELCOME10</p>
        </div>
        <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)' }}>Also on its way to your inbox. Mention the code when booking.</p>
      </div>
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
  useEffect(() => {
    if (document.referrer.includes('reddit.com')) {
      track('visit_from_reddit');
    }
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(20px, 5vw, 48px) clamp(40px, 6vw, 64px)',
        borderBottom: '1px solid #1a1a1a',
      } as React.CSSProperties}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Free Call
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(36px, 6vw, 80px)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#fafafa',
          marginBottom: 20,
        }}>
          20 minutes.<br />No commitment.
        </h1>
        <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>
          Tell me what you&apos;re working on and I&apos;ll tell you exactly how I can help — whether that&apos;s studio time, mixing, or tutoring. Book a free call below.
        </p>
      </section>

      {/* ── FREE INTRO CALL ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 6vw, 56px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            01 — Free Call
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 16,
          }}>
            Free Intro Call
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)', maxWidth: 520, marginBottom: 32 }}>
            20 minutes. Tell me what you&apos;re working on, and I&apos;ll tell you exactly how I can help — whether that&apos;s tutoring, studio time, or mixing. No commitment.
          </p>
          <a
            href={CALENDLY_EVENT_URLS.freeIntroCall}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '16px 32px',
              fontWeight: 900,
              fontSize: 13,
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              background: '#fafafa',
              color: '#080808',
              textDecoration: 'none',
            }}
          >
            Book a Free Intro Call →
          </a>
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
          <div style={{ padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 48px)', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              02 — Discount
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
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
            padding: 'clamp(40px, 6vw, 64px) clamp(20px, 5vw, 48px)',
          } as React.CSSProperties}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontWeight: 900, fontSize: 'clamp(64px, 8vw, 112px)', letterSpacing: '-0.04em', lineHeight: 1, color: '#080808' }}>10%</p>
              <p style={{ fontSize: 11, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginTop: 8 }}>Off Your First Booking</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* FREE DOWNLOADS — hidden until PDFs are ready */}

      <SiteFooter />
      <ExitIntentPopup />
    </div>
  );
}
