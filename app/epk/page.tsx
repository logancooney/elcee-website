'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';

const ACHIEVEMENTS = [
  'Winner of the UK JBL Martin Garrix Music Academy — 1 of 30 selected worldwide',
  'Chosen as an adidas Rising Star for Forum Studio',
  'Debut Boiler Room performance hit 100,000 views in its first week',
  'Wrote, produced and recorded an EP at Abbey Road Studios for adidas (mentored by slowthai)',
  'Wrote and recorded a rap song for the Motorola Edge 20 Pro advertising campaign',
  'Sold out debut music NFT in 30 minutes, generating 1 Ethereum (≈ £2,000)',
  'Composed an original score for multi-award winning short film "Wuss"',
  'Performed in New York City, Amsterdam, The Algarve and across the UK',
  'First Class degree in Electronic Music Production',
];

const PRESS_QUOTES = [
  {
    quote: 'Redefining the style and sound of tomorrow',
    source: 'Boiler Room',
  },
  {
    quote: 'With a unique sound that\'s as diverse as his taste in music, Elcee the Alchemist\'s individual experimentation within creation naturally covers all sorts of genres from grime and rap to folk, indie and those that don\'t even have names yet.',
    source: 'Slanky Magazine',
  },
];

const FEATURED_IN = [
  'Boiler Room', 'Notion', 'JBL', 'Slanky Magazine', 'DMY', 'Sofar Sounds',
  'BBC Introducing', 'Unity Radio', 'Reform Radio', 'Pie Radio',
  'Netil Radio', 'Voices Radio', 'Amazing Radio',
];

const LIVE_CREDITS = [
  'JBL Global Product Launch — London',
  'Sofar Sounds × Represent Clothing — Manchester',
  'Bloom Magazine Issue 3 Launch — Bristol',
  'Beyond The Music Festival — Manchester',
  'New York City · Amsterdam · The Algarve · UK Tour dates',
];

const VIDEOS = [
  { id: '7uelRgmMSCQ', label: 'Live Performance', title: 'Winner — UK JBL Martin Garrix Music Academy' },
  { id: 'K9Bk3Mw7mIc', label: 'Music Video', title: 'Filthy' },
  { id: 'KmekR33sMng', label: 'Music Video', title: '2bad' },
];

