const steps = [
  {
    step: '01',
    title: 'Book Your Session',
    description: 'Check calendar availability and book online. Flexible scheduling with confirmation within 24 hours.',
  },
  {
    step: '02',
    title: 'Create',
    description: 'Professional environment with experienced engineering. Focused sessions designed for results.',
  },
  {
    step: '03',
    title: 'Receive Final Files',
    description: 'Fast turnaround with professional delivery. Revisions included to ensure you\'re satisfied with the result.',
  },
];

export default function Process() {
  return (
    <section style={{ padding: '80px 48px', background: '#080808', color: '#fafafa', borderTop: '1px solid #1a1a1a' }}>
      <div style={{ maxWidth: 960, margin: '0 auto' }}>
        <div style={{ fontSize: 9, letterSpacing: '0.3em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.3)', marginBottom: 16 }}>
          Process
        </div>
        <h2 style={{ fontWeight: 900, fontSize: 'clamp(28px, 4vw, 56px)', letterSpacing: '-0.03em', textTransform: 'uppercase', lineHeight: 0.9, marginBottom: 56 }}>
          How It Works
        </h2>
        <div className="grid-three-col" style={{ borderTop: '1px solid #1a1a1a', borderBottom: '1px solid #1a1a1a' }}>
          {steps.map((item, i) => (
            <div
              key={item.step}
              style={{
                padding: '48px 40px',
                borderLeft: i === 0 ? 'none' : '1px solid #1a1a1a',
              }}
            >
              <p style={{ fontWeight: 900, fontSize: 64, letterSpacing: '-0.04em', color: 'rgba(255,255,255,0.08)', marginBottom: 20, lineHeight: 1 }}>
                {item.step}
              </p>
              <p style={{ fontWeight: 900, fontSize: 16, letterSpacing: '-0.01em', textTransform: 'uppercase', marginBottom: 12 }}>
                {item.title}
              </p>
              <p style={{ fontSize: 13, lineHeight: 1.8, color: 'rgba(255,255,255,0.45)' }}>
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
