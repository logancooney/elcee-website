import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Recording Studio Manchester | Professional Mixing & Mastering | Elcee the Alchemist',
  description: 'Professional recording, mixing & mastering in Manchester from £35/hr. Fast turnaround, artist-friendly service for rap, hip-hop & alternative music. Book online 24/7.',
  keywords: [
    'recording studio Manchester',
    'affordable recording studio Manchester',
    'rap recording studio Manchester',
    'music production Manchester',
    'mixing and mastering Manchester',
    'music studio Manchester city centre',
    'vocal recording Manchester',
    'hip hop studio Manchester',
    'independent recording studio Manchester',
    'affordable music producer Manchester'
  ],
  openGraph: {
    title: 'Professional Recording Studio in Manchester',
    description: 'Get pro studio quality without the pro studio price. Recording, mixing & mastering from £35/hr.',
    url: 'https://elceethealchemist.com/studio',
    siteName: 'Elcee the Alchemist',
    images: [
      {
        url: 'https://elceethealchemist.com/studio-og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elcee the Alchemist Recording Studio Manchester',
      },
    ],
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Recording Studio Manchester | Elcee the Alchemist',
    description: 'Professional recording, mixing & mastering from £35/hr',
    images: ['https://elceethealchemist.com/studio-og-image.jpg'],
  },
  alternates: {
    canonical: 'https://elceethealchemist.com/studio',
  },
};

export default function StudioLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
