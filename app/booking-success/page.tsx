import Link from 'next/link';

export default function BookingSuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-2xl text-center">
        <div className="mb-8">
          <svg className="w-24 h-24 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-6xl font-bold mb-6">You&apos;re booked.</h1>

        <p className="text-xl text-gray-400 mb-8">
          Confirmation details are on their way to your inbox. I&apos;ll be in touch before the session.
        </p>

        <div className="mb-12 text-left max-w-md mx-auto">
          <p className="text-gray-300 font-semibold mb-3">What&apos;s next:</p>
          <ul className="space-y-2 text-gray-400">
            <li>· Check your email for the confirmation</li>
            <li>· You&apos;ll get a reminder 24 hours before</li>
            <li>· Any questions — reply to the confirmation email</li>
          </ul>
        </div>

        <div className="space-x-4">
          <Link
            href="/studio"
            className="inline-block bg-white text-black px-8 py-3 font-bold hover:bg-gray-200 transition"
          >
            Back to Studio
          </Link>
          <Link
            href="/"
            className="inline-block bg-white/10 text-white px-8 py-3 font-bold hover:bg-white/20 transition"
          >
            Home
          </Link>
        </div>

        <p className="mt-12 text-sm text-gray-500">
          Questions?{' '}
          <a href="mailto:elcee.mgmt@gmail.com" className="text-white hover:underline">
            elcee.mgmt@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
}
