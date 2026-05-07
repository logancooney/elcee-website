import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Free 20-Minute Call | Elcee the Alchemist',
  description: 'Book a free 20-minute intro call. Tell me what you\'re working on — studio time, mixing, mastering, or tutoring — and I\'ll tell you exactly how I can help.',
  openGraph: {
    title: 'Free 20-Minute Call | Elcee the Alchemist',
    description: 'Book a free 20-minute intro call. No commitment. Studio, mixing, mastering, or tutoring — find out how I can help.',
    url: 'https://elceethealchemist.com/free',
    siteName: 'Elcee the Alchemist',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://elceethealchemist.com/free',
  },
};

export default function FreeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
