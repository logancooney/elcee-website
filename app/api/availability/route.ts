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
      '4bde58e7465993008e9a664f9d7f9b94f8e165edca1d334c512b948b29264c8e@group.calendar.google.com', // Daily
      'cae911eaa575f5813787c590c16bc2def04f291478bce19273ba6236ab055b47@group.calendar.google.com', // Keane Futures
      'a9b669dc8e3a79d29cf63ffbd2494e204dd13c4e1c58644bebb586811ebce974@group.calendar.google.com'  // Studio time
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

    // Extract booked time slots in 30-minute increments
    const bookedSlots = new Set<string>();

    events.forEach((event: any) => {
      // Skip all-day events (they don't block booking times)
      if (event.start?.date && !event.start?.dateTime) {
        return; // All-day event, skip it
      }

      const startDateTime = event.start?.dateTime;
      const endDateTime = event.end?.dateTime;
      
      if (!startDateTime || !endDateTime) return;
      
      const startTime = new Date(startDateTime);
      const endTime = new Date(endDateTime);
      
      // Get minutes since midnight for start and end
      const startMinutes = startTime.getHours() * 60 + startTime.getMinutes();
      const endMinutes = endTime.getHours() * 60 + endTime.getMinutes();
      
      // Studio hours: 10am (600 min) to 11pm (1380 min)
      const studioStart = 10 * 60; // 600 minutes
      const studioEnd = 23 * 60;   // 1380 minutes
      
      // Mark all 30-minute slots that overlap with this event
      for (let slotStart = studioStart; slotStart < studioEnd; slotStart += 30) {
        const slotEnd = slotStart + 30;
        
        // Check if event overlaps with this 30-min slot
        // Overlap if: event starts before slot ends AND event ends after slot starts
        if (startMinutes < slotEnd && endMinutes > slotStart) {
          const hours = Math.floor(slotStart / 60);
          const minutes = slotStart % 60;
          const timeStr = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
          bookedSlots.add(timeStr);
        }
      }
    });

    return NextResponse.json({
      date,
      bookedSlots: Array.from(bookedSlots).sort(),
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
