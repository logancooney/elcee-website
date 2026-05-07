import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Links | Elcee the Alchemist',
  description: 'Music, videos, merch, and studio bookings — all in one place. Elcee the Alchemist, Manchester.',
  openGraph: {
    title: 'Links | Elcee the Alchemist',
    description: 'Music, videos, merch, and studio bookings — all in one place.',
    url: 'https://elceethealchemist.com/links',
    siteName: 'Elcee the Alchemist',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://elceethealchemist.com/links',
  },
};

export default function LinksLayout({ children }: { children: React.ReactNode }) {
  return children;
}
