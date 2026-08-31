import { describe, expect, it } from 'vitest';
import { events } from './events';
import { news } from './news';

const unique = (values: string[]) => new Set(values).size === values.length;

describe('contenido local', () => {
  it('solo expone eventos completos publicados desde el CMS', () => {
    expect(
      events.every(
        (event) =>
          event.slug.length > 0 &&
          event.title.length > 0 &&
          event.location.length > 0 &&
          event.excerpt.length > 0,
      ),
    ).toBe(true);
  });

  it('solo expone noticias completas publicadas desde el CMS', () => {
    expect(
      news.every(
        (article) =>
          article.slug.length > 0 &&
          article.title.length > 0 &&
          article.excerpt.length > 0 &&
          article.author.length > 0 &&
          article.category.length > 0 &&
          article.body.length > 0,
      ),
    ).toBe(true);
  });

  it('mantiene slugs únicos de eventos', () => {
    expect(unique(events.map((event) => event.slug))).toBe(true);
  });

  it('mantiene slugs únicos de noticias', () => {
    expect(unique(news.map((article) => article.slug))).toBe(true);
  });

  it('usa fechas parseables para eventos', () => {
    expect(events.every((event) => !Number.isNaN(Date.parse(`${event.date}T12:00:00Z`)))).toBe(
      true,
    );
  });
});
