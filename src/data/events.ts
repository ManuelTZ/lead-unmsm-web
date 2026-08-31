import type { LeadEvent } from '@/models/content';
import content from '@/content/events.json';

export const events = content.items as LeadEvent[];
