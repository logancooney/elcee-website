import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Merch | Elcee the Alchemist',
  description: 'Official merch from Elcee the Alchemist. T-shirts, hoodies, and more.',
  openGraph: {
    title: 'Merch | Elcee the Alchemist',
    description: 'Official merch from Elcee the Alchemist.',
    url: 'https://elceethealchemist.com/shop',
    siteName: 'Elcee the Alchemist',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://elceethealchemist.com/shop',
  },
};

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return children;
}
