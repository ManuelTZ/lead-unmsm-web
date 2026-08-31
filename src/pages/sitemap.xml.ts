import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { buildPublicPaths, buildSitemap } from '@/lib/crawlFiles';
import { contentRepository } from '@/services/content/repository';

export const GET: APIRoute = async () => {
  const [events, news] = await Promise.all([
    contentRepository.listEvents(),
    contentRepository.listNews(),
  ]);
  const paths = buildPublicPaths({
    eventSlugs: events.map((event) => event.slug),
    newsSlugs: news.map((article) => article.slug),
  });

  return new Response(buildSitemap({ siteUrl: siteConfig.siteUrl, paths }), {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
    },
  });
};
