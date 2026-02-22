"use client";

import Image from "next/image";
import Link from "next/link";
import BookingFlow from "./components/BookingFlow";
import StructuredData from "./components/StructuredData";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Process from "./components/Process";

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <StructuredData />
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/95 backdrop-blur-sm z-50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-5 flex justify-between items-center">
          <Link href="/">
            <Image 
              src="/logos/eta-logo-white.png" 
              alt="Elcee the Alchemist" 
              width={180} 
              height={60}
              className="h-12 w-auto"
            />
          </Link>
          <div className="flex gap-8 text-sm font-medium">
            <Link href="/" className="hover:text-gray-400 transition-colors duration-300">Home</Link>
            <Link href="/studio" className="hover:text-gray-400 transition-colors duration-300">Studio</Link>
            <Link href="/shop" className="hover:text-gray-400 transition-colors duration-300">Shop</Link>
            <Link href="/contact" className="hover:text-gray-400 transition-colors duration-300">Contact</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-tight">
            Professional Recording Studio in Manchester
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
            Artist-run studio delivering release-ready quality. Recording, mixing, and mastering 
            for artists who take their craft seriously.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a 
              href="#booking" 
              className="bg-white text-black px-10 py-4 font-semibold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Book a Session
            </a>
            <a 
              href="#services" 
              className="border-2 border-white px-10 py-4 font-semibold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <Testimonials />

      {/* Services */}
      <div id="services">
        <Services />
      </div>

      {/* Pricing */}
      <Pricing />

      {/* Primary Booking CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Ready to Work?
          </h2>
          <p className="text-xl text-gray-400 mb-10">
            Book studio time online 24/7. Check availability and secure your session.
          </p>
          <a 
            href="#booking" 
            className="inline-block bg-white text-black px-12 py-5 font-semibold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            View Calendar & Book
          </a>
          <p className="text-gray-500 mt-6">
            Flexible scheduling • Fast turnaround • Professional results
          </p>
        </div>
      </section>

      {/* The Studio (Gallery - temporarily hidden) */}
      {/* Will add real studio photos next week */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Facility
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Professional recording environment in Manchester. Built by a working artist with 6+ years industry experience.
          </p>
          <div className="bg-gray-100 rounded-2xl p-16 border-2 border-dashed border-gray-300">
            <p className="text-gray-500 text-lg">
              Studio photos coming soon
            </p>
          </div>
          <div className="mt-12 text-left max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-3">Location</h3>
            <p className="text-gray-700 leading-relaxed">
              Cambridge Street, Manchester, M7 1UY<br />
              10 minutes from city centre • Accessible by tram, bus, car
            </p>
          </div>
        </div>
      </section>

      {/* Process */}
      <Process />

      {/* FAQ */}
      <FAQ />

      {/* Booking Form */}
      <section id="booking" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Start Your Project
          </h2>
          <p className="text-xl text-gray-400">
            Professional recording, mixing, and mastering in Manchester.
          </p>
        </div>
        <BookingFlow />
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Questions? <Link href="/contact" className="underline hover:text-white transition-colors">Get in touch →</Link>
          </p>
        </div>
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
