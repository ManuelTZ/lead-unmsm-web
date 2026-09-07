import { describe, expect, it } from 'vitest';
import { parseHeroAppearance, parseHomeSections } from './home';

describe('apariencia administrable del hero', () => {
  it('acepta una imagen de fondo subida al sitio', () => {
    expect(
      parseHeroAppearance({
        backgroundType: 'image',
        backgroundImage: '/uploads/hero.webp',
        backgroundVideo: '',
        animationEnabled: true,
      }),
    ).toEqual({
      backgroundType: 'image',
      backgroundImage: '/uploads/hero.webp',
      backgroundVideo: '',
      animationEnabled: true,
    });
  });

  it('acepta un video de fondo y conserva una imagen como portada', () => {
    expect(
      parseHeroAppearance({
        backgroundType: 'video',
        backgroundImage: '/uploads/portada.webp',
        backgroundVideo: '/uploads/hero.mp4',
        animationEnabled: false,
      }),
    ).toEqual({
      backgroundType: 'video',
      backgroundImage: '/uploads/portada.webp',
      backgroundVideo: '/uploads/hero.mp4',
      animationEnabled: false,
    });
  });

  it('desactiva fondos incompletos o rutas externas', () => {
    expect(
      parseHeroAppearance({
        backgroundType: 'video',
        backgroundVideo: 'https://example.com/hero.mp4',
        animationEnabled: 'yes',
      }),
    ).toEqual({
      backgroundType: 'none',
      backgroundImage: '',
      backgroundVideo: '',
      animationEnabled: false,
    });
  });
});

describe('secciones administrables del inicio', () => {
  const eventSection = {
    sectionType: 'events',
    enabled: true,
    eyebrow: 'Agenda',
    title: 'Próximos eventos',
    introduction: 'Actividades publicadas por el equipo.',
  };

  it('conserva el orden definido por el CMS', () => {
    const allianceSection = {
      ...eventSection,
      sectionType: 'alliances',
      eyebrow: 'Colaboraciones',
      title: 'Construyamos oportunidades',
    };

    expect(parseHomeSections([allianceSection, eventSection])).toEqual([
      allianceSection,
      eventSection,
    ]);
  });

  it('descarta tipos inválidos y duplicados', () => {
    expect(
      parseHomeSections([
        eventSection,
        { ...eventSection, title: 'Evento duplicado' },
        { ...eventSection, sectionType: 'profile' },
        { ...eventSection, sectionType: 'invented' },
      ]),
    ).toEqual([eventSection]);
  });
});
