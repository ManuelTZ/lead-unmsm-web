import { describe, expect, it } from 'vitest';
import { parseNews } from './news';

const validArticle = {
  slug: 'primera-noticia',
  title: 'Primera noticia',
  excerpt: 'Resumen editorial de prueba.',
  publishedAt: '2026-09-20',
  author: 'Equipo LEAD UNMSM',
  category: 'Comunidad',
  body: ['Primer párrafo.', 'Segundo párrafo.'],
};

describe('parseNews', () => {
  it('conserva las noticias completas publicadas desde el CMS', () => {
    expect(parseNews([validArticle])).toEqual([validArticle]);
  });

  it('ignora noticias incompletas para que no rompan el despliegue', () => {
    const { publishedAt: _publishedAt, ...articleWithoutDate } = validArticle;

    expect(parseNews([articleWithoutDate])).toEqual([]);
  });
});
