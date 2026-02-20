'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function StudioVoucherPage() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [service, setService] = useState('');
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
          leadMagnet: `studio-voucher (${service || 'not specified'})`,
          timestamp: new Date().toISOString()
        })
      });

      await fetch('/api/send-lead-magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name, type: 'studio-voucher' })
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
          <h1 className="text-4xl font-bold mb-4">Your Voucher is Ready! 🎉</h1>
          <p className="text-xl text-gray-300 mb-8">
            Check <strong>{email}</strong> for your 20% off voucher
          </p>
          
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-8 mb-8">
            <div className="text-6xl font-bold mb-2">FIRST20</div>
            <div className="text-2xl mb-4">20% Off Your First Session</div>
            <div className="text-sm text-blue-100">Valid for 90 days • One use per client</div>
          </div>

          <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Discounted Rates:</h2>
            <div className="space-y-3 text-left max-w-md mx-auto">
              <div className="flex justify-between">
                <span>Recording:</span>
                <span className="font-bold">£28/hr <span className="text-gray-500 line-through text-sm">£35</span></span>
              </div>
              <div className="flex justify-between">
                <span>Vocal Mix:</span>
                <span className="font-bold">£152 <span className="text-gray-500 line-through text-sm">£190</span></span>
              </div>
              <div className="flex justify-between">
                <span>Full Mix & Master:</span>
                <span className="font-bold">£272 <span className="text-gray-500 line-through text-sm">£340</span></span>
              </div>
              <div className="flex justify-between">
                <span>Mastering:</span>
                <span className="font-bold">£32/track <span className="text-gray-500 line-through text-sm">£40</span></span>
              </div>
              <div className="flex justify-between">
                <span>Ableton Tutoring:</span>
                <span className="font-bold">£28/hr <span className="text-gray-500 line-through text-sm">£35</span></span>
              </div>
            </div>
          </div>

          <Link 
            href="/studio"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg transition text-xl mb-8"
          >
            Book Your Session Now
          </Link>

          <p className="text-gray-400 text-sm">
            Questions? Reply to the email or contact elcee.automation@gmail.com
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-4xl mx-auto px-4 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block bg-red-600 text-white px-4 py-2 rounded-full mb-4 font-bold">
            LIMITED TIME OFFER
          </div>
          <h1 className="text-5xl font-bold mb-4">
            Get 20% Off Your First Studio Session 🎙️
          </h1>
          <p className="text-2xl text-gray-300">
            Professional recording, mixing & mastering in Manchester
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Left: Services & Pricing */}
          <div>
            <h2 className="text-3xl font-bold mb-6">Discounted Rates:</h2>
            <div className="space-y-4 mb-8">
              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">Recording</span>
                  <div>
                    <span className="text-2xl font-bold text-green-400">£28/hr</span>
                    <span className="text-gray-500 line-through ml-2">£35/hr</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Professional recording setup, industry-standard equipment</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">Vocal Mix</span>
                  <div>
                    <span className="text-2xl font-bold text-green-400">£152</span>
                    <span className="text-gray-500 line-through ml-2">£190</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Professional vocal mixing & processing</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">Full Mix & Master</span>
                  <div>
                    <span className="text-2xl font-bold text-green-400">£272</span>
                    <span className="text-gray-500 line-through ml-2">£340</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Complete mix & master package</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">Mastering</span>
                  <div>
                    <span className="text-2xl font-bold text-green-400">£32</span>
                    <span className="text-gray-500 line-through ml-2">£40</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">Per track, streaming-ready</p>
              </div>

              <div className="bg-gray-800 border border-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-bold text-xl">Ableton Tutoring</span>
                  <div>
                    <span className="text-2xl font-bold text-green-400">£28/hr</span>
                    <span className="text-gray-500 line-through ml-2">£35/hr</span>
                  </div>
                </div>
                <p className="text-sm text-gray-400">One-on-one production lessons</p>
              </div>
            </div>

            <div className="bg-blue-900/30 border border-blue-600/50 rounded-lg p-6">
              <h3 className="font-bold text-xl mb-3">What's Included:</h3>
              <ul className="space-y-2 text-gray-300">
                <li>✓ Professional equipment & plugins</li>
                <li>✓ Quick turnaround (3-5 days)</li>
                <li>✓ Unlimited revisions</li>
                <li>✓ Industry-standard quality</li>
                <li>✓ Personal attention to every project</li>
              </ul>
            </div>
          </div>

          {/* Right: Form */}
          <div>
            <div className="bg-gray-800 border-2 border-blue-600 rounded-lg p-8">
              <h2 className="text-2xl font-bold mb-2">Claim Your Voucher</h2>
              <p className="text-gray-400 mb-6">Enter your email to receive the code</p>

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
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    required
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  />
                </div>

                <div>
                  <label htmlFor="service" className="block text-sm font-medium mb-2">
                    Service Interested In
                  </label>
                  <select
                    id="service"
                    value={service}
                    onChange={(e) => setService(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg focus:border-blue-500 focus:outline-none text-white"
                  >
                    <option value="">Select a service</option>
                    <option value="Recording">Recording</option>
                    <option value="Mixing">Mixing</option>
                    <option value="Mastering">Mastering</option>
                    <option value="Mix & Master">Mix & Master</option>
                    <option value="Tutoring">Ableton Tutoring</option>
                  </select>
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
                  {loading ? 'Sending...' : 'Get Voucher Code 🎟️'}
                </button>

                <p className="text-xs text-gray-400 text-center">
                  Voucher valid for 90 days. One use per client. Cannot be combined with other offers.
                </p>
              </form>
            </div>

            <div className="mt-8 text-center">
              <p className="text-gray-400 text-sm mb-4">
                Based in Manchester | <Link href="/" className="text-blue-400 hover:underline">The Alchemist Studio</Link>
              </p>
              <Link href="/studio" className="text-blue-400 hover:underline text-sm">
                View full studio info & book online →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
