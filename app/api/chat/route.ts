import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for demo (replace with database later)
let chatMessages: { id: string; message: string; sender: 'user' | 'bot'; timestamp: number; sessionId?: string }[] = [];
const sessionContexts: Record<string, string[]> = {};

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Initialize session context if needed
    if (!sessionContexts[sessionId]) {
      sessionContexts[sessionId] = [];
    }

    // Store user message
    const userMsg = {
      id: `${Date.now()}-user`,
      message,
      sender: 'user' as const,
      timestamp: Date.now(),
      sessionId,
    };
    chatMessages.push(userMsg);
    sessionContexts[sessionId].push(`User: ${message}`);

    // Auto-response logic
    const response = await generateResponse(message, sessionContexts[sessionId]);

    // Store bot response
    const botMsg = {
      id: `${Date.now()}-bot`,
      message: response.message,
      sender: 'bot' as const,
      timestamp: Date.now(),
      sessionId,
    };
    chatMessages.push(botMsg);
    sessionContexts[sessionId].push(`Bot: ${response.message}`);

    // If needs human attention, notify via OpenClaw with full context
    if (response.needsHuman) {
      await notifyHuman(sessionContexts[sessionId], sessionId);
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

async function generateResponse(message: string, context: string[] = []): Promise<{ message: string; needsHuman: boolean }> {
  const lowerMessage = message.toLowerCase();

  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
    if (lowerMessage.includes('mix') && lowerMessage.includes('master')) {
      return {
        message: "Full mix & master is £340 per track. This includes unlimited revisions until you're happy.\n\nWhat genre are you working with? And how many tracks do you have?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('mix') || lowerMessage.includes('mixing')) {
      return {
        message: "Vocal mixing is £190 per track. Full mix & master is £340. All include unlimited revisions.\n\nTell me about your project — what genre and how many tracks?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('master')) {
      return {
        message: "Mastering is £40 per track. Fast turnaround, usually 24-48 hours.\n\nHow many tracks do you need mastered? Any specific deadline?",
        needsHuman: false,
      };
    }
    if (lowerMessage.includes('record')) {
      return {
        message: "Recording sessions are £35/hr (or £30/hr with a monthly subscription).\n\nWhat are you looking to record? Vocals, instruments, or a full band?",
        needsHuman: false,
      };
    }
    return {
      message: "Here's our pricing:\n\n• Recording: £35/hr\n• Vocal Mix: £190\n• Full Mix & Master: £340\n• Mastering: £40\n• Production: Custom pricing\n\nAll services include unlimited revisions. What kind of project are you working on?",
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
  if (lowerMessage.includes('example') || lowerMessage.includes('portfolio') || lowerMessage.includes('hear') || lowerMessage.includes('listen') || lowerMessage.includes('work')) {
    return {
      message: "You can hear my work on all streaming platforms — search 'Elcee the Alchemist'. I produce, mix, and master all my own music (40+ tracks released).\n\nWorked with JBL, adidas, and Boiler Room.\n\nWhat genre are you working in? I can point you to similar examples or share before/after clips from client work.",
      needsHuman: false,
    };
  }

  // Genre/style questions
  if (lowerMessage.includes('genre') || lowerMessage.includes('style') || lowerMessage.includes('type of music') || lowerMessage.includes('rap') || lowerMessage.includes('hip hop') || lowerMessage.includes('drill') || lowerMessage.includes('trap') || lowerMessage.includes('pop') || lowerMessage.includes('rock') || lowerMessage.includes('indie')) {
    return {
      message: "I specialize in alternative hip-hop and rap, but work with all genres. 6+ years experience across UK rap, drill, trap, indie, and experimental.\n\nWhat specific sound are you going for? Any reference tracks you're vibing with?",
      needsHuman: false,
    };
  }

  // Experience questions
  if (lowerMessage.includes('experience') || lowerMessage.includes('how long') || lowerMessage.includes('years') || lowerMessage.includes('professional')) {
    return {
      message: "6+ years producing, engineering, and releasing music professionally. 40+ tracks released, worked with JBL, adidas, Boiler Room.\n\nI'm an artist myself (alternative rap) so I understand the creative process from both sides.\n\nWhat brings you to the studio?",
      needsHuman: false,
    };
  }

  // Project details gathering
  if (lowerMessage.includes('track') || lowerMessage.includes('song') || lowerMessage.includes('album') || lowerMessage.includes('ep') || lowerMessage.includes('single')) {
    return {
      message: "Nice! Tell me more about your project:\n\n• How many tracks?\n• What genre/style?\n• What do you need? (recording, mixing, mastering, or production)\n• Any deadline?\n\nThis helps me give you accurate pricing and availability.",
      needsHuman: false,
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

  // Ready to connect with Elcee (after gathering info)
  if (lowerMessage.includes('sounds good') || lowerMessage.includes('perfect') || lowerMessage.includes('yes') || 
      lowerMessage.includes('that works') || lowerMessage.includes('let\'s do it') || lowerMessage.includes('book') ||
      lowerMessage.includes('connect me') || lowerMessage.includes('talk to elcee') || lowerMessage.includes('speak to')) {
    // Only flag if they seem ready and have provided some context
    const hasContext = message.split(' ').length > 3;
    if (hasContext) {
      return {
        message: "Perfect! I'm passing all your details to Elcee now. They'll get back to you within the hour (usually much faster).\n\nYou can also book studio time directly at elceethealchemist.com/studio if you want to lock in a slot right away.",
        needsHuman: true,
      };
    }
  }

  // Contact requests with info
  if ((lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call')) && 
      message.split(' ').length > 5) {
    return {
      message: "Great! I've got your details and I'm sending them to Elcee now. They'll reach out within the hour.\n\nFeel free to book online anytime at elceethealchemist.com/studio",
      needsHuman: true,
    };
  }

  // Check if user is providing details (numbers, genres, specific info)
  const hasDetails = /\d+/.test(message) || 
                     lowerMessage.length > 100 || 
                     (lowerMessage.includes('i') && (lowerMessage.includes('need') || lowerMessage.includes('want') || lowerMessage.includes('looking')));

  // If they're giving detailed info, gather it for Elcee
  if (hasDetails) {
    return {
      message: "Got it! That's really helpful.\n\nTo make sure Elcee has everything they need:\n\n• What's your timeline/deadline?\n• What's your budget range?\n• Any specific sound/vibe you're going for?\n\nOnce I have these details, I'll pass everything to Elcee and they'll get back to you within an hour.",
      needsHuman: false,
    };
  }

  // Default: gather more info before flagging
  return {
    message: "I can definitely help with that!\n\nTo give you the best answer, tell me a bit more:\n\n• What service are you interested in? (recording, mixing, mastering, production)\n• What genre/style?\n• How many tracks?\n• Any deadline?\n\nOr if you prefer, you can book directly at elceethealchemist.com/studio and we'll discuss details there.",
    needsHuman: false,
  };
}

async function notifyHuman(conversation: string[], sessionId: string) {
  try {
    // Call OpenClaw gateway to send Telegram notification
    const gatewayUrl = process.env.OPENCLAW_GATEWAY_URL || 'http://localhost:18789';
    const gatewayToken = process.env.OPENCLAW_GATEWAY_TOKEN;

    if (!gatewayToken) {
      console.warn('No gateway token configured - skipping notification');
      return;
    }

    // Format conversation nicely
    const conversationText = conversation
      .slice(-10) // Last 10 messages max
      .join('\n\n');

    await fetch(`${gatewayUrl}/api/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${gatewayToken}`,
      },
      body: JSON.stringify({
        channel: 'telegram',
        target: '5795553483', // Elcee's Telegram user ID
        message: `🔔 **Studio Inquiry Ready**\n\nConversation summary:\n\n${conversationText}\n\n---\nSession: ${sessionId}\nBook: elceethealchemist.com/studio`,
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
