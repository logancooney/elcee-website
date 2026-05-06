import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const { name, email, subject, message } = await request.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await resend.emails.send({
      from: 'Elcee Website <contact@elceethealchemist.com>',
      to: 'elcee.automation@gmail.com',
      replyTo: email,
      subject: `New message from ${name} — ${subject}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Subject: ${subject}`,
        '',
        message,
        '',
        `---`,
        `Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}`,
        `Reply directly to this email to respond to ${name}.`,
      ].join('\n'),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
