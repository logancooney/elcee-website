import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date') || '2026-02-28';

  const MATON_KEY = process.env.MATON_API_KEY;
  
  if (!MATON_KEY) {
    return NextResponse.json({ error: 'MATON_API_KEY not configured' });
  }

  const calendars = [
    'elcee.mgmt@gmail.com', // Elcee (main calendar)
    '4bde58e7465993008e9a664f9d7f9b94f8e165edca1d334c512b948b29264c8e@group.calendar.google.com', // Daily
    'cae911eaa575f5813787c590c16bc2def04f291478bce19273ba6236ab055b47@group.calendar.google.com', // Keane Futures
    'a9b669dc8e3a79d29cf63ffbd2494e204dd13c4e1c58644bebb586811ebce974@group.calendar.google.com'  // Studio time
  ];

  const startOfDay = new Date(date + 'T00:00:00.000Z');
  const endOfDay = new Date(date + 'T23:59:59.999Z');

  const results = await Promise.all(
    calendars.map(async (calendarId, index) => {
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

        const data = await response.json();
        
        return {
          calendarName: ['Elcee', 'Daily', 'Keane Futures', 'Studio time'][index],
          calendarId,
          status: response.status,
          eventCount: data.items?.length || 0,
          events: data.items?.map((e: any) => ({
            summary: e.summary,
            start: e.start,
            end: e.end,
            allDay: !!(e.start?.date && !e.start?.dateTime)
          })) || [],
          error: data.error || null
        };
      } catch (err: any) {
        return {
          calendarName: ['Elcee', 'Daily', 'Keane Futures', 'Studio time'][index],
          calendarId,
          error: err.message
        };
      }
    })
  );

  return NextResponse.json({
    date,
    timeRange: {
      start: startOfDay.toISOString(),
      end: endOfDay.toISOString()
    },
    calendars: results,
    matonKeyConfigured: !!MATON_KEY,
    matonKeyFirst10: MATON_KEY?.substring(0, 10)
  });
}
