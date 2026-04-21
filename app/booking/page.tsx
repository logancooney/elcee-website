import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navigation from '../components/Navigation';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee the Alchemist',
  description: 'Book a studio session, tutoring lesson, mixing, or mastering service. Or start with a free call.',
};

export default function BookingPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navigation />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-white" />
        </div>
      }>
        <BookingContent />
      </Suspense>
    </div>
  );
}
