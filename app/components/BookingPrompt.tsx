'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const SESSION_KEY = 'elcee_prompt_dismissed';

export default function BookingPrompt() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return;

    const timer = setTimeout(() => {
      const bookingSection = document.getElementById('booking');
      if (!bookingSection) return;
      const { top } = bookingSection.getBoundingClientRect();
      if (top > window.innerHeight) setVisible(true);
    }, 45000);

    return () => clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem(SESSION_KEY, 'true');
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-full max-w-sm px-4">
      <div className="bg-black border border-white/30 px-6 py-4 flex items-center justify-between gap-4 shadow-2xl">
        <p className="text-sm text-gray-300">
          Not sure yet?{' '}
          <Link
            href="/booking?service=free"
            className="text-white font-semibold underline hover:no-underline"
          >
            Book a free call
          </Link>
        </p>
        <button
          onClick={dismiss}
          className="text-gray-500 hover:text-white text-xl leading-none flex-shrink-0"
          aria-label="Dismiss"
        >
          ×
        </button>
      </div>
    </div>
  );
}
