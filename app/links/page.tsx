'use client';

import Image from 'next/image';

const LINKS = [
  {
    label: 'Listen on Spotify',
    href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7',
    primary: true,
    external: true,
  },
  {
    label: 'Watch on YouTube',
    href: 'https://www.youtube.com/@elceethealchemist',
    primary: false,
    external: true,
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elceethealchemist',
    primary: false,
    external: true,
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@elceethealchemist',
    primary: false,
    external: true,
  },
  {
    label: 'Book Studio Time',
    href: '/studio',
    primary: true,
    external: false,
    sub: '£35/hr · Manchester',
  },
  {
    label: 'Music Tutoring',
    href: '/tutoring',
    primary: false,
    external: false,
    sub: 'From £45/hr · Online & In-Person',
  },
  {
    label: 'Free Track Review',
    href: '/free',
    primary: false,
    external: false,
    sub: 'Honest feedback. No pitch.',
  },
];

export default function LinksPage() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#080808',
      color: '#fafafa',
      position: 'relative',
      overflowX: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    }}>

      {/* Grunge texture */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url(/grunge-texture.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.35, mixBlendMode: 'screen', pointerEvents: 'none',
        zIndex: 0,
      } as React.CSSProperties} />

      {/* Subtle portrait watermark */}
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url(/elcee-portrait.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center 15%',
        opacity: 0.04,
        pointerEvents: 'none',
        zIndex: 0,
        filter: 'grayscale(100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 480,
        padding: '72px 28px 48px',
        display: 'flex', flexDirection: 'column', gap: 0,
      }}>

        {/* Identity */}
        <div style={{ marginBottom: 48, textAlign: 'center' }}>
          <Image
            src="/logos/eta-logo-white-cropped.png"
            alt="Elcee The Alchemist"
            width={240}
            height={60}
            style={{ height: 52, width: 'auto', objectFit: 'contain', marginBottom: 16 }}
          />
          <p style={{
            fontSize: 11,
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.3)',
          }}>
            Alternative Rap · Manchester
          </p>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              target={link.external ? '_blank' : undefined}
              rel={link.external ? 'noopener noreferrer' : undefined}
              style={{
                display: 'flex',
                alignItems: link.sub ? 'flex-start' : 'center',
                flexDirection: link.sub ? 'column' : 'row',
                padding: '20px 24px',
                fontWeight: 900,
                fontSize: 12,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                background: link.primary ? '#fafafa' : 'transparent',
                color: link.primary ? '#080808' : '#fafafa',
                border: link.primary ? 'none' : '1px solid rgba(255,255,255,0.15)',
                transition: 'background 0.2s, border-color 0.2s, color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (link.primary) {
                  el.style.background = '#e8e8e8';
                } else {
                  el.style.borderColor = 'rgba(255,255,255,0.4)';
                  el.style.background = 'rgba(255,255,255,0.04)';
                }
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                if (link.primary) {
                  el.style.background = '#fafafa';
                } else {
                  el.style.borderColor = 'rgba(255,255,255,0.15)';
                  el.style.background = 'transparent';
                }
              }}
            >
              {link.label}
              {link.sub && (
                <span style={{
                  fontSize: 10,
                  letterSpacing: '0.1em',
                  fontWeight: 400,
                  color: link.primary ? 'rgba(8,8,8,0.5)' : 'rgba(255,255,255,0.35)',
                  marginTop: 4,
                  textTransform: 'none',
                }}>
                  {link.sub}
                </span>
              )}
            </a>
          ))}
        </div>

        {/* Divider */}
        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '32px 0' }} />

        {/* Footer */}
        <p style={{
          textAlign: 'center',
          fontSize: 10,
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color: 'rgba(255,255,255,0.2)',
        }}>
          elceethealchemist.com
        </p>
      </div>
    </div>
  );
}
