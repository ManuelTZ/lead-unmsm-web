interface PublicPathsInput {
  eventSlugs: string[];
  newsSlugs: string[];
}

interface SitemapInput {
  siteUrl: string;
  paths: string[];
}

interface RobotsInput {
  siteUrl: string;
  allowIndexing: boolean;
}

const staticPaths = ['/', '/alianzas/', '/eventos/', '/nosotros/', '/noticias/', '/perfil/'];

function escapeXml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

export function buildPublicPaths({ eventSlugs, newsSlugs }: PublicPathsInput): string[] {
  const paths = [
    ...staticPaths,
    ...eventSlugs.map((slug) => '/eventos/' + encodeURIComponent(slug) + '/'),
    ...newsSlugs.map((slug) => '/noticias/' + encodeURIComponent(slug) + '/'),
  ];

  return [...new Set(paths)].sort();
}

export function buildSitemap({ siteUrl, paths }: SitemapInput): string {
  const locations = siteUrl
    ? paths.map((path) => {
        const url = escapeXml(new URL(path, siteUrl).toString());
        return '  <url><loc>' + url + '</loc></url>';
      })
    : [];

  return [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...locations,
    '</urlset>',
    '',
  ].join('\n');
}

export function buildRobots({ siteUrl, allowIndexing }: RobotsInput): string {
  if (!siteUrl || !allowIndexing) {
    return ['User-agent: *', 'Disallow: /', ''].join('\n');
  }

  return [
    'User-agent: *',
    'Allow: /',
    'Sitemap: ' + new URL('/sitemap.xml', siteUrl).toString(),
    '',
  ].join('\n');
}
