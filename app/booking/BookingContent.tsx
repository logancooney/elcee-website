'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import CalendlyEmbed from '../../components/CalendlyEmbed';
import {
  CALENDLY_EVENT_URLS,
  CALENDLY_PAYMENT_LINKS,
  CALENDLY_BUNDLE_LINKS,
} from '../../lib/calendly-config';

type Service = 'studio' | 'tutoring' | 'free' | 'mixing' | null;

const SERVICE_LABELS: Record<NonNullable<Service>, string> = {
  studio: 'Studio Sessions',
  tutoring: 'Tutoring',
  free: 'Free Call',
  mixing: 'Mixing & Mastering',
};

const REMOTE_SERVICES = [
  { label: 'Full Mix + Master', price: '£340', url: CALENDLY_PAYMENT_LINKS.fullMixMaster },
  { label: 'Vocal Mix', price: '£190', url: CALENDLY_PAYMENT_LINKS.vocalMix },
  { label: 'Mastering', price: '£40', url: CALENDLY_PAYMENT_LINKS.mastering },
  { label: 'Multi-track — 3 Tracks', price: '£920', url: CALENDLY_PAYMENT_LINKS.multitrack3 },
  { label: 'Multi-track — 5 Tracks', price: '£1,450', url: CALENDLY_PAYMENT_LINKS.multitrack5 },
];

const ONLINE_BUNDLES = [
  { label: '5 Sessions', price: '£225', saving: 'Save £25', url: CALENDLY_BUNDLE_LINKS.online5 },
  { label: '8 Sessions', price: '£390', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.online8 },
  { label: '10 Sessions', price: '£400', saving: 'Save £100', url: CALENDLY_BUNDLE_LINKS.online10 },
];

const INPERSON_BUNDLES = [
  { label: '5 Sessions', price: '£270', saving: 'Save £30', url: CALENDLY_BUNDLE_LINKS.inPerson5 },
  { label: '8 Sessions', price: '£470', saving: 'Save £10', url: CALENDLY_BUNDLE_LINKS.inPerson8 },
  { label: '10 Sessions', price: '£480', saving: 'Save £120', url: CALENDLY_BUNDLE_LINKS.inPerson10 },
];

export default function BookingContent() {
  const searchParams = useSearchParams();
  const serviceParam = searchParams.get('service') as Service;
  const service: Service = ['studio', 'tutoring', 'free', 'mixing'].includes(serviceParam ?? '')
    ? serviceParam
    : null;

  return (
    <section className="pt-32 pb-24 px-6">
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            {service ? SERVICE_LABELS[service] : 'Book a Session'}
          </h1>
          <p className="text-xl text-gray-400">
            {service
              ? 'Use code WELCOME10 for 10% off your first booking.'
              : 'Choose a service below to get started.'}
          </p>
        </div>

        {/* Service selector — shown when no param */}
        {!service && (
          <div className="grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto mb-16">
            {[
              { label: 'Studio Sessions', href: '/booking?service=studio', desc: 'Recording — £35/hr' },
              { label: 'Tutoring', href: '/booking?service=tutoring', desc: 'Online £50/hr · In-person £60/hr' },
              { label: 'Mixing & Mastering', href: '/booking?service=mixing', desc: 'Remote services from £40' },
              { label: 'Free Call', href: '/booking?service=free', desc: '15 minutes, no commitment' },
            ].map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className="border border-white/20 px-6 py-8 hover:border-white transition text-center"
              >
                <p className="font-bold text-xl mb-2">{item.label}</p>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </Link>
            ))}
          </div>
        )}

        {service === 'studio' && (
          <CalendlyEmbed key={CALENDLY_EVENT_URLS.schedulingPage} url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
        )}

        {service === 'tutoring' && (
          <>
            <CalendlyEmbed key={CALENDLY_EVENT_URLS.schedulingPage} url={CALENDLY_EVENT_URLS.schedulingPage} height={700} />
            <div className="mt-16">
              <h2 className="text-2xl font-bold mb-6 text-center">Bulk Session Packages</h2>
              <div className="mb-8">
                <h3 className="text-base font-semibold text-gray-300 mb-4">Online</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {ONLINE_BUNDLES.map((pkg) => (
                    <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer"
                      className="border border-white/20 px-6 py-6 hover:border-white transition">
                      <p className="font-semibold mb-1">{pkg.label}</p>
                      <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                      <p className="text-sm text-gray-400">{pkg.saving}</p>
                    </a>
                  ))}
                </div>
              </div>
              <div>
                <h3 className="text-base font-semibold text-gray-300 mb-4">In-Person</h3>
                <div className="grid sm:grid-cols-3 gap-4">
                  {INPERSON_BUNDLES.map((pkg) => (
                    <a key={pkg.label} href={pkg.url} target="_blank" rel="noopener noreferrer"
                      className="border border-white/20 px-6 py-6 hover:border-white transition">
                      <p className="font-semibold mb-1">{pkg.label}</p>
                      <p className="text-3xl font-bold mb-2">{pkg.price}</p>
                      <p className="text-sm text-gray-400">{pkg.saving}</p>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </>
        )}

        {service === 'free' && (
          <CalendlyEmbed key={CALENDLY_EVENT_URLS.free} url={CALENDLY_EVENT_URLS.free} height={700} />
        )}

        {service === 'mixing' && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {REMOTE_SERVICES.map((s) => (
              <a key={s.label} href={s.url} target="_blank" rel="noopener noreferrer"
                className="border border-white/20 px-6 py-6 hover:border-white transition">
                <p className="font-semibold text-lg mb-1">{s.label}</p>
                <p className="text-2xl font-bold mb-4">{s.price}</p>
                <p className="text-sm text-gray-400">Pay & confirm →</p>
              </a>
            ))}
          </div>
        )}

        {service && service !== 'free' && (
          <div className="text-center mt-16 pt-12 border-t border-white/10">
            <p className="text-gray-400 mb-4">Not sure yet?</p>
            <Link
              href="/booking?service=free"
              className="inline-block border border-white/30 px-8 py-3 hover:border-white hover:bg-white hover:text-black transition font-semibold"
            >
              Book a free 15-minute call first
            </Link>
          </div>
        )}

      </div>
    </section>
  );
}
