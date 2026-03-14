"use client";

import { useEffect } from "react";
import Navigation from "../components/Navigation";

export default function FreePage() {
  useEffect(() => {
    // Load Calendly widget script
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />

      {/* Hero */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Free tools for independent artists
          </h1>
          <p className="text-xl text-gray-400 leading-relaxed">
            Genuinely useful resources. No gimmicks.
          </p>
        </div>
      </section>

      {/* Free Track Review */}
      <section className="py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="mb-10 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Book a Free Track Review
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              15 minutes. I listen to your track before the call and come prepared
              with specific notes. No pitch — just honest feedback from a working
              engineer.
            </p>
          </div>
          {/* Calendly inline embed */}
          <div
            className="calendly-inline-widget rounded-lg overflow-hidden"
            data-url="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback"
            style={{ minWidth: "320px", height: "700px" }}
          />
        </div>
      </section>

      {/* Free Downloads — coming soon */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Free Downloads
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Checklists, guides, and templates for independent artists — dropping
            soon.
          </p>
          <div className="mt-10 grid md:grid-cols-2 gap-4 text-left">
            {[
              "Music Release Checklist",
              "Stem Prep Guide for Mix Engineers",
              "Home Recording Guide for Rappers",
              "Mix-Ready Track Checklist",
            ].map((title) => (
              <div
                key={title}
                className="border border-white/10 rounded-lg px-6 py-5 opacity-50"
              >
                <p className="font-semibold text-white">{title}</p>
                <p className="text-sm text-gray-500 mt-1">Coming soon</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-white/10">
        <div className="max-w-7xl mx-auto text-center">
          <p className="text-sm text-gray-500">
            © 2026 Elcee the Alchemist. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
