const services = [
  {
    label: '01',
    title: 'Recording & Engineering',
    description: 'Capture your performance with clarity and precision. Professional vocal and instrument tracking in a focused environment built for quality.',
    includes: [
      'High-end signal chain',
      'Experienced engineering and session direction',
      'Flexible session lengths',
      'All session files delivered',
    ],
  },
  {
    label: '02',
    title: 'Mixing & Mastering',
    description: 'Transform recordings into polished, competitive releases. Technical precision meets creative vision.',
    includes: [
      'Professional mix with depth, clarity, and impact',
      'Industry-standard processing and plugins',
      'Multiple revision rounds',
      'Stems and final mix delivery',
      'Loudness optimisation for streaming',
    ],
  },
  {
    label: '03',
    title: 'Music Production',
    description: 'Custom production tailored to your sound. From full beat creation to arrangement and sonic direction.',
    includes: [
      'Bespoke production or additional production work',
      'Professional sound design and arrangement',
      'Stems and project files',
      'Collaborative creative process',
    ],
  },
];

export default function Services() {
  return (
    <section style={{ padding: '80px 48px', background: '#080808', color: '#fafafa', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          What We Offer
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 8 }}>
          Studio Services
        </h2>
        <p style={{ fontSize: 14, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)', maxWidth: 480, marginBottom: 56 }}>
          Complete studio services from tracking to final master.
        </p>

        <div className="grid-three-col" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          {services.map((service, i) => (
            <div
              key={service.label}
              style={{
                padding: '48px 40px',
                borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
              }}
            >
              <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 12 }}>
                {service.label}
              </div>
              <p style={{ fontWeight: 900, fontSize: 'clamp(18px, 2vw, 26px)', letterSpacing: '-0.02em', textTransform: 'uppercase', lineHeight: 1, marginBottom: 16 }}>
                {service.title}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.5)', marginBottom: 28 }}>
                {service.description}
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {service.includes.map(item => (
                  <p key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.35)', lineHeight: 1.6 }}>
                    — {item}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
