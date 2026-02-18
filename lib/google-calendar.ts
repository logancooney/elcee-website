// Google Calendar integration
// Check availability and create tentative bookings

interface TimeSlot {
  start: string;
  end: string;
  available: boolean;
}

export async function getAvailableSlots(date: string): Promise<TimeSlot[]> {
  // Check if Calendar credentials configured
  if (!process.env.GOOGLE_CALENDAR_CREDENTIALS) {
    console.log('⚠️ Google Calendar not configured - showing all slots');
    return generateDefaultSlots(date);
  }

  try {
    const { google } = await import('googleapis');
    
    const credentials = JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Get events for the specified date
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const response = await calendar.events.list({
      calendarId,
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];
    
    // Generate time slots (9am - 9pm, 1-hour blocks)
    const slots = generateTimeSlots(date);
    
    // Mark slots as unavailable if there's a calendar event
    return slots.map(slot => {
      const isBooked = events.some(event => {
        const eventStart = new Date(event.start?.dateTime || event.start?.date || '');
        const eventEnd = new Date(event.end?.dateTime || event.end?.date || '');
        const slotStart = new Date(slot.start);
        const slotEnd = new Date(slot.end);
        
        // Check for overlap
        return (slotStart < eventEnd && slotEnd > eventStart);
      });
      
      return {
        ...slot,
        available: !isBooked,
      };
    });
    
  } catch (error) {
    console.error('Calendar availability check failed:', error);
    return generateDefaultSlots(date);
  }
}

export async function createTentativeBooking(
  name: string,
  email: string,
  service: string,
  date: string,
  time: string
) {
  if (!process.env.GOOGLE_CALENDAR_CREDENTIALS) {
    console.log('⚠️ Calendar not configured - booking not added to calendar');
    return { success: false, reason: 'not-configured' };
  }

  try {
    const { google } = await import('googleapis');
    
    const credentials = JSON.parse(process.env.GOOGLE_CALENDAR_CREDENTIALS);
    const auth = new google.auth.GoogleAuth({
      credentials,
      scopes: ['https://www.googleapis.com/auth/calendar.events'],
    });

    const calendar = google.calendar({ version: 'v3', auth });
    const calendarId = process.env.GOOGLE_CALENDAR_ID || 'primary';

    // Parse date and time
    const [hours, minutes] = time.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hours), parseInt(minutes), 0);
    
    // Default session length: 2 hours
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 2);

    // Create event
    const event = await calendar.events.insert({
      calendarId,
      requestBody: {
        summary: `[TENTATIVE] ${service} - ${name}`,
        description: `Studio booking request from ${name}\nEmail: ${email}\nService: ${service}\n\nStatus: Awaiting confirmation\n\nThis is a tentative booking. Please confirm or cancel.`,
        start: {
          dateTime: startDateTime.toISOString(),
          timeZone: 'Europe/London',
        },
        end: {
          dateTime: endDateTime.toISOString(),
          timeZone: 'Europe/London',
        },
        colorId: '11', // Red for tentative
        transparency: 'tentative',
        attendees: [
          { email, displayName: name },
        ],
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 24 * 60 }, // 1 day before
            { method: 'popup', minutes: 60 }, // 1 hour before
          ],
        },
      },
    });

    console.log('✅ Tentative booking added to calendar:', event.data.id);
    return { 
      success: true, 
      eventId: event.data.id,
      eventLink: event.data.htmlLink,
    };
    
  } catch (error) {
    console.error('❌ Failed to create calendar event:', error);
    return { success: false, error };
  }
}

// Generate standard time slots (9am-9pm, 1-hour blocks)
function generateTimeSlots(date: string): TimeSlot[] {
  const slots: TimeSlot[] = [];
  const baseDate = new Date(date);
  
  for (let hour = 9; hour < 21; hour++) {
    const start = new Date(baseDate);
    start.setHours(hour, 0, 0, 0);
    
    const end = new Date(baseDate);
    end.setHours(hour + 1, 0, 0, 0);
    
    slots.push({
      start: start.toISOString(),
      end: end.toISOString(),
      available: true, // Default to available
    });
  }
  
  return slots;
}

function generateDefaultSlots(date: string): TimeSlot[] {
  return generateTimeSlots(date);
}
