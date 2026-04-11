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
      <section className="pt-28 pb-10 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-4xl md:text-7xl font-bold mb-5 leading-tight">
            1-1 music lessons. In a real studio. With a real recording artist.
          </h1>
          <p className="text-xl md:text-2xl font-semibold max-w-3xl mx-auto mb-4">
            Want to turn your passion for music into something real?
          </p>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            You don&apos;t need theory to start. You don&apos;t need expensive gear. You need someone to show you what actually works to make great music. Online or in-studio in Manchester.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#booking"
              className="w-full sm:w-auto bg-white text-black px-10 py-4 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300 text-center"
            >
              Book Your Free Session
            </a>
            <a
              href="#what-you-learn"
              className="w-full sm:w-auto border-2 border-white px-10 py-4 font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300 text-center"
            >
              See What&apos;s Included
            </a>
          </div>
        </div>
      </section>

      {/* Who Am I */}
      <section className="py-16 md:py-24 px-6 bg-white text-black">
        <div className="max-w-3xl mx-auto">
          <p className="text-xl md:text-2xl leading-relaxed mb-6">
            I&apos;m Elcee. A recording artist, mixing engineer, and studio owner based in Manchester.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed mb-6">
            I&apos;ve recorded at Abbey Road. I&apos;ve been flown to Amsterdam by JBL to record in Lady Gaga&apos;s studio and break down unreleased Justin Bieber tracks. I made my Boiler Room debut to 100,000 views in a week. I hold a First Class degree in Electronic Music Production.
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">
            I still make music. I&apos;m still in the room. That&apos;s what makes these sessions different. You&apos;re not learning from someone who used to do this. You&apos;re learning from someone who does.
          </p>
        </div>
      </section>

      {/* What You'll Learn */}
      <section id="what-you-learn" className="py-16 md:py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 md:mb-16 text-center">
            What You&apos;ll Learn
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              {
                title: 'Music Production',
                description: "Ableton Live from scratch. We'll make something you actually like on day one.",
              },
              {
                title: 'Mixing',
                description: "Any DAW. I teach my philosophy, not just numbers. I'll show you the rules. Then teach you how to break them.",
              },
              {
                title: 'Recording & Engineering',
                description: "What actually makes the difference in a session. Spoiler: it's not the gear.",
              },
              {
                title: 'Songwriting & Lyricism',
                description: "Structure, flow, finding your voice. From someone who's been doing it professionally for years.",
              },
            ].map((item) => (
              <div key={item.title} className="border border-black p-5 md:p-8">
                <h3 className="text-base md:text-xl font-bold mb-2 md:mb-3">{item.title}</h3>
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 md:py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-10 md:mb-16">
            How It Works
          </h2>
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {[
              { step: '01', text: 'Book your free first session. A 20-minute call to figure out where you are and where you want to go.' },
              { step: '02', text: 'Every session is built around you. No wasted time on things you don\'t need yet.' },
              { step: '03', text: 'Make music you\'re proud of. At your pace. Online or in the studio in Manchester.' },
            ].map((item) => (
              <div key={item.step}>
                <p className="text-5xl md:text-6xl font-bold text-gray-700 mb-3 md:mb-4">{item.step}</p>
                <p className="text-gray-300 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Pricing */}
      <section className="py-16 md:py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Pricing
          </h2>
          <p className="text-gray-400 mb-10 md:mb-16">Simple hourly rates. No hidden costs.</p>

          <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 mb-8 md:mb-10">
            <div className="border border-white/20 p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">Online</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Via video call</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£40</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
            <div className="border border-white p-6 md:p-10 rounded-2xl">
              <h3 className="text-xl md:text-2xl font-bold mb-2">In-Studio</h3>
              <p className="text-gray-400 text-sm md:text-base mb-4 md:mb-6">Manchester</p>
              <p className="text-4xl md:text-5xl font-bold mb-1">£45</p>
              <p className="text-gray-400 text-sm">per hour</p>
            </div>
          </div>

          <p className="text-gray-400 text-sm md:text-base mb-2">Packages available. Bulk session discounts on request.</p>
          <p className="text-gray-500 text-sm">First session is free. A 20-minute introductory call. No commitment.</p>
        </div>
      </section>

      {/* Booking */}
      <section id="booking" className="py-16 md:py-24 px-4 md:px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-10 md:mb-12">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 md:mb-6">
            Book Your Free Session
          </h2>
          <p className="text-lg md:text-xl text-gray-400">
            20 minutes. No pressure. We&apos;ll figure out if we&apos;re a good fit.
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
