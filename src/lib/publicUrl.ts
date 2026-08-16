const googleFormsHosts = new Set(['forms.gle', 'forms.google.com', 'docs.google.com']);

export function normalizePublicUrl(value?: string): string {
  if (!value || value.includes('REEMPLAZAR')) return '';

  try {
    const url = new URL(value.trim());
    if (url.protocol !== 'https:') return '';
    return url.toString();
  } catch {
    return '';
  }
}

export function normalizeGoogleFormsUrl(value?: string): string {
  const normalized = normalizePublicUrl(value);
  if (!normalized) return '';

  const url = new URL(normalized);
  if (!googleFormsHosts.has(url.hostname)) return '';
  if (url.hostname === 'docs.google.com' && !url.pathname.startsWith('/forms/')) return '';

  return normalized;
}
