import { NextResponse } from 'next/server';
import { sendBookingNotification, sendCustomerConfirmation } from '@/lib/email-service';
import { saveToGoogleSheets } from '@/lib/google-sheets';
import { createTentativeBooking } from '@/lib/google-calendar';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Validate required fields
    if (!data.name || !data.email || !data.service) {
      return NextResponse.json(
        { success: false, message: 'Missing required fields: name, email, service' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json(
        { success: false, message: 'Invalid email address' },
        { status: 400 }
      );
    }

    // Run all booking actions in parallel (best effort)
    const [emailResult, sheetsResult, calendarResult] = await Promise.allSettled([
      // 1. Send email notification (critical)
      sendBookingNotification(data),
      
      // 2. Save to Google Sheets CRM (important but not critical)
      saveToGoogleSheets(data),
      
      // 3. Create tentative calendar event (if date/time provided)
      data.date && data.time 
        ? createTentativeBooking(data.name, data.email, data.service, data.date, data.time)
        : Promise.resolve({ success: false, reason: 'no-date-time' }),
    ]);

    // Send customer confirmation (best effort)
    await sendCustomerConfirmation(data).catch(err => {
      console.error('Customer confirmation failed (non-critical):', err);
    });

    // Log comprehensive result
    console.log('✅ Booking processed:', {
      name: data.name,
      email: data.email,
      service: data.service,
      date: data.date,
      time: data.time,
      emailNotification: emailResult.status === 'fulfilled' ? emailResult.value.method : 'failed',
      sheets: sheetsResult.status === 'fulfilled' ? sheetsResult.value.success : false,
      calendar: calendarResult.status === 'fulfilled' ? calendarResult.value.success : false,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request received. We\'ll contact you within 24 hours.',
      details: { // For debugging (only visible to you in logs)
        email: emailResult.status === 'fulfilled',
        crm: sheetsResult.status === 'fulfilled' && sheetsResult.value.success,
        calendar: calendarResult.status === 'fulfilled' && calendarResult.value.success,
      }
    });
    
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json(
      { 
        success: false, 
        message: 'Failed to submit booking. Please email elcee.mgmt@gmail.com directly.' 
      },
      { status: 500 }
    );
  }
}
