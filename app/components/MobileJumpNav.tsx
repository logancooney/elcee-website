'use client';

import { useEffect, useState } from 'react';

interface JumpItem {
  label: string;
  href: string;
}

const JUMP_ITEMS: JumpItem[] = [
  { label: 'Studio', href: '#studio' },
  { label: 'Music', href: '#releases' },
  { label: 'About', href: '#about' },
  { label: 'Book', href: '/booking' },
];

export default function MobileJumpNav() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="md:hidden"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 90,
        background: 'rgba(8,8,8,0.92)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(255,255,255,0.08)',
        padding: '10px 16px',
        display: 'flex',
        justifyContent: 'center',
        gap: 6,
        opacity: show ? 1 : 0,
        transform: show ? 'translateY(0)' : 'translateY(-100%)',
        pointerEvents: show ? 'auto' : 'none',
        transition: 'opacity 0.3s ease, transform 0.3s ease',
        overflowX: 'auto',
        WebkitOverflowScrolling: 'touch',
      }}
    >
      {JUMP_ITEMS.map(item => (
        <a
          key={item.href}
          href={item.href}
          style={{
            flexShrink: 0,
            padding: '8px 14px',
            fontSize: 10,
            fontWeight: 900,
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#fafafa',
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            borderRadius: 999,
            textDecoration: 'none',
          }}
        >
          {item.label}
        </a>
      ))}
    </div>
  );
}
