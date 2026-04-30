'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SESSION_KEY = 'elcee_popup_dismissed';
const VISITOR_KEY = 'elcee_visited';

export default function ExitIntentPopup() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const isReturning = localStorage.getItem(VISITOR_KEY) === 'true';
    localStorage.setItem(VISITOR_KEY, 'true');

    if (isReturning) {
      // Returning visitor: show after 20 seconds
      const timer = setTimeout(() => setVisible(true), 20000);
      return () => clearTimeout(timer);
    }

    // First visit: show on exit intent (mouse leaves top of viewport)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        setVisible(true);
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 999,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px',
        background: 'rgba(0,0,0,0.85)',
      }}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative',
          background: '#111111',
          border: '1px solid rgba(255,255,255,0.15)',
          padding: '48px 40px 40px',
          maxWidth: 420,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <button
          onClick={dismiss}
          aria-label="Close"
          style={{
            position: 'absolute',
            top: 16,
            right: 20,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 22,
            lineHeight: 1,
            color: 'rgba(255,255,255,0.4)',
          }}
        >
          ×
        </button>

        <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 14 }}>
          Before you go
        </p>
        <h2 style={{ fontWeight: 900, fontSize: 28, letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, color: '#fafafa', marginBottom: 12 }}>
          10% Off Your<br />First Booking
        </h2>
        <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
          Works on studio time, mixing, mastering, or tutoring.
        </p>

        <div style={{
          background: '#0a0a0a',
          border: '1px solid rgba(255,255,255,0.1)',
          padding: '16px 24px',
          marginBottom: 24,
        }}>
          <p style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 8 }}>
            Your discount code
          </p>
          <p style={{ fontWeight: 900, fontSize: 26, letterSpacing: '0.15em', color: '#fafafa' }}>
            WELCOME10
          </p>
        </div>

        <Link
          href="/booking"
          onClick={dismiss}
          style={{
            display: 'block',
            width: '100%',
            padding: '14px 24px',
            background: '#fafafa',
            color: '#080808',
            textDecoration: 'none',
            fontWeight: 900,
            fontSize: 11,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            marginBottom: 14,
          }}
        >
          Book Now →
        </Link>
        <button
          onClick={dismiss}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: 12,
            color: 'rgba(255,255,255,0.3)',
          }}
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
