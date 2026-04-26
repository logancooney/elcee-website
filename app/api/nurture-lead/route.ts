import { NextResponse } from 'next/server';

// This endpoint used setTimeout which doesn't work in serverless environments.
// Nurture sequences should be handled via Supabase Edge Functions or an external cron job.
export async function POST() {
  return NextResponse.json({ deprecated: true }, { status: 410 });
}
