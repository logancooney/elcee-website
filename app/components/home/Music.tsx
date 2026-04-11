export default function Music() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black">
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Music</h2>
        <span className="label">01 / Stream</span>
      </div>

      <iframe
        style={{ borderRadius: '0' }}
        src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator"
        width="100%"
        height="380"
        frameBorder="0"
        allowFullScreen
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        title="Elcee the Alchemist on Spotify"
      />
    </section>
  );
}
