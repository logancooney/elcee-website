import { PRICES } from '../../../content/prices';

const STUDIO_RATES = [
  { label: 'Standard', price: PRICES.studio.hourly },
  { label: 'Loyalty Plan', price: PRICES.studio.loyaltyHourly, note: `${PRICES.studio.loyaltyMonthly} subscription` },
];

const MIXING_RATES = [
  { label: 'Full Mix + Master', price: PRICES.mixing.fullMixMaster },
  { label: 'Vocal Mix', price: PRICES.mixing.vocalMix },
  { label: 'Mastering', price: PRICES.mixing.mastering },
];

const PACKAGES = [
  { label: '3-Track Package', price: PRICES.packages.threeTrack.price, saving: PRICES.packages.threeTrack.saving },
  { label: '5-Track Package', price: PRICES.packages.fiveTrack.price, saving: PRICES.packages.fiveTrack.saving },
];

const ADDONS = [
  { label: 'Vocal Tuning', price: PRICES.addons.vocalTuning },
  { label: 'Stem Separation', price: PRICES.addons.stemSeparation },
  { label: 'Rush Delivery', price: PRICES.addons.rushDelivery },
];

export default function Pricing() {
  return (
    <section style={{ padding: '80px 48px', background: '#f0ede8', color: '#080808' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 16 }}>
          Rates
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 8 }}>
          Pricing
        </h2>
        <p style={{ fontSize: 14, color: 'rgba(0,0,0,0.45)', marginBottom: 56 }}>Transparent pricing. No hidden fees.</p>

        <div className="grid-two-col" style={{ gap: 1, marginBottom: 2 }}>
          {/* Studio Sessions */}
          <div style={{ padding: '48px 40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.5)' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}>Studio Sessions</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {STUDIO_RATES.map(r => (
                <div key={r.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{r.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{r.price}</span>
                  </div>
                  {r.note && <p style={{ fontSize: 11, color: 'rgba(0,0,0,0.35)', marginTop: 2 }}>{r.note}</p>}
                </div>
              ))}
            </div>
          </div>

          {/* Mixing Services */}
          <div style={{ padding: '48px 40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.5)' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}>Mixing Services</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {MIXING_RATES.map(r => (
                <div key={r.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{r.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{r.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Multi-track Packages */}
          <div style={{ padding: '48px 40px', background: '#080808', color: '#fafafa' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 20 }}>Multi-Track Packages</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              {PACKAGES.map(p => (
                <div key={p.label}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                    <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.6)' }}>{p.label}</span>
                    <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{p.price}</span>
                  </div>
                  <p style={{ fontSize: 11, color: 'rgba(255,255,255,0.3)', marginTop: 2 }}>{p.saving}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div style={{ padding: '48px 40px', border: '1px solid rgba(0,0,0,0.12)', background: 'rgba(255,255,255,0.5)' }}>
            <p style={{ fontSize: 8, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.4)', marginBottom: 20 }}>Add-ons</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {ADDONS.map(a => (
                <div key={a.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                  <span style={{ fontSize: 13, color: 'rgba(0,0,0,0.55)' }}>{a.label}</span>
                  <span style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.02em' }}>{a.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
