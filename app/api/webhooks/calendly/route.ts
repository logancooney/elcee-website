import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

// TODO: Add Calendly webhook signature verification once signing key is configured
// Header: Calendly-Webhook-Signature
// Docs: https://developer.calendly.com/api-docs/docs/webhook-signatures

export async function POST(req: NextRequest) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );
  try {
    const body = await req.json();
    const event = body?.event;
    const payload = body?.payload;

    if (event !== "invitee.created") {
      return NextResponse.json({ received: true }, { status: 200 });
    }

    const invitee = payload?.invitee;
    const scheduledEvent = payload?.scheduled_event;
    const questions = payload?.questions_and_answers ?? [];

    const name = invitee?.name ?? "";
    const email = invitee?.email ?? "";
    const eventName = scheduledEvent?.name ?? "";
    const startTime = scheduledEvent?.start_time ?? null;

    // Determine service type from event name
    const service = eventName.toLowerCase().includes("studio")
      ? "studio-session"
      : "free-track-review";

    // Collect intake question answers
    const notes = questions.reduce(
      (acc: Record<string, string>, q: { question: string; answer: string }) => {
        acc[q.question] = q.answer;
        return acc;
      },
      {}
    );

    const { error } = await supabase.from("studio_leads").insert({
      name,
      email,
      source: "calendly",
      service,
      status: "new",
      notes: JSON.stringify(notes),
      booked_at: startTime,
      created_at: new Date().toISOString(),
    });

    if (error) {
      console.error("Supabase insert error:", error);
      return NextResponse.json({ error: "DB error" }, { status: 500 });
    }

    return NextResponse.json({ received: true }, { status: 200 });
  } catch (err) {
    console.error("Calendly webhook error:", err);
    return NextResponse.json({ error: "Bad request" }, { status: 400 });
  }
}
