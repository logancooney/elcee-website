"use client";

import Image from "next/image";
import Link from "next/link";
import StudioGallery from "./components/StudioGallery";
import BookingFlow from "./components/BookingFlow";
import StructuredData from "./components/StructuredData";
import FAQ from "./components/FAQ";

export default function StudioPage() {
  const services = [
    { name: "Recording & Engineering", price: "£35/hr (ad-hoc) | £30/hr (subscription)" },
    { name: "Full Mix & Master", price: "£340" },
    { name: "Vocal Mix", price: "£190" },
    { name: "Mastering", price: "£40" },
    { name: "Music Production", price: "£400+ (bespoke)" },
    { name: "Ableton Tutoring", price: "£35/hr" }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      <StructuredData />
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/90 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={120} 
              height={40}
              className="h-10 w-auto"
            />
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition">Home</Link>
            <Link href="/studio" className="hover:text-gray-400 transition">Studio</Link>
            <Link href="/shop" className="hover:text-gray-400 transition">Shop</Link>
            <Link href="/contact" className="hover:text-gray-400 transition">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            RECORDING STUDIO MANCHESTER
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Professional recording, mixing, mastering, and production in Manchester. 
            Affordable rates for independent artists. Six years transforming visions into reality.
          </p>
        </div>
      </section>

      {/* Services */}
      <section className="py-12 px-6 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center">
            Professional Studio Services in Manchester
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service) => (
              <div key={service.name} className="border border-black p-6">
                <h3 className="text-2xl font-bold mb-2">{service.name}</h3>
                <p className="text-gray-600">{service.price}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-12 p-8 bg-black text-white">
            <h3 className="text-2xl font-bold mb-4">Add-ons & Packages</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <p className="font-semibold">Vocal Tuning: £40</p>
              </div>
              <div>
                <p className="font-semibold">Stem Separation: £75</p>
              </div>
              <div>
                <p className="font-semibold">Rush Service: +40%</p>
              </div>
            </div>
            <div className="mt-6 pt-6 border-t border-white/10">
              <p className="font-semibold mb-2">Bulk Packages:</p>
              <p className="text-gray-400">3-Track Package: £920 | 5-Track Package: £1,450</p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio Gallery */}
      <StudioGallery />

      {/* FAQ Section */}
      <FAQ />

      {/* Booking Form */}
      <section className="py-20 px-6 bg-black text-white">
        <BookingFlow />
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-gray-400">© 2026 Elcee the Alchemist. All rights reserved.</p>
          <Image 
            src="/logos/ankh.png" 
            alt="Ankh" 
            width={30} 
            height={30}
            className="opacity-50"
          />
        </div>
      </footer>
    </div>
  );
}
