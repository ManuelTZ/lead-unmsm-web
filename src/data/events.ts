import type { LeadEvent } from '@/models/content';

const eventModes = new Set<LeadEvent['mode']>(['Presencial', 'Virtual', 'Híbrido']);
const eventStatuses = new Set<LeadEvent['status']>(['upcoming', 'past']);

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isIsoDate = (value: unknown): value is string =>
  isNonEmptyString(value) &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T12:00:00Z`));

const isLeadEvent = (value: unknown): value is LeadEvent => {
  if (!value || typeof value !== 'object') return false;

  const event = value as Record<string, unknown>;

  return (
    isNonEmptyString(event.slug) &&
    isNonEmptyString(event.title) &&
    isIsoDate(event.date) &&
    eventModes.has(event.mode as LeadEvent['mode']) &&
    isNonEmptyString(event.location) &&
    isNonEmptyString(event.excerpt) &&
    eventStatuses.has(event.status as LeadEvent['status']) &&
    (event.registrationUrl === undefined || typeof event.registrationUrl === 'string') &&
    (event.isDemo === undefined || typeof event.isDemo === 'boolean')
  );
};

export const parseEvents = (items: unknown): LeadEvent[] =>
  Array.isArray(items) ? items.filter(isLeadEvent) : [];

const slugFromPath = (path: string): string => {
  const filename = path.split(/[\\/]/).at(-1) ?? '';
  return filename.replace(/\.json$/i, '');
};

export const parseEventFiles = (files: Record<string, unknown>): LeadEvent[] =>
  parseEvents(
    Object.entries(files).map(([path, event]) =>
      event && typeof event === 'object'
        ? { ...(event as Record<string, unknown>), slug: slugFromPath(path) }
        : event,
    ),
  );

const eventFiles = import.meta.glob('../../content/events/*.json', {
  eager: true,
  import: 'default',
});

export const events = parseEventFiles(eventFiles);
