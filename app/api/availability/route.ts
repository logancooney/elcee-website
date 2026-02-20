import { NextResponse } from 'next/server';
import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date');

  if (!date) {
    return NextResponse.json({ error: 'Date parameter required' }, { status: 400 });
  }

  try {
    // Use gcalcli to check the "Daily" calendar (main Elcee calendar)
    const command = `uvx --from "git+https://github.com/shanemcd/gcalcli@attachments-in-tsv-and-json" --with "google-api-core<2.28.0" gcalcli agenda --calendar "Daily" --json "${date}" "${date}"`;
    
    const { stdout } = await execAsync(command);
    const events = JSON.parse(stdout || '[]');

    // Extract booked time slots (2-hour blocks starting on even hours: 10, 12, 14, 16, 18, 20)
    const bookedSlots = new Set<string>();

    events.forEach((event: any) => {
      if (event.time?.start_time && event.time?.end_time) {
        // Parse start and end times
        const [startHours, startMinutes] = event.time.start_time.split(':').map(Number);
        const [endHours, endMinutes] = event.time.end_time.split(':').map(Number);
        
        const startHour = startHours;
        const endHour = endHours + (endMinutes > 0 ? 1 : 0); // Round up if there are minutes
        
        // Studio hours: 10am-10pm in 2-hour blocks (10, 12, 14, 16, 18, 20)
        for (let blockStart = 10; blockStart <= 20; blockStart += 2) {
          const blockEnd = blockStart + 2;
          
          // Check if event overlaps with this 2-hour block
          // Event overlaps if: event starts before block ends AND event ends after block starts
          if (startHour < blockEnd && endHour > blockStart) {
            bookedSlots.add(`${blockStart.toString().padStart(2, '0')}:00`);
          }
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
