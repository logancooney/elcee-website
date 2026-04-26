'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const NAV_LINKS = [
  { label: 'Music', href: '/#releases' },
  { label: 'Studio', href: '/studio' },
  { label: 'Tutoring', href: '/tutoring' },
  { label: 'Shop', href: '/shop' },
  { label: 'Contact', href: '/contact' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 48px',
        background: 'rgba(8,8,8,0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.07)',
      }}>
        <Link href="/">
          <Image
            src="/logos/eta-logo-white-cropped.png"
            alt="Elcee The Alchemist"
            width={180} height={45}
            style={{ height: 36, width: 'auto', objectFit: 'contain' }}
          />
        </Link>

        <ul className="hidden md:flex" style={{ gap: 36, listStyle: 'none', margin: 0, padding: 0 }}>
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              <Link href={href} style={{
                fontSize: 11, fontWeight: 400, letterSpacing: '0.15em',
                textTransform: 'uppercase', color: 'rgba(255,255,255,0.55)',
                textDecoration: 'none', transition: 'color 0.2s',
              }}>
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden"
          onClick={() => setOpen(o => !o)}
          style={{ background: 'none', border: 'none', color: '#fafafa', cursor: 'pointer', padding: 8 }}
          aria-label="Toggle menu"
        >
          {open ? (
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

      {open && (
        <div className="md:hidden" style={{
          position: 'fixed', inset: 0, background: 'rgba(8,8,8,0.98)',
          zIndex: 99, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center', gap: 40,
        }}>
          {NAV_LINKS.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setOpen(false)} style={{
              fontSize: 24, fontWeight: 900, letterSpacing: '0.12em',
              textTransform: 'uppercase', color: '#fafafa', textDecoration: 'none',
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
