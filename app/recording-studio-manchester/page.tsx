import Link from "next/link";
import Navigation from "../components/Navigation";
import SiteFooter from "../components/SiteFooter";
import { PRICES } from "../../content/prices";
import { STUDIO_TESTIMONIALS } from "../../content/testimonials";

export const metadata = {
  title: "Recording Studio Manchester | Professional Mixing & Mastering | Elcee the Alchemist",
  description: "Professional recording studio in Manchester offering expert mixing, mastering, production, and Ableton tutoring. Competitive rates from £30/hr. Book your session today.",
  keywords: "recording studio manchester, mixing and mastering manchester, music production manchester, ableton tutor manchester, affordable recording studio, rap recording studio manchester, independent artist recording",
};

const SERVICE_ITEMS = [
  {
    title: 'Recording Sessions',
    prices: [
      { label: 'Ad-hoc hourly rate', value: PRICES.studio.hourly },
      { label: `Loyalty subscription (${PRICES.studio.loyaltyMonthly})`, value: PRICES.studio.loyaltyHourly },
    ],
    features: ['Vocal recording & comping', 'Live instrument tracking', 'Professional microphones & preamps', 'Real-time monitoring & feedback', 'Stems provided after session'],
  },
  {
    title: 'Mixing & Mastering',
    prices: [
      { label: 'Full Mix & Master', value: PRICES.mixing.fullMixMaster },
      { label: 'Vocal Mix (no master)', value: PRICES.mixing.vocalMix },
      { label: 'Mastering only', value: PRICES.mixing.mastering },
    ],
    features: ['Industry-standard plugins & processing', 'Up to 3 revisions included', 'Mastered for streaming platforms', 'Fast turnaround (3–7 days)'],
  },
  {
    title: 'Music Production',
    prices: [
      { label: 'Bespoke production', value: PRICES.production.bespoke },
      { label: 'Additional production', value: PRICES.production.additional },
    ],
    features: ['Custom beats from scratch', 'Arrangement & composition', 'Sound design & sampling', 'Co-production sessions available', 'Stems & project files included'],
  },
  {
    title: 'Ableton Tutoring',
    prices: [
      { label: '1-on-1 sessions', value: PRICES.tutoring.online },
    ],
    features: ['Beginner to advanced levels', 'Music production fundamentals', 'Mixing & mastering techniques', 'Workflow optimisation', 'Personalised curriculum'],
  },
];


