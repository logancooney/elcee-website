import { NextResponse } from 'next/server';

function getResend() {
  if (!process.env.RESEND_API_KEY) return null;
  const { Resend } = require('resend');
  return new Resend(process.env.RESEND_API_KEY);
}

const leadMagnets = {
  'venues-guide': {
    subject: 'Your Manchester Venues Guide is Ready! 🎵',
    getBody: (name: string) => `Hi${name ? ' ' + name : ''},

Thanks for downloading the Manchester Music Venues Guide!

You can access the guide here:
[We'll add the actual PDF link or embed the content]

**What's Inside:**
✓ 20+ Manchester venues with direct contacts
✓ Capacity, genre, and booking lead time info
✓ Tips for getting booked

**Need Studio Services?**

Before you hit those stages, make sure your tracks sound professional:

The Alchemist Studio - Manchester
• Recording: £35/hr
• Mixing & Mastering: From £190
• Ableton Tutoring: £35/hr

Get 20% off your first session: https://elceethealchemist.com/studio
Use code: FIRST20

Any questions? Just reply to this email.

Cheers,
Elcee
The Alchemist Studio
https://elceethealchemist.com`
  },
  'release-checklist': {
    subject: 'Your Release Assets Checklist 📋',
    getBody: (name: string) => `Hi${name ? ' ' + name : ''},

Thanks for downloading the Release Assets Checklist!

Access your checklist here:
[We'll add the actual PDF link or embed the content]

**What's Included:**
✓ Audio files needed (master, stems, clean version)
✓ Visual assets (cover art, press photos)
✓ Metadata & distribution requirements
✓ Pre-release and post-release timeline

**Need Help With Any of These?**

The Alchemist Studio can handle:
• Recording & production
• Mixing & mastering  
• Stem creation
• Clean version editing
• Format conversion

Book your session: https://elceethealchemist.com/studio

**Special Offer:**
Get 20% off your first session - use code FIRST20

Questions? Just reply.

Cheers,
Elcee
The Alchemist Studio`
  },
  'studio-voucher': {
    subject: 'Your 20% Off Studio Voucher 🎙️',
    getBody: (name: string) => `Hi${name ? ' ' + name : ''},

Your studio voucher is ready!

**VOUCHER CODE: FIRST20**
**Discount: 20% off your first session**

**Discounted Rates:**
• Recording: £28/hr (normally £35/hr)
• Vocal Mix: £152 (normally £190)
• Full Mix & Master: £272 (normally £340)
• Mastering: £32/track (normally £40)
• Ableton Tutoring: £28/hr (normally £35/hr)

**Book Now:**
https://elceethealchemist.com/studio

When booking, mention code FIRST20 to claim your discount.

**What's Included:**
✓ Professional recording setup
✓ Industry-standard equipment & plugins
✓ Quick turnaround (3-5 days for mixing)
✓ Unlimited revisions until you're happy

**Valid for:**
• One use per client
• First booking only
• All services listed above
• Expires: 90 days from today

Questions or ready to book? Just reply to this email.

Looking forward to working together!

Elcee
The Alchemist Studio, Manchester
https://elceethealchemist.com`
  }
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
        error: 'Email service not configured' 
      }, { status: 500 });
    }

    await resend.emails.send({
      from: 'Elcee <noreply@elceethealchemist.com>',
      to: email,
      subject: magnet.subject,
      text: magnet.getBody(name || '')
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
