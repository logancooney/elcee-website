'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import StructuredData from './components/StructuredData';
import FAQ from './components/FAQ';
import Testimonials from './components/Testimonials';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import { CALENDLY_EVENT_URLS, CALENDLY_PAYMENT_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const WHAT_YOU_GET = [
  {
    label: '01',
    title: 'Acoustically treated Manchester studio',
    desc: "Professional, focused recording environment. Not just a room with a mic — built for accurate results whether you're tracking vocals, instruments, or mixing.",
  },
  {
    label: '02',
    title: 'A working artist with 6+ years experience',
    desc: "Not a session engineer who clocks in and out. Someone who's still making music, with the taste and technical skills to get the best out of your session.",
  },
  {
    label: '03',
    title: 'Fast delivery, revisions included',
    desc: "Mixes and masters back within 5 working days. You sign off — not me. Revisions until it's right.",
  },
];

const MIX_MASTER_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3, note: 'Save £100' },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5, note: 'Save £250' },
];

export default function StudioPage() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth <= 768) return;
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
        className="hero-compact"
        style={{
          position: 'relative',
          width: '100%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'flex-end',
          paddingBottom: 72,
        } as React.CSSProperties}
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

        <div style={{ position: 'relative', zIndex: 2, paddingLeft: 'clamp(20px, 5vw, 48px)' } as React.CSSProperties}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Studio
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(48px, 8vw, 112px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 12,
          }}>
            The Alchemist<br />Studio
          </h1>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 28,
            letterSpacing: '0.05em',
          }}>
            £35/hr · First session free
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Book a Free Call →
            </a>
            <a href="#mix-master" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              Mix / Master ↓
            </a>
          </div>
        </div>
      </section>

      {/* ── BOOKING ── */}
      <motion.section {...fadeUp} id="booking" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px) 0',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              Book
            </div>
            <h2 style={{
              fontWeight: 900,
              fontSize: 'clamp(28px, 4vw, 52px)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
              paddingBottom: 'clamp(16px, 3vw, 32px)' as unknown as number,
            }}>
              Book a Session
            </h2>
          </div>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeStudioEnquiry}
          freeCallLabel="Book a Free Studio Enquiry →"
          freeCallSublabel="20 minutes. Tell me about your project and we'll work out the best plan."
          options={[
            {
              label: 'Book Studio Time',
              price: '£35/hr',
              url: CALENDLY_EVENT_URLS.studio1hr,
              sublabel: 'You pick the duration on Calendly',
            },
            {
              label: 'Mix / Master',
              sublabel: 'Jump to prices ↓',
              url: '#mix-master',
            },
            {
              label: 'Multi-track packs — save up to £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── WHAT YOU GET ── */}
      <motion.section {...fadeUp} style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ maxWidth: 580, margin: '0 auto' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              What You Get
            </div>
            <h2 style={{
              fontWeight: 900,
              fontSize: 'clamp(24px, 3.5vw, 48px)',
              letterSpacing: '-0.03em',
              textTransform: 'uppercase',
              lineHeight: 0.9,
            }}>
              The Studio
            </h2>
          </div>
        </div>
        {WHAT_YOU_GET.map(item => (
          <div key={item.label} style={{ borderBottom: '1px solid #1a1a1a' }}>
            <div style={{
              padding: 'clamp(24px, 4vw, 40px) clamp(20px, 5vw, 48px)',
              display: 'grid',
              gridTemplateColumns: '36px 1fr',
              gap: 20,
              maxWidth: 760,
              margin: '0 auto',
            }}>
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', paddingTop: 4 }}>
                {item.label}
              </div>
              <div>
                <p style={{ fontWeight: 900, fontSize: 'clamp(14px, 1.6vw, 18px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1.1, marginBottom: 10 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', maxWidth: 520 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          </div>
        ))}
      </motion.section>

      {/* ── MIXING & MASTERING ── */}
      <motion.section {...fadeUp} id="mix-master" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(20px, 4vw, 40px) clamp(20px, 5vw, 48px)',
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            Remote
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 12,
          }}>
            Mixing &amp; Mastering
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', lineHeight: 1.7 }}>
            Pay upfront and send your files. Turnaround within 5 working days.
          </p>
        </div>
        <div style={{ borderBottom: '1px solid #1a1a1a' }}>
          {MIX_MASTER_SERVICES.map((service, i) => (
            <a
              key={service.label}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 'clamp(16px, 3vw, 24px) clamp(20px, 5vw, 48px)',
                borderTop: i === 0 ? 'none' : '1px solid #1a1a1a',
                color: '#fafafa',
                textDecoration: 'none',
                background: '#111111',
                transition: 'background 0.2s',
              } as React.CSSProperties}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#1a1a1a'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = '#111111'; }}
            >
              <div>
                <span style={{ fontWeight: 900, fontSize: 15 }}>{service.label}</span>
                {service.note && (
                  <span style={{ display: 'block', fontSize: 11, color: 'rgba(255,255,255,0.35)', marginTop: 2 }}>
                    {service.note}
                  </span>
                )}
              </div>
              <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{service.price} →</span>
            </a>
          ))}
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      {/* ── SERIOUS ARTIST PLAN ── */}
      <motion.section
        {...fadeUp}
        style={{
          background: '#0a0a0a',
          borderTop: '1px solid rgba(255,255,255,0.08)',
          borderBottom: '1px solid rgba(255,255,255,0.08)',
        }}
      >
        <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(20px, 5vw, 48px)' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Serious Artist Plan
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(28px, 4vw, 56px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            marginBottom: 20,
            maxWidth: 520,
          }}>
            Not for everyone. For artists ready to commit.
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.5)', maxWidth: 480, marginBottom: 24 }}>
            Consistent studio time is how careers are built. Monthly access, priority booking, and a rate that reflects your seriousness.
          </p>
          <p style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em', marginBottom: 28 }}>
            £30/hr · £240/month
          </p>
          <Link href="/contact" style={{
            display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
            fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#fafafa', color: '#080808', textDecoration: 'none',
          }}>
            Apply →
          </Link>
        </div>
      </motion.section>

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeStudioEnquiry}
        label="Book Free Studio Enquiry →"
      />
    </div>
  );
}
