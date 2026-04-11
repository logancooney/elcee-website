"use client";

import { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '../components/Navigation';
import Testimonials from './components/Testimonials';
import FAQ from './components/FAQ';

export default function TutoringPage() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://assets.calendly.com/assets/external/widget.js';
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Learn Music Production in Manchester
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            One-to-one sessions with a working artist and engineer. All levels welcome — online or in-studio in Manchester.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#booking"
              className="bg-white text-black px-12 py-4 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Book a Free Call
            </a>
            <a
              href="#what-you-learn"
              className="border-2 border-white px-12 py-4 font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              See What&apos;s Included
            </a>
          </div>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="what-you-learn" className="py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
            What You&apos;ll Learn
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                title: 'Music Production',
                description: 'Ableton Live, beat-making, arrangement, sound design. Build tracks from scratch.',
              },
              {
                title: 'Mixing',
                description: 'Any DAW. Balance, EQ, compression, and getting a professional sound.',
              },
              {
                title: 'Recording & Engineering',
                description: 'Studio technique, signal chain, mic placement, getting the best takes.',
              },
              {
                title: 'Songwriting & Lyricism',
                description: 'Structure, flow, pen game, finding your voice and building your craft.',
              },
            ].map((item) => (
              <div key={item.title} className="border border-black p-8">
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-12">
            {[
              { step: '01', text: 'Book a free 15-minute call — no commitment, no pressure.' },
              { step: '02', text: 'We build a session plan around your goals and your level.' },
              { step: '03', text: 'Learn one-to-one at your own pace, online or in the studio.' },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-6xl font-bold text-gray-700 mb-4">{item.step}</p>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Pricing
          </h2>
          <p className="text-gray-400 mb-16">Simple hourly rates. No hidden costs.</p>

          <div className="grid md:grid-cols-2 gap-8 mb-10">
            <div className="border border-white/20 p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">Online</h3>
              <p className="text-gray-400 mb-6">Via video call, share your screen</p>
              <p className="text-5xl font-bold mb-1">£40</p>
              <p className="text-gray-400">per hour</p>
            </div>
            <div className="border border-white p-10 rounded-2xl">
              <h3 className="text-2xl font-bold mb-2">In-Studio</h3>
              <p className="text-gray-400 mb-6">Cambridge Street, Manchester</p>
              <p className="text-5xl font-bold mb-1">£45</p>
              <p className="text-gray-400">per hour</p>
            </div>
          </div>

          <p className="text-gray-400 mb-2">Packages available — bulk session discounts on request.</p>
          <p className="text-gray-500 text-sm">First call is free. No commitment.</p>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Book a Free Call
          </h2>
          <p className="text-xl text-gray-400">
            15 minutes. No pressure. We&apos;ll figure out if we&apos;re a good fit.
          </p>
        </div>

        {/* PLACEHOLDER: Replace the href below with your tutoring Calendly URL once set up */}
        {/* e.g. data-url="https://calendly.com/YOUR-NEW-ACCOUNT/tutoring-call" */}
        <div
          className="calendly-inline-widget rounded-lg overflow-hidden mx-auto"
          data-url="https://calendly.com/elcee-mgmt/studio-session"
          style={{ minWidth: '320px', height: '700px', maxWidth: '900px' }}
        />

        <div className="text-center mt-8">
          <p className="text-gray-400">
            Prefer to message first?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
