import Image from "next/image";
import Link from "next/link";
import StructuredData from "./components/StructuredData";
import FAQ from "./components/FAQ";
import Testimonials from "./components/Testimonials";
import Services from "./components/Services";
import Pricing from "./components/Pricing";
import Process from "./components/Process";
import Navigation from "../components/Navigation";
import CalendlyEmbed from "../../components/CalendlyEmbed";
import {
  CALENDLY_EVENT_URLS,
  CALENDLY_PAYMENT_LINKS,
} from "../../lib/calendly-config";

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <StructuredData />
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Professional Recording Studio in Manchester
          </h1>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8 leading-relaxed">
            Artist-run studio delivering release-ready quality — recording, mixing, and mastering
            for artists who take their craft seriously.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <a
              href="#booking"
              className="bg-white text-black px-12 py-4 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
            >
              Book Studio Time
            </a>
            <a
              href="#services"
              className="border-2 border-white px-12 py-4 font-bold text-lg rounded-full hover:bg-white hover:text-black transition-all duration-300"
            >
              See Services & Pricing
            </a>
          </div>
        </div>
      </section>

      <Testimonials />

      <div id="services">
        <Services />
      </div>

      <Pricing />

      {/* CTA */}
      <section className="py-24 px-6 bg-black text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Work?</h2>
          <p className="text-xl text-gray-400 mb-10">
            Book studio time online 24/7. Check availability and secure your session.
          </p>
          <a
            href="#booking"
            className="inline-block bg-white text-black px-12 py-5 font-bold text-lg rounded-full hover:bg-gray-200 transition-all duration-300"
          >
            Book Your Session
          </a>
          <p className="text-gray-500 mt-6">Flexible scheduling · Fast turnaround · Professional results</p>
        </div>
      </section>

      {/* Facility */}
      <section className="py-24 px-6 bg-white text-black">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">Facility</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Professional recording environment in Manchester. Built by a working artist with 6+ years industry experience.
          </p>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <Image
              src="/studio/studio-interior-front.jpg"
              alt="Studio interior - front view with mixing desk and monitors"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
            <Image
              src="/studio/studio-interior-back.jpg"
              alt="Studio interior - back view with recording equipment"
              width={800}
              height={600}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
          <div className="mt-12 text-left max-w-2xl mx-auto">
            <h3 className="font-bold text-xl mb-3">Location</h3>
            <p className="text-gray-700 leading-relaxed">
              Cambridge Street, Manchester, M7 1UY<br />
              10 minutes from city centre · Accessible by tram, bus, car
            </p>
          </div>
        </div>
      </section>

      <Process />

      {/* In-Studio Booking */}
      <section id="booking" className="py-24 px-6 bg-black text-white">
        <div className="max-w-5xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Book a Studio Session</h2>
          <p className="text-xl text-gray-400">
            Pick your session length and pay to confirm. Not sure? Book a free call first.
          </p>
        </div>
        <CalendlyEmbed key={CALENDLY_EVENT_URLS.schedulingPage} url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
        <div className="text-center mt-8">
          <p className="text-gray-400">
            Questions?{' '}
            <Link href="/contact" className="underline hover:text-white transition-colors">
              Get in touch →
            </Link>
          </p>
        </div>
      </section>

      {/* Remote Services */}
      <section className="py-24 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">Mixing & Mastering</h2>
          <p className="text-xl text-gray-400">
            Remote services. Pay upfront and send your files. Turnaround within 5 working days.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {REMOTE_SERVICES.map((service) => (
            <a
              key={service.label}
              href={service.url}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-white/20 px-6 py-6 hover:border-white transition group"
            >
              <p className="font-semibold text-lg mb-1 group-hover:text-white transition">{service.label}</p>
              <p className="text-2xl font-bold mb-4">{service.price}</p>
              <p className="text-sm text-gray-400 group-hover:text-white transition">Pay & confirm →</p>
            </a>
          ))}
        </div>
        <p className="text-center text-gray-500 text-sm mt-8">
          Use code <span className="text-white font-semibold">WELCOME10</span> for 10% off your first order.
        </p>
      </section>

      <FAQ />

      <footer className="py-16 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <Image
            src="/logos/ankh-white.png"
            alt="Ankh"
            width={50}
            height={50}
            className="mx-auto mb-6"
          />
          <p className="text-sm text-gray-500">© 2026 Elcee the Alchemist. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
