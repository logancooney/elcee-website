'use client';

import { useState } from 'react';
import Link from 'next/link';

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question: 'What equipment do you use?',
    answer: 'Professional-grade signal chain and industry-standard plugins. The room is acoustically treated for accurate recording and mixing.',
  },
  {
    question: "What's your turnaround time?",
    answer: 'Standard turnaround is 3–5 days for mixing. Rush delivery (24–48 hours) is available with a 40% surcharge for time-sensitive projects.',
  },
  {
    question: 'Do you work with all genres?',
    answer: 'Yes. While I specialise in rap, hip-hop, and alternative music, I work across all genres with the same professional standard.',
  },
  {
    question: 'How many revisions are included?',
    answer: 'Up to 3 revision rounds are included with mixing services. Additional revisions can be arranged if needed.',
  },
  {
    question: 'Can I attend mixing sessions?',
    answer: 'Sessions are typically completed independently for efficiency, but in-person mix sessions can be arranged if preferred.',
  },
  {
    question: 'What formats do you deliver?',
    answer: 'All industry-standard formats: WAV, MP3, stems, and any specific formats required for your distribution or label.',
  },
  {
    question: 'Do you offer production services?',
    answer: 'Yes. Custom production starts at £400 for fully bespoke beats. Additional production work on existing tracks starts at £150.',
  },
  {
    question: 'Where is the studio located?',
    answer: 'Cambridge Street, Manchester, M7 1UY — approximately 10 minutes from Manchester city centre. Easily accessible by public transport or car with nearby parking.',
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
                <span style={{ fontSize: 20, flexShrink: 0, color: 'rgba(255,255,255,0.4)' }}>
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
