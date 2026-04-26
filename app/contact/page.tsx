'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const inputStyle: React.CSSProperties = {
  width: '100%', background: '#111', border: '1px solid #2a2a2a',
  padding: '14px 18px', fontSize: 14, color: '#fafafa',
  outline: 'none', boxSizing: 'border-box',
  fontFamily: 'inherit',
};

const SOCIAL_LINKS = [
  { label: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
  { label: 'Twitter / X', href: 'https://twitter.com/elceejpg' },
  { label: 'TikTok', href: 'https://tiktok.com/@elceethealchemist' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist' },
];

export default function ContactPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const [sent, setSent] = useState(false);

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

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

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
            01 — Contact
          </div>
          <h1 style={{
            fontWeight: 900, fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: '#fafafa', marginBottom: 20,
          }}>
            Get In Touch
          </h1>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 420 }}>
            For bookings, collaborations, or general enquiries. Usually respond within 24 hours.
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

      {/* ── CONTACT FORM ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div className="grid-two-col" style={{ minHeight: 480 }}>
          <div style={{ padding: '64px 48px', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              02 — Message
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
              Send a<br />Message
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 340 }}>
              Bookings, collabs, press enquiries. I read everything.
            </p>
          </div>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            {sent ? (
              <div style={{ padding: '40px', border: '1px solid #1a1a1a', background: '#111' }}>
                <p style={{ fontWeight: 900, fontSize: 18, marginBottom: 8 }}>Message sent.</p>
                <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)' }}>I&apos;ll get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Name</label>
                    <input type="text" name="name" required style={inputStyle} />
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                    <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Email</label>
                    <input type="email" name="email" required style={inputStyle} />
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Subject</label>
                  <input type="text" name="subject" required style={inputStyle} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  <label style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)' }}>Message</label>
                  <textarea name="message" rows={6} required style={{ ...inputStyle, resize: 'none' }} />
                </div>
                <button type="submit" style={{
                  marginTop: 8, padding: '14px 28px',
                  background: '#fafafa', color: '#080808', border: 'none',
                  fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
                  textTransform: 'uppercase', cursor: 'pointer', alignSelf: 'flex-start',
                }}>
                  Send Message →
                </button>
              </form>
            )}
          </div>
        </div>
      </motion.section>

      {/* ── SOCIAL + LOCATION — light section ── */}
      <motion.section {...fadeUp} style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 360 }}>
          <div style={{ padding: '64px 48px', borderRight: '2px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              03 — Social
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 3vw, 48px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 36 }}>
              Find Me Online
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
                  fontSize: 13, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase',
                  color: '#080808', textDecoration: 'none',
                  padding: '16px 0', borderBottom: '1px solid rgba(0,0,0,0.1)',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                }}>
                  {label}
                  <span style={{ fontSize: 16, opacity: 0.4 }}>→</span>
                </a>
              ))}
            </div>
          </div>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
                04 — Location
              </div>
              <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 3vw, 48px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
                Manchester,<br />England
              </h2>
              <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', marginBottom: 32, maxWidth: 320 }}>
                Studio sessions available in Manchester. Remote mixing and mastering available worldwide.
              </p>
            </div>
            <Link href="/studio" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#080808', color: '#fafafa', textDecoration: 'none', alignSelf: 'flex-start',
            }}>
              Book Studio Time →
            </Link>
          </div>
        </div>
      </motion.section>

      <SiteFooter />
    </div>
  );
}
