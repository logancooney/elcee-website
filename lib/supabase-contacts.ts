const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

function headers() {
  return {
    apikey: SUPABASE_KEY!,
    Authorization: `Bearer ${SUPABASE_KEY}`,
    'Content-Type': 'application/json',
  };
}

export type ContactSource =
  | 'calendly'
  | 'free-page'
  | 'free-page-discount'
  | 'presave'
  | 'contact-form';

export type EventType =
  | 'lead_magnet_download'
  | 'discount_requested'
  | 'booking_created'
  | 'presave';

export async function upsertContact(opts: {
  email: string;
  name?: string | null;
  source: ContactSource;
  notes?: string | null;
}): Promise<string | null> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return null;

  const now = new Date().toISOString();

  // Upsert on email — update name/notes/last_seen_at if contact already exists
  const res = await fetch(
    `${SUPABASE_URL}/rest/v1/contacts?on_conflict=email`,
    {
      method: 'POST',
      headers: {
        ...headers(),
        Prefer: 'return=representation,resolution=merge-duplicates',
      },
      body: JSON.stringify({
        email: opts.email,
        name: opts.name ?? null,
        source: opts.source,
        notes: opts.notes ?? null,
        first_seen_at: now,
        last_seen_at: now,
      }),
    }
  );

  if (!res.ok) {
    console.error('contacts upsert error', res.status, await res.text());
    return null;
  }

  const rows = await res.json();
  return rows?.[0]?.id ?? null;
}

export async function logEvent(opts: {
  contactId: string;
  eventType: EventType;
  metadata?: Record<string, unknown>;
}): Promise<void> {
  if (!SUPABASE_URL || !SUPABASE_KEY) return;

  const res = await fetch(`${SUPABASE_URL}/rest/v1/contact_events`, {
    method: 'POST',
    headers: { ...headers(), Prefer: 'return=minimal' },
    body: JSON.stringify({
      contact_id: opts.contactId,
      event_type: opts.eventType,
      metadata: opts.metadata ?? {},
    }),
  });

  if (!res.ok) {
    console.error('contact_events insert error', res.status, await res.text());
  }
}
