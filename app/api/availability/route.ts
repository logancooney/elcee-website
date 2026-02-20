import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
  }

  try {
    const matonApiKey = process.env.MATON_API_KEY;
    
    if (!matonApiKey) {
      console.warn('MATON_API_KEY not found - returning all slots as available');
      return NextResponse.json({
        date,
        bookedSlots: [],
        totalBooked: 0,
        warning: 'Calendar not connected - showing all slots as available'
      });
    }

    // Calculate time range for the day
    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    // Fetch events from Google Calendar via Maton API
    const calendarId = 'primary'; // Use primary calendar
    const url = `https://gateway.maton.ai/google-calendar/calendar/v3/calendars/${calendarId}/events?` + 
      new URLSearchParams({
        timeMin: startOfDay.toISOString(),
        timeMax: endOfDay.toISOString(),
        singleEvents: 'true',
        orderBy: 'startTime'
      });

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${matonApiKey}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`Maton API error: ${response.status}`);
    }

    const data = await response.json();
    const events = data.items || [];

    // Extract booked time slots (2-hour blocks starting on even hours)
    const bookedSlots = events.map((event: any) => {
      if (event.start?.dateTime) {
        const startTime = new Date(event.start.dateTime);
        const hour = startTime.getHours();
        // Round to nearest 2-hour block
        const blockHour = Math.floor(hour / 2) * 2;
        return `${blockHour.toString().padStart(2, '0')}:00`;
      }
      return null;
    }).filter(Boolean);

    // Remove duplicates
    const uniqueBookedSlots = [...new Set(bookedSlots)];

    return NextResponse.json({
      date,
      bookedSlots: uniqueBookedSlots,
      totalBooked: uniqueBookedSlots.length,
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
