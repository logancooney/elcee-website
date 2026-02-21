import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2026-01-28.clover',
});

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET || ''
    );
  } catch (err: any) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  // Handle different event types
  switch (event.type) {
    case 'payment_intent.succeeded':
      const paymentIntent = event.data.object as Stripe.PaymentIntent;
      await handleSuccessfulPayment(paymentIntent);
      break;

    case 'payment_intent.payment_failed':
      const failedIntent = event.data.object as Stripe.PaymentIntent;
      await handleFailedPayment(failedIntent);
      break;

    case 'charge.refunded':
      const refund = event.data.object as Stripe.Charge;
      await handleRefund(refund);
      break;

    default:
      console.log(`Unhandled event type: ${event.type}`);
  }

  return NextResponse.json({ received: true });
}

async function handleSuccessfulPayment(paymentIntent: Stripe.PaymentIntent) {
  const { service, hours, isDeposit, clientName, clientEmail } = paymentIntent.metadata;

  console.log(`✅ Payment succeeded: ${paymentIntent.id} - ${clientName} - £${paymentIntent.amount / 100}`);

  // Send confirmation email
  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: 'The Alchemist Studio <bookings@elceethealchemist.com>',
        to: clientEmail,
        subject: isDeposit === 'true' ? 'Deposit Received - Project Starting Soon' : 'Booking Confirmed - Session Details',
        text: isDeposit === 'true' 
          ? generateDepositConfirmation(clientName, service, paymentIntent.amount / 100)
          : generateSessionConfirmation(clientName, service, hours)
      });
    } catch (error) {
      console.error('Failed to send confirmation email:', error);
    }
  }

  // Save to CRM (Google Sheets)
  try {
    await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/lead-capture`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: clientEmail,
        name: clientName,
        leadMagnet: `studio-booking-paid (${service})`,
        timestamp: new Date().toISOString()
      })
    });
  } catch (error) {
    console.error('Failed to save to CRM:', error);
  }

  // Create calendar event
  if (paymentIntent.metadata.bookingDate && paymentIntent.metadata.selectedSlots) {
    try {
      await createCalendarEvent({
        clientName,
        clientEmail,
        service,
        date: paymentIntent.metadata.bookingDate,
        timeSlots: paymentIntent.metadata.selectedSlots,
        hours: hours || '2',
        isDeposit: isDeposit === 'true'
      });
    } catch (error) {
      console.error('Failed to create calendar event:', error);
    }
  }
}

async function createCalendarEvent(booking: {
  clientName: string;
  clientEmail: string;
  service: string;
  date: string;
  timeSlots: string;
  hours: string;
  isDeposit: boolean;
}) {
  const MATON_KEY = process.env.MATON_API_KEY;
  
  if (!MATON_KEY) {
    console.warn('MATON_API_KEY not configured - skipping calendar event');
    return;
  }

  // Parse time slots (e.g., "10:00,12:00" or "10:00")
  const slots = booking.timeSlots.split(',').map(s => s.trim());
  const startTime = slots[0];
  const durationHours = parseInt(booking.hours);
  
  // Calculate start and end times
  const startDateTime = new Date(`${booking.date}T${startTime}:00`);
  const endDateTime = new Date(startDateTime);
  endDateTime.setHours(endDateTime.getHours() + durationHours);

  // Create event in "Daily" calendar
  const eventData = {
    summary: `${booking.service} - ${booking.clientName}`,
    description: booking.isDeposit 
      ? `Project work (deposit paid)\nClient: ${booking.clientName}\nEmail: ${booking.clientEmail}`
      : `Studio session\nClient: ${booking.clientName}\nEmail: ${booking.clientEmail}\nDuration: ${booking.hours} hours`,
    start: {
      dateTime: startDateTime.toISOString(),
      timeZone: 'Europe/London'
    },
    end: {
      dateTime: endDateTime.toISOString(),
      timeZone: 'Europe/London'
    },
    attendees: [
      { email: booking.clientEmail }
    ],
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 }, // 24 hours before
        { method: 'popup', minutes: 60 }       // 1 hour before
      ]
    }
  };

  // Create event on Daily calendar (automation account now has editor access)
  const response = await fetch('https://gateway.maton.ai/google-calendar/calendar/v3/calendars/4bde58e7465993008e9a664f9d7f9b94f8e165edca1d334c512b948b29264c8e@group.calendar.google.com/events', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${MATON_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(eventData)
  });

  if (!response.ok) {
    throw new Error(`Calendar event creation failed: ${response.status}`);
  }

  const event = await response.json();
  console.log(`✅ Calendar event created: ${event.id}`);
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { clientEmail, clientName } = paymentIntent.metadata;
  
  console.log(`❌ Payment failed: ${paymentIntent.id} - ${clientName}`);

  // Send friendly retry email
  const resend = getResend();
  if (resend) {
    try {
      await resend.emails.send({
        from: 'The Alchemist Studio <bookings@elceethealchemist.com>',
        to: clientEmail,
        subject: 'Booking Payment Issue',
        text: `Hi ${clientName},

We had an issue processing your payment for your studio booking.

This usually happens due to:
• Insufficient funds
• Card security check
• Incorrect card details

Please try again or use a different payment method: https://elceethealchemist.com/studio

If you continue having issues, reply to this email and we'll sort it out.

Cheers,
Elcee
The Alchemist Studio`
      });
    } catch (error) {
      console.error('Failed to send payment failed email:', error);
    }
  }
}

async function handleRefund(charge: Stripe.Charge) {
  console.log(`💰 Refund processed: ${charge.id}`);
  
  // Log refund, update CRM status, etc.
}

function generateSessionConfirmation(name: string, service: string, hours: string): string {
  return `Hi ${name},

Your studio session is confirmed and paid! ✅

**Session Details:**
Service: ${service}
Duration: ${hours} hour${parseInt(hours) > 1 ? 's' : ''}
Payment: Complete

**What to bring:**
• Reference tracks (if applicable)
• Project files (if applicable)
• Ideas/lyrics/notes
• Good vibes!

**Location:**
The Alchemist Studio
Manchester, UK

Your session is now in the calendar. We'll send a reminder 24 hours before.

Looking forward to working together!

Elcee
The Alchemist Studio
https://elceethealchemist.com`;
}

function generateDepositConfirmation(name: string, service: string, depositAmount: number): string {
  return `Hi ${name},

Your 50% deposit (£${depositAmount}) has been received! ✅

**Project Details:**
Service: ${service}
Deposit: £${depositAmount} paid
Balance: £${depositAmount} (due on completion)

**Next Steps:**
1. We'll send you the contract to review (within 24 hours)
2. Once signed, project starts
3. Estimated completion: 3-5 days
4. Final payment due before file delivery

We'll keep you updated throughout the process.

Any questions? Just reply to this email.

Cheers,
Elcee
The Alchemist Studio
https://elceethealchemist.com`;
}
