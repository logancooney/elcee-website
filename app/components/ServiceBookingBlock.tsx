interface BookingOption {
  label: string;
  sublabel?: string;
  price?: string;
  url: string;
  isPacks?: boolean;
}

interface ServiceBookingBlockProps {
  freeCallUrl?: string;
  freeCallLabel?: string;
  freeCallSublabel?: string;
  options: BookingOption[];
}

export default function ServiceBookingBlock({
  freeCallUrl,
  freeCallLabel = 'Book a Free Call →',
  freeCallSublabel,
  options,
}: ServiceBookingBlockProps) {
  const paidOptions = options.filter(o => !o.isPacks);
  const packsOptions = options.filter(o => o.isPacks);

  return (
    <div style={{
      padding: 'clamp(20px, 5vw, 48px)',
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      maxWidth: 580,
    }}>
      {freeCallUrl && (
        <a
          href={freeCallUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            width: '100%',
            padding: '18px 24px',
            background: '#fafafa',
            color: '#080808',
            textDecoration: 'none',
            boxSizing: 'border-box',
          }}
        >
          <span style={{
            display: 'block',
            fontWeight: 900,
            fontSize: 15,
            letterSpacing: '-0.01em',
          }}>
            {freeCallLabel}
          </span>
          {freeCallSublabel && (
            <span style={{
              display: 'block',
              fontWeight: 400,
              fontSize: 12,
              color: 'rgba(0,0,0,0.5)',
              marginTop: 3,
            }}>
              {freeCallSublabel}
            </span>
          )}
        </a>
      )}

      {paidOptions.length > 0 && (
        <div className="booking-options-grid">
          {paidOptions.map(opt => {
            const isExternal = opt.url.startsWith('http');
            const extraProps = isExternal
              ? { target: '_blank' as const, rel: 'noopener noreferrer' }
              : {};
            return (
              <a
                key={opt.url}
                href={opt.url}
                {...extraProps}
                style={{
                  display: 'block',
                  padding: '16px 20px',
                  border: '1.5px solid rgba(255,255,255,0.25)',
                  color: '#fafafa',
                  textDecoration: 'none',
                }}
              >
                <span style={{ display: 'block', fontWeight: 900, fontSize: 13 }}>
                  {opt.label}{opt.price ? ` — ${opt.price}` : ''} →
                </span>
                {opt.sublabel && (
                  <span style={{
                    display: 'block',
                    fontWeight: 400,
                    fontSize: 11,
                    color: 'rgba(255,255,255,0.4)',
                    marginTop: 3,
                  }}>
                    {opt.sublabel}
                  </span>
                )}
              </a>
            );
          })}
        </div>
      )}

      {packsOptions.map(opt => {
        const isExternal = opt.url.startsWith('http');
        const extraProps = isExternal
          ? { target: '_blank' as const, rel: 'noopener noreferrer' }
          : {};
        return (
          <a
            key={opt.url}
            href={opt.url}
            {...extraProps}
            style={{
              display: 'block',
              padding: '16px 20px',
              border: '1.5px dashed rgba(255,255,255,0.25)',
              color: '#fafafa',
              textDecoration: 'none',
            }}
          >
            <span style={{ display: 'block', fontWeight: 900, fontSize: 13 }}>
              {opt.label}{opt.price ? ` — ${opt.price}` : ''} →
            </span>
            {opt.sublabel && (
              <span style={{
                display: 'block',
                fontWeight: 400,
                fontSize: 11,
                color: 'rgba(255,255,255,0.4)',
                marginTop: 3,
              }}>
                {opt.sublabel}
              </span>
            )}
          </a>
        );
      })}
    </div>
  );
}
