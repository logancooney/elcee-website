'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MediaGrid } from './components/MediaEmbeds';

export default function Home() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Nav: transparent on hero, solid when scrolled
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('in-view'); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const navLinks = [
    { label: 'Studio', href: '/studio' },
    { label: 'Tutoring', href: '/tutoring' },
    { label: 'Shop', href: '/shop' },
    { label: 'Contact', href: '/contact' },
  ];

  const platforms = [
    { name: 'Spotify',      href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
    { name: 'Apple Music',  href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060' },
    { name: 'YouTube',      href: 'https://youtube.com/@elceethealchemist' },
    { name: 'SoundCloud',   href: 'https://soundcloud.com/elceethealchemist' },
    { name: 'Amazon Music', href: 'https://music.amazon.com/artists/B07V4F5QK4/elcee-the-alchemist' },
    { name: 'Tidal',        href: 'https://tidal.com/browse/artist/13513078' },
    { name: 'Deezer',       href: 'https://www.deezer.com/artist/67198962' },
    { name: 'Bandcamp',     href: 'https://elceethealchemist.bandcamp.com' },
  ];

  const socials = [
    { name: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
    { name: 'TikTok',    href: 'https://tiktok.com/@elceethealchemist' },
    { name: 'YouTube',   href: 'https://youtube.com/@elceethealchemist' },
    { name: 'Twitter',   href: 'https://twitter.com/elceejpg' },
    { name: 'Facebook',  href: 'https://facebook.com/elceethealchemist' },
  ];

  const marqueeText = 'Abbey Road\u00a0\u00b7\u00a0 JBL Amsterdam\u00a0\u00b7\u00a0 Boiler Room 100K\u00a0\u00b7\u00a0 adidas Rising Star\u00a0\u00b7\u00a0 First Class Graduate\u00a0\u00b7\u00a0 50+ Tracks Released\u00a0\u00b7\u00a0 ';

  return (
    <div className="min-h-screen bg-black text-white">

      {/* ── NAVIGATION ── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-500 ${
          scrolled ? 'nav-solid' : 'nav-transparent'
        }`}
      >
        <div className="flex items-center justify-between px-6 md:px-10 py-4">
          {/* Logo */}
          <Link href="/">
            <Image
              src={scrolled ? '/logos/eta-logo-white-cropped.png' : '/logos/eta-logo-white-cropped.png'}
              alt="Elcee the Alchemist"
              width={280}
              height={70}
              className="h-10 md:h-12 w-auto"
              priority
            />
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-10">
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="section-label hover:text-white transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <a
            href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:block section-label border border-white/20 px-5 py-2 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
          >
            Listen
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-white"
            aria-label="Toggle menu"
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

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-black border-t border-white/10">
            <div className="flex flex-col px-6 py-6 gap-5">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="section-label hover:text-white transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {l.label}
                </Link>
              ))}
              <a
                href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
                target="_blank"
                rel="noopener noreferrer"
                className="section-label hover:text-white transition-colors"
              >
                Listen on Spotify
              </a>
            </div>
          </div>
        )}
      </nav>

      {/* ── HERO ── */}
      <section className="relative h-screen flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-14 overflow-hidden">
        {/* Location tag */}
        <span
          className="hero-fade absolute top-28 left-6 md:left-10 section-label"
          style={{ color: '#333' }}
        >
          Manchester, UK
        </span>

        {/* Headline */}
        <div className="mb-6 md:mb-8">
          <span
            className="display hero-line hero-line-1"
            style={{ fontSize: 'clamp(72px, 19vw, 260px)' }}
          >
            Elcee
          </span>
          <div
            className="hero-line hero-line-2"
            style={{ borderTop: '1px solid #1f1f1f', margin: '8px 0' }}
          />
          <span
            className="display hero-line hero-line-3"
            style={{ fontSize: 'clamp(32px, 7.8vw, 104px)', color: '#444' }}
          >
            The Alchemist
          </span>
        </div>

        {/* Bottom row */}
        <div className="hero-fade flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <p className="section-label" style={{ color: '#333' }}>
            Recording Artist&nbsp;&nbsp;·&nbsp;&nbsp;Engineer&nbsp;&nbsp;·&nbsp;&nbsp;Studio Owner&nbsp;&nbsp;·&nbsp;&nbsp;Educator
          </p>
          <div className="flex gap-4">
            <a
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
              target="_blank"
              rel="noopener noreferrer"
              className="section-label border border-white/20 px-6 py-3 hover:bg-white hover:text-black hover:border-white transition-all duration-300"
            >
              Listen Now
            </a>
            <Link
              href="/studio"
              className="section-label border border-white/10 px-6 py-3 hover:border-white/30 transition-all duration-300"
              style={{ color: '#444' }}
            >
              Book Studio
            </Link>
          </div>
        </div>
      </section>

      {/* ── MARQUEE ── */}
      <div className="border-t border-b border-white/5 py-3 overflow-hidden">
        <div className="marquee-track">
          <span className="section-label pr-4" style={{ color: '#2a2a2a', whiteSpace: 'nowrap' }}>
            {marqueeText}
          </span>
          <span className="section-label pr-4" aria-hidden="true" style={{ color: '#2a2a2a', whiteSpace: 'nowrap' }}>
            {marqueeText}
          </span>
        </div>
      </div>

      {/* ── LATEST MUSIC ── */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <h2
            className="display reveal"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
          >
            Latest
          </h2>
          <span className="section-label reveal reveal-delay-1">01&nbsp;/&nbsp;Music</span>
        </div>
        <div className="reveal reveal-delay-2">
          <MediaGrid />
        </div>
      </section>

      {/* ── ARTIST ── */}
      <section className="bg-white text-black">
        <div className="grid md:grid-cols-2 min-h-[80vh]">
          {/* Text */}
          <div className="flex flex-col justify-center px-8 md:px-14 py-20 order-2 md:order-1">
            <span className="section-label mb-8 reveal" style={{ color: '#aaa' }}>02&nbsp;/&nbsp;Artist</span>
            <h2
              className="display text-black reveal reveal-delay-1 mb-10"
              style={{ fontSize: 'clamp(48px, 7vw, 96px)' }}
            >
              Artist
            </h2>
            <div className="space-y-5 max-w-md">
              <p className="text-base text-stone-600 leading-relaxed reveal reveal-delay-2">
                Elcee the Alchemist is redefining UK Alternative Rap. Winner of the JBL Martin Garrix Music Academy, named an adidas Rising Star. Recorded at Abbey Road. 100,000 views on his Boiler Room debut in one week.
              </p>
              <p className="text-base text-stone-600 leading-relaxed reveal reveal-delay-3">
                Rooted in London&apos;s Grime scene. Moved to Manchester to study Electronic Music Production. First Class graduate. Operating completely solo. No team, no label. Pure vision.
              </p>
            </div>
            <a
              href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline mt-12 section-label text-black w-fit reveal reveal-delay-4"
            >
              Stream all music&nbsp;&nbsp;→
            </a>
          </div>
          {/* Photo */}
          <div className="relative min-h-[50vh] md:min-h-0 order-1 md:order-2 overflow-hidden">
            <Image
              src="/photos/press-shot-bw.jpg"
              alt="Elcee the Alchemist"
              fill
              className="object-cover grayscale"
            />
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="py-20 md:py-28 px-6 md:px-10">
        <div className="flex items-baseline justify-between mb-14">
          <h2
            className="display reveal"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
          >
            Services
          </h2>
          <span className="section-label reveal reveal-delay-1">03&nbsp;/&nbsp;Work</span>
        </div>

        <div className="grid md:grid-cols-2 gap-px" style={{ background: '#111' }}>
          {/* Studio */}
          <div className="service-card bg-black p-10 md:p-14 reveal">
            <span className="section-label block mb-8" style={{ color: '#333' }}>01</span>
            <h3
              className="display mb-5"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              Recording Studio
            </h3>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#555', maxWidth: '320px' }}>
              Professional recording, mixing, mastering, and production in Salford, Manchester. Hourly and day rates. All levels welcome.
            </p>
            <Link
              href="/studio"
              className="link-underline section-label hover:text-white transition-colors"
            >
              Book a session&nbsp;&nbsp;→
            </Link>
          </div>

          {/* Tutoring */}
          <div className="service-card bg-black p-10 md:p-14 reveal reveal-delay-2">
            <span className="section-label block mb-8" style={{ color: '#333' }}>02</span>
            <h3
              className="display mb-5"
              style={{ fontSize: 'clamp(28px, 3.5vw, 52px)' }}
            >
              Music Lessons
            </h3>
            <p className="text-sm leading-relaxed mb-10" style={{ color: '#555', maxWidth: '320px' }}>
              1-1 production, mixing, recording, and songwriting sessions. Online or in-studio. Taught by someone still in the room. First session free.
            </p>
            <Link
              href="/tutoring"
              className="link-underline section-label hover:text-white transition-colors"
            >
              Book a lesson&nbsp;&nbsp;→
            </Link>
          </div>
        </div>
      </section>

      {/* ── STREAM ── */}
      <section className="py-20 md:py-28 px-6 md:px-10 border-t border-white/5">
        <div className="flex items-baseline justify-between mb-14">
          <h2
            className="display reveal"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
          >
            Stream
          </h2>
          <span className="section-label reveal reveal-delay-1">04&nbsp;/&nbsp;Platforms</span>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px reveal" style={{ background: '#111' }}>
          {platforms.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="platform-link"
            >
              {name}
              <span className="arrow">→</span>
            </a>
          ))}
        </div>
      </section>

      {/* ── CONNECT ── */}
      <section className="py-20 md:py-24 px-6 md:px-10 border-t border-white/5">
        <div className="flex items-baseline justify-between mb-12">
          <h2
            className="display reveal"
            style={{ fontSize: 'clamp(40px, 7vw, 100px)' }}
          >
            Connect
          </h2>
          <span className="section-label reveal reveal-delay-1">05&nbsp;/&nbsp;Social</span>
        </div>
        <div className="flex flex-wrap gap-8 reveal reveal-delay-2">
          {socials.map(({ name, href }) => (
            <a
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline section-label hover:text-white transition-colors"
            >
              {name}
            </a>
          ))}
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 px-6 md:px-10 py-10">
        <div className="flex items-center justify-between">
          <Image
            src="/logos/ankh-white.png"
            alt="Ankh"
            width={36}
            height={36}
            className="opacity-40"
          />
          <p className="section-label" style={{ color: '#2a2a2a' }}>
            © 2026 Elcee the Alchemist
          </p>
          <Link
            href="/contact"
            className="link-underline section-label hover:text-white transition-colors"
            style={{ color: '#333' }}
          >
            Contact&nbsp;&nbsp;→
          </Link>
        </div>
      </footer>

    </div>
  );
}
