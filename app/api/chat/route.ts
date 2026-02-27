import { NextRequest, NextResponse } from 'next/server';

// Simple in-memory store for demo (replace with database later)
let chatMessages: { id: string; message: string; sender: 'user' | 'bot'; timestamp: number; sessionId?: string }[] = [];
const sessionContexts: Record<string, string[]> = {};

// Rate limiting store
const rateLimits = new Map<string, { count: number; resetAt: number }>();

function checkRateLimit(identifier: string): boolean {
  const now = Date.now();
  const limit = rateLimits.get(identifier);
  
  if (!limit || now > limit.resetAt) {
    rateLimits.set(identifier, { count: 1, resetAt: now + 60000 }); // 1 minute window
    return true;
  }
  
  if (limit.count >= 10) { // Max 10 messages per minute
    return false;
  }
  
  limit.count++;
  return true;
}

function sanitizeInput(input: string): string {
  // Remove potential injection patterns
  return input
    .replace(/[<>]/g, '') // Remove HTML tags
    .replace(/system:/gi, '') // Remove system role attempts
    .replace(/assistant:/gi, '') // Remove assistant role attempts
    .replace(/api[_\s-]?key/gi, '[REDACTED]') // Block API key fishing
    .replace(/password/gi, '[REDACTED]') // Block password fishing
    .replace(/token/gi, '[REDACTED]') // Block token fishing
    .trim()
    .slice(0, 500); // Max 500 characters
}

