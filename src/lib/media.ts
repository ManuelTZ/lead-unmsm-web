export const isLocalMediaPath = (value: unknown): value is string => {
  if (typeof value !== 'string') return false;

  const path = value.trim();
  const isAllowedFolder = path.startsWith('/uploads/') || path.startsWith('/brand/');
  const hasUnsafeSegments = path.includes('\\') || path.split('/').includes('..');

  return isAllowedFolder && !hasUnsafeSegments;
};

export const normalizeLocalMediaPath = (value: unknown): string =>
  isLocalMediaPath(value) ? value.trim() : '';
