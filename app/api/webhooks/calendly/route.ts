import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { upsertContact, logEvent } from '@/lib/supabase-contacts';
import { createHmac, timingSafeEqual } from 'crypto';

function verifySignature(rawBody: string, header: string | null): boolean {
  const signingKey = process.env.CALENDLY_WEBHOOK_SIGNING_KEY;
  if (!signingKey) return true; // key not configured yet — allow through but log
  if (!header) return false;

  // Header format: "t=<timestamp>,v1=<signature>"
  const parts = Object.fromEntries(header.split(',').map(p => p.split('=')));
  const timestamp = parts['t'];
  const receivedSig = parts['v1'];
  if (!timestamp || !receivedSig) return false;

  const payload = `${timestamp}.${rawBody}`;
  const expected = createHmac('sha256', signingKey).update(payload).digest('hex');

  try {
    return timingSafeEqual(Buffer.from(receivedSig, 'hex'), Buffer.from(expected, 'hex'));
  } catch {
    return false;
  }
}

function deriveService(eventName: string): string {
  const n = eventName.toLowerCase();
  if (n.includes('studio')) return 'studio-session';
  if (n.includes('tutor')) return 'tutoring';
  if (n.includes('mix')) return 'mixing';
  if (n.includes('master')) return 'mastering';
  if (n.includes('review') || n.includes('free')) return 'free-track-review';
  return 'booking';
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const sig = req.headers.get('Calendly-Webhook-Signature');

  if (!verifySignature(rawBody, sig)) {
    console.warn('Calendly webhook: invalid signature');
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: Record<string, unknown>;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: 'Bad request' }, { status: 400 });
  }

  const event = body?.event as string | undefined;
  const payload = body?.payload as Record<string, unknown> | undefined;

  if (event !== 'invitee.created') {
    return NextResponse.json({ received: true });
  }

  try {
    const invitee = payload?.invitee as Record<string, unknown> | undefined;
    const scheduledEvent = payload?.scheduled_event as Record<string, unknown> | undefined;
    const questions = (payload?.questions_and_answers as Array<{ question: string; answer: string }>) ?? [];

    const name = (invitee?.name as string) ?? '';
    const email = (invitee?.email as string) ?? '';
    const eventName = (scheduledEvent?.name as string) ?? '';
    const startTime = (scheduledEvent?.start_time as string) ?? null;

    if (!email) {
      return NextResponse.json({ received: true });
    }

    const service = deriveService(eventName);
    const qaMeta = questions.reduce<Record<string, string>>((acc, q) => {
      acc[q.question] = q.answer;
      return acc;
    }, {});

    const contactId = await upsertContact({
      email,
      name: name || null,
      source: 'calendly',
      notes: startTime ? `Booked: ${eventName} at ${startTime}` : null,
    });

    if (contactId) {
      await logEvent({
        contactId,
        eventType: 'booking_created',
        metadata: { service, eventName, startTime, ...qaMeta },
      });
    }

    // Send booking confirmation email
    if (process.env.RESEND_API_KEY && email) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      const formattedTime = startTime
        ? new Date(startTime).toLocaleString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            timeZone: 'Europe/London',
          })
        : null;

      await resend.emails.send({
        from: 'Elcee <noreply@elceethealchemist.com>',
        to: email,
        subject: `Booking confirmed${formattedTime ? ` — ${formattedTime}` : ''}`,
        text: [
          `Hey${name ? ' ' + name : ''},`,
          '',
          `Your booking is confirmed — ${eventName}.`,
          ...(formattedTime ? [`\nDate: ${formattedTime} (UK time)`, ''] : ['']),
          "I'll send a reminder 24 hours before. If anything changes, reply to this email or use the reschedule link in your Calendly confirmation.",
          '',
          'See you soon,',
          '~ Elcee x',
          '',
          '─────────────────────────',
          'Elcee the Alchemist — Manchester',
          'elceethealchemist.com',
        ].join('\n'),
      }).catch(err => console.error('Calendly confirmation email failed:', err));
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Calendly webhook error:', err);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
