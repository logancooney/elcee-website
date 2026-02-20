import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import { Resend } from 'resend';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || '', {
  apiVersion: '2024-12-18.acacia',
});

const resend = new Resend(process.env.RESEND_API_KEY);

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

  // TODO: Create calendar event (when calendar API is set up)
}

async function handleFailedPayment(paymentIntent: Stripe.PaymentIntent) {
  const { clientEmail, clientName } = paymentIntent.metadata;
  
  console.log(`❌ Payment failed: ${paymentIntent.id} - ${clientName}`);

  // Send friendly retry email
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
