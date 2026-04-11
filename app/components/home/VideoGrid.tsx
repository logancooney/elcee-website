const videos = [
  { id: 'K9Bk3Mw7mIc', title: 'Elcee the Alchemist — Video 1' },
  { id: 'KmekR33sMng', title: 'Elcee the Alchemist — Video 2' },
  { id: '7uelRgmMSCQ', title: 'Elcee the Alchemist — Video 3' },
  { id: 'CtM7X9UE9Ls', title: 'Elcee the Alchemist — Video 4' },
];

export default function VideoGrid() {
  return (
    <section className="px-6 md:px-10 py-20 md:py-28 bg-black border-t border-white/5">
      <div className="flex items-baseline justify-between mb-12 md:mb-16">
        <h2 style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>Video</h2>
        <span className="label">02 / Watch</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: '#111' }}>
        {videos.map(({ id, title }) => (
          <div key={id} className="bg-black" style={{ aspectRatio: '16/9' }}>
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${id}`}
              title={title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
              style={{ display: 'block' }}
            />
          </div>
        ))}
      </div>
    </section>
  );
}
