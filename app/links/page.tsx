'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  images: { src: string }[];
  variants: { price: string }[];
}

function MerchGrid() {
  const [products, setProducts] = useState<ShopifyProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/merch')
      .then(r => r.json())
      .then(data => {
        setProducts(data.products ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div style={{ padding: '24px 0', textAlign: 'center', fontSize: 11, color: 'rgba(255,255,255,0.3)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
        Loading...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <a
        href="https://shop.elceethealchemist.com"
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '16px 20px',
          fontWeight: 900, fontSize: 11, letterSpacing: '0.15em',
          textTransform: 'uppercase', textDecoration: 'none',
          background: '#fafafa', color: '#080808',
        }}
      >
        Shop Merch →
      </a>
    );
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
      {products.map(product => {
        const image = product.images[0]?.src;
        const price = product.variants[0]?.price;
        const url = `https://shop.elceethealchemist.com/products/${product.handle}`;
        return (
          <a
            key={product.id}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none', color: '#fafafa', display: 'block' }}
          >
            <div style={{ position: 'relative', width: '100%', aspectRatio: '1/1', background: '#1a1a1a', overflow: 'hidden' }}>
              {image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={image}
                  alt={product.title}
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'opacity 0.2s' }}
                  onMouseEnter={e => { (e.currentTarget as HTMLImageElement).style.opacity = '0.8'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLImageElement).style.opacity = '1'; }}
                />
              )}
            </div>
            <div style={{ padding: '10px 0 4px' }}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fafafa', marginBottom: 3 }}>
                {product.title}
              </p>
              {price && (
                <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.05em' }}>
                  £{parseFloat(price).toFixed(2)}
                </p>
              )}
            </div>
          </a>
        );
      })}
    </div>
  );
}

const SOCIAL_ICONS = [
  {
    label: 'Spotify',
    href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
      </svg>
    ),
  },
  {
    label: 'Apple Music',
    href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1507887824',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.151 0H5.85C2.619 0 0 2.62 0 5.85v12.3C0 21.381 2.619 24 5.85 24h12.3C21.381 24 24 21.381 24 18.15V5.85C24 2.619 21.381 0 18.151 0zM15.6 7.2l-5.4 1.8v6.3c0 .497-.268.96-.703 1.208l-.797.46c-.99.572-2.25-.143-2.25-1.288 0-.54.29-1.042.76-1.315l1.59-.918V7.05l7.2-2.4v7.35c0 .497-.268.96-.703 1.208l-.797.46c-.99.572-2.25-.143-2.25-1.288 0-.54.29-1.042.76-1.315l1.59-.918V7.2z"/>
      </svg>
    ),
  },
  {
    label: 'YouTube',
    href: 'https://www.youtube.com/@elceethealchemist',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
      </svg>
    ),
  },
  {
    label: 'Instagram',
    href: 'https://www.instagram.com/elceethealchemist',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
      </svg>
    ),
  },
  {
    label: 'TikTok',
    href: 'https://www.tiktok.com/@elceethealchemist',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.69a8.26 8.26 0 004.83 1.55V6.79a4.85 4.85 0 01-1.06-.1z"/>
      </svg>
    ),
  },
  {
    label: 'SoundCloud',
    href: 'https://soundcloud.com/elceethealchemist',
    icon: (
      <svg width={18} height={18} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.175 12.225c-.017 0-.034.002-.05.006a.643.643 0 00-.582.683l.32 2.223-.32 2.114a.643.643 0 00.632.688.643.643 0 00.632-.683l.366-2.114-.366-2.255a.643.643 0 00-.632-.662zm2.137-.8a.787.787 0 00-.831.82l.29 3.02-.29 2.844a.787.787 0 00.831.808.787.787 0 00.766-.82l.33-2.824-.33-3.04a.787.787 0 00-.766-.808zm2.196-.386a.932.932 0 00-.992.972l.26 3.418-.26 3.197a.932.932 0 00.992.95.932.932 0 00.838-.972l.295-3.165-.295-3.45a.932.932 0 00-.838-.95zm10.683-3.585a3.807 3.807 0 00-.9.163 5.386 5.386 0 00-5.23-4.116 5.375 5.375 0 00-2.137.445v12.32a1.077 1.077 0 001.077 1.076h7.19A3.807 3.807 0 0020 13.535a3.807 3.807 0 00-3.809-4.081z"/>
      </svg>
    ),
  },
];

