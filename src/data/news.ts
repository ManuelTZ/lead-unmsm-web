import type { NewsArticle } from '@/models/content';

const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isIsoDate = (value: unknown): value is string =>
  isNonEmptyString(value) &&
  /^\d{4}-\d{2}-\d{2}$/.test(value) &&
  !Number.isNaN(Date.parse(`${value}T12:00:00Z`));

const isNewsArticle = (value: unknown): value is NewsArticle => {
  if (!value || typeof value !== 'object') return false;

  const article = value as Record<string, unknown>;

  return (
    isNonEmptyString(article.slug) &&
    isNonEmptyString(article.title) &&
    isNonEmptyString(article.excerpt) &&
    isIsoDate(article.publishedAt) &&
    isNonEmptyString(article.author) &&
    isNonEmptyString(article.category) &&
    Array.isArray(article.body) &&
    article.body.length > 0 &&
    article.body.every(isNonEmptyString) &&
    (article.isDemo === undefined || typeof article.isDemo === 'boolean')
  );
};

export const parseNews = (items: unknown): NewsArticle[] =>
  Array.isArray(items) ? items.filter(isNewsArticle) : [];

const slugFromPath = (path: string): string => {
  const filename = path.split(/[\\/]/).at(-1) ?? '';
  return filename.replace(/\.json$/i, '');
};

export const parseNewsFiles = (files: Record<string, unknown>): NewsArticle[] =>
  parseNews(
    Object.entries(files).map(([path, article]) =>
      article && typeof article === 'object'
        ? { ...(article as Record<string, unknown>), slug: slugFromPath(path) }
        : article,
    ),
  );

const newsFiles = import.meta.glob('../../content/news/*.json', {
  eager: true,
  import: 'default',
});

export const news = parseNewsFiles(newsFiles);
