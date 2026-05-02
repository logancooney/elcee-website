'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Music', href: '/#releases', tier: 1 },
  { label: 'Shop', href: '/shop', tier: 2 },
  { label: 'Studio', href: '/studio', tier: 3 },
  { label: 'Tutoring', href: '/tutoring', tier: 3 },
  { label: 'Free', href: '/free', tier: 3 },
  { label: 'Contact', href: '/contact', tier: 3 },
] as const;

const desktopLinkStyle = (tier: 1 | 2 | 3) => ({
  1: { fontSize: 13, fontWeight: 900, color: '#fafafa',              letterSpacing: '0.15em' },
  2: { fontSize: 11, fontWeight: 400, color: 'rgba(255,255,255,0.6)', letterSpacing: '0.15em' },
  3: { fontSize: 10, fontWeight: 400, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.14em' },
}[tier]);

const mobileLinkStyle = (tier: 1 | 2 | 3) => ({
  1: { fontSize: 34, fontWeight: 900, color: '#fafafa',               letterSpacing: '0.04em' },
  2: { fontSize: 22, fontWeight: 900, color: 'rgba(255,255,255,0.75)', letterSpacing: '0.08em' },
  3: { fontSize: 16, fontWeight: 400, color: 'rgba(255,255,255,0.5)',  letterSpacing: '0.12em' },
}[tier]);

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
          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
            {NAV_LINKS.map(({ label, href, tier }) => {
              const base = desktopLinkStyle(tier);
              return (
                <li key={label}>
                  <Link
                    href={href}
                    style={{ ...base, textTransform: 'uppercase', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = '#fafafa')}
                    onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = base.color)}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
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
          alignItems: 'center', justifyContent: 'center',
        }}>
          {NAV_LINKS.map(({ label, href, tier }, i) => {
            const prevTier = i > 0 ? NAV_LINKS[i - 1].tier : tier;
            const topMargin = tier > prevTier ? 20 : tier === 1 ? 0 : 16;
            return (
              <Link
                key={label}
                href={href}
                onClick={() => setMobileOpen(false)}
                style={{
                  ...mobileLinkStyle(tier),
                  textTransform: 'uppercase', textDecoration: 'none',
                  marginTop: topMargin,
                  marginBottom: tier === 1 ? 8 : 0,
                }}
              >
                {label}
              </Link>
            );
          })}
          <Link
            href={NAV_CTA.href}
            onClick={() => setMobileOpen(false)}
            style={{
              fontSize: 14, fontWeight: 900, letterSpacing: '0.18em',
              textTransform: 'uppercase', color: '#080808', textDecoration: 'none',
              background: '#fafafa', padding: '14px 28px', marginTop: 32,
            }}
          >
            {NAV_CTA.label} →
          </Link>
        </div>
      )}
    </>
  );
}
