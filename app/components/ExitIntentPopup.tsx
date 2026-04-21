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
      const timer = setTimeout(() => setVisible(true), 3000);
      return () => clearTimeout(timer);
    }

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
      className="fixed inset-0 z-50 flex items-center justify-center px-6"
      onClick={dismiss}
    >
      <div className="absolute inset-0 bg-black/80" />
      <div
        className="relative bg-black border border-white/20 p-8 max-w-md w-full text-center"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl leading-none"
          aria-label="Close"
        >
          ×
        </button>
        <h2 className="text-2xl font-bold mb-3">Before you go</h2>
        <p className="text-gray-400 mb-6">
          10% off your first booking — studio, mixing, mastering, or tutoring.
        </p>
        <div className="bg-white/5 border border-white/20 px-6 py-4 mb-6">
          <p className="text-xs text-gray-500 mb-1 uppercase tracking-widest">Your discount code</p>
          <p className="text-2xl font-bold tracking-widest">WELCOME10</p>
        </div>
        <Link
          href="/booking"
          onClick={dismiss}
          className="block w-full bg-white text-black py-3 font-bold hover:bg-gray-200 transition"
        >
          Book now
        </Link>
        <button
          onClick={dismiss}
          className="mt-4 text-sm text-gray-500 hover:text-white transition"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
