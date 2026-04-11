'use client';

import { useEffect, useRef } from 'react';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Parallax: desktop only, not on touch devices
    const isTouch = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isTouch) return;

    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      const offset = window.scrollY * 0.35;
      section.style.backgroundPositionY = `calc(50% + ${offset}px)`;
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative flex flex-col justify-end px-6 md:px-10 pb-10 md:pb-16 overflow-hidden"
      style={{
        height: '100svh',
        backgroundImage: "url('/assets/hero-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center 50%',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Dark overlay so text is always readable over the background image */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.15) 60%, rgba(0,0,0,0.3) 100%)' }}
      />

      {/* Location label — top left */}
      <span
        className="label absolute top-24 left-6 md:left-10"
        style={{ color: '#555' }}
      >
        Manchester, UK
      </span>

      {/* Name */}
      <div className="relative z-10 mb-6 md:mb-8">
        <h1
          style={{
            fontSize: 'clamp(56px, 14vw, 200px)',
            lineHeight: 0.88,
            letterSpacing: '-0.04em',
          }}
        >
          Elcee
          <br />
          <span style={{ color: '#555' }}>The Alchemist</span>
        </h1>
      </div>

      {/* CTA row */}
      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
        <a
          href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
          target="_blank"
          rel="noopener noreferrer"
          className="label border border-white/30 px-8 py-4 text-white hover:bg-white hover:text-black hover:border-white transition-all duration-300 text-center"
          style={{ minHeight: '44px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          Listen Now
        </a>
      </div>
    </section>
  );
}
