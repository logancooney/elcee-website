import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { email, name, leadMagnet, timestamp } = await request.json();

    // Validate input
    if (!email || !leadMagnet) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to Google Sheets via Maton API
    const sheetId = process.env.LEADS_SHEET_ID || '1XNLn3Ym6ruoqBXnI2WYdZ0tKTiRY-6isdvWyg-JZOK8';
    const matonKey = process.env.MATON_API_KEY;

    if (!matonKey) {
      console.error('MATON_API_KEY not configured');
      // Continue anyway - email will still be sent
    } else {
      try {
        const response = await fetch(
          `https://gateway.maton.ai/google-sheets/v4/spreadsheets/${sheetId}/values/'Email Leads'!A:E:append?valueInputOption=USER_ENTERED`,
          {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${matonKey}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              values: [[timestamp, email, name || '', leadMagnet, 'New']]
            })
          }
        );

        if (!response.ok) {
          console.error('Failed to save to Google Sheets:', await response.text());
        }
      } catch (sheetError) {
        console.error('Error saving to sheets:', sheetError);
        // Continue - not critical, email is more important
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
