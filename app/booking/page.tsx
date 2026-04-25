import { Suspense } from 'react';
import type { Metadata } from 'next';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee The Alchemist',
  description: 'Book studio time, tutoring, or a mix and master. Pick your service and choose a time.',
};

export default function BookingPage() {
  return (
    <div style={{ background: '#080808', color: '#fafafa', minHeight: '100vh' }}>
      <Suspense
        fallback={
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
            <div
              style={{
                width: 32,
                height: 32,
                border: '2px solid rgba(255,255,255,0.2)',
                borderTopColor: '#fafafa',
                borderRadius: '50%',
                animation: 'spin 0.8s linear infinite',
              }}
            />
          </div>
        }
      >
        <BookingContent />
      </Suspense>
    </div>
  );
}
