'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function VenuesGuidePage() {
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
      // Save to database
      await fetch('/api/lead-capture', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          name,
          leadMagnet: 'venues-guide',
          timestamp: new Date().toISOString()
        })
      });

      // Send email with lead magnet
      await fetch('/api/send-lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, type: 'venues-guide' })
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
            The Manchester Venues Guide has been sent to <strong>{email}</strong>
          </p>
          <p className="text-gray-400 mb-12">
            Check your inbox (and spam folder just in case) - the guide should arrive within a few minutes.
          </p>
          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-4">Need studio services?</h2>
            <p className="text-gray-300 mb-6">
              Get 20% off your first session at The Alchemist Studio
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
            Free Manchester Music Venues Directory 🎵
          </h1>
          <p className="text-2xl text-gray-300">
            Direct booking contacts for 20+ venues across Manchester
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Benefits */}
          <div>
            <h2 className="text-3xl font-bold mb-6">What's Included:</h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>20+ venues (from 50 to 2,000 capacity)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Direct email contacts for booking inquiries</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Genre breakdowns (which venues suit your style)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Booking lead times (plan ahead properly)</span>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mr-3">✓</span>
                <span>Pro tips for getting booked</span>
              </li>
            </ul>

            <div className="mt-8 p-6 bg-gray-800 border border-gray-700 rounded-lg">
              <h3 className="font-bold text-xl mb-3">Preview: Venues Included</h3>
              <ul className="space-y-2 text-gray-300">
                <li>• The Castle Hotel (150 capacity)</li>
                <li>• Night & Day Café (100 capacity)</li>
                <li>• Soup Kitchen (120 capacity)</li>
                <li>• Gorilla (600 capacity)</li>
                <li>• Band on the Wall (350 capacity)</li>
                <li className="text-blue-400">+ 15 more venues...</li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-gray-800 border-2 border-blue-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Get Your Free Guide</h2>
              <p className="text-gray-400 mb-6">No credit card. No strings attached.</p>

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
                  {loading ? 'Sending...' : 'Get Free Guide 📧'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  By submitting, you'll receive the guide + occasional updates about studio services. Unsubscribe anytime.
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
