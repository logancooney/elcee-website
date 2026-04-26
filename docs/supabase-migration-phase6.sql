-- Phase 6: Unified CRM
-- Run this in the Supabase SQL editor (Dashboard → SQL Editor → New Query)

-- ── contacts ──────────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contacts (
  id            uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email         text UNIQUE NOT NULL,
  name          text,
  source        text NOT NULL,           -- 'calendly' | 'free-page' | 'free-page-discount' | 'presave' | 'contact-form'
  status        text NOT NULL DEFAULT 'new',
  tags          text[] NOT NULL DEFAULT '{}',
  notes         text,
  first_seen_at timestamptz NOT NULL DEFAULT now(),
  last_seen_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contacts_email_idx ON contacts (email);
CREATE INDEX IF NOT EXISTS contacts_source_idx ON contacts (source);
CREATE INDEX IF NOT EXISTS contacts_status_idx ON contacts (status);

-- ── contact_events ────────────────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS contact_events (
  id          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  contact_id  uuid NOT NULL REFERENCES contacts(id) ON DELETE CASCADE,
  event_type  text NOT NULL,             -- 'lead_magnet_download' | 'discount_requested' | 'booking_created' | 'presave'
  metadata    jsonb NOT NULL DEFAULT '{}',
  created_at  timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS contact_events_contact_id_idx ON contact_events (contact_id);
CREATE INDEX IF NOT EXISTS contact_events_event_type_idx ON contact_events (event_type);

-- ── Backfill from studio_leads (run only once) ────────────────────────────────
-- INSERT INTO contacts (email, name, source, status, notes, first_seen_at, last_seen_at)
-- SELECT DISTINCT ON (email)
--   email,
--   name,
--   COALESCE(source, 'studio_leads'),
--   COALESCE(status, 'new'),
--   notes,
--   COALESCE(created_at, now()),
--   COALESCE(created_at, now())
-- FROM studio_leads
-- ORDER BY email, created_at ASC
-- ON CONFLICT (email) DO NOTHING;
