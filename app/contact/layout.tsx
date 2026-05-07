import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact | Elcee the Alchemist',
  description: 'Get in touch for studio bookings, mixing, mastering, tutoring, or collaborations. Based in Manchester. Usually responds within 24 hours.',
  openGraph: {
    title: 'Contact | Elcee the Alchemist',
    description: 'Get in touch for studio bookings, collaborations, or general enquiries. Based in Manchester.',
    url: 'https://elceethealchemist.com/contact',
    siteName: 'Elcee the Alchemist',
    locale: 'en_GB',
    type: 'website',
  },
  alternates: {
    canonical: 'https://elceethealchemist.com/contact',
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
