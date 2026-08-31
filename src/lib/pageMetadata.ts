interface PageMetadataInput {
  siteName: string;
  pageTitle: string;
  description: string;
  siteUrl: string;
  pathname: string;
  socialImagePath?: string;
}

interface PageMetadata {
  title: string;
  description: string;
  canonicalUrl?: string;
  socialImageUrl?: string;
}

export function buildPageMetadata({
  siteName,
  pageTitle,
  description,
  siteUrl,
  pathname,
  socialImagePath,
}: PageMetadataInput): PageMetadata {
  const socialImageUrl =
    siteUrl && socialImagePath ? new URL(socialImagePath, siteUrl).toString() : undefined;

  return {
    title: pageTitle === siteName ? pageTitle : `${pageTitle} · ${siteName}`,
    description,
    canonicalUrl: siteUrl ? new URL(pathname, siteUrl).toString() : undefined,
    ...(socialImageUrl ? { socialImageUrl } : {}),
  };
}
