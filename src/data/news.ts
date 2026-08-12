import type { NewsArticle } from '@/models/content';

export const news: NewsArticle[] = [
  {
    slug: 'mujeres-tecnologia-demo',
    title: 'Mujeres que están transformando la tecnología — demo',
    excerpt: 'Artículo de muestra para validar el formato editorial de LEAD UNMSM.',
    publishedAt: '2026-08-01',
    author: 'Equipo editorial — demo',
    category: 'Referentes',
    body: [
      'Este texto es de demostración y debe reemplazarse por contenido editorial aprobado.',
      'La versión final puede combinar perfiles, entrevistas breves y enlaces a fuentes primarias.',
    ],
    isDemo: true,
  },
  {
    slug: 'radar-stem-demo',
    title: 'Radar STEM: cinco temas para seguir este mes — demo',
    excerpt: 'Un formato corto para noticias, tendencias y oportunidades relevantes para estudiantes.',
    publishedAt: '2026-07-24',
    author: 'Equipo editorial — demo',
    category: 'Radar STEM',
    body: [
      'Contenido de demostración para probar la lectura de artículos y la navegación entre rutas.',
    ],
    isDemo: true,
  },
];