const STREAM_LINKS = [
  { label: 'Spotify', href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
  { label: 'Apple Music', href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1507887824' },
  { label: 'YouTube', href: 'https://youtube.com/@elceethealchemist' },
  { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist' },
];

export default function EPKPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: 680,
        overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
        paddingBottom: 72, paddingLeft: 'clamp(24px, 5vw, 72px)',
      }}>
        <div style={{ position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%', background: '#111111' }}>
          <Image
            src="/elcee-landscape.jpg"
            alt=""
            fill
            priority
            style={{ objectFit: 'cover', objectPosition: 'center 8%', filter: 'grayscale(100%) contrast(1.08)', opacity: 0.45 }}
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
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.2) 0%, rgba(8,8,8,0.0) 40%, rgba(8,8,8,0.92) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 2, maxWidth: 900 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Electronic Press Kit
          </div>
          <h1 style={{
            fontWeight: 900, fontSize: 'clamp(56px, 9vw, 128px)',
            lineHeight: 0.88, letterSpacing: '-0.03em', textTransform: 'uppercase',
            color: '#fafafa', marginBottom: 28,
          }}>
            Elcee The<br />Alchemist
          </h1>
          <p style={{
            fontSize: 'clamp(13px, 1.5vw, 18px)',
            color: 'rgba(255,255,255,0.5)',
            fontStyle: 'italic',
            letterSpacing: '-0.01em',
            marginBottom: 32,
            maxWidth: 540,
          }}>
            &ldquo;Redefining the style and sound of tomorrow&rdquo; — Boiler Room
          </p>
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Genre', value: 'Alternative Rap' },
              { label: 'Location', value: 'Salford, Manchester' },
              { label: 'Streams', value: '500,000+' },
              { label: 'Followers', value: '15,000+' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{label}</p>
                <p style={{ fontWeight: 900, fontSize: 14 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIO ── */}
      <section style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)', borderRight: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              Biography
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 32 }}>
              The Story
            </h2>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(0,0,0,0.65)', marginBottom: 20 }}>
              Elcee the Alchemist is redefining UK Alternative Rap. As the UK winner of the JBL Martin Garrix Music Academy — one of just 30 artists selected worldwide — he&apos;s been named a Rising Star for Adidas Forum Studio, recorded at the legendary Abbey Road Studios (receiving mentorship from slowthai), and his debut Boiler Room performance hit 100K views in its first week.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.9, color: 'rgba(0,0,0,0.65)' }}>
              Rooted in London&apos;s Grime scene, he moved to Manchester to study Electronic Music Production, where he has been shaping the next-gen sound of the North ever since. His focus on Alchemy is reflected not just in his creative process, but in his spiritual philosophy, which can be found embellished in his lyrics. He has been featured by Notion, DMY, Slanky and more. Elcee weaves raw energy with deep introspection, alchemizing sound into a force for empowerment and transcendence.
            </p>
          </div>
          <div style={{ padding: 'clamp(40px, 6vw, 72px) clamp(24px, 5vw, 64px)', display: 'flex', flexDirection: 'column', gap: 40 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
                Short Bio — For Press Use
              </p>
              <div style={{ padding: '28px 32px', background: '#080808', color: '#fafafa' }}>
                <p style={{ fontSize: 13, lineHeight: 1.9, color: 'rgba(255,255,255,0.6)' }}>
                  Elcee the Alchemist is a Salford-based alternative rap artist. UK winner of the JBL Martin Garrix Music Academy, adidas Rising Star, and Boiler Room performer — his debut Boiler Room set hit 100K views in a week. He recorded at Abbey Road Studios, has been featured by Notion, Slanky and DMY, and has performed internationally across New York, Amsterdam, and The Algarve. 500,000+ streams. 15,000+ followers across platforms.
                </p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              {[
                { stat: '500K+', label: 'Streams' },
                { stat: '15K+', label: 'Followers' },
                { stat: '30', label: 'Selected Worldwide (JBL)' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p style={{ fontWeight: 900, fontSize: 40, letterSpacing: '-0.04em', lineHeight: 1, color: '#080808', marginBottom: 4 }}>{stat}</p>
                  <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS QUOTES ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Press
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            What They Said
          </h2>
        </div>
        {PRESS_QUOTES.map((q, i) => (
          <div key={i} style={{ padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
            <p style={{ fontSize: 'clamp(18px, 2.5vw, 28px)', fontWeight: 900, lineHeight: 1.4, letterSpacing: '-0.02em', color: '#fafafa', maxWidth: 820, marginBottom: 20 }}>
              &ldquo;{q.quote}&rdquo;
            </p>
            <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              — {q.source}
            </p>
          </div>
        ))}
      </section>

      {/* ── ACHIEVEMENTS ── */}
      <section style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
              Credits & Achievements
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, color: '#080808' }}>
              Highlights
            </h2>
          </div>
          {ACHIEVEMENTS.map((item, i) => (
            <div key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
              <div style={{ padding: 'clamp(20px, 3vw, 28px) clamp(24px, 5vw, 64px)', display: 'grid', gridTemplateColumns: '40px 1fr', gap: 16, alignItems: 'start', maxWidth: 900 }}>
                <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'rgba(0,0,0,0.3)', paddingTop: 3 }}>
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p style={{ fontSize: 15, lineHeight: 1.5, color: 'rgba(0,0,0,0.75)', fontWeight: 400 }}>{item}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── FEATURED IN ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Media & Radio
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Featured In
          </h2>
        </div>
        <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
            {FEATURED_IN.map(name => (
              <span key={name} style={{
                padding: '10px 20px',
                border: '1px solid rgba(255,255,255,0.12)',
                fontSize: 11, fontWeight: 900, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)',
              }}>
                {name}
              </span>
            ))}
          </div>
        </div>
        <div style={{ padding: 'clamp(32px, 5vw, 56px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 24 }}>
            Live Credits
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {LIVE_CREDITS.map((credit, i) => (
              <p key={i} style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.5 }}>— {credit}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ── VIDEOS ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Visuals
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Videos
          </h2>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {VIDEOS.map(({ id, label, title }) => (
            <div key={id} style={{ borderBottom: '1px solid #1a1a1a' }}>
              <div style={{ padding: 'clamp(16px, 3vw, 32px) clamp(24px, 5vw, 64px) 0' }}>
                <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{label}</p>
                <p style={{ fontSize: 13, fontWeight: 900, letterSpacing: '-0.01em', color: 'rgba(255,255,255,0.6)', marginBottom: 16 }}>{title}</p>
              </div>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <iframe
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
                  src={`https://www.youtube.com/embed/${id}`}
                  title={title}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── PRESS PHOTOS ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Press Photos
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Photos
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.3)', marginTop: 10 }}>
            High-resolution images available for press and promotional use.
          </p>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 480, borderRight: '1px solid #1a1a1a' }}>
            <Image
              src="/elcee-portrait.jpg"
              alt="Elcee the Alchemist — Press Photo"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 15%', filter: 'grayscale(100%) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 24px', background: 'linear-gradient(to top, rgba(8,8,8,0.8), transparent)' }}>
              <a href="/elcee-portrait.jpg" download style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                Download →
              </a>
            </div>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 480 }}>
            <Image
              src="/elcee-landscape.jpg"
              alt="Elcee the Alchemist — Press Photo"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 8%', filter: 'grayscale(100%) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 24px', background: 'linear-gradient(to top, rgba(8,8,8,0.8), transparent)' }}>
              <a href="/elcee-landscape.jpg" download style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', textDecoration: 'none' }}>
                Download →
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── STREAMING ── */}
      <section style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div style={{ position: 'relative', zIndex: 1 }}>
          <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
              Music
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, color: '#080808' }}>
              Stream
            </h2>
          </div>
          <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
            <iframe
              style={{ borderRadius: 0, display: 'block', width: '100%' }}
              src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator&theme=0"
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {STREAM_LINKS.map((link, i) => (
              <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: 'clamp(18px, 2.5vw, 28px) clamp(24px, 5vw, 64px)',
                borderBottom: '1px solid rgba(0,0,0,0.08)',
                background: i % 2 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)',
                textDecoration: 'none', color: '#080808',
                transition: 'background 0.2s',
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = i % 2 === 0 ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.1)'; }}
              >
                <span style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em' }}>{link.label}</span>
                <span style={{ fontSize: 18, opacity: 0.4 }}>→</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: 'clamp(24px, 4vw, 48px) clamp(24px, 5vw, 64px)', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Booking & Press
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Get In Touch
          </h2>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ padding: 'clamp(40px, 5vw, 64px) clamp(24px, 5vw, 64px)', borderRight: '1px solid #1a1a1a', display: 'flex', flexDirection: 'column', gap: 28 }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Email</p>
              <a href="mailto:elcee.mgmt@gmail.com" style={{ fontWeight: 900, fontSize: 18, color: '#fafafa', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                elcee.mgmt@gmail.com
              </a>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Phone</p>
              <a href="tel:07552772559" style={{ fontWeight: 900, fontSize: 18, color: '#fafafa', textDecoration: 'none', letterSpacing: '-0.01em' }}>
                07552 772 559
              </a>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Location</p>
              <p style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em' }}>Salford, Manchester</p>
            </div>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Socials</p>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.8 }}>
                @elceethealchemist — Instagram, TikTok, YouTube<br />
                @elceejpg — Twitter / X
              </p>
            </div>
          </div>
          <div style={{ padding: 'clamp(40px, 5vw, 64px) clamp(24px, 5vw, 64px)', display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 16 }}>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 360 }}>
              For live performances, interviews, collaborations, sync opportunities, or press requests.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px', alignSelf: 'flex-start',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Send a Message →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
