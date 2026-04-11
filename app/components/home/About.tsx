import Image from 'next/image';

export default function About() {
  return (
    <section className="bg-white text-black border-t border-black/5">
      <div className="grid md:grid-cols-2" style={{ minHeight: '70vh' }}>

        {/* Text — left on desktop, bottom on mobile */}
        <div className="flex flex-col justify-center px-8 md:px-14 py-16 md:py-24 order-2 md:order-1">
          <span className="label mb-8" style={{ color: '#aaa' }}>03 / Artist</span>
          <h2
            className="text-black mb-8"
            style={{ fontSize: 'clamp(40px, 6vw, 80px)' }}
          >
            About
          </h2>
          <div className="space-y-5" style={{ maxWidth: '420px' }}>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>
              Elcee the Alchemist is redefining UK Alternative Rap. Winner of the JBL Martin Garrix Music Academy,
              named an adidas Rising Star, recorded at Abbey Road Studios, and 100,000 views on his Boiler Room
              debut in a single week.
            </p>
            <p className="text-base leading-relaxed" style={{ color: '#555' }}>
              Rooted in London&apos;s Grime scene. Moved to Manchester to study Electronic Music Production.
              First Class graduate. Operating completely solo. No team, no label. Pure vision.
            </p>
          </div>
          <a
            href="https://open.spotify.com/artist/6E8xwOloHnzGWVlNV9K8n7"
            target="_blank"
            rel="noopener noreferrer"
            className="link-line label text-black mt-12 w-fit"
            style={{ minHeight: '44px', display: 'inline-flex', alignItems: 'center' }}
          >
            Stream all music →
          </a>
        </div>

        {/* Photo — right on desktop, top on mobile */}
        <div className="relative order-1 md:order-2" style={{ minHeight: '50vh' }}>
          <Image
            src="/photos/press-shot-bw.jpg"
            alt="Elcee the Alchemist"
            fill
            className="object-cover grayscale"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

      </div>
    </section>
  );
}
