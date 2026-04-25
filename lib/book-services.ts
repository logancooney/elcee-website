// Single source of truth for the /booking service-picker page.
// Calendly URLs come from lib/calendly-config.ts so this is the only place
// that defines the service-card UI shape.

import { CALENDLY_EVENT_URLS } from './calendly-config';

export type BookServiceId = 'tutoring' | 'studio' | 'mixing';
export type BookMode = 'online' | 'in-person';

export interface BookServiceMode {
  id: BookMode;
  label: string;
  price: string;
  priceQualifier: string;
  calendlyUrl: string;
}

export interface BookService {
  id: BookServiceId;
  label: string;
  /** Headline price shown on the card. e.g. "from £45/hr" or "POA". */
  priceLabel: string;
  blurb: string;
  /** Used when the service has no online/in-person split. */
  calendlyUrl?: string;
  /** Used when the service has a sub-toggle (e.g. tutoring). */
  modes?: BookServiceMode[];
  /** Optional small note shown below the price. */
  note?: string;
}

export const BOOK_SERVICES: BookService[] = [
  {
    id: 'tutoring',
    label: 'Tutoring',
    priceLabel: 'from £45/hr',
    blurb: 'Production, mixing, and home-studio mentorship. Online (£45/hr) or in-person in Manchester (£60/hr).',
    note: 'Bulk discounts available on 5/8/10 session bundles.',
    modes: [
      {
        id: 'online',
        label: 'Online',
        price: '£45',
        priceQualifier: '/hr',
        calendlyUrl: CALENDLY_EVENT_URLS.tutoringOnline,
      },
      {
        id: 'in-person',
        label: 'In-Person',
        price: '£60',
        priceQualifier: '/hr',
        calendlyUrl: CALENDLY_EVENT_URLS.tutoringInPerson,
      },
    ],
  },
  {
    id: 'studio',
    label: 'Studio',
    priceLabel: '£45/hr',
    blurb: 'Recording, mixing, and mastering at The Alchemist Studio in Manchester.',
    calendlyUrl: CALENDLY_EVENT_URLS.studio1hr,
  },
  {
    id: 'mixing',
    label: 'Mix & Master',
    priceLabel: 'POA',
    blurb: 'Vocal mixes, full mix + master, mastering only. Discovery call to scope the project.',
    calendlyUrl: CALENDLY_EVENT_URLS.schedulingPage,
  },
];

export function getBookService(id: string | null): BookService | undefined {
  if (!id) return undefined;
  return BOOK_SERVICES.find(s => s.id === id);
}

export function getServiceMode(service: BookService, modeId: string | null): BookServiceMode | undefined {
  if (!service.modes || !modeId) return undefined;
  return service.modes.find(m => m.id === modeId);
}

/** Resolve which Calendly URL to load given a service + optional mode. */
export function resolveCalendlyUrl(service: BookService, modeId: string | null): string | null {
  if (service.modes && service.modes.length > 0) {
    const mode = getServiceMode(service, modeId);
    return mode?.calendlyUrl ?? null;
  }
  return service.calendlyUrl ?? null;
}
