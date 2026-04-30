'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Music', href: '/#releases' },
  { label: 'Studio', href: '/studio' },
  { label: 'Tutoring', href: '/tutoring' },
  { label: 'Shop', href: '/shop' },
  { label: 'Free Call', href: '/free' },
  { label: 'Contact', href: '/contact' },
];

const NAV_CTA = { label: 'Book', href: '/booking' };

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: scrolled ? '14px 48px' : '20px 48px',
        background: scrolled ? 'rgba(8,8,8,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: `1px solid ${scrolled ? 'rgba(255,255,255,0.07)' : 'transparent'}`,
        transition: 'background 0.4s ease, padding 0.4s ease, border-color 0.4s ease',
      }}>
        <Link href="/">
          <Image
            src="/logos/eta-logo-white-cropped.png"
            alt="Elcee The Alchemist"
            width={180} height={45}
            style={{ height: 36, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 36 }}>
          <ul style={{ display: 'flex', gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  style={{
                    fontSize: 11, fontWeight: 400, letterSpacing: '0.15em',
                    textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                    textDecoration: 'none', transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fafafa')}
                  onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)')}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={NAV_CTA.href}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '10px 22px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em',
              textTransform: 'uppercase', textDecoration: 'none',
              background: '#fafafa', color: '#080808',
              transition: 'background 0.2s',
            }}
          >
            {NAV_CTA.label} →
          </Link>
        </div>

        <button
          className="md:hidden"
          onClick={() => setMobileOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: '#fafafa', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          {mobileOpen ? (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden" style={{
          position: 'fixed', inset: 0,
          background: 'rgba(8,8,8,0.98)', zIndex: 99,
          display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              onClick={() => setMobileOpen(false)}
              style={{
                fontSize: 24, fontWeight: 900, letterSpacing: '0.12em',
                textTransform: 'uppercase', color: '#fafafa', textDecoration: 'none',
              }}
            >
              {label}
            </Link>
          ))}
          <Link
            href={NAV_CTA.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: 22, fontWeight: 900, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#080808', textDecoration: 'none',
              background: '#fafafa', padding: '14px 28px', marginTop: 16,
            }}
          >
            {NAV_CTA.label} →
          </Link>
        </div>
      )}
    </>
  );
}
