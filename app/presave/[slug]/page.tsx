'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';

// TODO: Replace with actual release data from CMS/database
const RELEASES = {
  'test-release': {
    id: 'test-release',
    title: 'New Release',
    artwork: '/placeholder-artwork.jpg',
    releaseDate: '2026-03-15',
    spotifyUrl: 'https://open.spotify.com/track/YOUR_TRACK_ID',
    appleUrl: 'https://music.apple.com/album/YOUR_ALBUM_ID',
  },
};

export default function PreSavePage() {
  const params = useParams();
  const slug = params.slug as string;
  const release = RELEASES[slug as keyof typeof RELEASES];

  const [showModal, setShowModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<'spotify' | 'apple'>('spotify');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    socialHandle: '',
    phone: '',
  });

  if (!release) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Release Not Found</h1>
          <p className="text-gray-400">This pre-save link is not active.</p>
        </div>
      </div>
    );
  }

  const handlePlatformClick = (platform: 'spotify' | 'apple') => {
    setSelectedPlatform(platform);
    setShowModal(true);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/presave', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          platform: selectedPlatform,
          releaseId: release.id,
          releaseTitle: release.title,
          spotifyUrl: release.spotifyUrl,
          appleUrl: release.appleUrl,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit');
      }

      // Redirect to platform
      if (data.redirectUrl) {
        window.location.href = data.redirectUrl;
      }
    } catch (err: any) {
      setError(err.message || 'Something went wrong. Please try again.');
      setLoading(false);
    }
  };

  const daysUntilRelease = Math.ceil(
    (new Date(release.releaseDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24)
  );

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          {/* Artwork */}
          <div className="mb-8">
            <div className="w-64 h-64 mx-auto bg-gray-800 rounded-lg overflow-hidden">
              {/* TODO: Replace with actual artwork */}
              <div className="w-full h-full flex items-center justify-center text-gray-600">
                Artwork
              </div>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{release.title}</h1>
          
          {/* Release Date */}
          <p className="text-xl text-gray-400 mb-2">
            Out {new Date(release.releaseDate).toLocaleDateString('en-GB', { 
              day: 'numeric',
              month: 'long',
              year: 'numeric'
            })}
          </p>
          
          {/* Countdown */}
          {daysUntilRelease > 0 && (
            <p className="text-lg text-gray-500">
              {daysUntilRelease} {daysUntilRelease === 1 ? 'day' : 'days'} to go
            </p>
          )}
        </div>

        {/* Pre-Save Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => handlePlatformClick('spotify')}
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-8 rounded-lg transition text-lg"
          >
            Pre-save on Spotify
          </button>
          
          <button
            onClick={() => handlePlatformClick('apple')}
            className="w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-4 px-8 rounded-lg transition text-lg"
          >
            Pre-save on Apple Music
          </button>
        </div>

        <p className="text-center text-gray-500 text-sm mt-8">
          Be the first to hear it. Get notified on release day.
        </p>
      </div>

      {/* Email Capture Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-6 z-50">
          <div className="bg-white text-black rounded-lg max-w-md w-full p-8">
            <h2 className="text-2xl font-bold mb-4">
              Pre-save on {selectedPlatform === 'spotify' ? 'Spotify' : 'Apple Music'}
            </h2>
            
            <p className="text-gray-600 mb-6">
              Enter your details to pre-save. You'll get notified when it drops.
            </p>

            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="your@email.com"
                />
              </div>

              {/* Social Handle */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Instagram / TikTok Handle <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="text"
                  value={formData.socialHandle}
                  onChange={(e) => setFormData({ ...formData, socialHandle: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="@yourhandle"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-1">
                  Phone Number <span className="text-gray-400">(optional)</span>
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="+44..."
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 hover:bg-gray-300 text-black font-semibold py-3 rounded-lg transition"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Submit & Pre-Save'}
                </button>
              </div>
            </form>

            <p className="text-xs text-gray-500 mt-4 text-center">
              By submitting, you agree to receive release notifications via email.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
