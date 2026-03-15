import { NextResponse } from 'next/server';

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return null;
  return { url, key };
}

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

const MAGNETS: Record<string, { label: string; service: string }> = {
  'release-checklist': {
    label: 'Music Release Checklist',
    service: 'lead-magnet-release-checklist',
  },
  'stem-prep-guide': {
    label: 'Stem Prep Guide for Mix Engineers',
    service: 'lead-magnet-stem-prep',
  },
  'home-recording-guide': {
    label: 'Home Recording Guide for Rappers',
    service: 'lead-magnet-home-recording',
  },
  'mix-ready-checklist': {
    label: 'Mix-Ready Track Checklist',
    service: 'lead-magnet-mix-ready',
  },
};

export async function POST(request: Request) {
  try {
    const { email, name, magnet } = await request.json();

    if (!email || !magnet || !MAGNETS[magnet]) {
      return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }

    const { label, service } = MAGNETS[magnet];

    // 1. Log to Supabase studio_leads
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
          name: name || null,
          source: 'free-page',
          service,
          status: 'new',
          notes: `Downloaded: ${label}`,
        }),
      });
    }

    // 2. Send confirmation email via Resend
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
