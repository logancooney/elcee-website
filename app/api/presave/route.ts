import { NextRequest, NextResponse } from 'next/server';

interface PreSaveSubmission {
  name: string;
  email: string;
  socialHandle?: string;
  phone?: string;
  platform: 'spotify' | 'apple';
  releaseId: string;
  releaseTitle: string;
  timestamp: string;
}

// In-memory store (will persist to Google Sheets/Resend later)
const preSaves: PreSaveSubmission[] = [];

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    
    // Validation
    if (!data.name?.trim()) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }
    
    if (!data.email?.trim()) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email)) {
      return NextResponse.json({ error: 'Invalid email format' }, { status: 400 });
    }
    
    if (!data.platform || !['spotify', 'apple'].includes(data.platform)) {
      return NextResponse.json({ error: 'Invalid platform' }, { status: 400 });
    }
    
    if (!data.releaseId?.trim()) {
      return NextResponse.json({ error: 'Release ID required' }, { status: 400 });
    }
    
    // Create submission
    const submission: PreSaveSubmission = {
      name: data.name.trim(),
      email: data.email.trim().toLowerCase(),
      socialHandle: data.socialHandle?.trim() || undefined,
      phone: data.phone?.trim() || undefined,
      platform: data.platform,
      releaseId: data.releaseId,
      releaseTitle: data.releaseTitle || 'Unknown Release',
      timestamp: new Date().toISOString(),
    };
    
    // Store in memory
    preSaves.push(submission);
    
    // Save to Resend Contacts
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const { Resend } = require('resend');
        const resend = new Resend(resendApiKey);
        
        await resend.contacts.create({
          email: submission.email,
          firstName: submission.name,
          unsubscribed: false,
        });
        
        // Send confirmation email
        await resend.emails.send({
          from: 'Elcee <studio@elceethealchemist.com>',
          to: submission.email,
          subject: `✅ Pre-save confirmed: ${submission.releaseTitle}`,
          html: `
            <h2>Thanks for pre-saving!</h2>
            <p>Hey ${submission.name},</p>
            <p>You're all set — <strong>${submission.releaseTitle}</strong> is pre-saved on ${submission.platform === 'spotify' ? 'Spotify' : 'Apple Music'}.</p>
            <p>I'll email you on release day so you don't miss it.</p>
            <p>Appreciate the support,<br>Elcee</p>
            <hr>
            <p style="font-size: 12px; color: #666;">The Alchemist Studio | Manchester</p>
          `,
        });
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError);
        // Don't fail the request if email fails
      }
    }
    
    // Return success with redirect URL
    return NextResponse.json({ 
      success: true,
      redirectUrl: data.platform === 'spotify' ? data.spotifyUrl : data.appleUrl,
    });
    
  } catch (error) {
    console.error('Pre-save submission error:', error);
    return NextResponse.json({ 
      error: 'Failed to process pre-save' 
    }, { status: 500 });
  }
}

// GET endpoint to retrieve pre-saves (for admin)
export async function GET(request: NextRequest) {
  const url = new URL(request.url);
  const releaseId = url.searchParams.get('releaseId');
  
  if (releaseId) {
    const releasePreSaves = preSaves.filter(p => p.releaseId === releaseId);
    return NextResponse.json({ 
      count: releasePreSaves.length,
      preSaves: releasePreSaves 
    });
  }
  
  return NextResponse.json({ 
    count: preSaves.length,
    preSaves 
  });
}
