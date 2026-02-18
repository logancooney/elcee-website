// Email service for booking notifications
// Supports multiple providers: Resend, SendGrid, or fallback to fetch API

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date?: string;
  time?: string;
  message?: string;
}

export async function sendBookingNotification(booking: BookingData) {
  const emailBody = formatBookingEmail(booking);
  
  // Debug logging
  console.log('🔍 Email service check:', {
    hasApiKey: !!process.env.RESEND_API_KEY,
    apiKeyPrefix: process.env.RESEND_API_KEY?.substring(0, 5),
    bookingEmail: process.env.BOOKING_EMAIL,
  });
  
  // Try Resend if API key is configured
  if (process.env.RESEND_API_KEY) {
    console.log('✉️ Attempting to send via Resend...');
    return await sendViaResend(booking, emailBody);
  }
  
  // Fallback: Log to console (visible in Vercel logs)
  console.log('⚠️ No RESEND_API_KEY - falling back to console logging');
  console.log('📧 BOOKING RECEIVED:', emailBody);
  return { success: true, method: 'console' };
}

async function sendViaResend(booking: BookingData, emailBody: string) {
  try {
    console.log('📤 Calling Resend API...');
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elcee Studio Bookings <onboarding@resend.dev>',
        to: [process.env.BOOKING_EMAIL || 'elcee.mgmt@gmail.com'],
        subject: `New Studio Booking: ${booking.service}`,
        text: emailBody,
        html: formatBookingEmailHTML(booking),
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Resend API error:', response.status, errorText);
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const data = await response.json();
    console.log('✅ Resend success:', data.id);
    return { success: true, method: 'resend', id: data.id };
  } catch (error) {
    console.error('Resend failed:', error);
    // Fallback to console logging
    console.log('📧 BOOKING (Resend failed):', emailBody);
    return { success: true, method: 'console-fallback', error };
  }
}

function formatBookingEmail(booking: BookingData): string {
  return `
NEW STUDIO BOOKING REQUEST
==========================

Client Details:
- Name: ${booking.name}
- Email: ${booking.email}
- Phone: ${booking.phone || 'Not provided'}

Booking Details:
- Service: ${booking.service}
- Preferred Date: ${booking.date || 'Not specified'}
- Preferred Time: ${booking.time || 'Not specified'}

Additional Information:
${booking.message || 'None provided'}

---
Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
Reply to client at: ${booking.email}
  `.trim();
}

function formatBookingEmailHTML(booking: BookingData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { background: #f9f9f9; padding: 20px; margin: 20px 0; }
        .detail { margin: 10px 0; }
        .label { font-weight: bold; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 20px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>New Studio Booking</h1>
        </div>
        <div class="content">
          <h2>Client Details</h2>
          <div class="detail"><span class="label">Name:</span> ${booking.name}</div>
          <div class="detail"><span class="label">Email:</span> ${booking.email}</div>
          <div class="detail"><span class="label">Phone:</span> ${booking.phone || 'Not provided'}</div>
          
          <h2>Booking Details</h2>
          <div class="detail"><span class="label">Service:</span> ${booking.service}</div>
          <div class="detail"><span class="label">Preferred Date:</span> ${booking.date || 'Not specified'}</div>
          <div class="detail"><span class="label">Preferred Time:</span> ${booking.time || 'Not specified'}</div>
          
          ${booking.message ? `
            <h2>Additional Information</h2>
            <div class="detail">${booking.message}</div>
          ` : ''}
        </div>
        <div class="footer">
          Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}<br>
          Reply to: <a href="mailto:${booking.email}">${booking.email}</a>
        </div>
      </div>
    </body>
    </html>
  `;
}

export async function sendCustomerConfirmation(booking: BookingData) {
  if (!process.env.RESEND_API_KEY) {
    return { success: false, reason: 'no-api-key' };
  }

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Elcee the Alchemist Studio <onboarding@resend.dev>',
        to: [booking.email],
        subject: 'Studio Booking Request Received',
        text: formatConfirmationEmail(booking),
        html: formatConfirmationEmailHTML(booking),
      }),
    });

    if (!response.ok) {
      throw new Error(`Resend API error: ${response.statusText}`);
    }

    const data = await response.json();
    return { success: true, id: data.id };
  } catch (error) {
    console.error('Customer confirmation failed:', error);
    return { success: false, error };
  }
}

function formatConfirmationEmail(booking: BookingData): string {
  return `
Hi ${booking.name},

Thanks for your studio booking request!

We've received your enquiry for: ${booking.service}
${booking.date ? `Preferred date: ${booking.date}` : ''}
${booking.time ? `Preferred time: ${booking.time}` : ''}

We'll review your request and get back to you within 24 hours to confirm availability.

If you have any questions in the meantime, just reply to this email.

Best,
Elcee the Alchemist
Manchester Recording Studio

---
elceethealchemist.com/studio
  `.trim();
}

function formatConfirmationEmailHTML(booking: BookingData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #000; color: #fff; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .booking-summary { background: #f9f9f9; padding: 15px; margin: 20px 0; border-left: 4px solid #000; }
        .footer { text-align: center; color: #666; font-size: 12px; margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Booking Request Received</h1>
        </div>
        <div class="content">
          <p>Hi ${booking.name},</p>
          <p>Thanks for your studio booking request!</p>
          
          <div class="booking-summary">
            <strong>Your Request:</strong><br>
            Service: ${booking.service}<br>
            ${booking.date ? `Preferred Date: ${booking.date}<br>` : ''}
            ${booking.time ? `Preferred Time: ${booking.time}<br>` : ''}
          </div>
          
          <p>We'll review your request and get back to you within 24 hours to confirm availability.</p>
          <p>If you have any questions in the meantime, just reply to this email.</p>
          
          <p>Best,<br>
          <strong>Elcee the Alchemist</strong><br>
          Manchester Recording Studio</p>
        </div>
        <div class="footer">
          <a href="https://elceethealchemist.com/studio">elceethealchemist.com/studio</a>
        </div>
      </div>
    </body>
    </html>
  `;
}
