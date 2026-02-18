"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImage {
  src: string;
  alt: string;
  caption?: string;
}

// TODO: Add real studio photos here
const images: GalleryImage[] = [
  // Placeholder - will be replaced with real studio photos
  { src: "/photos/studio-1.jpg", alt: "Recording booth", caption: "Professional recording booth" },
  { src: "/photos/studio-2.jpg", alt: "Control room", caption: "Control room with industry-standard equipment" },
  { src: "/photos/studio-3.jpg", alt: "Equipment setup", caption: "High-end microphones and preamps" },
  { src: "/photos/studio-4.jpg", alt: "Production space", caption: "Music production workstation" },
];

export default function StudioGallery() {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  return (
    <div className="py-20 px-6 bg-white text-black">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center">Studio</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Professional recording environment in the heart of Manchester. 
          See where the magic happens.
        </p>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative aspect-square cursor-pointer overflow-hidden group"
              onClick={() => setSelectedImage(index)}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10" />
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 50vw, 25vw"
                onError={(e) => {
                  // Fallback if image doesn't exist yet
                  const target = e.target as HTMLImageElement;
                  target.src = '/photos/press-shot-bw.jpg'; // Use existing photo as placeholder
                }}
              />
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 text-white text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity z-20">
                  {image.caption}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {selectedImage !== null && (
          <div
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              className="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 transition"
              onClick={() => setSelectedImage(null)}
              aria-label="Close"
            >
              ×
            </button>
            
            <div className="max-w-5xl w-full" onClick={(e) => e.stopPropagation()}>
              <div className="relative aspect-[4/3] mb-4">
                <Image
                  src={images[selectedImage].src}
                  alt={images[selectedImage].alt}
                  fill
                  className="object-contain"
                  sizes="100vw"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = '/photos/press-shot-bw.jpg';
                  }}
                />
              </div>
              {images[selectedImage].caption && (
                <p className="text-white text-center text-lg">
                  {images[selectedImage].caption}
                </p>
              )}
              
              {/* Navigation */}
              <div className="flex justify-center gap-4 mt-4">
                <button
                  onClick={() => setSelectedImage((selectedImage - 1 + images.length) % images.length)}
                  className="bg-white text-black px-4 py-2 font-semibold hover:bg-gray-200 transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setSelectedImage((selectedImage + 1) % images.length)}
                  className="bg-white text-black px-4 py-2 font-semibold hover:bg-gray-200 transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
