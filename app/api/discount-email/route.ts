import { NextResponse } from 'next/server';
import { Resend } from 'resend';
import { upsertContact, logEvent } from '@/lib/supabase-contacts';
import { rateLimit, ipKey } from '@/lib/rate-limit';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  if (!rateLimit(ipKey(request), 5, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const body = await request.json();
    const { email, name: rawName } = body;

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const safeName = typeof rawName === 'string' ? rawName.trim().slice(0, 100) : null;

    const contactId = await upsertContact({
      email,
      name: safeName,
      source: 'free-page-discount',
      notes: 'Requested WELCOME10 discount code',
    });

    if (contactId) {
      await logEvent({
        contactId,
        eventType: 'discount_requested',
        metadata: { code: 'WELCOME10' },
      });
    }

    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      await resend.emails.send({
        from: 'Elcee <noreply@elceethealchemist.com>',
        to: email,
        subject: 'Your 10% discount code',
        text: [
          `Hey${safeName ? ' ' + safeName : ''},`,
          '',
          "Here's your 10% off code for your first booking:",
          '',
          '    WELCOME10',
          '',
          'Use it when booking any studio session, mix, master, or tutoring:',
          'https://elceethealchemist.com/booking',
          '',
          'No expiry. Works on everything.',
          '',
          '~ Elcee x',
        ].join('\n'),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Discount email error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