export default function RecordingStudioManchesterPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Navigation />

      {/* Hero */}
      <section style={{ paddingTop: 120, paddingBottom: 80, paddingLeft: 48, paddingRight: 48 }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Recording Studio — Manchester
          </div>
          <h1 style={{ fontWeight: 900, fontSize: 'clamp(36px, 5.5vw, 88px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 24 }}>
            Professional<br />Recording Studio<br />Manchester
          </h1>
          <p style={{ fontSize: 16, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 520, marginBottom: 36 }}>
            Recording, mixing, mastering, and production for independent artists. Competitive rates, premium quality.
          </p>
          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap' }}>
            <Link href="/studio#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#fafafa', color: '#080808', textDecoration: 'none',
            }}>
              Book Studio Time
            </Link>
            <a href="#services" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#fafafa',
              border: '1.5px solid rgba(255,255,255,0.4)', textDecoration: 'none',
            }}>
              View Services
            </a>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            Why Choose Us
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 48 }}>
            Built for<br />Independent Artists
          </h2>
          <div className="grid-two-col" style={{ gap: 1 }}>
            {[
              { title: 'Professional Equipment', body: 'Industry-standard recording gear, acoustic treatment, and monitoring for pristine sound quality. The same tools used by top studios, at independent artist prices.' },
              { title: 'Expert Engineer', body: '6 years of experience recording, mixing, and producing for independent artists across genres. As an artist myself, I understand your vision and workflow.' },
              { title: 'Affordable Rates', body: 'Starting at £30/hr for loyalty clients. Transparent pricing, no hidden fees. Payment plans available for larger projects like EPs and albums.' },
              { title: 'Artist-Run', body: "I'm not just a service provider — I'm still actively making music. That means everything I do is current, tested, and built around what actually works." },
            ].map((item) => (
              <div key={item.title} style={{ padding: '40px', border: '1px solid #1a1a1a' }}>
                <p style={{ fontWeight: 900, fontSize: 17, letterSpacing: '-0.01em', marginBottom: 12 }}>{item.title}</p>
                <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}>{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services — light section */}
      <section id="services" style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            Services &amp; Pricing
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 8 }}>
            Studio Services
          </h2>
          <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', marginBottom: 48 }}>Professional recording and production services for independent artists.</p>

          <div className="grid-two-col" style={{ gap: 1, marginBottom: 1 }}>
            {SERVICE_ITEMS.map((service) => (
              <div key={service.title} style={{ padding: '40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.4)' }}>
                <p style={{ fontWeight: 900, fontSize: 18, letterSpacing: '-0.01em', marginBottom: 20 }}>{service.title}</p>
                <div style={{ marginBottom: 20 }}>
                  {service.prices.map((p) => (
                    <div key={p.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: 8, marginBottom: 8 }}>
                      <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{p.label}</span>
                      <span style={{ fontWeight: 900, fontSize: 16 }}>{p.value}</span>
                    </div>
                  ))}
                </div>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {service.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginBottom: 6, paddingLeft: 14, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>—</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Add-ons */}
          <div style={{ padding: '40px', background: '#080808', color: '#fafafa', marginTop: 1 }}>
            <p style={{ fontWeight: 900, fontSize: 11, marginBottom: 20, letterSpacing: '0.05em', textTransform: 'uppercase' }}>Add-On Services</p>
            <div className="grid-two-col" style={{ gap: 24 }}>
              {[
                { label: 'Vocal Tuning', value: '£40' },
                { label: 'Stem Separation', value: '£75' },
                { label: 'Rush Service', value: '+40%' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #1a1a1a', paddingBottom: 12 }}>
                  <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{item.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 16 }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Packages */}
          <div className="grid-two-col" style={{ gap: 1, marginTop: 1 }}>
            {[
              { title: '3-Song Package', price: '£920', sub: 'Perfect for singles or small EPs', features: ['Recording + Mixing + Mastering', '£307 per song (save £99)', 'Payment plan available'] },
              { title: '5-Song Package', price: '£1,450', sub: 'Ideal for full EPs or mixtapes', features: ['Recording + Mixing + Mastering', '£290 per song (save £250)', 'Payment plan available'] },
            ].map((pkg) => (
              <div key={pkg.title} style={{ padding: '40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.4)' }}>
                <p style={{ fontWeight: 900, fontSize: 18, marginBottom: 4 }}>{pkg.title}</p>
                <p style={{ fontWeight: 900, fontSize: 40, letterSpacing: '-0.02em', lineHeight: 1, marginBottom: 8 }}>{pkg.price}</p>
                <p style={{ fontSize: 13, color: 'rgba(0,0,0,0.45)', marginBottom: 20 }}>{pkg.sub}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                  {pkg.features.map((f) => (
                    <li key={f} style={{ fontSize: 13, color: 'rgba(0,0,0,0.5)', marginBottom: 6, paddingLeft: 14, position: 'relative' }}>
                      <span style={{ position: 'absolute', left: 0 }}>—</span>{f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 960, margin: '0 auto' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
            What Artists Say
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 48 }}>
            Trusted by<br />Manchester Artists
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {STUDIO_TESTIMONIALS.map((t) => (
              <div key={t.author} style={{ padding: '40px', border: '1px solid #1a1a1a', borderLeft: '3px solid rgba(255,255,255,0.3)' }}>
                <p style={{ fontSize: 16, lineHeight: 1.8, fontStyle: 'italic', color: 'rgba(255,255,255,0.65)', marginBottom: 16 }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <p style={{ fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)' }}>{t.author} — {t.location}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Location CTA — light section */}
      <section style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
        <div style={{ maxWidth: 640, margin: '0 auto', textAlign: 'center' }}>
          <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
            Location
          </div>
          <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 20 }}>
            Based in<br />Manchester
          </h2>
          <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(0,0,0,0.55)', maxWidth: 460, margin: '0 auto 40px' }}>
            Serving independent artists across Manchester and the North West. Remote mixing and mastering available UK-wide.
          </p>
          <div style={{ display: 'flex', gap: 14, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/studio#booking" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: '#080808', color: '#fafafa', textDecoration: 'none',
            }}>
              Book Your Session
            </Link>
            <Link href="/contact" style={{
              display: 'inline-flex', alignItems: 'center', padding: '13px 28px',
              fontWeight: 900, fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase',
              background: 'transparent', color: '#080808',
              border: '1.5px solid rgba(0,0,0,0.4)', textDecoration: 'none',
            }}>
              Get in Touch
            </Link>
          </div>
        </div>
      </section>

      {/* SEO Content */}
      <section style={{ padding: '80px 48px', borderTop: '1px solid #1a1a1a' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <h2 style={{ fontWeight: 900, fontSize: 24, letterSpacing: '-0.01em', marginBottom: 24 }}>
            Recording Studio Manchester: Professional Services for Independent Artists
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              `Looking for a professional recording studio in Manchester? Our studio offers high-quality recording, mixing, and mastering services designed specifically for independent artists, rappers, singers, and producers who demand professional results without the premium price tag.`,
              `With 6 years of experience in music production and engineering, we understand the unique challenges independent artists face. Whether you're recording your debut single, working on an EP, or need professional mixing and mastering for existing tracks, our Manchester studio provides the expertise and equipment to bring your vision to life.`,
              `Our services include vocal recording, beat production, mixing and mastering, and Ableton tutoring. We work with artists across all genres, specialising in hip-hop, rap, alternative, and electronic music. Competitive hourly rates start at just £30/hr for loyalty clients, with package deals available for EPs and albums.`,
              `Based in Manchester, we're easily accessible to artists across the North West, including Salford, Stockport, Oldham, and surrounding areas. Remote mixing and mastering services are also available for artists anywhere in the UK.`,
            ].map((para, i) => (
              <p key={i} style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)' }}>{para}</p>
            ))}
            <p style={{ fontSize: 14, lineHeight: 1.9, color: 'rgba(255,255,255,0.45)' }}>
              Ready to take your music to the next level?{' '}
              <Link href="/studio#booking" style={{ color: '#fafafa', textDecoration: 'underline' }}>Book your studio session today</Link>{' '}
              or{' '}
              <Link href="/contact" style={{ color: '#fafafa', textDecoration: 'underline' }}>get in touch</Link>{' '}
              to discuss your project.
            </p>
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
