'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import CalendlyEmbed from '../../components/CalendlyEmbed';
import {
  BOOK_SERVICES,
  getBookService,
  resolveCalendlyUrl,
  type BookServiceId,
  type BookMode,
} from '../../lib/book-services';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

export default function BookingContent() {
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialService = getBookService(searchParams.get('service'))?.id ?? null;
  const initialModeRaw = searchParams.get('mode');
  const initialMode: BookMode | null =
    initialModeRaw === 'online' || initialModeRaw === 'in-person' ? initialModeRaw : null;

  const [selected, setSelected] = useState<BookServiceId | null>(initialService);
  const [mode, setMode] = useState<BookMode | null>(initialMode);

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

  useEffect(() => {
    const params = new URLSearchParams();
    if (selected) params.set('service', selected);
    if (selected && mode) params.set('mode', mode);
    const next = params.toString() ? `${pathname}?${params.toString()}` : pathname;
    router.replace(next, { scroll: false });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected, mode]);

  useEffect(() => {
    setMode(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero-section"
        ref={heroRef}
        style={{
          position: 'relative', width: '100%', minHeight: 640,
          overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
          paddingBottom: 72, paddingLeft: 48,
        }}
      >
        <div ref={heroParallaxRef} style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111', willChange: 'transform',
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
            01 — Book
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
            Book a<br />Session
          </h1>
          <div style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.55)', maxWidth: 400 }}>
            Pick a service. Pick a time. We&rsquo;ll handle the rest.
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

      <section className="grid-three-col"
        style={{
          borderTop: '1px solid #1a1a1a',
          borderBottom: '1px solid #1a1a1a',
        }}
      >
        {BOOK_SERVICES.map((service, i) => {
          const isSelected = selected === service.id;
          const isAnotherSelected = selected !== null && !isSelected;
          return (
            <motion.button
              key={service.id}
              {...fadeUp}
              onClick={() => setSelected(service.id)}
              style={{
                appearance: 'none',
                cursor: 'pointer',
                textAlign: 'left',
                padding: '64px 48px',
                color: '#fafafa',
                borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
                borderTop: 'none',
                borderRight: 'none',
                borderBottom: 'none',
                opacity: isAnotherSelected ? 0.4 : 1,
                background: isSelected ? '#111111' : 'transparent',
                transition: 'opacity 0.3s ease, background 0.3s ease',
                position: 'relative',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 320,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: 9,
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.3)',
                    marginBottom: 10,
                  }}
                >
                  0{i + 1} &mdash; {service.label}
                </div>
                <div
                  style={{
                    fontWeight: 900,
                    fontSize: 'clamp(28px, 4vw, 52px)',
                    letterSpacing: '-0.03em',
                    textTransform: 'uppercase',
                    lineHeight: 0.88,
                    color: '#fafafa',
                    marginBottom: 12,
                  }}
                >
                  {service.priceLabel}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    lineHeight: 1.8,
                    color: 'rgba(255,255,255,0.55)',
                    marginBottom: service.note ? 12 : 28,
                  }}
                >
                  {service.blurb}
                </p>
                {service.note && (
                  <p
                    style={{
                      fontSize: 11,
                      lineHeight: 1.6,
                      color: 'rgba(255,255,255,0.35)',
                      marginBottom: 28,
                      fontStyle: 'italic',
                    }}
                  >
                    {service.note}
                  </p>
                )}
              </div>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '10px 20px',
                  fontWeight: 900,
                  fontSize: 9,
                  letterSpacing: '0.18em',
                  textTransform: 'uppercase',
                  background: isSelected ? '#fafafa' : 'transparent',
                  color: isSelected ? '#080808' : '#fafafa',
                  border: isSelected ? '1.5px solid transparent' : '1.5px solid rgba(255,255,255,0.4)',
                  alignSelf: 'flex-start',
                  transition: 'background 0.2s, color 0.2s, border-color 0.2s',
                }}
              >
                {isSelected ? 'Selected' : 'Select'} →
              </span>
            </motion.button>
          );
        })}
      </section>

      {selected && (() => {
        const service = BOOK_SERVICES.find(s => s.id === selected)!;
        if (!service.modes || service.modes.length === 0 || mode) return null;
        const togglePrompt =
          service.id === 'tutoring' ? 'Pick a mode' : service.id === 'studio' ? 'Pick a session length' : 'Pick an option';
        return (
          <motion.section
            key={`mode-toggle-${selected}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{
              padding: '80px 48px',
              borderBottom: '1px solid #1a1a1a',
              textAlign: 'center',
            }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 14,
              }}
            >
              {service.label} — {togglePrompt}
            </div>
            <div
              style={{
                display: 'flex',
                gap: 14,
                justifyContent: 'center',
                flexWrap: 'wrap',
              }}
            >
              {service.modes.map(m => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
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
                    transition: 'background 0.2s, color 0.2s, border-color 0.2s',
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
                  {m.label} — {m.price}
                  {m.priceQualifier} →
                </button>
              ))}
            </div>
          </motion.section>
        );
      })()}

      {selected && (() => {
        const service = BOOK_SERVICES.find(s => s.id === selected)!;
        const url = resolveCalendlyUrl(service, mode);
        if (!url) return null;
        const modeObj = mode ? service.modes?.find(m => m.id === mode) : undefined;
        const subtitle = modeObj ? `${service.label} · ${modeObj.label}` : service.label;
        return (
          <motion.section
            key={`embed-${selected}-${mode ?? ''}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ padding: '64px 48px', borderBottom: '1px solid #1a1a1a' }}
          >
            <div
              style={{
                fontSize: 9,
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.3)',
                marginBottom: 10,
                textAlign: 'center',
              }}
            >
              Schedule &mdash; {subtitle}
            </div>
            {service.modes && mode && (
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setMode(null)}
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
                  ← {service.id === 'studio' ? 'Switch length' : 'Switch mode'}
                </button>
              </div>
            )}
            <CalendlyEmbed url={url} height={780} />
          </motion.section>
        );
      })()}

      {!selected && (
        <section className="hero-section"
          style={{
            padding: '80px 48px',
            textAlign: 'center',
            borderBottom: '1px solid #1a1a1a',
          }}
        >
          <div
            style={{
              fontSize: 13,
              lineHeight: 1.8,
              color: 'rgba(255,255,255,0.45)',
            }}
          >
            Pick a service above to see available times.
          </div>
        </section>
      )}
    </>
  );
}
