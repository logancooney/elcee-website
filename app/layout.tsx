import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Elcee the Alchemist | Alternative Rap Artist from Manchester",
  description: "Independent alternative rap artist from Manchester. Six years in the game. Raw lyricism, alchemical soundscapes. Book studio sessions for recording, mixing, mastering, and production.",
  keywords: ["Elcee the Alchemist", "alternative rap", "Manchester artist", "independent rapper", "recording studio Manchester", "music producer"],
  authors: [{ name: "Elcee the Alchemist" }],
  openGraph: {
    title: "Elcee the Alchemist",
    description: "Alternative rap artist from Manchester. Independent. Raw. Alchemical.",
    url: "https://elceethealchemist.com",
    siteName: "Elcee the Alchemist",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elcee the Alchemist",
    description: "Alternative rap artist from Manchester",
    creator: "@elceethealchemist",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}
