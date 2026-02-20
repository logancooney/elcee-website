'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function ReleaseChecklistPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          leadMagnet: 'release-checklist',
          timestamp: new Date().toISOString()
        })
      });

      await fetch('/api/send-lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, type: 'release-checklist' })
      });

      setSubmitted(true);
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
        <div className="max-w-2xl mx-auto px-4 py-24 text-center">
          <div className="mb-8">
            <svg className="w-20 h-20 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold mb-4">Check Your Email! ✉️</h1>
          <p className="text-xl text-gray-300 mb-8">
            The Release Assets Checklist has been sent to <strong>{email}</strong>
          </p>
          <p className="text-gray-400 mb-12">
            This checklist will ensure you never miss a critical file or deadline before your next release.
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Need help with any of these assets?</h2>
            <p className="text-gray-300 mb-6">
              The Alchemist Studio handles recording, mixing, mastering, stems, clean versions, and more.
            </p>
            <Link 
              href="/studio"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
            >
              Book Your Session
            </Link>
          </div>
          <Link href="/" className="text-blue-400 hover:underline">
            Return to Homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">
            Don't Miss Critical Release Assets 📋
          </h1>
          <p className="text-2xl text-gray-300">
            Complete checklist of everything you need before release day
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Benefits */}
          <div>
            <div className="bg-red-900/20 border border-red-600/50 rounded-lg p-6 mb-8">
              <h3 className="text-xl font-bold mb-3 text-red-400">⚠️ Common Mistakes:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• Missing clean version for radio</li>
                <li>• Wrong cover art dimensions</li>
                <li>• No stems saved (can't remix later)</li>
                <li>• Metadata errors (wrong artist name)</li>
                <li>• Missing lyrics for platforms</li>
              </ul>
            </div>

            <h2 className="text-3xl font-bold mb-6">What's Included:</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span><strong>Audio Files:</strong> Master, stems, clean version, instrumental</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span><strong>Visual Assets:</strong> Cover art specs, press photos, videos</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span><strong>Metadata:</strong> Track info, credits, publishing</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span><strong>Distribution:</strong> Platform requirements, timelines</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span><strong>Promotion:</strong> Pre-release and post-release tasks</span>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Why This Matters:</h3>
              <p className="text-gray-300 mb-3">
                Missing even one critical asset can delay your release, hurt your professionalism, or prevent playlisting opportunities.
              </p>
              <p className="text-blue-400 font-semibold">
                Be release-ready every time.
              </p>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-gray-800 border-2 border-blue-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Get Your Free Checklist</h2>
              <p className="text-gray-400 mb-6">Instant delivery. No spam.</p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name (optional)
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  />
                </div>

                {error && (
                  <div className="bg-red-900/50 border border-red-600 rounded-lg p-3 text-red-200">
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-bold py-4 px-8 rounded-lg transition text-lg"
                >
                  {loading ? 'Sending...' : 'Download Free Checklist 📧'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you'll receive the checklist + occasional studio tips. Unsubscribe anytime.
                </p>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm">
                Created by <Link href="/" className="text-blue-400 hover:underline">The Alchemist Studio</Link>, Manchester
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
