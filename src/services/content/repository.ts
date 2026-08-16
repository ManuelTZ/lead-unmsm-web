import type {
  LeadEvent,
  NewsArticle,
  ImpactMetric,
  Partner,
  Member,
  PressMention,
} from '@/models/content';
import { events } from '@/data/events';
import { members } from '@/data/members';
import { news } from '@/data/news';
import { metrics } from '@/data/metrics';
import { partners } from '@/data/partners';
import { press } from '@/data/press';

export interface ContentRepository {
  listEvents(): Promise<LeadEvent[]>;
  listMembers(): Promise<Member[]>;
  listNews(): Promise<NewsArticle[]>;
  listMetrics(): Promise<ImpactMetric[]>;
  listPartners(): Promise<Partner[]>;
  listPress(): Promise<PressMention[]>;
}

export const localContentRepository: ContentRepository = {
  async listEvents() {
    return [...events];
  },
  async listMembers() {
    return [...members];
  },
  async listNews() {
    return [...news];
  },
  async listMetrics() {
    return [...metrics];
  },
  async listPartners() {
    return [...partners];
  },
  async listPress() {
    return [...press];
  },
};

// Fase 6: reemplazar esta asignación por un adaptador CMS sin cambiar los componentes.
export const contentRepository = localContentRepository;
