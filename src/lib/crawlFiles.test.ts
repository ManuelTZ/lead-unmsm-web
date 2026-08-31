import { describe, expect, it } from 'vitest';
import { buildPublicPaths, buildRobots, buildSitemap } from './crawlFiles';

describe('buildPublicPaths', () => {
  it('incluye rutas institucionales y detalles editoriales sin duplicados', () => {
    expect(
      buildPublicPaths({
        eventSlugs: ['innovation-day', 'innovation-day'],
        newsSlugs: ['radar-stem'],
      }),
    ).toEqual([
      '/',
      '/alianzas/',
      '/eventos/',
      '/eventos/innovation-day/',
      '/nosotros/',
      '/noticias/',
      '/noticias/radar-stem/',
      '/perfil/',
    ]);
  });
});

describe('buildSitemap', () => {
  it('genera URLs absolutas y escapa contenido XML', () => {
    const sitemap = buildSitemap({
      siteUrl: 'https://lead-unmsm.example/',
      paths: ['/', '/noticias/?categoria=STEM&area=tech'],
    });

    expect(sitemap).toContain('<loc>https://lead-unmsm.example/</loc>');
    expect(sitemap).toContain(
      '<loc>https://lead-unmsm.example/noticias/?categoria=STEM&amp;area=tech</loc>',
    );
  });

  it('no publica URLs sin un dominio oficial configurado', () => {
    expect(buildSitemap({ siteUrl: '', paths: ['/eventos/'] })).not.toContain('<loc>');
  });
});

describe('buildRobots', () => {
  it('bloquea el rastreo del prototipo', () => {
    expect(buildRobots({ siteUrl: '', allowIndexing: false })).toBe(
      ['User-agent: *', 'Disallow: /', ''].join('\n'),
    );
  });

  it('permite rastreo y anuncia el sitemap en produccion', () => {
    expect(
      buildRobots({
        siteUrl: 'https://lead-unmsm.example/',
        allowIndexing: true,
      }),
    ).toBe(
      ['User-agent: *', 'Allow: /', 'Sitemap: https://lead-unmsm.example/sitemap.xml', ''].join(
        '\n',
      ),
    );
  });
});
