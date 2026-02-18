import { NextResponse } from 'next/server';
import { sendBookingNotification, sendCustomerConfirmation } from '@/lib/email-service';

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

    // Send notification to studio owner
    const notificationResult = await sendBookingNotification(data);
    
    // Send confirmation to customer (best effort)
    await sendCustomerConfirmation(data).catch(err => {
      console.error('Customer confirmation failed (non-critical):', err);
    });

    // Log to Vercel logs for debugging
    console.log('✅ Booking processed:', {
      name: data.name,
      email: data.email,
      service: data.service,
      date: data.date,
      method: notificationResult.method,
      timestamp: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true, 
      message: 'Booking request received. We\'ll contact you within 24 hours.',
      method: notificationResult.method // For debugging
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
