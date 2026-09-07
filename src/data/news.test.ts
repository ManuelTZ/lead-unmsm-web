import { describe, expect, it } from 'vitest';
import { parseNews, parseNewsFiles } from './news';

const validArticle = {
  slug: 'primera-noticia',
  title: 'Primera noticia',
  excerpt: 'Resumen editorial de prueba.',
  publishedAt: '2026-09-20',
  author: 'Equipo LEAD UNMSM',
  category: 'Comunidad',
  body: ['Primer párrafo.', 'Segundo párrafo.'],
  imageSrc: '/uploads/primera-noticia.webp',
  imageAlt: 'Integrantes de LEAD UNMSM durante una actividad',
};

describe('parseNews', () => {
  it('conserva las noticias completas publicadas desde el CMS', () => {
    expect(parseNews([validArticle])).toEqual([validArticle]);
  });

  it('ignora noticias incompletas para que no rompan el despliegue', () => {
    const { publishedAt: _publishedAt, ...articleWithoutDate } = validArticle;

    expect(parseNews([articleWithoutDate])).toEqual([]);
  });

  it('ignora una imagen externa o sin texto alternativo', () => {
    expect(
      parseNews([
        {
          ...validArticle,
          imageSrc: 'https://example.com/imagen.webp',
          imageAlt: '',
        },
      ]),
    ).toEqual([]);
  });

  it('deriva un slug único del nombre de cada archivo editorial', () => {
    const { slug: _slug, ...articleWithoutSlug } = validArticle;

    expect(
      parseNewsFiles({
        '../../content/news/2026-09-20-primera-noticia.json': articleWithoutSlug,
      }),
    ).toEqual([
      {
        ...articleWithoutSlug,
        slug: '2026-09-20-primera-noticia',
      },
    ]);
  });
});
