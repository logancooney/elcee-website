"use client";

import { useState } from 'react';

interface VideoCarouselProps {
  videos: { id: string; title: string }[];
}

function VideoCarousel({ videos }: VideoCarouselProps) {
  const [current, setCurrent] = useState(0);

  return (
    <div className="relative">
      <div className="aspect-video rounded-2xl overflow-hidden">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videos[current].id}`}
          title={videos[current].title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-full"
        />
      </div>
      
      {videos.length > 1 && (
        <>
          <div className="flex justify-center gap-2 mt-4">
            {videos.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  current === index ? 'bg-white w-8' : 'bg-gray-600'
                }`}
                aria-label={`Go to video ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-4 justify-between mt-4">
            <button
              onClick={() => setCurrent(current === 0 ? videos.length - 1 : current - 1)}
              className="text-white hover:text-gray-400 transition"
            >
              ← Previous
            </button>
            <button
              onClick={() => setCurrent(current === videos.length - 1 ? 0 : current + 1)}
              className="text-white hover:text-gray-400 transition"
            >
              Next →
            </button>
          </div>
        </>
      )}
    </div>
  );
}

// Option A: Featured Release (Vertical Layout)
export function FeaturedRelease() {
  // Placeholder videos - replace with actual video IDs
  const videos = [
    { id: "dQw4w9WgXcQ", title: "Video 1" },
    { id: "dQw4w9WgXcQ", title: "Video 2" },
    { id: "dQw4w9WgXcQ", title: "Video 3" }
  ];

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Release</h2>
        
        {/* Spotify Embed */}
        <div className="mb-12">
          <iframe
            style={{ borderRadius: '16px' }}
            src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator"
            width="100%"
            height="380"
            frameBorder="0"
            allowFullScreen
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
          />
        </div>

        {/* YouTube Carousel */}
        <div>
          <h3 className="text-2xl font-bold mb-6">Videos</h3>
          <VideoCarousel videos={videos} />
        </div>

        {/* Stream Links */}
        <div className="mt-12 text-center">
          <p className="text-gray-400 mb-4">Stream on all platforms</p>
          <div className="flex justify-center gap-6 flex-wrap text-lg">
            <a href="https://open.spotify.com/album/7HF3AA4vFQJARAt1ivCn0w" className="hover:underline" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" className="hover:underline" target="_blank" rel="noopener noreferrer">Apple Music</a>
            <a href="https://youtube.com/@elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://soundcloud.com/elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">SoundCloud</a>
          </div>
        </div>
      </div>
    </section>
  );
}

// Option B: Media Grid (Side-by-Side Layout)
export function MediaGrid() {
  const videos = [
    { id: "dQw4w9WgXcQ", title: "Video 1" },
    { id: "dQw4w9WgXcQ", title: "Video 2" },
    { id: "dQw4w9WgXcQ", title: "Video 3" }
  ];

  return (
    <section className="py-20 px-6 bg-black text-white">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">Latest Release</h2>
        
        {/* Side-by-Side Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* Spotify Player */}
          <div>
            <iframe
              style={{ borderRadius: '16px' }}
              src="https://open.spotify.com/embed/album/7HF3AA4vFQJARAt1ivCn0w?utm_source=generator"
              width="100%"
              height="380"
              frameBorder="0"
              allowFullScreen
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            />
          </div>

          {/* YouTube Carousel */}
          <div>
            <VideoCarousel videos={videos} />
          </div>
        </div>

        {/* Stream Links */}
        <div className="text-center">
          <p className="text-gray-400 mb-4">Stream on all platforms</p>
          <div className="flex justify-center gap-6 flex-wrap text-lg">
            <a href="https://open.spotify.com/album/7HF3AA4vFQJARAt1ivCn0w" className="hover:underline" target="_blank" rel="noopener noreferrer">Spotify</a>
            <a href="https://music.apple.com/gb/artist/elcee-the-alchemist/1479992060" className="hover:underline" target="_blank" rel="noopener noreferrer">Apple Music</a>
            <a href="https://youtube.com/@elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">YouTube</a>
            <a href="https://soundcloud.com/elceethealchemist" className="hover:underline" target="_blank" rel="noopener noreferrer">SoundCloud</a>
          </div>
        </div>
      </div>
    </section>
  );
}
