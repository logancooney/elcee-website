import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for demo (replace with database later)
let chatMessages: { id: string; message: string; sender: 'user' | 'bot'; timestamp: number }[] = [];

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Store user message
    const userMsg = {
      id: `${Date.now()}-user`,
      message,
      sender: 'user' as const,
      timestamp: Date.now(),
    };
    chatMessages.push(userMsg);

    // Auto-response logic
    const response = await generateResponse(message);

    // Store bot response
    const botMsg = {
      id: `${Date.now()}-bot`,
      message: response.message,
      sender: 'bot' as const,
      timestamp: Date.now(),
    };
    chatMessages.push(botMsg);

    // If needs human attention, notify via OpenClaw
    if (response.needsHuman) {
      await notifyHuman(message, sessionId);
    }

    return NextResponse.json({ 
      response: botMsg,
      needsHuman: response.needsHuman 
    });
  } catch (error) {
    console.error('Chat API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

async function generateResponse(message: string): Promise<{ message: string; needsHuman: boolean }> {
  const lowerMessage = message.toLowerCase();

  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
    if (lowerMessage.includes('mix') && lowerMessage.includes('master')) {
      return {
        message: "Full mix & master is £340 per track. This includes unlimited revisions until you're happy. Want to book a session?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('mix') || lowerMessage.includes('mixing')) {
      return {
        message: "Vocal mixing is £190 per track. Full mix & master is £340. All include unlimited revisions. Ready to book?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('master')) {
      return {
        message: "Mastering is £40 per track. Fast turnaround, usually 24-48 hours. Want to book?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('record')) {
      return {
        message: "Recording sessions are £35/hr (or £30/hr with a monthly subscription). Book online 24/7 at elceethealchemist.com/studio",
        needsHuman: false,
      };
    }
    return {
      message: "Here's our pricing:\n\n• Recording: £35/hr\n• Vocal Mix: £190\n• Full Mix & Master: £340\n• Mastering: £40\n• Production: Custom pricing\n\nAll services include unlimited revisions. What are you working on?",
      needsHuman: false,
    };
  }

  // Booking/availability
  if (lowerMessage.includes('book') || lowerMessage.includes('available') || lowerMessage.includes('appointment') || lowerMessage.includes('session')) {
    return {
      message: "You can book studio time directly here: elceethealchemist.com/studio\n\nThe calendar shows real-time availability. Pick your time slots and book instantly. Need help with anything specific?",
      needsHuman: false,
    };
  }

  // Location
  if (lowerMessage.includes('location') || lowerMessage.includes('where') || lowerMessage.includes('address')) {
    return {
      message: "We're based in Manchester city centre (M7 1UY). Exact address provided once you book a session. Easy access via public transport.",
      needsHuman: false,
    };
  }

  // Services
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you') || lowerMessage.includes('do you offer')) {
    return {
      message: "We offer:\n\n🎙️ Recording & Engineering\n🎚️ Mixing (vocal or full)\n✨ Mastering\n🎹 Music Production\n📚 Ableton Tutoring\n\nAll services include unlimited revisions. 6+ years experience, specializing in alternative hip-hop and rap. What are you looking for?",
      needsHuman: false,
    };
  }

  // Examples/portfolio
  if (lowerMessage.includes('example') || lowerMessage.includes('portfolio') || lowerMessage.includes('hear') || lowerMessage.includes('listen')) {
    return {
      message: "You can hear my work on all streaming platforms — search 'Elcee the Alchemist'. I produce, mix, and master all my own music (40+ tracks released).\n\nWorked with JBL, adidas, and Boiler Room. Want me to send before/after examples of client work?",
      needsHuman: true, // Flag for human to send specific examples
    };
  }

  // Turnaround time
  if (lowerMessage.includes('how long') || lowerMessage.includes('turnaround') || lowerMessage.includes('when') || lowerMessage.includes('deadline')) {
    return {
      message: "Typical turnaround:\n\n• Mixing: 3-5 days\n• Mastering: 24-48 hours\n• Same-day mixing available for urgent projects (+40%)\n\nGot a deadline? Let me know and we'll make it work.",
      needsHuman: false,
    };
  }

  // Greeting
  if (lowerMessage.includes('hello') || lowerMessage.includes('hi') || lowerMessage.includes('hey')) {
    return {
      message: "Hey! 👋 Welcome to The Alchemist Studio. I'm here to help with any questions about recording, mixing, mastering, or production.\n\nWhat are you working on?",
      needsHuman: false,
    };
  }

  // Default: flag for human
  return {
    message: "Good question! Let me connect you with Elcee directly — they'll get back to you ASAP (usually within an hour).\n\nIn the meantime, you can book studio time directly at elceethealchemist.com/studio or check out pricing and services above.",
    needsHuman: true,
  };
}

async function notifyHuman(message: string, sessionId: string) {
  try {
    // Call OpenClaw gateway to send Telegram notification
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18789';
    const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN;

    if (!gatewayToken) {
      console.warn('No gateway token configured - skipping notification');
      return;
    }

    await fetch(`${gatewayUrl}/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gatewayToken}`,
      },
      body: JSON.stringify({
        channel: 'telegram',
        target: '5795553483', // Elcee's Telegram user ID
        message: `🔔 **Studio Chat Alert**\n\nNew message needs your attention:\n\n"${message}"\n\nSession: ${sessionId}\n\nRespond via website admin or reply here.`,
      }),
    });
  } catch (error) {
    console.error('Failed to notify human:', error);
  }
}

export async function GET(request: NextRequest) {
  // Return recent messages (for admin view later)
  const recent = chatMessages.slice(-50);
  return NextResponse.json({ messages: recent });
}
