export default function StructuredData() {
  const recordingStudioSchema = {
    "@context": "https://schema.org",
    "@type": "RecordingStudio",
    "name": "Elcee the Alchemist Studio",
    "url": "https://elceethealchemist.com/studio",
    "description": "Professional recording, mixing, and mastering services in Manchester. Affordable rates for independent artists.",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Manchester",
      "addressRegion": "Greater Manchester",
      "addressCountry": "UK"
    },
    "priceRange": "££",
    "openingHours": "Mo-Su 09:00-21:00",
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "53.4808",
      "longitude": "-2.2426"
    },
    "offers": [
      {
        "@type": "Offer",
        "name": "Hourly Recording Session",
        "price": "35",
        "priceCurrency": "GBP",
        "availability": "https://schema.org/InStock"
      },
      {
        "@type": "Offer",
        "name": "Full Mix & Master",
        "price": "340",
        "priceCurrency": "GBP"
      },
      {
        "@type": "Offer",
        "name": "Vocal Mix",
        "price": "190",
        "priceCurrency": "GBP"
      }
    ],
    "image": "https://elceethealchemist.com/studio-og-image.jpg",
    "sameAs": [
      "https://www.instagram.com/elceethealchemist",
      "https://soundcloud.com/elceethealchemist",
      "https://open.spotify.com/artist/5wlWDiJkEhfTVWjv6LYgXK"
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How much does studio time cost in Manchester?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Our hourly rate is £35 for ad-hoc sessions, or £30/hr with a loyalty subscription (£240/month). We also offer package deals: 3-song package for £920 and 5-song package for £1,450."
        }
      },
      {
        "@type": "Question",
        "name": "What services do you offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We provide recording, mixing, mastering, vocal tuning, music production, and Ableton tutoring. All services are available as standalone or packages. Full mix & master is £340, vocal mix is £190."
        }
      },
      {
        "@type": "Question",
        "name": "Where is the studio located?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "We're based in Manchester city centre, easily accessible from Salford, Stockport, Bolton, Oldham, and surrounding areas."
        }
      },
      {
        "@type": "Question",
        "name": "How quickly can I get my mix back?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Standard turnaround is 3-5 days. Same-day mixing is available for rush projects with a 40% surcharge."
        }
      },
      {
        "@type": "Question",
        "name": "Do you work with all music genres?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes! While we specialize in rap, hip-hop, and alternative music, we work with all genres including R&B, pop, rock, and more."
        }
      }
    ]
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(recordingStudioSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
    </>
  );
}
