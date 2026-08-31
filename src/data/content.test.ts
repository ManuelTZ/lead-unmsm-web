import { describe, expect, it } from 'vitest';
import { events } from './events';
import { news } from './news';

const unique = (values: string[]) => new Set(values).size === values.length;

describe('contenido local', () => {
  it('no inventa eventos mientras no exista una agenda oficial', () => {
    expect(events).toEqual([]);
  });

  it('no inventa noticias mientras no exista contenido editorial oficial', () => {
    expect(news).toEqual([]);
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
