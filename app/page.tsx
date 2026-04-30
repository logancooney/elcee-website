'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import SiteFooter from './components/SiteFooter';
import MobileJumpNav from './components/MobileJumpNav';
import Navigation from './components/Navigation';

const outlineBtnStyle: React.CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px 20px',
  fontWeight: 900,
  fontSize: 9,
  letterSpacing: '0.18em',
  textTransform: 'uppercase',
  textDecoration: 'none',
  background: 'transparent',
  color: '#fafafa',
  border: '1.5px solid rgba(255,255,255,0.4)',
  cursor: 'pointer',
  transition: 'border-color 0.2s',
  alignSelf: 'flex-start',
};

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

interface ReleaseRowProps {
  embed: ReactNode;
  type: string;
  name: ReactNode;
  href: string;
  hrefLabel: string;
  reversed: boolean;
  minHeight?: number;
  infoBg?: string;
  infoBgPosition?: string;
}

function ReleaseRow({ embed, type, name, href, hrefLabel, reversed, minHeight = 280, infoBg, infoBgPosition = 'center' }: ReleaseRowProps) {
  const embedCell = (
    <div style={{ position: 'relative', overflow: 'hidden', background: '#000', minHeight, display: 'flex', alignItems: 'center' }}>
      <div style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>{embed}</div>
    </div>
  );
  const infoCell = (
    <div
      className="release-info-cell"
      style={{
        display: 'flex', flexDirection: 'column', justifyContent: 'space-between',
        padding: '32px 40px', background: '#111111',
        borderLeft: reversed ? 'none' : '1px solid #1a1a1a',
        borderRight: reversed ? '1px solid #1a1a1a' : 'none',
        minHeight,
        position: 'relative', overflow: 'hidden',
      }}
    >
      {infoBg && (
        <div className="release-info-bg" style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${infoBg})`,
          backgroundSize: 'cover', backgroundPosition: infoBgPosition,
          opacity: 0.28,
          pointerEvents: 'none',
        }} />
      )}
      <div className="release-info-texture" />
      <div>
        <div style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.25)', marginBottom: 8 }}>
          {type}
        </div>
        <div style={{ fontWeight: 900, fontSize: 'clamp(20px, 2.5vw, 34px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, color: '#fafafa' }}>
          {name}
        </div>
      </div>
      <a href={href} target="_blank" rel="noopener noreferrer" style={outlineBtnStyle}>
        {hrefLabel}
      </a>
    </div>
  );

  return (
    <motion.div
      {...fadeUp}
      className="grid-two-col"
      style={{ borderBottom: '1px solid #1a1a1a' }}
    >
      {reversed ? <>{infoCell}{embedCell}</> : <>{embedCell}{infoCell}</>}
    </motion.div>
  );
}

export default function Home() {
  const [showAvatar, setShowAvatar] = useState(false);
  const heroParallaxRef = useRef<HTMLDivElement>(null);
  const heroImgRef = useRef<HTMLImageElement>(null);
  const heroRef = useRef<HTMLElement>(null);

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
      if (heroRef.current) {
        setShowAvatar(y > heroRef.current.offsetHeight * 0.95);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>

      {/* FIXED AVATAR WATERMARK */}
      <div style={{
        position: 'fixed', right: 0, top: 0,
        width: '50%', height: '100vh',
        pointerEvents: 'none', zIndex: 0, overflow: 'hidden',
        opacity: showAvatar ? 1 : 0, transition: 'opacity 0.6s ease',
      }}>
        <Image
          src="/white-avatar.png"
          alt=""
          fill
          style={{ objectFit: 'contain', objectPosition: 'right center', opacity: 0.09, mixBlendMode: 'screen' }}
        />
      </div>

      <Navigation />
      <MobileJumpNav />

      {/* ── HERO ─────────────────────────────────── */}
      <section className="hero-section"
        ref={heroRef}
        style={{
          position: 'relative', width: '100%', minHeight: 640,
          overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
          justifyContent: 'center', paddingBottom: 72,
        }}
      >
        {/* Parallax photo layer */}
        <div ref={heroParallaxRef} style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111', willChange: 'transform',
        }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            ref={heroImgRef}
            src="/elcee-landscape.jpg"
            alt=""
            style={{
              position: 'absolute', inset: 0,
              width: '100%', height: '100%',
              objectFit: 'cover', objectPosition: 'center 8%',
              filter: 'grayscale(100%) contrast(1.08)',
              opacity: 0.45,
            }}
          />
        </div>

        {/* Grunge texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', backgroundPosition: 'center',
          opacity: 0.75, mixBlendMode: 'screen', pointerEvents: 'none',
        } as React.CSSProperties} />

        {/* Bottom gradient */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 30%, rgba(8,8,8,0.0) 50%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />

        {/* Content */}
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 24px' }}>
          <h1 style={{
            fontWeight: 900,
            fontSize: 'clamp(64px, 11vw, 148px)',
            lineHeight: 0.88,
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            color: '#fafafa',
            marginBottom: 20,
          }}>
            Elcee<br />The Alchemist
          </h1>
          <div style={{
            fontSize: 10, fontWeight: 400, letterSpacing: '0.35em',
            textTransform: 'uppercase', color: 'rgba(255,255,255,0.35)', marginBottom: 32,
          }}>
            Alternative Rap &nbsp;·&nbsp; Manchester
          </div>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
              target="_blank" rel="noopener noreferrer"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '13px 28px', fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: '#fafafa', color: '#080808',
                border: 'none', cursor: 'pointer', transition: 'background 0.2s',
              }}
            >
              Listen Now
            </a>
            <Link
              href="/studio"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '13px 28px', fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: 'transparent', color: '#fafafa',
                border: '1.5px solid rgba(255,255,255,0.4)', cursor: 'pointer',
                transition: 'border-color 0.2s',
              }}
            >
              Book Studio
            </Link>
          </div>
        </div>

        {/* Scroll cue */}
        <div style={{
          position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          zIndex: 2, opacity: 0.3,
        }}>
          <div style={{ width: 1, height: 32, background: 'white', animation: 'scrollPulse 2s ease-in-out infinite' }} />
          <span style={{ fontSize: 8, letterSpacing: '0.3em', textTransform: 'uppercase' }}>Scroll</span>
        </div>
      </section>

      {/* ── MARQUEE ───────────────────────────────── */}
      <div style={{
        background: '#fafafa',
        borderTop: '2px solid #080808', borderBottom: '2px solid #080808',
        overflow: 'hidden', padding: '11px 0',
      }}>
        <div style={{
          display: 'flex', whiteSpace: 'nowrap',
          animation: 'marqueeScroll 18s linear infinite',
        }}>
          {[
            'JBL Music Academy Winner', 'adidas Rising Star', 'Boiler Room', 'Abbey Road Studios', 'UK Rap Award with Tiffany Calver',
            'JBL Music Academy Winner', 'adidas Rising Star', 'Boiler Room', 'Abbey Road Studios', 'UK Rap Award with Tiffany Calver',
          ].map((item, i) => (
            <span key={i} style={{ display: 'inline-flex', alignItems: 'center' }}>
              <span style={{
                fontWeight: 900, fontSize: 13, letterSpacing: '0.18em',
                textTransform: 'uppercase', color: '#080808',
                padding: '0 120px', flexShrink: 0,
              }}>
                {item}
              </span>
              <span style={{ fontSize: 14, opacity: 0.3, color: '#080808' }}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── RELEASES ──────────────────────────────── */}
      <section id="releases" style={{ background: '#080808', position: 'relative', zIndex: 1 }}>
        <motion.div
          {...fadeUp}
          style={{
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
            padding: '48px 48px 20px', borderBottom: '1px solid #1a1a1a',
            flexWrap: 'wrap', gap: 16,
          }}
        >
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              02 — Music
            </div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 52px)', letterSpacing: '-0.03em', textTransform: 'uppercase', color: '#fafafa' }}>
              Latest Releases
            </div>
          </div>
          <a
            href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
            target="_blank" rel="noopener noreferrer"
            style={{
              fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.3)', textDecoration: 'none', transition: 'color 0.2s',
            }}
          >
            All Music →
          </a>
        </motion.div>

        {/* Row 1 — Spotify album, embed left */}
        <ReleaseRow
          reversed={false}
          type="Album · 2024"
          name={<>The Evolution<br />of Self<br />Destruction</>}
          href="https://open.spotify.com/album/7HF3AA4vFQJARAt1ivCn0w"
          hrefLabel="Open on Spotify →"
          minHeight={408}
          infoBg="/teosd-cover.png"
          embed={
            <iframe
              title="The Evolution of Self Destruction"
              style={{ border: 'none', width: '100%', height: '100%' }}
              src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator&theme=0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          }
        />

        {/* Row 2 — YouTube Filthy, info left (reversed) */}
        <ReleaseRow
          reversed={true}
          type="Single · 2024"
          name="Filthy"
          href="https://www.youtube.com/watch?v=K9Bk3Mw7mIc"
          hrefLabel="Watch on YouTube →"
          infoBg="/filthy-cover.jpg"
          embed={
            <iframe
              title="Filthy"
              style={{ border: 'none', width: '100%', height: '100%' }}
              src="https://www.youtube.com/embed/K9Bk3Mw7mIc"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          }
        />

        {/* Row 3 — YouTube, embed left */}
        <ReleaseRow
          reversed={false}
          type="Single · 2023"
          name="2bad"
          href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
          hrefLabel="Stream on Spotify →"
          infoBg="/2bad-cover.png"
          infoBgPosition="center 60%"
          embed={
            <iframe
              title="2bad"
              style={{ border: 'none', width: '100%', height: '100%' }}
              src="https://www.youtube.com/embed/KmekR33sMng"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          }
        />
      </section>

      {/* ── ABOUT ─────────────────────────────────── */}
      <motion.section
        {...fadeUp}
        id="about"
        className="grid-two-col"
        style={{ background: '#080808', borderTop: '1px solid #1a1a1a', minHeight: 380, position: 'relative', zIndex: 1 }}
      >
        <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
              03 — About
            </div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(40px, 5.5vw, 80px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#fafafa', marginBottom: 28 }}>
              Raw.<br />Real.<br />Alchemical.
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 380 }}>
              Alternative rap artist from Manchester pushing the boundaries of the genre with raw lyricism and alchemical soundscapes. Every track is a transmutation — turning experience into art, darkness into gold.
            </p>
          </div>
        </div>
        <div style={{ position: 'relative', overflow: 'hidden', background: '#111111', borderLeft: '1px solid #1a1a1a', minHeight: 380 }}>
          <Image
            src="/elcee-portrait.jpg"
            alt="Elcee The Alchemist"
            fill
            style={{ objectFit: 'cover', objectPosition: 'center center', filter: 'grayscale(100%) contrast(1.1)' }}
          />
        </div>
      </motion.section>

      {/* ── STUDIO ────────────────────────────────── */}
      <motion.section
        {...fadeUp}
        id="studio"
        style={{ background: '#f0ede8', position: 'relative', overflow: 'hidden', zIndex: 1 }}
      >
        {/* Texture */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover',
          opacity: 0.06,
          mixBlendMode: 'multiply',
          pointerEvents: 'none',
        } as React.CSSProperties} />

        <div className="grid-two-col" style={{ minHeight: 360, position: 'relative', zIndex: 1 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 10 }}>
              04 — Studio
            </div>
            <div style={{ fontWeight: 900, fontSize: 'clamp(38px, 5vw, 72px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
              The<br />Alchemist<br />Studio
            </div>
            <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', marginBottom: 28, maxWidth: 340 }}>
              Professional recording, mixing and mastering in the heart of Manchester. Built for artists who refuse to compromise on sound.
            </p>
            <Link
              href="/studio"
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                padding: '13px 28px', fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: '#080808', color: '#fafafa',
                border: 'none', cursor: 'pointer', alignSelf: 'flex-start',
                transition: 'opacity 0.2s',
              }}
            >
              Book a Session →
            </Link>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#d8d5d0', borderLeft: '2px solid rgba(0,0,0,0.08)', minHeight: 360 }}>
            <Image
              src="/studio/studio-interior-front.jpg"
              alt="The Alchemist Studio"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center', filter: 'grayscale(100%) contrast(1.05)' }}
            />
          </div>
        </div>
      </motion.section>

      <SiteFooter />

    </div>
  );
}
