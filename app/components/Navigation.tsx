'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface NavigationProps {
  theme?: 'dark' | 'light';
}

export default function Navigation({ theme = 'dark' }: NavigationProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isDark = theme === 'dark';
  const bgClass = isDark ? 'bg-black/90' : 'bg-white/90';
  const textClass = isDark ? 'text-white' : 'text-black';
  const hoverClass = isDark ? 'hover:text-gray-400' : 'hover:text-gray-600';
  const borderClass = isDark ? 'border-white/10' : 'border-black/10';
  const logoSrc = isDark ? '/logos/eta-logo-white-cropped.png' : '/logos/eta-logo-black.png';
  const menuBgClass = isDark ? 'bg-black/95' : 'bg-white/95';

  return (
    <nav className={`fixed top-0 w-full ${bgClass} backdrop-blur-sm z-50 border-b ${borderClass}`}>
      <div className="max-w-7xl mx-auto px-6 py-2 flex justify-between items-center">
        <Link href="/">
          <Image 
            src={logoSrc}
            alt="Elcee the Alchemist" 
            width={400} 
            height={100}
            className="h-16 md:h-20 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <div className={`hidden md:flex gap-8 text-sm font-medium ${textClass}`}>
          <Link href="/" className={hoverClass + " transition"}>Home</Link>
          <Link href="/studio" className={hoverClass + " transition"}>Studio</Link>
          <Link href="/shop" className={hoverClass + " transition"}>Shop</Link>
          <Link href="/contact" className={hoverClass + " transition"}>Contact</Link>
        </div>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={`md:hidden ${textClass} p-2`}
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? (
            // X icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            // Hamburger icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className={`md:hidden ${menuBgClass} border-t ${borderClass}`}>
          <div className="flex flex-col px-6 py-4 space-y-4">
            <Link
              href="/"
              className={`${textClass} ${hoverClass} transition py-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/studio"
              className={`${textClass} ${hoverClass} transition py-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Studio
            </Link>
            <Link
              href="/shop"
              className={`${textClass} ${hoverClass} transition py-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Shop
            </Link>
            <Link
              href="/contact"
              className={`${textClass} ${hoverClass} transition py-2`}
              onClick={() => setMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
