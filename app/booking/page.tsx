import type { Metadata } from 'next';
import BookingContent from './BookingContent';

export const metadata: Metadata = {
  title: 'Book a Session — Elcee The Alchemist',
  description: 'Book studio time, tutoring, or a mix and master. Pick your service and choose a time.',
};

export default function BookingPage() {
  return <BookingContent />;
}