export async function POST(request: NextRequest) {
  try {
    const { message, sessionId } = await request.json();
    
    if (!message) {
      return NextResponse.json({ error: 'Message required' }, { status: 400 });
    }

    // Rate limiting
    const clientIp = request.headers.get('x-forwarded-for') || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return NextResponse.json({ 
        error: 'Rate limit exceeded. Please wait a moment.' 
      }, { status: 429 });
    }

    // Sanitize input
    const sanitizedMessage = sanitizeInput(message);
    
    if (sanitizedMessage.length < 1) {
      return NextResponse.json({ 
        error: 'Invalid message' 
      }, { status: 400 });
    }

    // Initialize session context if needed
    if (!sessionContexts[sessionId]) {
      sessionContexts[sessionId] = [];
    }

    // Store user message (sanitized)
    const userMsg = {
      id: `${Date.now()}-user`,
      message: sanitizedMessage,
      sender: 'user' as const,
      timestamp: Date.now(),
      sessionId,
    };
    chatMessages.push(userMsg);
    sessionContexts[sessionId].push(`User: ${sanitizedMessage}`);

    // Auto-response logic
    const response = await generateResponse(sanitizedMessage, sessionContexts[sessionId]);

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
  const conversationHistory = context.join(' ').toLowerCase();
  
  // Check what info we already have from context
  const hasGenre = /\b(rap|hip hop|drill|trap|pop|rock|indie|r&b|rnb|soul|jazz|electronic|house|techno|dubstep|grime|afrobeat)\b/i.test(conversationHistory);
  const hasTrackCount = /\b\d+\s*(track|song)/i.test(conversationHistory);
  const hasTimeline = /\b(today|tomorrow|week|month|asap|urgent|deadline|by\s+\w+)/i.test(conversationHistory);
  const hasBudget = /\b£?\d+/i.test(conversationHistory);
  const hasService = /\b(record|mix|master|production|vocal)\b/i.test(conversationHistory);
  
  // Count how much info we've gathered
  const infoGathered = [hasGenre, hasTrackCount, hasTimeline, hasBudget, hasService].filter(Boolean).length;

  // Pricing questions
  if (lowerMessage.includes('price') || lowerMessage.includes('cost') || lowerMessage.includes('rate') || lowerMessage.includes('how much')) {
    let response = '';
    
    if (lowerMessage.includes('mix') && lowerMessage.includes('master')) {
      response = "Full mix & master is £340 per track. This includes unlimited revisions until you're happy.";
    } else if (lowerMessage.includes('mix') || lowerMessage.includes('mixing')) {
      response = "Vocal mixing is £190 per track. Full mix & master is £340. All include unlimited revisions.";
    } else if (lowerMessage.includes('master')) {
      response = "Mastering is £40 per track. Fast turnaround, usually 24-48 hours.";
    } else if (lowerMessage.includes('record')) {
      response = "Recording sessions are £35/hr (or £30/hr with a monthly subscription).";
    } else {
      response = "Here's our pricing:\n\n• Recording: £35/hr\n• Vocal Mix: £190\n• Full Mix & Master: £340\n• Mastering: £40\n• Production: Custom pricing\n\nAll services include unlimited revisions.";
    }
    
    // Only ask for missing info
    if (infoGathered >= 3) {
      response += "\n\nGreat! I've got enough details. Want to book a time slot now or should I connect you with Elcee to discuss specifics?";
      return { message: response, needsHuman: false };
    }
    
    const missingInfo = [];
    if (!hasGenre) missingInfo.push('genre');
    if (!hasTrackCount) missingInfo.push('how many tracks');
    if (!hasTimeline) missingInfo.push('timeline');
    
    if (missingInfo.length > 0) {
      response += `\n\nTo give you an accurate quote, what's your ${missingInfo.slice(0, 2).join(' and ')}?`;
    }
    
    return { message: response, needsHuman: false };
  }

  // Booking/availability
  if (lowerMessage.includes('book') || lowerMessage.includes('available') || lowerMessage.includes('appointment') || lowerMessage.includes('session')) {
    if (infoGathered >= 2) {
      return {
        message: "Perfect! Book your session here: elceethealchemist.com/studio\n\nThe calendar shows real-time availability. Pick your time slots and confirm instantly.\n\nSee you in the studio! 🎙️",
        needsHuman: false,
      };
    }
    
    return {
      message: "You can book studio time directly here: elceethealchemist.com/studio\n\nThe calendar shows real-time availability. What service are you looking to book?",
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
    let response = "You can hear my work on all streaming platforms — search 'Elcee the Alchemist'. I produce, mix, and master all my own music (40+ tracks released).\n\nWorked with JBL, adidas, and Boiler Room.";
    
    if (!hasGenre) {
      response += "\n\nWhat genre are you working in? I can point you to similar examples.";
    } else {
      response += "\n\nWant me to send before/after clips from similar projects to your email?";
    }
    
    return { message: response, needsHuman: false };
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
    // If we have enough info, move forward
    if (infoGathered >= 3) {
      return {
        message: "Perfect! I've got the details. You can book a session directly at elceethealchemist.com/studio or I can pass this to Elcee for a detailed quote. What works better?",
        needsHuman: false,
      };
    }
    
    const missing = [];
    if (!hasTrackCount) missing.push('How many tracks?');
    if (!hasGenre) missing.push('What genre?');
    if (!hasService) missing.push('What service? (recording/mixing/mastering)');
    if (!hasTimeline) missing.push('Any deadline?');
    
    return {
      message: `Nice! To help you out, I just need:\n\n${missing.slice(0, 2).map(q => `• ${q}`).join('\n')}`,
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
  if (lowerMessage.includes('quote') || lowerMessage.includes('send to elcee') || lowerMessage.includes('connect me') || 
      lowerMessage.includes('talk to elcee') || lowerMessage.includes('speak to') || lowerMessage.includes('elcee')) {
    // Only flag if we have enough context (3+ pieces of info)
    if (infoGathered >= 3) {
      return {
        message: "Perfect! I'm sending all your details to Elcee now:\n\n" + 
                 `${hasGenre ? '✅ Genre/style\n' : ''}` +
                 `${hasTrackCount ? '✅ Number of tracks\n' : ''}` +
                 `${hasTimeline ? '✅ Timeline\n' : ''}` +
                 `${hasBudget ? '✅ Budget\n' : ''}` +
                 `${hasService ? '✅ Service needed\n' : ''}` +
                 "\nThey'll email you within the hour (usually much faster). You'll hear from elcee.automation@gmail.com",
        needsHuman: true,
      };
    } else {
      // Not enough info yet
      const stillNeed = [];
      if (!hasService) stillNeed.push('what service you need');
      if (!hasGenre) stillNeed.push('what genre');
      if (!hasTrackCount) stillNeed.push('how many tracks');
      
      return {
        message: `Before I send to Elcee, I just need: ${stillNeed.slice(0, 2).join(' and ')}`,
        needsHuman: false,
      };
    }
  }

  // Contact requests with info
  if ((lowerMessage.includes('contact') || lowerMessage.includes('email') || lowerMessage.includes('call')) && 
      infoGathered >= 2) {
    return {
      message: "I'll send your details to Elcee right now. They'll reach out within the hour via elcee.automation@gmail.com\n\nOr book instantly: elceethealchemist.com/studio",
      needsHuman: true,
    };
  }

  // If we have enough info (3+ pieces), ready to hand off or book
  if (infoGathered >= 3) {
    return {
      message: "Perfect! I've got all the key details about your project.\n\nYou have two options:\n\n1. Book a time slot now at elceethealchemist.com/studio\n2. I can send your details to Elcee for a personalized quote (they'll reply within an hour)\n\nWhich would you prefer?",
      needsHuman: false,
    };
  }

  // Check if user is providing details (numbers, genres, specific info)
  const hasDetails = /\d+/.test(message) || lowerMessage.length > 50;

  // If they're giving detailed info but we're still missing some, ask for missing pieces
  if (hasDetails) {
    const stillMissing = [];
    if (!hasGenre && !hasService) stillMissing.push('What service do you need? (recording/mixing/mastering)');
    else if (!hasGenre) stillMissing.push('What genre are you working with?');
    else if (!hasTrackCount) stillMissing.push('How many tracks?');
    else if (!hasTimeline) stillMissing.push('What\'s your timeline?');
    
    if (stillMissing.length === 0) {
      return {
        message: "Great! I think I've got everything. Want to book a session or get a quote from Elcee?",
        needsHuman: false,
      };
    }
    
    return {
      message: `Thanks! Just need one more thing: ${stillMissing[0]}`,
      needsHuman: false,
    };
  }

  // Default: gather more info before flagging
  const needed = [];
  if (!hasService) needed.push('What service? (recording/mixing/mastering/production)');
  if (!hasGenre) needed.push('What genre/style?');
  if (!hasTrackCount) needed.push('How many tracks?');
  
  return {
    message: `I can help with that!\n\nJust need a few quick details:\n\n${needed.slice(0, 2).map(q => `• ${q}`).join('\n')}\n\nOr book directly: elceethealchemist.com/studio`,
    needsHuman: false,
  };
}

async function notifyHuman(conversation: string[], sessionId: string) {
  try {
    // Send email notification via Resend
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      console.warn('No Resend API key configured - skipping notification');
      return;
    }

    // Format conversation nicely
    const conversationText = conversation
      .slice(-10) // Last 10 messages max
      .map(line => line.replace(/^(User|Bot): /, '<strong>$1:</strong> '))
      .join('<br><br>');

    const emailHtml = `
      <h2>🔔 Studio Inquiry Ready</h2>
      <p>A customer is ready to connect with you after chatting on the website.</p>
      
      <h3>Conversation Summary:</h3>
      <div style="background: #f5f5f5; padding: 15px; border-radius: 5px; margin: 10px 0;">
        ${conversationText}
      </div>
      
      <hr style="margin: 20px 0;">
      <p><small>Session ID: ${sessionId}</small></p>
      <p><a href="https://elceethealchemist.com/studio" style="background: #333; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Booking Calendar</a></p>
    `;

    const { Resend } = require('resend');
    const resend = new Resend(resendApiKey);

    await resend.emails.send({
      from: 'studio@elceethealchemist.com',
      to: 'elcee.mgmt@gmail.com',
      subject: '🔔 New Studio Inquiry from Website',
      html: emailHtml,
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
