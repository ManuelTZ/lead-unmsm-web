import type { NewsArticle } from '@/models/content';
import content from '@/content/news.json';

export const news = content.items as NewsArticle[];
