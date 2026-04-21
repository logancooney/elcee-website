// components/CalendlyEmbed.tsx
'use client';

import { useEffect } from 'react';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

const CALENDLY_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';

export default function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  useEffect(() => {
    if (document.querySelector(`script[src="${CALENDLY_SCRIPT}"]`)) return;
    const script = document.createElement('script');
    script.src = CALENDLY_SCRIPT;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="calendly-inline-widget rounded-lg overflow-hidden mx-auto"
      data-url={url}
      style={{ minWidth: '320px', height: `${height}px`, maxWidth: '900px' }}
    />
  );
}
