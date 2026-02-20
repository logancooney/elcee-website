'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

function SuccessContent() {
  const searchParams = useSearchParams();
  const paymentIntent = searchParams.get('payment_intent');

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          Payment Successful! ✅
        </h1>

        <p className="text-xl text-gray-400 mb-8">
          Your booking has been confirmed. We've sent a confirmation email with all the details.
        </p>

        {paymentIntent && (
          <p className="text-sm text-gray-500 mb-8">
            Payment ID: {paymentIntent}
          </p>
        )}

        <div className="space-y-4">
          <p className="text-gray-300">
            <strong>What's next?</strong>
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-400">
            <li>• Check your email for confirmation and session details</li>
            <li>• We'll send a reminder 24 hours before your session</li>
            <li>• Bring your reference tracks and ideas</li>
            <li>• Get ready to create something special!</li>
          </ul>
        </div>

        <div className="mt-12 space-x-4">
          <Link 
            href="/studio" 
            className="inline-block bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition"
          >
            Book Another Session
          </Link>
          <Link 
            href="/" 
            className="inline-block bg-white/10 text-white px-8 py-3 font-bold hover:bg-white/20 transition"
          >
            Back to Home
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Questions? Email us at{' '}
          <a href="mailto:elcee.mgmt@gmail.com" className="text-white hover:underline">
            elcee.mgmt@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}

export default function BookingSuccessPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading confirmation...</p>
        </div>
      </div>
    }>
      <SuccessContent />
    </Suspense>
  );
}
