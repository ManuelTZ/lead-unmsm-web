import type { ImpactMetric } from '@/models/content';
import content from '@/content/metrics.json';

export const metrics = content.items as ImpactMetric[];
