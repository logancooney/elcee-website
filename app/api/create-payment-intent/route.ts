import { NextResponse } from 'next/server';
import Stripe from 'stripe';

// Initialize Stripe (will use test key until you add live key)
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

// Service pricing
const PRICING = {
  recording: { hourly: 3500, name: 'Recording Session' }, // £35/hr in pence
  tutoring: { hourly: 3500, name: 'Ableton Tutoring' },
  mixing_vocal: { deposit: 9500, total: 19000, name: 'Vocal Mix' },
  mixing_full: { deposit: 17000, total: 34000, name: 'Full Mix & Master' },
  mastering: { deposit: 2000, total: 4000, name: 'Mastering' },
};

export async function POST(request: Request) {
  try {
    const { service, hours, isDeposit, clientName, clientEmail } = await request.json();

    // Validate input
    if (!service || !clientName || !clientEmail) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate amount based on service
    let amount = 0;
    let description = '';

    if (service === 'recording' || service === 'tutoring') {
      // Hourly services - full payment
      if (!hours || hours < 1) {
        return NextResponse.json(
          { error: 'Hours required for this service' },
          { status: 400 }
        );
      }
      amount = PRICING[service].hourly * hours;
      description = `${PRICING[service].name} - ${hours} hour${hours > 1 ? 's' : ''}`;
    } else {
      // Project services - deposit or full
      const pricing = PRICING[service as keyof typeof PRICING];
      if (!pricing || !('deposit' in pricing)) {
        return NextResponse.json(
          { error: 'Invalid service' },
          { status: 400 }
        );
      }
      amount = isDeposit ? pricing.deposit : pricing.total;
      description = `${pricing.name} - ${isDeposit ? '50% Deposit' : 'Full Payment'}`;
    }

    // Create Stripe payment intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'gbp',
      description,
      metadata: {
        service,
        hours: hours?.toString() || '',
        isDeposit: isDeposit?.toString() || 'false',
        clientName,
        clientEmail,
      },
      receipt_email: clientEmail,
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      amount,
      description,
    });
  } catch (error: any) {
    console.error('Payment intent error:', error);
    return NextResponse.json(
      { error: error.message || 'Payment setup failed' },
      { status: 500 }
    );
  }
}
