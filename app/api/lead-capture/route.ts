import { NextResponse } from 'next/server';
import { upsertContact, logEvent } from '@/lib/supabase-contacts';
import { rateLimit, ipKey } from '@/lib/rate-limit';

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

const MAGNETS: Record<string, { label: string; slug: string }> = {
  'release-checklist': {
    label: 'Music Release Checklist',
    slug: 'release-checklist',
  },
  'stem-prep-guide': {
    label: 'Stem Prep Guide for Mix Engineers',
    slug: 'stem-prep-guide',
  },
  'home-recording-guide': {
    label: 'Home Recording Guide for Rappers',
    slug: 'home-recording-guide',
  },
  'mix-ready-checklist': {
    label: 'Mix-Ready Track Checklist',
    slug: 'mix-ready-checklist',
  },
};

export async function POST(request: Request) {
  if (!rateLimit(ipKey(request), 10, 60_000)) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
  }
  try {
    const { email, name, magnet } = await request.json();

    if (!email || !magnet || !MAGNETS[magnet]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { label, slug } = MAGNETS[magnet];

    const contactId = await upsertContact({
      email,
      name: name || null,
      source: 'free-page',
      notes: `Downloaded: ${label}`,
    });

    if (contactId) {
      await logEvent({
        contactId,
        eventType: 'lead_magnet_download',
        metadata: { magnet: slug, label },
      });
    }

    const resend = getResend();
    if (resend) {
      await resend.emails.send({
        from: 'Elcee <noreply@elceethealchemist.com>',
        to: email,
        subject: `Your ${label} is on its way`,
        text: [
          `Hey${name ? ' ' + name : ''},`,
          '',
          `Thanks for grabbing the ${label}.`,
          '',
          "I'll get it over to you shortly — usually within a few hours.",
          '',
          'In the meantime, if you want honest feedback on your mix or production, book a free track review:',
          'https://elceethealchemist.com/free',
          '',
          '~ Elcee x',
        ].join('\n'),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
