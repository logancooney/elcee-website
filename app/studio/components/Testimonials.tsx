'use client';

import { useState } from 'react';
import { STUDIO_TESTIMONIALS, type Testimonial } from '../../../content/testimonials';

const testimonials: Testimonial[] = STUDIO_TESTIMONIALS;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808', borderTop: '1px solid rgba(0,0,0,0.08)' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
          Artists
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 48 }}>
          Trusted by Manchester Artists
        </h2>

        <div>
          <div style={{ padding: '48px', border: '1.5px solid rgba(0,0,0,0.15)', background: 'rgba(255,255,255,0.5)' }}>
            <p style={{ fontSize: 'clamp(16px, 2vw, 22px)', fontWeight: 900, lineHeight: 1.5, letterSpacing: '-0.01em', marginBottom: 32 }}>
              &ldquo;{testimonials[current].quote}&rdquo;
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
              <div>
                <p style={{ fontWeight: 900, fontSize: 14, letterSpacing: '-0.01em' }}>{testimonials[current].author}</p>
                <p style={{ fontSize: 12, color: 'rgba(0,0,0,0.45)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 4 }}>{testimonials[current].location}</p>
              </div>
              <div style={{ display: 'flex', gap: 10 }}>
                <button
                  onClick={() => setCurrent(current === 0 ? testimonials.length - 1 : current - 1)}
                  aria-label="Previous testimonial"
                  style={{
                    width: 44, height: 44,
                    border: '1.5px solid rgba(0,0,0,0.3)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#080808'; (e.currentTarget as HTMLButtonElement).style.color = '#fafafa'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrent(current === testimonials.length - 1 ? 0 : current + 1)}
                  aria-label="Next testimonial"
                  style={{
                    width: 44, height: 44,
                    border: '1.5px solid rgba(0,0,0,0.3)',
                    background: 'transparent',
                    cursor: 'pointer',
                    fontSize: 16,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = '#080808'; (e.currentTarget as HTMLButtonElement).style.color = '#fafafa'; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'transparent'; (e.currentTarget as HTMLButtonElement).style.color = '#080808'; }}
                >
                  →
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginTop: 20 }}>
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                aria-label={`Go to testimonial ${index + 1}`}
                style={{
                  height: 4,
                  width: current === index ? 28 : 8,
                  background: current === index ? '#080808' : 'rgba(0,0,0,0.2)',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                  transition: 'width 0.3s, background 0.3s',
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