const STREAMING_LINKS = [
  { label: 'Listen on Spotify', href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7', primary: true },
  { label: 'Apple Music', href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1507887824', primary: false },
  { label: 'YouTube Music', href: 'https://www.youtube.com/@elceethealchemist', primary: false },
  { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist', primary: false },
];

const VIDEOS = [
  { id: 'K9Bk3Mw7mIc', title: 'Filthy' },
  { id: 'KmekR33sMng', title: '2bad' },
  { id: '7uelRgmMSCQ', title: 'JBL Performance' },
];

function Divider() {
  return <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '8px 0 28px' }} />;
}

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
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url(/grunge-texture.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center',
        opacity: 0.35, mixBlendMode: 'screen', pointerEvents: 'none', zIndex: 0,
      } as React.CSSProperties} />
      <div style={{
        position: 'fixed', inset: 0,
        backgroundImage: 'url(/elcee-portrait.jpg)',
        backgroundSize: 'cover', backgroundPosition: 'center 15%',
        opacity: 0.04, pointerEvents: 'none', zIndex: 0,
        filter: 'grayscale(100%)',
      }} />

      <div style={{
        position: 'relative', zIndex: 1,
        width: '100%', maxWidth: 480,
        padding: '64px 24px 56px',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: 24 }}>
          <Link href="/">
            <Image
              src="/logos/eta-logo-white-cropped.png"
              alt="Elcee The Alchemist"
              width={320} height={80}
              style={{ height: 72, width: 'auto', objectFit: 'contain', display: 'block', margin: '0 auto 12px' }}
            />
          </Link>
          <p style={{ fontSize: 11, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
            Alternative Rap · Manchester
          </p>
        </div>

        {/* Social icons */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 36 }}>
          {SOCIAL_ICONS.map(({ label, href, icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              style={{
                width: 42, height: 42,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'rgba(255,255,255,0.4)',
                border: '1px solid rgba(255,255,255,0.1)',
                textDecoration: 'none',
                transition: 'color 0.2s, border-color 0.2s, background 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = '#fafafa';
                el.style.borderColor = 'rgba(255,255,255,0.35)';
                el.style.background = 'rgba(255,255,255,0.06)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'rgba(255,255,255,0.4)';
                el.style.borderColor = 'rgba(255,255,255,0.1)';
                el.style.background = 'transparent';
              }}
            >
              {icon}
            </a>
          ))}
        </div>

        {/* Book a free call — primary commercial CTA */}
        <a
          href="/free"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px', marginBottom: 24,
            fontWeight: 900, fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            background: '#fafafa', color: '#080808',
          }}
        >
          Book a Free Call — Studio / Mixing / Tutoring
          <span style={{ fontSize: 14, fontWeight: 400 }}>→</span>
        </a>

        {/* Latest release */}
        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
          Latest Release
        </p>
        <iframe
          style={{ borderRadius: 0, display: 'block', width: '100%', marginBottom: 4 }}
          src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator&theme=0"
          width="100%"
          height="152"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
        />

        {/* Streaming links */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, marginBottom: 32 }}>
          {STREAMING_LINKS.map(link => (
            <a
              key={link.href}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '16px 20px',
                fontWeight: 900, fontSize: 11, letterSpacing: '0.15em',
                textTransform: 'uppercase', textDecoration: 'none',
                background: link.primary ? '#fafafa' : 'transparent',
                color: link.primary ? '#080808' : '#fafafa',
                border: link.primary ? 'none' : '1px solid rgba(255,255,255,0.12)',
                transition: 'background 0.2s, border-color 0.2s',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = link.primary ? '#e8e8e8' : 'rgba(255,255,255,0.05)';
                if (!link.primary) el.style.borderColor = 'rgba(255,255,255,0.3)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.background = link.primary ? '#fafafa' : 'transparent';
                if (!link.primary) el.style.borderColor = 'rgba(255,255,255,0.12)';
              }}
            >
              {link.label}
              <span style={{ opacity: 0.5, fontSize: 14, fontWeight: 400 }}>→</span>
            </a>
          ))}
        </div>

        <Divider />

        {/* Videos */}
        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
          Videos
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 32 }}>
          {VIDEOS.map(({ id, title }) => (
            <div key={id}>
              <p style={{ fontSize: 10, fontWeight: 900, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.5)', marginBottom: 8 }}>
                {title}
              </p>
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                <iframe
                  style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' }}
                  src={`https://www.youtube.com/embed/${id}`}
                  title={`${title} — Elcee The Alchemist`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  loading="lazy"
                />
              </div>
            </div>
          ))}
        </div>

        <Divider />

        {/* Merch */}
        <div style={{ marginBottom: 8 }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
            <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>
              Merch
            </p>
            <a
              href="https://shop.elceethealchemist.com"
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = '#fafafa'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.3)'; }}
            >
              View all →
            </a>
          </div>
          <MerchGrid />
        </div>

        <Divider />

        {/* Work with me */}
        <a
          href="/booking"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '16px 20px',
            fontWeight: 900, fontSize: 11, letterSpacing: '0.15em',
            textTransform: 'uppercase', textDecoration: 'none',
            color: '#fafafa',
            border: '1px solid rgba(255,255,255,0.12)',
            transition: 'background 0.2s, border-color 0.2s',
          }}
          onMouseEnter={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'rgba(255,255,255,0.05)';
            el.style.borderColor = 'rgba(255,255,255,0.3)';
          }}
          onMouseLeave={e => {
            const el = e.currentTarget as HTMLAnchorElement;
            el.style.background = 'transparent';
            el.style.borderColor = 'rgba(255,255,255,0.12)';
          }}
        >
          Work With Me — Studio / Mixing / Tutoring
          <span style={{ opacity: 0.5, fontSize: 14, fontWeight: 400 }}>→</span>
        </a>

        <div style={{ height: 1, background: 'rgba(255,255,255,0.06)', margin: '32px 0 20px' }} />
        <p style={{ textAlign: 'center', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.2)' }}>
          elceethealchemist.com
        </p>
      </div>
    </div>
  );
}
