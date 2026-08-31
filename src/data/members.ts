import type { Member } from '@/models/content';
import content from '@/content/members.json';

export const members = content.items as Member[];
