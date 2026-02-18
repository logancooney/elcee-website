// Simple email notification handler
// This sends booking requests via email without requiring database setup
// Can be replaced with Google Sheets integration later

export async function sendBookingEmail(bookingData: any) {
  const emailBody = `
New Studio Booking Request
==========================

Name: ${bookingData.name}
Email: ${bookingData.email}
Phone: ${bookingData.phone || 'Not provided'}
Service: ${bookingData.service}
Preferred Date: ${bookingData.date || 'Not specified'}
Preferred Time: ${bookingData.time || 'Not specified'}

Additional Details:
${bookingData.message || 'None'}

---
Received: ${new Date().toLocaleString('en-GB', { timeZone: 'Europe/London' })}
  `.trim();

  // TODO: Integrate with email service (SendGrid/Resend/Nodemailer)
  // For now, log to console (will appear in Vercel logs)
  console.log('BOOKING REQUEST:', emailBody);
  
  // Return the email body so it can be used elsewhere if needed
  return emailBody;
}
