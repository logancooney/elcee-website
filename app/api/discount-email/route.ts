import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, name: rawName } = body;

    if (!email || typeof email !== 'string' || !EMAIL_RE.test(email)) {
      return NextResponse.json({ error: 'Valid email required' }, { status: 400 });
    }

    const safeName = typeof rawName === 'string' ? rawName.trim().slice(0, 100) : null;

    const db = getSupabase();
    if (db) {
      await fetch(`${db.url}/rest/v1/studio_leads`, {
        method: 'POST',
        headers: {
          apikey: db.key,
          Authorization: `Bearer ${db.key}`,
          'Content-Type': 'application/json',
          Prefer: 'return=minimal',
        },
        body: JSON.stringify({
          email,
          name: safeName,
          source: 'free-page-discount',
          service: 'discount-capture',
          status: 'new',
          notes: 'Requested WELCOME10 discount code',
        }),
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
