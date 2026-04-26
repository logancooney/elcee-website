'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'Do I need any experience?',
    answer: "None. I've worked with people who've never opened a DAW before and people with years of experience who just felt stuck. Sessions start wherever you are.",
  },
  {
    question: 'What equipment do I need?',
    answer: "For online sessions you need a computer, headphones, and your DAW. For in-studio, just show up. Everything's here. No DAW yet? We'll sort that on the call.",
  },
  {
    question: 'Which DAW do you teach?',
    answer: "I teach production in Ableton Live. For mixing I can work with you in any DAW. Logic, FL Studio, Pro Tools, whatever you're on.",
  },
  {
    question: 'Can I learn online?',
    answer: '£45/hour via video call. You share your screen, I walk you through everything live. Works just as well as being here in person.',
  },
  {
    question: 'How long are sessions?',
    answer: 'Standard sessions are 1 hour. If you want longer, that can be arranged. Just mention it on your free session.',
  },
  {
    question: 'How do I pay?',
    answer: 'Payment is taken before each session. Bank transfer or card both accepted. Packages are available if you want to block book and save. Ask about this on your free session.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section style={{ padding: '80px 48px', background: '#080808', color: '#fafafa', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          FAQ
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 48 }}>
          Questions
        </h2>

        <div>
          {faqs.map((faq, index) => (
            <div key={index} style={{ borderTop: '1px solid #1a1a1a' }}>
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '24px 0',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#fafafa',
                  gap: 24,
                }}
              >
                <span style={{ fontWeight: 900, fontSize: 14, letterSpacing: '-0.01em', lineHeight: 1.4 }}>{faq.question}</span>
                <span style={{ fontSize: 20, flexShrink: 0, color: 'rgba(255,255,255,0.4)', transition: 'color 0.2s' }}>
                  {openIndex === index ? '−' : '+'}
                </span>
              </button>
              {openIndex === index && (
                <div style={{ paddingBottom: 24, fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)' }}>
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
          <div style={{ borderTop: '1px solid #1a1a1a' }} />
        </div>

        <div style={{ marginTop: 48, textAlign: 'center' }}>
          <p style={{ fontSize: 13, color: 'rgba(255,255,255,0.4)', marginBottom: 16 }}>
            Still have questions?
          </p>
          <Link
            href="/contact"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              padding: '13px 28px',
              fontWeight: 900,
              fontSize: 10,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              background: 'transparent',
              color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)',
              textDecoration: 'none',
            }}
          >
            Get in Touch →
          </Link>
        </div>
      </div>
    </section>
  );
}
