"use client";

import { useState } from 'react';

interface Testimonial {
  quote: string;
  author: string;
  location: string;
}

const testimonials: Testimonial[] = [
  {
    quote: "Professional setup, quality results. Exactly what I needed for my EP.",
    author: "Artist Name",
    location: "Manchester"
  },
  {
    quote: "Great experience from start to finish. Mix came back polished and ready to release.",
    author: "Artist Name",
    location: "Salford"
  },
  {
    quote: "Reliable, consistent quality. Been working here for over a year.",
    author: "Artist Name",
    location: "Stockport"
  }
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  return (
    <section className="py-16 px-6 bg-white text-black">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold mb-12 text-center">
          Trusted by Manchester Artists
        </h2>
        
        <div className="relative">
          <div className="bg-black text-white p-10 md:p-12 rounded-2xl">
            <p className="text-xl md:text-2xl font-light leading-relaxed mb-6">
              "{testimonials[current].quote}"
            </p>
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-lg">{testimonials[current].author}</p>
                <p className="text-gray-400">{testimonials[current].location}</p>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setCurrent(current === 0 ? testimonials.length - 1 : current - 1)}
                  className="w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Previous testimonial"
                >
                  ←
                </button>
                <button
                  onClick={() => setCurrent(current === testimonials.length - 1 ? 0 : current + 1)}
                  className="w-12 h-12 border border-white rounded-full hover:bg-white hover:text-black transition flex items-center justify-center"
                  aria-label="Next testimonial"
                >
                  →
                </button>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center gap-2 mt-6">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrent(index)}
                className={`w-2 h-2 rounded-full transition ${
                  current === index ? 'bg-black w-8' : 'bg-gray-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
