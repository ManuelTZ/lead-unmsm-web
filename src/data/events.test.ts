import { describe, expect, it } from 'vitest';
import { parseEventFiles, parseEvents } from './events';

const validEvent = {
  slug: 'encuentro-lead',
  title: 'Encuentro LEAD',
  date: '2026-09-15',
  mode: 'Presencial',
  location: 'UNMSM',
  excerpt: 'Una actividad oficial.',
  registrationUrl: 'https://forms.google.com/example',
  status: 'upcoming',
};

describe('parseEvents', () => {
  it('conserva los eventos completos publicados desde el CMS', () => {
    expect(parseEvents([validEvent])).toEqual([validEvent]);
  });

  it('ignora entradas incompletas para que no rompan el despliegue', () => {
    const { date: _date, ...eventWithoutDate } = validEvent;

    expect(parseEvents([eventWithoutDate])).toEqual([]);
  });

  it('deriva un slug único del nombre de cada archivo editorial', () => {
    const { slug: _slug, ...eventWithoutSlug } = validEvent;

    expect(
      parseEventFiles({
        '../../content/events/2026-09-15-encuentro-lead.json': eventWithoutSlug,
      }),
    ).toEqual([
      {
        ...eventWithoutSlug,
        slug: '2026-09-15-encuentro-lead',
      },
    ]);
  });
});
