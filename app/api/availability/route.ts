import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
  }

  const MATON_KEY = process.env.MATON_API_KEY;
  
  if (!MATON_KEY) {
    console.warn('MATON_API_KEY not configured - showing all slots as available');
    return NextResponse.json({
      date,
      bookedSlots: [],
      totalBooked: 0,
      warning: 'Calendar not connected'
    });
  }

  try {
    // Check multiple calendars via Maton API (works 24/7 from Vercel servers)
    const calendars = [
      'Daily',
      'Keane%20Futures', // URL-encoded
      'Studio%20time'     // URL-encoded
    ];
    
    // Calculate time range for the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);
    
    // Fetch events from all calendars in parallel
    const results = await Promise.all(
      calendars.map(async (calendarId) => {
        try {
          const url = `https://gateway.maton.ai/google-calendar/calendar/v3/calendars/${calendarId}/events?` + 
            new URLSearchParams({
              timeMin: startOfDay.toISOString(),
              timeMax: endOfDay.toISOString(),
              singleEvents: 'true',
              orderBy: 'startTime'
            });

          const response = await fetch(url, {
            headers: {
              'Authorization': `Bearer ${MATON_KEY}`,
              'Content-Type': 'application/json'
            }
          });

          if (!response.ok) {
            console.error(`Calendar ${calendarId} fetch failed:`, response.status);
            return [];
          }

          const data = await response.json();
          return data.items || [];
        } catch (err) {
          console.error(`Failed to fetch ${calendarId}:`, err);
          return [];
        }
      })
    );
    
    // Combine all events from all calendars
    const events = results.flat();

    // Extract booked time slots (2-hour blocks starting on even hours: 10, 12, 14, 16, 18, 20)
    const bookedSlots = new Set<string>();

    events.forEach((event: any) => {
      // Google Calendar API format: event.start.dateTime or event.start.date
      const startDateTime = event.start?.dateTime || event.start?.date;
      const endDateTime = event.end?.dateTime || event.end?.date;
      
      if (!startDateTime || !endDateTime) return;
      
      const startTime = new Date(startDateTime);
      const endTime = new Date(endDateTime);
      
      const startHour = startTime.getHours();
      const endHour = endTime.getHours() + (endTime.getMinutes() > 0 ? 1 : 0); // Round up if there are minutes
      
      // Studio hours: 10am-10pm in 2-hour blocks (10, 12, 14, 16, 18, 20)
      for (let blockStart = 10; blockStart <= 20; blockStart += 2) {
        const blockEnd = blockStart + 2;
        
        // Check if event overlaps with this 2-hour block
        // Event overlaps if: event starts before block ends AND event ends after block starts
        if (startHour < blockEnd && endHour > blockStart) {
          bookedSlots.add(`${blockStart.toString().padStart(2, '0')}:00`);
        }
      }
    });

    return NextResponse.json({
      date,
      bookedSlots: Array.from(bookedSlots),
      totalBooked: bookedSlots.size,
    });

  } catch (error) {
    console.error('Calendar availability check failed:', error);
    
    // Graceful fallback: return empty bookings
    return NextResponse.json({
      date,
      bookedSlots: [],
      totalBooked: 0,
      warning: 'Could not verify calendar - showing all slots as available'
    });
  }
}
