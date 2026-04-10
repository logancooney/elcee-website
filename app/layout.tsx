import type { Metadata } from "next";
import "./globals.css";
import ChatWidget from "./components/ChatWidget";
import StructuredDataPerson from "./components/StructuredDataPerson";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  title: "Elcee the Alchemist - Official Website | Manchester Rap Artist & Recording Studio",
  description: "Official website of Elcee the Alchemist - Independent alternative rap artist from Manchester. 50+ tracks released, worked with JBL, adidas, Boiler Room. Book studio sessions for recording, mixing, mastering, and production.",
  keywords: [
    "Elcee the Alchemist", 
    "Elcee the Alchemist official website",
    "Elcee rapper Manchester", 
    "alternative rap Manchester", 
    "Manchester recording studio", 
    "Elcee music",
    "Elcee the Alchemist studio",
    "independent rapper Manchester",
    "UK alternative rap"
  ],
  authors: [{ name: "Elcee the Alchemist" }],
  creator: "Elcee the Alchemist",
  publisher: "Elcee the Alchemist",
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
  verification: {
    google: "X66hpF7OJfSszJUNCc2bfsvTQqj0dZiW-RKwn0Rprp4",
  },
  metadataBase: new URL('https://elceethealchemist.com'),
  alternates: {
    canonical: 'https://elceethealchemist.com',
  },
  openGraph: {
    title: "Elcee the Alchemist - Official Website",
    description: "Independent alternative rap artist from Manchester. 50+ tracks released, worked with JBL, adidas, Boiler Room. Book studio sessions.",
    url: "https://elceethealchemist.com",
    siteName: "Elcee the Alchemist",
    locale: "en_GB",
    type: "website",
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Elcee the Alchemist - Manchester Rap Artist',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Elcee the Alchemist - Official Website",
    description: "Independent alternative rap artist from Manchester. Book studio sessions.",
    creator: "@elceejpg",
    site: "@elceejpg",
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <StructuredDataPerson />
      </head>
      <body className="antialiased">
        {children}
        <ChatWidget />
        <Analytics />
      </body>
    </html>
  );
}
