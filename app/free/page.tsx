"use client";

import { useEffect, useState } from "react";
import Navigation from "../components/Navigation";
import { track } from "@vercel/analytics";
import CalendlyEmbed from "../../components/CalendlyEmbed";

const MAGNETS = [
  {
    id: "release-checklist",
    title: "Music Release Checklist",
    desc: "Everything you need before, during, and after a release — in order.",
  },
  {
    id: "stem-prep-guide",
    title: "Stem Prep Guide for Mix Engineers",
    desc: "How to prep your session so the mix goes smoothly. No wasted revisions.",
  },
  {
    id: "home-recording-guide",
    title: "Home Recording Guide for Rappers",
    desc: "Get a clean vocal recording at home without paying studio rates.",
  },
  {
    id: "mix-ready-checklist",
    title: "Mix-Ready Track Checklist",
    desc: "The checklist every artist should run before sending stems to an engineer.",
  },
];

function DownloadCard({
  id,
  title,
  desc,
}: {
  id: string;
  title: string;
  desc: string;
}) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [state, setState] = useState<"idle" | "loading" | "done" | "error">(
    "idle"
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/lead-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, name, magnet: id }),
      });
      if (!res.ok) throw new Error();
      track("pdf_download", { magnet: id });
      setState("done");
    } catch {
      setState("error");
    }
  }

  return (
    <div className="border border-white/10 rounded-lg px-6 py-6 bg-white/5">
      <p className="font-semibold text-white text-lg mb-1">{title}</p>
      <p className="text-sm text-gray-400 mb-5">{desc}</p>

      {state === "done" ? (
        <p className="text-green-400 text-sm font-medium">
          ✓ On its way — check your inbox.
        </p>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Your name (optional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
          />
          <input
            type="email"
            required
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
          />
          {state === "error" && (
            <p className="text-red-400 text-xs">
              Something went wrong. Try again.
            </p>
          )}
          <button
            type="submit"
            disabled={state === "loading"}
            className="w-full bg-white text-black font-semibold py-2 rounded text-sm hover:bg-gray-200 transition disabled:opacity-50"
          >
            {state === "loading" ? "Sending..." : "Send it to me"}
          </button>
        </form>
      )}
    </div>
  );
}

function DiscountCaptureForm() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done' | 'error'>('idle');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setState('loading');
    try {
      const res = await fetch('/api/discount-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      });
      if (!res.ok) throw new Error();
      setState('done');
    } catch {
      setState('error');
    }
  }

  if (state === 'done') {
    return (
      <p className="text-green-400 font-medium">
        ✓ On its way — check your inbox.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
      <input
        type="text"
        placeholder="Your name (optional)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
      />
      <input
        type="email"
        required
        placeholder="Your email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="w-full bg-black border border-white/20 rounded px-4 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-white/40"
      />
      {state === 'error' && (
        <p className="text-red-400 text-xs">Something went wrong. Try again.</p>
      )}
      <button
        type="submit"
        disabled={state === 'loading'}
        className="w-full bg-white text-black font-semibold py-2 rounded text-sm hover:bg-gray-200 transition disabled:opacity-50"
      >
        {state === 'loading' ? 'Sending...' : 'Send me the code'}
      </button>
    </form>
  );
}

export default function FreePage() {
  useEffect(() => {
    if (document.referrer.includes("reddit.com")) {
      track("visit_from_reddit");
    }
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
              15 minutes. I listen to your track before the call and come
              prepared with specific notes. No pitch — just honest feedback from
              a working engineer.
            </p>
          </div>
          <CalendlyEmbed key="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback" url="https://calendly.com/elcee-mgmt/free-mix-review-track-feedback" height={700} />
        </div>
      </section>

      {/* Discount Code Capture */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Get 10% off your first booking</h2>
          <p className="text-lg text-gray-400 mb-8">
            Drop your email and I&apos;ll send the discount code straight over. Works on any session, mix, master, or tutoring.
          </p>
          <DiscountCaptureForm />
        </div>
      </section>

      {/* Free Downloads */}
      <section className="py-16 px-6 border-t border-white/10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Free Downloads
            </h2>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Drop your email and I'll send it straight over.
            </p>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {MAGNETS.map((m) => (
              <DownloadCard key={m.id} {...m} />
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
