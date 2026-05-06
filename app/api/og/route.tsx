import { ImageResponse } from 'next/og';

export const runtime = 'edge';

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#080808',
          fontFamily: 'sans-serif',
        }}
      >
        <div
          style={{
            fontSize: 96,
            fontWeight: 900,
            color: '#fafafa',
            textTransform: 'uppercase',
            letterSpacing: '-4px',
            lineHeight: 0.88,
            textAlign: 'center',
          }}
        >
          ELCEE THE
          <br />
          ALCHEMIST
        </div>
        <div
          style={{
            fontSize: 18,
            color: 'rgba(255,255,255,0.4)',
            textTransform: 'uppercase',
            letterSpacing: '6px',
            marginTop: 32,
          }}
        >
          Alternative Rap · Manchester
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
