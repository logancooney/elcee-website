// Calendar availability checking via Maton API
// Simpler alternative to Google Calendar credentials

export async function checkAvailability(date: string, time: string, durationHours: number = 2): Promise<boolean> {
  const MATON_KEY = process.env.MATON_API_KEY;
  
  if (!MATON_KEY) {
    console.log('⚠️ MATON_API_KEY not configured - skipping availability check');
    return true; // Allow booking if calendar not configured
  }

  try {
    // Parse requested time slot
    const [hours, minutes] = time.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(hours), parseInt(minutes || '0'), 0, 0);
    
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + durationHours);

    // Query Google Calendar via Maton for conflicts (check Daily calendar)
    const calendarId = encodeURIComponent('Daily');
    const response = await fetch(
      `https://gateway.maton.ai/google-calendar/calendar/v3/calendars/${calendarId}/events?` +
      `timeMin=${startDateTime.toISOString()}&` +
      `timeMax=${endDateTime.toISOString()}&` +
      `singleEvents=true`,
      {
        headers: {
          'Authorization': `Bearer ${MATON_KEY}`
        }
      }
    );

    if (!response.ok) {
      console.error('Calendar API error:', response.status);
      return true; // Allow booking on API error (fail open)
    }

    const data = await response.json();
    
    // If any events exist in this time range, slot is NOT available
    const hasConflict = data.items && data.items.length > 0;
    
    if (hasConflict) {
      console.log(`❌ Time slot conflict: ${date} ${time} (${data.items.length} events found)`);
    } else {
      console.log(`✅ Time slot available: ${date} ${time}`);
    }
    
    return !hasConflict;
    
  } catch (error) {
    console.error('Availability check failed:', error);
    return true; // Allow booking on error (fail open)
  }
}

export async function createCalendarEvent(
  name: string, 
  email: string, 
  phone: string | undefined,
  service: string, 
  date: string, 
  times: string | string[], // Accept single time or array of times
  durationHoursPerSlot: number = 2
): Promise<{ success: boolean; eventId?: string }> {
  const MATON_KEY = process.env.MATON_API_KEY;
  
  if (!MATON_KEY) {
    return { success: false };
  }

  try {
    // Handle both old single time and new times array
    const timeSlots = Array.isArray(times) ? times : [times];
    
    // Sort times to get earliest and latest
    const sortedTimes = timeSlots.sort();
    const earliestTime = sortedTimes[0];
    const latestTime = sortedTimes[sortedTimes.length - 1];
    
    // Calculate start from earliest time
    const [startHours, startMinutes] = earliestTime.split(':');
    const startDateTime = new Date(date);
    startDateTime.setHours(parseInt(startHours), parseInt(startMinutes || '0'), 0, 0);
    
    // Calculate end from latest time + duration
    const [endHours, endMinutes] = latestTime.split(':');
    const endDateTime = new Date(date);
    endDateTime.setHours(parseInt(endHours) + durationHoursPerSlot, parseInt(endMinutes || '0'), 0, 0);
    
    const totalHours = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60 * 60);

    const event = {
      summary: `Studio: ${name} - ${service} (${totalHours}h)`,
      description: `Client: ${name}\nEmail: ${email}\n${phone ? `Phone: ${phone}\n` : ''}Service: ${service}\nDuration: ${totalHours} hours (${timeSlots.length} x ${durationHoursPerSlot}h slots)\nTime slots: ${timeSlots.join(', ')}\n\nBooked via website`,
      start: {
        dateTime: startDateTime.toISOString(),
        timeZone: 'Europe/London'
      },
      end: {
        dateTime: endDateTime.toISOString(),
        timeZone: 'Europe/London'
      },
      attendees: [{ email }],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 24 * 60 },
          { method: 'popup', minutes: 60 }
        ]
      }
    };

    const calendarId = encodeURIComponent('Daily');
    const response = await fetch(
      `https://gateway.maton.ai/google-calendar/calendar/v3/calendars/${calendarId}/events`,
      {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${MATON_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
      }
    );

    if (!response.ok) {
      console.error('Calendar event creation failed:', response.status);
      return { success: false };
    }

    const data = await response.json();
    return { success: true, eventId: data.id };
    
  } catch (error) {
    console.error('Calendar event creation error:', error);
    return { success: false };
  }
}
