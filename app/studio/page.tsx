'use client';

import { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import StructuredData from "./components/StructuredData";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Navigation from "../components/Navigation";
import SiteFooter from "../components/SiteFooter";
import BookingPrompt from "../components/BookingPrompt";
import CalendlyEmbed from "../../components/CalendlyEmbed";
import { CALENDLY_PAYMENT_LINKS } from "../../lib/calendly-config";
import { BOOK_SERVICES } from "../../lib/book-services";

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

const studioService = BOOK_SERVICES.find(s => s.id === 'studio')!;

export default function StudioPage() {
  const [studioMode, setStudioMode] = useState<string | null>(null);
  const studioModeUrl = studioMode ? studioService.modes?.find(m => m.id === studioMode)?.calendlyUrl ?? null : null;

  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <StructuredData />
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            01 — Studio
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(40px, 6vw, 96px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 24 }}>
            The Alchemist<br />Studio
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 520, marginBottom: 36 }}>
            Artist-run studio delivering release-ready quality — recording, mixing, and mastering for artists who take their craft seriously.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <a href="#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', border: 'none', textDecoration: 'none', cursor: 'pointer',
            }}>
              Book Studio Time
            </a>
            <a href="#services" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none', cursor: 'pointer',
            }}>
              See Services &amp; Pricing
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <motion.div {...fadeUp}>
        <Testimonials />
      </motion.div>

      {/* Services */}
      <motion.div {...fadeUp} id="services">
        <Services />
      </motion.div>

      {/* Pricing — light section */}
      <motion.div {...fadeUp} style={{ background: '#f0ede8', color: '#080808', position: 'relative' }}>
        <Pricing />
      </motion.div>

      {/* CTA */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Ready to Work?
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(32px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
            Book Your Session
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', marginBottom: 32 }}>
            Book online 24/7. Check availability and secure your session.
          </p>
          <a href="#booking" style={{
            display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
            fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
            background: '#fafafa', color: '#080808', border: 'none', textDecoration: 'none',
          }}>
            Book Now
          </a>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 20, letterSpacing: '0.1em' }}>
            Flexible scheduling · Fast turnaround · Professional results
          </p>
        </div>
      </motion.section>

      {/* Facility */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            02 — Facility
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
            The Space
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.5)', maxWidth: 480, marginBottom: 48 }}>
            Professional recording environment in Manchester. Built by a working artist with 6+ years industry experience.
          </p>
          <div className="grid-two-col" style={{ gap: 2 }}>
            <Image
              src="/studio/studio-interior-front.jpg"
              alt="Studio interior — front"
              width={800} height={600}
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(20%)' }}
            />
            <Image
              src="/studio/studio-interior-back.jpg"
              alt="Studio interior — back"
              width={800} height={600}
              style={{ width: '100%', height: 'auto', display: 'block', filter: 'grayscale(20%)' }}
            />
          </div>
          <div style={{ marginTop: 40 }}>
            <p style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 8 }}>Location</p>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.6)' }}>
              Cambridge Street, Manchester, M7 1UY<br />
              10 minutes from city centre · Accessible by tram, bus, car
            </p>
          </div>
        </div>
      </motion.section>

      {/* Process */}
      <motion.div {...fadeUp}>
        <Process />
      </motion.div>

      {/* In-Studio Booking */}
      <motion.section {...fadeUp} id="booking" style={{ padding: '80px 48px', background: '#080808', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 40 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              03 — Book
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 16 }}>
              Book a Session
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.45)', marginBottom: 36 }}>
              Pick your session length and book online.{' '}
              Not sure? <Link href="/free" style={{ color: '#fafafa', textDecoration: 'underline' }}>Book a free call first.</Link>
            </p>
            {!studioMode && (
              <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
                {studioService.modes?.map(m => (
                  <button
                    key={m.id}
                    onClick={() => setStudioMode(m.id)}
                    style={{
                      appearance: 'none',
                      cursor: 'pointer',
                      padding: '14px 28px',
                      fontWeight: 900,
                      fontSize: 11,
                      letterSpacing: '0.18em',
                      textTransform: 'uppercase',
                      background: 'transparent',
                      color: '#fafafa',
                      border: '1.5px solid rgba(255,255,255,0.4)',
                      transition: 'background 0.2s, color 0.2s',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = '#fafafa';
                      (e.currentTarget as HTMLButtonElement).style.color = '#080808';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
                      (e.currentTarget as HTMLButtonElement).style.color = '#fafafa';
                    }}
                  >
                    {m.label} — {m.price} →
                  </button>
                ))}
              </div>
            )}
          </div>
          {studioMode && studioModeUrl && (
            <>
              <div style={{ textAlign: 'center', marginBottom: 24 }}>
                <button
                  onClick={() => setStudioMode(null)}
                  style={{
                    appearance: 'none',
                    cursor: 'pointer',
                    background: 'transparent',
                    border: 'none',
                    fontSize: 9,
                    letterSpacing: '0.2em',
                    textTransform: 'uppercase',
                    color: 'rgba(255,255,255,0.5)',
                  }}
                >
                  ← Switch length
                </button>
              </div>
              <CalendlyEmbed key={studioMode} url={studioModeUrl} height={700} />
            </>
          )}
        </div>
      </motion.section>

      {/* Remote Services */}
      <motion.section {...fadeUp} style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ marginBottom: 48 }}>
            <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
              04 — Remote
            </div>
            <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 16 }}>
              Mixing &amp; Mastering
            </h2>
            <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 480 }}>
              Remote services. Pay upfront and send your files. Turnaround within 5 working days.
            </p>
          </div>
          <div className="grid-two-col" style={{ gap: 1 }}>
            {REMOTE_SERVICES.map((service) => (
              <a
                key={service.label}
                href={service.url}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block', padding: '32px 40px',
                  border: '1px solid #1a1a1a', textDecoration: 'none',
                  color: '#fafafa', transition: 'border-color 0.2s, background 0.2s',
                  background: '#111111',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.3)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = '#1a1a1a'; }}
              >
                <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>Service</p>
                <p style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 8 }}>{service.label}</p>
                <p style={{ fontWeight: 900, fontSize: 28, letterSpacing: '-0.02em', marginBottom: 16 }}>{service.price}</p>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>Pay &amp; confirm →</p>
              </a>
            ))}
          </div>
          <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.25)', marginTop: 24, letterSpacing: '0.1em' }}>
            Use code <span style={{ color: '#fafafa', fontWeight: 900 }}>WELCOME10</span> for 10% off your first order.
          </p>
        </div>
      </motion.section>

      <BookingPrompt />

      <motion.div {...fadeUp}>
        <FAQ />
      </motion.div>

      <SiteFooter />
    </div>
  );
}
