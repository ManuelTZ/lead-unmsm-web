import { describe, expect, it } from 'vitest';
import { buildPageMetadata } from './pageMetadata';

describe('buildPageMetadata', () => {
  it('compone los metadatos de una pagina interior y su URL canonical', () => {
    expect(
      buildPageMetadata({
        siteName: 'LEAD UNMSM',
        pageTitle: 'Eventos',
        description: 'Agenda de actividades de LEAD UNMSM.',
        siteUrl: 'https://lead-unmsm.example/',
        pathname: '/eventos/',
      }),
    ).toEqual({
      title: 'Eventos · LEAD UNMSM',
      description: 'Agenda de actividades de LEAD UNMSM.',
      canonicalUrl: 'https://lead-unmsm.example/eventos/',
    });
  });

  it('no repite el nombre institucional en la portada', () => {
    const metadata = buildPageMetadata({
      siteName: 'LEAD UNMSM',
      pageTitle: 'LEAD UNMSM',
      description: 'Comunidad universitaria STEM.',
      siteUrl: 'https://lead-unmsm.example/',
      pathname: '/',
    });

    expect(metadata.title).toBe('LEAD UNMSM');
  });

  it('omite la canonical mientras no exista un dominio publico configurado', () => {
    const metadata = buildPageMetadata({
      siteName: 'LEAD UNMSM',
      pageTitle: 'Noticias',
      description: 'Noticias de LEAD UNMSM.',
      siteUrl: '',
      pathname: '/noticias',
    });

    expect(metadata.canonicalUrl).toBeUndefined();
  });

  it('publica una URL social absoluta cuando existe un dominio oficial', () => {
    const metadata = buildPageMetadata({
      siteName: 'LEAD UNMSM',
      pageTitle: 'LEAD UNMSM',
      description: 'Comunidad universitaria STEM.',
      siteUrl: 'https://lead-unmsm.example/',
      pathname: '/',
      socialImagePath: '/brand/social-share.png',
    });

    expect(metadata.socialImageUrl).toBe('https://lead-unmsm.example/brand/social-share.png');
  });
});
