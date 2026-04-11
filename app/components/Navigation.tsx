'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  transparent?: boolean;
  theme?: 'dark' | 'light';
}

export default function Navigation({ transparent = false, theme = 'dark' }: NavigationProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [transparent]);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [mobileMenuOpen]);

  const isDark = theme === 'dark';
  const isTransparentNow = transparent && !scrolled;

  // When transparent mode: no bg until scrolled. When not transparent: existing theme behaviour.
  const navClass = isTransparentNow
    ? 'nav-transparent'
    : isDark
    ? 'nav-solid'
    : 'bg-white/90 border-b border-black/10 backdrop-blur-sm';

  const textClass = isTransparentNow || isDark ? 'text-white' : 'text-black';
  const hoverClass = isTransparentNow || isDark ? 'hover:text-gray-400' : 'hover:text-gray-600';
  const logoSrc = isDark || isTransparentNow ? '/logos/eta-logo-white-cropped.png' : '/logos/eta-logo-black.png';
  const menuBgClass = isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${navClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link href="/">
          <Image
            src={logoSrc}
            alt="Elcee the Alchemist"
            width={400}
            height={100}
            className="h-14 md:h-20 w-auto"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className={`hidden md:flex gap-8 label ${textClass}`}>
          <Link href="/" className={`${hoverClass} transition-colors`}>Home</Link>
          <Link href="/studio" className={`${hoverClass} transition-colors`}>Studio</Link>
          <Link href="/tutoring" className={`${hoverClass} transition-colors`}>Tutoring</Link>
          <Link href="/shop" className={`${hoverClass} transition-colors`}>Shop</Link>
          <Link href="/contact" className={`${hoverClass} transition-colors`}>Contact</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden p-2 ${textClass}`}
          aria-label="Toggle menu"
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden border-t ${menuBgClass}`}>
          <div className="flex flex-col px-6 py-6 gap-5">
            {[
              { label: 'Home', href: '/' },
              { label: 'Studio', href: '/studio' },
              { label: 'Tutoring', href: '/tutoring' },
              { label: 'Shop', href: '/shop' },
              { label: 'Contact', href: '/contact' },
            ].map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`label ${textClass} ${hoverClass} transition-colors`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
