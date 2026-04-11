const platforms = [
  { name: 'Spotify',      href: 'https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7' },
  { name: 'Apple Music',  href: 'https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060' },
  { name: 'YouTube',      href: 'https://youtube.com/@elceethealchemist' },
  { name: 'SoundCloud',   href: 'https://soundcloud.com/elceethealchemist' },
  { name: 'Amazon Music', href: 'https://music.amazon.com/artists/B07V4F5QK4/elcee-the-alchemist' },
  { name: 'Tidal',        href: 'https://tidal.com/browse/artist/13513078' },
  { name: 'Deezer',       href: 'https://www.deezer.com/artist/67198962' },
  { name: 'Bandcamp',     href: 'https://elceethealchemist.bandcamp.com' },
];

const socials = [
  { name: 'Instagram', href: 'https://instagram.com/elceethealchemist' },
  { name: 'TikTok',    href: 'https://tiktok.com/@elceethealchemist' },
  { name: 'YouTube',   href: 'https://youtube.com/@elceethealchemist' },
  { name: 'Twitter',   href: 'https://twitter.com/elceejpg' },
  { name: 'Facebook',  href: 'https://facebook.com/elceethealchemist' },
];

export default function Platforms() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black border-t border-white/5">

      {/* Streaming platforms */}
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Stream</h2>
        <span className="label">04 / Platforms</span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px mb-20 md:mb-28" style={{ background: '#111' }}>
        {platforms.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="group bg-black flex items-center justify-between px-6 md:px-8 hover:bg-white hover:text-black transition-all duration-300"
            style={{ minHeight: '64px' }}
          >
            <span className="label group-hover:text-black transition-colors">{name}</span>
            <span
              className="label opacity-0 group-hover:opacity-100 group-hover:text-black transition-all"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        ))}
      </div>

      {/* Social links */}
      <div className="flex items-baseline justify-between mb-10">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Connect</h2>
        <span className="label">05 / Social</span>
      </div>

      <div className="flex flex-wrap gap-x-10 gap-y-5">
        {socials.map(({ name, href }) => (
          <a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="link-line label hover:text-white transition-colors"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            {name}
          </a>
        ))}
      </div>

    </section>
  );
}
