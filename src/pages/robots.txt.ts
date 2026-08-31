import type { APIRoute } from 'astro';
import { siteConfig } from '@/config/site';
import { buildRobots } from '@/lib/crawlFiles';

export const GET: APIRoute = () => {
  const body = buildRobots({
    siteUrl: siteConfig.siteUrl,
    allowIndexing: !siteConfig.prototype,
  });

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
};
