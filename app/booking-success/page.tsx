'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function BookingSuccessPage() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Payment is confirmed if we're on this page
    // Stripe redirects here after successful payment
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-400">Confirming payment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 text-white">
      <div className="max-w-2xl mx-auto px-4 py-24 text-center">
        {/* Success Icon */}
        <div className="mb-8">
          <svg 
            className="w-24 h-24 mx-auto text-green-500" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        <h1 className="text-5xl font-bold mb-4">Payment Successful! 🎉</h1>
        
        <p className="text-2xl text-gray-300 mb-8">
          Your booking is confirmed
        </p>

        {/* Confirmation Details */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-8 mb-8">
          <h2 className="text-xl font-bold mb-4">What Happens Next:</h2>
          <div className="space-y-4 text-left max-w-lg mx-auto">
            <div className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">✓</span>
              <div>
                <p className="font-semibold">Confirmation Email Sent</p>
                <p className="text-sm text-gray-400">Check your inbox for booking details</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">✓</span>
              <div>
                <p className="font-semibold">Payment Received</p>
                <p className="text-sm text-gray-400">You'll receive a receipt via email</p>
              </div>
            </div>
            <div className="flex items-start">
              <span className="text-green-500 mr-3 mt-1">✓</span>
              <div>
                <p className="font-semibold">Session Scheduled</p>
                <p className="text-sm text-gray-400">You'll get a reminder 24 hours before</p>
              </div>
            </div>
          </div>
        </div>

        {/* Studio Info */}
        <div className="bg-gray-800 border border-gray-700 rounded-lg p-6 mb-8">
          <h3 className="font-bold text-lg mb-3">The Alchemist Studio</h3>
          <p className="text-gray-300 mb-2">Manchester, UK</p>
          <p className="text-sm text-gray-400">
            If you have any questions, reply to your confirmation email or contact:
          </p>
          <p className="text-blue-400 mt-2">elcee.automation@gmail.com</p>
        </div>

        {/* Call to Actions */}
        <div className="space-y-4">
          <Link 
            href="/"
            className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition"
          >
            Return to Homepage
          </Link>
          
          <div className="text-gray-400">
            <Link href="/studio" className="hover:text-blue-400 underline">
              Book Another Session
            </Link>
          </div>
        </div>

        {/* Social */}
        <div className="mt-12 pt-8 border-t border-gray-700">
          <p className="text-gray-400 mb-4">Follow for updates:</p>
          <div className="flex justify-center gap-6">
            <a 
              href="https://instagram.com/elceethealchemist" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Instagram
            </a>
            <a 
              href="https://tiktok.com/@elceethealchemist" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              TikTok
            </a>
            <a 
              href="https://twitter.com/elceethealchemist" 
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Twitter
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
