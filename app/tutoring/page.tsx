'use client';

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';
import { CALENDLY_EVENT_URLS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';
import { PRICES } from '../../content/prices';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const WHAT_YOU_GET = [
  {
    label: '01',
    title: 'Ableton, mixing, recording, and more',
    desc: "Whether you're learning to produce from scratch, getting vocals to sit right in a mix, or working on arrangement — sessions go where your music needs them to go.",
  },
  {
    label: '02',
    title: 'No fixed curriculum',
    desc: "Every session is built around what you're working on. If you bring a track, we work on the track. No vague encouragement — I'll tell you what's working, what isn't, and specifically how to fix it.",
  },
  {
    label: '03',
    title: 'Taught by a working artist',
    desc: "Recording artist, mix engineer, studio owner — I'm still actively making and releasing music. The advice is current, tested, and specific to what independent artists actually face.",
  },
];

export default function TutoringPage() {
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
          alignItems: 'flex-start',
          paddingTop: 'clamp(80px, 12vw, 140px)' as unknown as number,
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

        <div style={{ position: 'relative', zIndex: 2, maxWidth: 700, paddingLeft: 'clamp(20px, 5vw, 48px)' } as React.CSSProperties}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Tuition — Manchester
          </div>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(40px, 7vw, 96px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 16,
          }}>
            <span className="hero-h1-desktop">Learn From An Artist.<br />Not An Algorithm.</span>
            <span className="hero-h1-mobile">Learn From<br />An Artist.<br />Not An<br />Algorithm.</span>
          </h1>
          <p style={{
            fontWeight: 400,
            fontSize: 'clamp(14px, 1.8vw, 18px)',
            color: 'rgba(255,255,255,0.65)',
            marginBottom: 8,
            letterSpacing: '-0.01em',
          }}>
            1-1 Lessons. Real Studio. Real Artist.
          </p>
          <p style={{
            fontSize: 12,
            color: 'rgba(255,255,255,0.4)',
            marginBottom: 28,
            letterSpacing: '0.05em',
          }}>
            Online {PRICES.tutoring.online} · In-Person {PRICES.tutoring.inPerson} · First session always free
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Book a Free Call →
            </a>
            <a href="#what-you-get" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              See Options ↓
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
          freeCallUrl={CALENDLY_EVENT_URLS.freeTutoringConsultation}
          freeCallLabel="Book a Free Tutoring Consultation →"
          freeCallSublabel="20 minutes. Tell me where you're at and where you want to go."
          options={[
            {
              label: 'Online Tutoring',
              price: PRICES.tutoring.online,
              url: CALENDLY_EVENT_URLS.tutoringOnline,
            },
            {
              label: 'In-Person Tutoring',
              price: PRICES.tutoring.inPerson,
              url: CALENDLY_EVENT_URLS.tutoringInPerson,
            },
            {
              label: 'Session packs — save up to £120',
              url: CALENDLY_BUNDLE_LINKS.online10,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── WHAT YOU GET ── */}
      <motion.section {...fadeUp} id="what-you-get" style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
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
              Built Around You
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

      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeTutoringConsultation}
        label="Book Free Tutoring Consultation →"
      />
    </div>
  );
}
