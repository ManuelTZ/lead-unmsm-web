import type { LeadEvent } from '@/models/content';
import { normalizeGoogleFormsUrl } from './publicUrl';

type EventRegistration = Pick<LeadEvent, 'status' | 'registrationUrl'>;

export function resolveEventRegistrationUrl(event: EventRegistration): string {
  if (event.status !== 'upcoming') return '';
  return normalizeGoogleFormsUrl(event.registrationUrl);
}
