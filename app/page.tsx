'use client';

import { useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/home/Hero';
import Music from './components/home/Music';
import VideoGrid from './components/home/VideoGrid';
import About from './components/home/About';
import Platforms from './components/home/Platforms';
import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  // Scroll reveal: add .in-view to .reveal elements as they enter viewport
  useEffect(() => {
    const els = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('in-view');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page bg-black text-white min-h-screen">
      <Navigation transparent />

      <Hero />

      <div className="reveal">
        <Music />
      </div>

      <div className="reveal">
        <VideoGrid />
      </div>

      <div className="reveal">
        <About />
      </div>

      <div className="reveal">
        <Platforms />
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 px-6 md:px-10 py-10">
        <div className="flex items-center justify-between">
          <Image
            src="/logos/ankh-white.png"
            alt="Ankh"
            width={36}
            height={36}
            className="opacity-40"
          />
          <p className="label" style={{ color: '#222' }}>
            © 2026 Elcee the Alchemist
          </p>
          <Link
            href="/contact"
            className="link-line label hover:text-white transition-colors"
            style={{ color: '#333' }}
          >
            Contact →
          </Link>
        </div>
      </footer>
    </div>
  );
}
