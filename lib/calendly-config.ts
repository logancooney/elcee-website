// lib/calendly-config.ts
// After completing Calendly setup, replace all REPLACE_WITH_CALENDLY_URL values
// with the actual shareable URLs from your Calendly dashboard.

export const CALENDLY_EVENT_URLS = {
  // Studio session event types
  studio1hr: 'REPLACE_WITH_CALENDLY_URL', // e.g. https://calendly.com/elcee-mgmt/studio-1hr
  studio2hr: 'REPLACE_WITH_CALENDLY_URL',
  studio3hr: 'REPLACE_WITH_CALENDLY_URL',
  studio4hr: 'REPLACE_WITH_CALENDLY_URL',
  // Tutoring event types
  tutoringOnline: 'REPLACE_WITH_CALENDLY_URL',
  tutoringInPerson: 'REPLACE_WITH_CALENDLY_URL',
  // Free call (already exists)
  free: 'https://calendly.com/elcee-mgmt/free-mix-review-track-feedback',
  // Full scheduling page (shows all event types)
  schedulingPage: 'https://calendly.com/elcee-mgmt',
};

export const CALENDLY_PAYMENT_LINKS = {
  fullMixMaster: 'REPLACE_WITH_CALENDLY_URL',
  vocalMix: 'REPLACE_WITH_CALENDLY_URL',
  mastering: 'REPLACE_WITH_CALENDLY_URL',
  multitrack3: 'REPLACE_WITH_CALENDLY_URL',
  multitrack5: 'REPLACE_WITH_CALENDLY_URL',
};

export const CALENDLY_BUNDLE_LINKS = {
  online5: 'REPLACE_WITH_CALENDLY_URL',
  online8: 'REPLACE_WITH_CALENDLY_URL',
  online10: 'REPLACE_WITH_CALENDLY_URL',
  inPerson5: 'REPLACE_WITH_CALENDLY_URL',
  inPerson8: 'REPLACE_WITH_CALENDLY_URL',
  inPerson10: 'REPLACE_WITH_CALENDLY_URL',
};
