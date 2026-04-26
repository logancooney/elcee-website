'use client';

interface CalendlyEmbedProps {
  url: string;
  height?: number;
}

/**
 * Direct-iframe Calendly embed. Avoids Calendly's widget.js, which auto-scans
 * the DOM only once at script load and does not reliably re-attach when
 * embeds mount/unmount via React (e.g. when the user picks a different
 * service on /booking). The iframe is the officially-supported alternative.
 */
export default function CalendlyEmbed({ url, height = 700 }: CalendlyEmbedProps) {
  // Append embed_type=Inline + embed_domain so Calendly knows it's embedded.
  // hide_gdpr_banner trims visual noise; hide_event_type_details keeps the
  // header tight so the embed feels native to the page.
  const sep = url.includes('?') ? '&' : '?';
  const embedUrl =
    `${url}${sep}embed_domain=${typeof window !== 'undefined' ? window.location.host : 'elceethealchemist.com'}` +
    `&embed_type=Inline` +
    `&hide_gdpr_banner=1`;

  return (
    <iframe
      title="Calendly booking"
      src={embedUrl}
      style={{
        width: '100%',
        maxWidth: 900,
        height: `${height}px`,
        border: 'none',
        display: 'block',
        margin: '0 auto',
        background: 'transparent',
      }}
      loading="lazy"
      allow="payment"
    />
  );
}
