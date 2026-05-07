import { NextResponse } from 'next/server';

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

const leadMagnets = {
  'studio-voucher': {
    subject: 'Your 10% discount code — The Alchemist Studio',
    getBody: (name: string) => `Hi${name ? ' ' + name : ''},

Here is your discount code for The Alchemist Studio:

WELCOME10 — 10% off your first booking

Works on recording, mixing, mastering, or tutoring. Mention the code when booking.

Book here: https://elceethealchemist.com/studio

Questions? Just reply to this email.

Elcee
The Alchemist Studio, Manchester
https://elceethealchemist.com`,
  },
};

export async function POST(request: Request) {
  try {
    const { email, name, type } = await request.json();

    if (!email || !type || !leadMagnets[type as keyof typeof leadMagnets]) {
      return NextResponse.json(
        { error: 'Invalid request' },
        { status: 400 }
      );
    }

    const magnet = leadMagnets[type as keyof typeof leadMagnets];

    const resend = getResend();
    if (!resend) {
      console.warn('Resend API key not configured, skipping email send');
      return NextResponse.json({
        success: false,
        error: 'Email service not configured',
      }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Elcee <noreply@elceethealchemist.com>',
      to: email,
      subject: magnet.subject,
      text: magnet.getBody(name || ''),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email send error:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}
