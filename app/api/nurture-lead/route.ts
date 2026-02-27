import { NextRequest, NextResponse } from 'next/server';

// Track chat sessions that didn't convert to bookings
interface ChatSession {
  sessionId: string;
  email?: string;
  lastActivity: number;
  conversationSummary: string[];
}

const activeSessions: Map<string, ChatSession> = new Map();

export async function POST(request: NextRequest) {
  try {
    const { sessionId, email, conversationSummary } = await request.json();

    // Store session data
    activeSessions.set(sessionId, {
      sessionId,
      email,
      lastActivity: Date.now(),
      conversationSummary: conversationSummary || [],
    });

    // If we have an email and session is older than 24 hours, send nurture email
    if (email) {
      setTimeout(() => sendNurtureEmail(sessionId), 24 * 60 * 60 * 1000); // 24 hours
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Nurture tracking error:', error);
    return NextResponse.json({ error: 'Failed to track session' }, { status: 500 });
  }
}

async function sendNurtureEmail(sessionId: string) {
  const session = activeSessions.get(sessionId);
  if (!session || !session.email) return;

  const resendApiKey = process.env.RESEND_API_KEY;
  if (!resendApiKey) return;

  try {
    const { Resend } = require('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'Elcee <studio@elceethealchemist.com>',
      to: session.email,
      subject: 'Still thinking about your studio session?',
      html: `
        <h2>Hey,</h2>
        
        <p>I noticed you were checking out studio time yesterday but didn't book yet.</p>
        
        <p>No pressure — but if you're still interested, I wanted to offer <strong>10% off your first session</strong> to make the decision easier.</p>
        
        <p><strong>Use code: FIRST10</strong> when you book.</p>
        
        <p>Here's what you were looking at:</p>
        <ul>
          <li>Recording sessions: £35/hr (£31.50 with discount)</li>
          <li>Mixing: £190-340 (£171-306 with discount)</li>
          <li>Same-day mixing available</li>
          <li>Unlimited revisions</li>
        </ul>
        
        <p><a href="https://elceethealchemist.com/studio" style="background: #333; color: white; padding: 12px 24px; text-decoration: none; border-radius: 5px; display: inline-block; margin-top: 10px;">Book Your Session (10% Off)</a></p>
        
        <p>Got questions? Just reply to this email — I read everything personally.</p>
        
        <p>Cheers,<br>
        Elcee<br>
        <small>The Alchemist Studio, Manchester</small></p>
        
        <hr style="margin-top: 30px; border: none; border-top: 1px solid #ddd;">
        <p style="font-size: 12px; color: #666;">You received this because you chatted with our website assistant. Not interested? No worries — you won't hear from me again.</p>
      `,
    });

    // Clean up session after sending
    activeSessions.delete(sessionId);
  } catch (error) {
    console.error('Failed to send nurture email:', error);
  }
}
