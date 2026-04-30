'use client';

import { useState, useEffect } from 'react';

interface StickyCallBarProps {
  url: string;
  label?: string;
}

export default function StickyCallBar({ url, label = 'Book Free Call →' }: StickyCallBarProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="sticky-call-bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#fafafa',
        color: '#080808',
        textAlign: 'center',
        padding: '16px 24px',
        fontWeight: 900,
        fontSize: 13,
        letterSpacing: '0.05em',
        textTransform: 'uppercase',
        textDecoration: 'none',
        zIndex: 50,
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.3s ease',
      }}
    >
      {label}
    </a>
  );
}
