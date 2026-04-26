import Image from 'next/image';

export default function SiteFooter() {
  return (
    <footer style={{
      background: '#080808', borderTop: '1px solid #1a1a1a',
      padding: '48px 48px 36px',
      display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
      position: 'relative', zIndex: 1,
    }}>
      <Image src="/logos/ankh-white.png" alt="" width={34} height={34}
        style={{ opacity: 0.55, marginBottom: 14 }} />
      <p style={{ fontSize: 9, fontWeight: 400, letterSpacing: '0.3em', textTransform: 'uppercase',
        color: 'rgba(255,255,255,0.28)', marginBottom: 32 }}>
        as within, so without
      </p>
      <div style={{ display: 'flex', gap: 28, marginBottom: 36, flexWrap: 'wrap', justifyContent: 'center' }}>
        {[
          { label: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
          { label: 'SoundCloud', href: 'https://soundcloud.com/elceethealchemist' },
          { label: 'Spotify', href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
          { label: 'YouTube', href: 'https://youtube.com/@elceethealchemist' },
          { label: 'TikTok', href: 'https://tiktok.com/@elceethealchemist' },
        ].map(({ label, href }) => (
          <a key={label} href={href} target="_blank" rel="noopener noreferrer" style={{
            fontSize: 11, fontWeight: 900, letterSpacing: '0.15em', textTransform: 'uppercase',
            color: 'rgba(255,255,255,0.6)', textDecoration: 'none', padding: '8px 0',
            borderBottom: '1px solid transparent', transition: 'color 0.2s',
          }}>
            {label}
          </a>
        ))}
      </div>
      <div style={{ width: '100%', height: 1, background: 'rgba(255,255,255,0.07)', marginBottom: 24 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
        <Image src="/logos/eta-logo-white-cropped.png" alt="Elcee The Alchemist"
          width={120} height={30} style={{ height: 28, width: 'auto', objectFit: 'contain' }} />
        <span style={{ fontSize: 9, letterSpacing: '0.1em', color: 'rgba(255,255,255,0.15)' }}>
          © 2026 Elcee The Alchemist
        </span>
      </div>
    </footer>
  );
}
