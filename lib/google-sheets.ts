// Google Sheets CRM integration
// Stores all bookings in a spreadsheet for client management

interface BookingData {
  name: string;
  email: string;
  phone?: string;
  service: string;
  date?: string;
  time?: string;
  message?: string;
}

export async function saveToGoogleSheets(booking: BookingData) {
  // Check if Google Sheets credentials are configured
  console.log('🔍 Google Sheets check:', {
    hasPrivateKey: !!process.env.GOOGLE_SHEETS_PRIVATE_KEY,
    hasClientEmail: !!process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    hasSheetId: !!process.env.GOOGLE_SHEET_ID,
    clientEmail: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
    sheetId: process.env.GOOGLE_SHEET_ID,
  });
  
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY || !process.env.GOOGLE_SHEETS_CLIENT_EMAIL) {
    console.log('⚠️ Google Sheets not configured - booking not saved to CRM');
    return { success: false, reason: 'not-configured' };
  }

  try {
    console.log('📊 Attempting to save to Google Sheets...');
    const { google } = await import('googleapis');
    
    // Initialize auth
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    if (!spreadsheetId) {
      throw new Error('GOOGLE_SHEET_ID not configured');
    }

    // Prepare row data
    const timestamp = new Date().toLocaleString('en-GB', { 
      timeZone: 'Europe/London',
      dateStyle: 'short',
      timeStyle: 'medium'
    });

    const row = [
      timestamp,
      booking.name,
      booking.email,
      booking.phone || '',
      booking.service,
      booking.date || '',
      booking.time || '',
      booking.message || '',
      'New', // Status
      '', // Notes (empty for now)
    ];

    // Append to sheet
    console.log('📝 Writing row to sheet:', row);
    const result = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'Bookings!A:J', // Assumes sheet named "Bookings"
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [row],
      },
    });

    console.log('✅ Booking saved to Google Sheets:', result.data);
    return { success: true };
    
  } catch (error: any) {
    console.error('❌ Google Sheets error:', error);
    console.error('Error details:', {
      message: error.message,
      code: error.code,
      errors: error.errors,
    });
    // Don't fail the whole booking if Sheets fails
    return { success: false, error };
  }
}

// Get all bookings from sheet (for future admin dashboard)
export async function getBookings(limit = 50) {
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return { success: false, reason: 'not-configured', bookings: [] };
  }

  try {
    const { google } = await import('googleapis');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    const response = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: `Bookings!A2:J${limit + 1}`, // Skip header row
    });

    const rows = response.data.values || [];
    const bookings = rows.map(row => ({
      timestamp: row[0],
      name: row[1],
      email: row[2],
      phone: row[3],
      service: row[4],
      date: row[5],
      time: row[6],
      message: row[7],
      status: row[8],
      notes: row[9],
    }));

    return { success: true, bookings };
    
  } catch (error) {
    console.error('Failed to fetch bookings:', error);
    return { success: false, error, bookings: [] };
  }
}

// Update booking status (e.g., "New" → "Confirmed" → "Completed")
export async function updateBookingStatus(
  rowNumber: number, 
  status: 'New' | 'Confirmed' | 'Cancelled' | 'Completed',
  notes?: string
) {
  if (!process.env.GOOGLE_SHEETS_PRIVATE_KEY) {
    return { success: false, reason: 'not-configured' };
  }

  try {
    const { google } = await import('googleapis');
    
    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: process.env.GOOGLE_SHEETS_CLIENT_EMAIL,
        private_key: process.env.GOOGLE_SHEETS_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      },
      scopes: ['https://www.googleapis.com/auth/spreadsheets'],
    });

    const sheets = google.sheets({ version: 'v4', auth });
    const spreadsheetId = process.env.GOOGLE_SHEET_ID;

    // Update status column (I) and notes column (J)
    const updates: Array<{ range: string; values: string[][] }> = [
      {
        range: `Bookings!I${rowNumber}`,
        values: [[status]],
      },
    ];

    if (notes) {
      updates.push({
        range: `Bookings!J${rowNumber}`,
        values: [[notes]],
      });
    }

    await sheets.spreadsheets.values.batchUpdate({
      spreadsheetId,
      requestBody: {
        data: updates,
        valueInputOption: 'USER_ENTERED',
      },
    });

    return { success: true };
    
  } catch (error) {
    console.error('Failed to update booking:', error);
    return { success: false, error };
  }
}
