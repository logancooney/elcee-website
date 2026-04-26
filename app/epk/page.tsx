'use client';

import Image from 'next/image';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';

const STREAM_LINKS = [
  { label: 'Spotify', sub: 'Stream full discography', href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
  { label: 'Apple Music', sub: 'Stream full discography', href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060' },
  { label: 'YouTube', sub: 'Music videos & visuals', href: 'https://youtube.com/@elceethealchemist' },
  { label: 'Bandcamp', sub: 'Support directly', href: 'https://elceethealchemist.bandcamp.com' },
];

const SOCIAL_LINKS = [
  { label: 'Instagram', handle: '@elceethealchemist', href: 'https://instagram.com/elceethealchemist' },
  { label: 'TikTok', handle: '@elceethealchemist', href: 'https://tiktok.com/@elceethealchemist' },
  { label: 'Twitter / X', handle: '@elceejpg', href: 'https://twitter.com/elceejpg' },
  { label: 'YouTube', handle: '@elceethealchemist', href: 'https://youtube.com/@elceethealchemist' },
  { label: 'Facebook', handle: '@elceethealchemist', href: 'https://facebook.com/elceethealchemist' },
  { label: 'SoundCloud', handle: '@elceethealchemist', href: 'https://soundcloud.com/elceethealchemist' },
];

const BIO_PARAS = [
  `Elcee the Alchemist is an independent alternative rap artist from Manchester, England, who has spent six years carving out a unique space in the UK music scene. Operating completely solo — without a team, manager, or label — Elcee embodies the DIY spirit, controlling every aspect of his artistic vision from production to performance.`,
  `As both a skilled recording engineer and producer, Elcee not only creates his own music but also runs a professional recording studio, working with artists across Manchester and beyond. This dual role gives him a deep understanding of both the creative and technical sides of music production, reflected in the polished, experimental soundscapes that define his work.`,
  `His music blends raw, introspective lyricism with alchemical production — transforming pain, ambition, and social commentary into tracks that push the boundaries of alternative rap. Influenced by both UK underground culture and global hip-hop, Elcee's sound is distinctly his own: gritty, atmospheric, and unapologetically authentic.`,
  `In 2026, Elcee is committing to an aggressive release schedule: a minimum of 2 tracks per month, alongside multiple EPs. This relentless output is part of his evolution as an artist — building momentum, expanding his reach, and cementing his place in the alternative rap landscape.`,
];

const SHORT_BIO = `Elcee the Alchemist is a Manchester-based alternative rap artist with six years of independent experience. Operating solo without a team or label, he creates raw, introspective music that pushes genre boundaries. As a recording engineer, producer, and performer, Elcee controls every aspect of his craft. In 2026, he's releasing a minimum of 2 tracks per month, building momentum across streaming platforms and live performances. He also teaches music production in Manchester, helping develop the next generation of artists while cementing his place in the UK alternative rap scene.`;

export default function EPKPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── HERO ── */}
      <section style={{
        position: 'relative', width: '100%', minHeight: 640,
        overflow: 'hidden', display: 'flex', alignItems: 'flex-end',
        paddingBottom: 72, paddingLeft: 48,
      }}>
        <div style={{
          position: 'absolute', top: '-10%', left: 0, right: 0, bottom: '-10%',
          background: '#111111',
        }}>
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
          background: 'linear-gradient(to bottom, rgba(8,8,8,0.15) 0%, rgba(8,8,8,0.0) 40%, rgba(8,8,8,0.88) 100%)',
          pointerEvents: 'none',
        }} />
        <div style={{ position: 'relative', zIndex: 2 }}>
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
          <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
            {[
              { label: 'Genre', value: 'Alternative Rap' },
              { label: 'Location', value: 'Manchester, England' },
              { label: 'Active', value: '6 Years' },
            ].map(({ label, value }) => (
              <div key={label}>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 4 }}>{label}</p>
                <p style={{ fontWeight: 900, fontSize: 14 }}>{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BIO — light section ── */}
      <section style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 520 }}>
          <div style={{ padding: '64px 48px', borderRight: '2px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              Biography
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(38px, 5vw, 72px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 36 }}>
              The Story
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {BIO_PARAS.map((para, i) => (
                <p key={i} style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(0,0,0,0.6)' }}>{para}</p>
              ))}
            </div>
          </div>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <p style={{ fontSize: 9, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}>Short Bio — 100 Words</p>
              <div style={{ padding: '32px', background: '#080808', color: '#fafafa' }}>
                <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.65)' }}>{SHORT_BIO}</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', marginTop: 40 }}>
              {[
                { stat: '6', label: 'Years Active' },
                { stat: '24+', label: 'Tracks 2026' },
                { stat: '100%', label: 'Independent' },
              ].map(({ stat, label }) => (
                <div key={label}>
                  <p style={{ fontWeight: 900, fontSize: 48, letterSpacing: '-0.04em', lineHeight: 1, color: '#080808', marginBottom: 4 }}>{stat}</p>
                  <p style={{ fontSize: 10, color: 'rgba(0,0,0,0.4)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PRESS PHOTOS ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Press Photos
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Photos
          </h2>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.35)', marginTop: 10 }}>High-resolution images available for press and promotional use.</p>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ position: 'relative', overflow: 'hidden', minHeight: 500, borderRight: '1px solid #1a1a1a' }}>
            <Image
              src="/elcee-portrait.jpg"
              alt="Elcee the Alchemist — Press Photo"
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 15%', filter: 'grayscale(100%) contrast(1.05)' }}
            />
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px 24px', background: 'rgba(8,8,8,0.7)' }}>
              <a href="/elcee-portrait.jpg" download style={{
                fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(255,255,255,0.6)', textDecoration: 'none',
              }}>
                Download High-Res →
              </a>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 500 }}>
            <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.2)', letterSpacing: '0.1em', textAlign: 'center' }}>
              Additional press photos<br />coming soon
            </p>
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
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid rgba(0,0,0,0.08)', position: 'relative', zIndex: 1 }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 12 }}>
            Music &amp; Streaming
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, color: '#080808' }}>
            Stream Now
          </h2>
        </div>
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
          {STREAM_LINKS.map((link, i) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '40px 48px',
              borderTop: i >= 2 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              borderLeft: i % 2 === 1 ? '1px solid rgba(0,0,0,0.08)' : 'none',
              background: 'rgba(255,255,255,0.3)',
              textDecoration: 'none', color: '#080808',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.5)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.3)'; }}
            >
              <div>
                <p style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 4 }}>{link.label}</p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)' }}>{link.sub}</p>
              </div>
              <span style={{ fontSize: 20, opacity: 0.4 }}>→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── SOCIAL ── */}
      <section style={{ background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ padding: '48px 48px 32px', borderBottom: '1px solid #1a1a1a' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
            Social Media
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9 }}>
            Follow Along
          </h2>
        </div>
        <div className="grid-two-col" style={{ borderBottom: '1px solid #1a1a1a' }}>
          {SOCIAL_LINKS.map((link, i) => (
            <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              padding: '28px 48px',
              borderTop: i >= 2 ? '1px solid #1a1a1a' : 'none',
              borderLeft: i % 2 === 1 ? '1px solid #1a1a1a' : 'none',
              textDecoration: 'none', color: '#fafafa',
              transition: 'background 0.2s',
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#111111'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; }}
            >
              <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: '-0.01em' }}>{link.label}</span>
              <span style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)' }}>{link.handle} →</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── BOOKING CTA — light section ── */}
      <section style={{ background: '#f0ede8', color: '#080808', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'url(/grunge-texture.jpg)',
          backgroundSize: 'cover', opacity: 0.06, mixBlendMode: 'multiply', pointerEvents: 'none',
        } as React.CSSProperties} />
        <div className="grid-two-col" style={{ position: 'relative', zIndex: 1, minHeight: 320 }}>
          <div style={{ padding: '64px 48px', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderRight: '2px solid rgba(0,0,0,0.08)' }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
              Booking &amp; Press
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 64px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.88, color: '#080808', marginBottom: 20 }}>
              Enquiries
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', maxWidth: 360, marginBottom: 32 }}>
              For performances, interviews, collaborations, or press requests.
            </p>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#080808', color: '#fafafa', textDecoration: 'none', alignSelf: 'flex-start',
            }}>
              Get in Touch →
            </Link>
          </div>
          <div style={{ position: 'relative', overflow: 'hidden', background: '#d8d5d0', minHeight: 320 }}>
            <Image
              src="/elcee-landscape.jpg"
              alt=""
              fill
              style={{ objectFit: 'cover', objectPosition: 'center 8%', filter: 'grayscale(30%)' }}
            />
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
