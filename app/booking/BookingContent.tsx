'use client';

import { motion } from 'framer-motion';
import Navigation from '../components/Navigation';
import SiteFooter from '../components/SiteFooter';
import ServiceBookingBlock from '../components/ServiceBookingBlock';
import StickyCallBar from '../components/StickyCallBar';
import { CALENDLY_EVENT_URLS, CALENDLY_PAYMENT_LINKS, CALENDLY_BUNDLE_LINKS } from '../../lib/calendly-config';

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 } as { opacity: number; y: number },
  transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
  viewport: { once: true, margin: '-80px' },
};

export default function BookingContent() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', overflowX: 'hidden' }}>
      <Navigation />

      {/* ── PAGE HEADER ── */}
      <section style={{
        padding: '80px clamp(20px, 5vw, 48px) 40px',
        borderBottom: '1px solid #1a1a1a',
      } as React.CSSProperties}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Book
        </div>
        <h1 style={{
          fontWeight: 900,
          fontSize: 'clamp(40px, 7vw, 96px)',
          lineHeight: 0.88,
          letterSpacing: '-0.03em',
          textTransform: 'uppercase',
          color: '#fafafa',
          marginBottom: 12,
        }}>
          Book a Session.
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.4)', letterSpacing: '-0.01em' }}>
          Pick a service &amp; choose a time.
        </p>
      </section>

      {/* ── TUTORING BLOCK ── */}
      <motion.section {...fadeUp} style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            01 — Tutoring
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            1-1 Music Lessons
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeTutoringConsultation}
          freeCallLabel="Book a Free Tutoring Consultation →"
          freeCallSublabel="20 minutes. Tell me where you're at and where you want to go."
          options={[
            {
              label: 'Online',
              price: '£45/hr',
              url: CALENDLY_EVENT_URLS.tutoringOnline,
            },
            {
              label: 'In-Person',
              price: '£60/hr',
              url: CALENDLY_EVENT_URLS.tutoringInPerson,
            },
            {
              label: 'Session packs — save up to £120',
              url: CALENDLY_BUNDLE_LINKS.online10,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── STUDIO RECORDING BLOCK ── */}
      <motion.section {...fadeUp} style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            02 — Studio
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Studio Recording
          </h2>
        </div>
        <ServiceBookingBlock
          freeCallUrl={CALENDLY_EVENT_URLS.freeStudioEnquiry}
          freeCallLabel="Book a Free Studio Enquiry →"
          freeCallSublabel="20 minutes. Tell me about your project and we'll work out the best plan."
          options={[
            {
              label: 'Book Studio Time',
              price: '£35/hr',
              url: CALENDLY_EVENT_URLS.studio1hr,
              sublabel: 'Pick duration on Calendly',
            },
            {
              label: 'Mix / Master',
              sublabel: 'See prices below ↓',
              url: '#mix-master',
            },
            {
              label: 'Multi-track packs — save up to £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      {/* ── MIXING & MASTERING BLOCK ── */}
      <motion.section {...fadeUp} id="mix-master" style={{ borderBottom: '1px solid #1a1a1a' }}>
        <div style={{
          padding: 'clamp(24px, 5vw, 48px) clamp(20px, 5vw, 48px)',
          paddingBottom: 0,
          borderBottom: '1px solid #1a1a1a',
        }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 10 }}>
            03 — Remote
          </div>
          <h2 style={{
            fontWeight: 900,
            fontSize: 'clamp(24px, 3.5vw, 48px)',
            letterSpacing: '-0.03em',
            textTransform: 'uppercase',
            lineHeight: 0.9,
            paddingBottom: 'clamp(20px, 5vw, 48px)' as unknown as number,
          }}>
            Mixing &amp; Mastering
          </h2>
        </div>
        <ServiceBookingBlock
          options={[
            {
              label: 'Full Mix + Master',
              price: '£340',
              url: CALENDLY_PAYMENT_LINKS.fullMixMaster,
            },
            {
              label: 'Vocal Mix',
              price: '£190',
              url: CALENDLY_PAYMENT_LINKS.vocalMix,
            },
            {
              label: 'Mastering',
              price: '£40',
              url: CALENDLY_PAYMENT_LINKS.mastering,
            },
            {
              label: '3-Track Package',
              price: '£920',
              sublabel: 'Save £100',
              url: CALENDLY_PAYMENT_LINKS.multitrack3,
              isPacks: true,
            },
            {
              label: '5-Track Package',
              price: '£1,450',
              sublabel: 'Save £250',
              url: CALENDLY_PAYMENT_LINKS.multitrack5,
              isPacks: true,
            },
          ]}
        />
      </motion.section>

      <SiteFooter />

      <StickyCallBar
        url={CALENDLY_EVENT_URLS.freeIntroCall}
        label="Book a Free Call →"
      />
    </div>
  );
}
