import type { LeadEvent } from '@/models/content';

export const events: LeadEvent[] = [
  {
    slug: 'stem-innovation-day-demo',
    title: 'STEM Innovation Day — demo',
    date: '2026-09-15',
    mode: 'Presencial',
    location: 'UNMSM — ubicación por confirmar',
    excerpt: 'Evento de demostración para validar la experiencia de registro y tarjetas.',
    status: 'upcoming',
    isDemo: true,
  },
  {
    slug: 'tech-career-lab-demo',
    title: 'Tech Career Lab — demo',
    date: '2026-10-02',
    mode: 'Virtual',
    location: 'Online',
    excerpt: 'Contenido demo: preparación para prácticas, empleabilidad y conversaciones con industria.',
    status: 'upcoming',
    isDemo: true,
  },
  {
    slug: 'women-in-tech-demo',
    title: 'Women in Tech — demo',
    date: '2026-06-20',
    mode: 'Híbrido',
    location: 'UNMSM — demo',
    excerpt: 'Contenido demo para probar el archivo de eventos pasados.',
    status: 'past',
    isDemo: true,
  },
];
