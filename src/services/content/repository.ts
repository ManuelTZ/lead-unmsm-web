import type { LeadEvent, NewsArticle, ImpactMetric, Partner } from '@/models/content';
import { events } from '@/data/events';
import { news } from '@/data/news';
import { metrics } from '@/data/metrics';
import { partners } from '@/data/partners';

export interface ContentRepository {
  listEvents(): Promise<LeadEvent[]>;
  listNews(): Promise<NewsArticle[]>;
  listMetrics(): Promise<ImpactMetric[]>;
  listPartners(): Promise<Partner[]>;
}

export const localContentRepository: ContentRepository = {
  async listEvents() {
    return [...events];
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
};

// Fase 6: reemplazar esta asignación por un adaptador CMS sin cambiar los componentes.
export const contentRepository = localContentRepository;
