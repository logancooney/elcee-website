export default function StructuredDataPerson() {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": ["Person", "MusicGroup"],
    "@id": "https://elceethealchemist.com/#person",
    "name": "Elcee the Alchemist",
    "alternateName": ["Elcee", "Logan Cooney"],
    "url": "https://elceethealchemist.com",
    "image": "https://elceethealchemist.com/icon.png",
    "description": "Independent alternative rap artist from Manchester, England. 6 years of experience, 50+ tracks released, worked with JBL, adidas, and Boiler Room.",
    "genre": ["Alternative Hip Hop", "Rap", "UK Hip Hop", "Alternative Rap"],
    "birthPlace": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Manchester",
        "addressCountry": "GB"
      }
    },
    "homeLocation": {
      "@type": "Place",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Manchester",
        "addressRegion": "England",
        "addressCountry": "GB"
      }
    },
    "jobTitle": ["Musician", "Recording Artist", "Music Producer", "Audio Engineer"],
    "knowsAbout": ["Music Production", "Rap", "Hip Hop", "Audio Engineering", "Mixing", "Mastering", "Ableton Live"],
    "sameAs": [
      "https://www.instagram.com/elceethealchemist",
      "https://www.tiktok.com/@elceethealchemist",
      "https://www.youtube.com/@elceethealchemist",
      "https://twitter.com/elceejpg",
      "https://www.facebook.com/elceethealchemist",
      "https://open.spotify.com/artist/YOUR_SPOTIFY_ID",
      "https://music.apple.com/artist/YOUR_APPLE_MUSIC_ID",
      "https://soundcloud.com/elceethealchemist"
    ],
    "owns": {
      "@type": "LocalBusiness",
      "@id": "https://elceethealchemist.com/studio#business",
      "name": "The Alchemist Studio",
      "url": "https://elceethealchemist.com/studio",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Manchester",
        "addressRegion": "England",
        "postalCode": "M7 1UY",
        "addressCountry": "GB"
      },
      "geo": {
        "@type": "GeoCoordinates",
        "latitude": "53.4808",
        "longitude": "-2.2426"
      },
      "priceRange": "££",
      "telephone": "+44-PHONE-NUMBER",
      "email": "studio@elceethealchemist.com"
    },
    "brand": {
      "@type": "Brand",
      "name": "Elcee the Alchemist"
    },
    "awards": [
      "JBL Martin Garrix Music Academy Winner"
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "50+ tracks released",
        "description": "Music releases across Spotify, Apple Music, and other platforms"
      }
    ],
    "performerIn": [
      {
        "@type": "Event",
        "name": "Boiler Room performance",
        "description": "Performance for Boiler Room with 100K+ views"
      }
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
    />
  );
}
