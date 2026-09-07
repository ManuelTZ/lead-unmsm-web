import content from '@/content/popups.json';
import { normalizeLocalMediaPath } from '@/lib/media';
import { normalizePublicUrl } from '@/lib/publicUrl';

const allowedPaths = new Set(['*', '/', '/eventos', '/noticias', '/nosotros', '/alianzas']);
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

const isSafeInternalHref = (value: unknown): value is string => {
  if (!isNonEmptyString(value)) return false;

  const href = value.trim();
  const pathname = href.split(/[?#]/, 1)[0];
  return (
    href.startsWith('/') &&
    !href.startsWith('//') &&
    !href.includes('\\') &&
    !pathname.split('/').includes('..')
  );
};

const isSafeActionUrl = (value: unknown): value is string =>
  isSafeInternalHref(value) || (typeof value === 'string' && Boolean(normalizePublicUrl(value)));

export interface PopupNotice {
  id: string;
  enabled: boolean;
  path: string;
  title: string;
  message: string;
  imageSrc?: string;
  imageAlt?: string;
  actionLabel?: string;
  actionUrl?: string;
  delaySeconds: number;
}

const isPopupNotice = (value: unknown): value is PopupNotice => {
  if (!value || typeof value !== 'object') return false;

  const popup = value as Record<string, unknown>;
  const hasNoAction = !isNonEmptyString(popup.actionLabel) && !isNonEmptyString(popup.actionUrl);
  const hasValidAction = isNonEmptyString(popup.actionLabel) && isSafeActionUrl(popup.actionUrl);
  const hasNoImage = !isNonEmptyString(popup.imageSrc) && !isNonEmptyString(popup.imageAlt);
  const hasValidImage =
    Boolean(normalizeLocalMediaPath(popup.imageSrc)) && isNonEmptyString(popup.imageAlt);

  return (
    isNonEmptyString(popup.id) &&
    /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(popup.id) &&
    typeof popup.enabled === 'boolean' &&
    isNonEmptyString(popup.path) &&
    allowedPaths.has(popup.path) &&
    isNonEmptyString(popup.title) &&
    isNonEmptyString(popup.message) &&
    typeof popup.delaySeconds === 'number' &&
    Number.isInteger(popup.delaySeconds) &&
    popup.delaySeconds >= 0 &&
    popup.delaySeconds <= 30 &&
    (hasNoImage || hasValidImage) &&
    (hasNoAction || hasValidAction)
  );
};

export const parsePopups = (value: unknown): PopupNotice[] => {
  if (!value || typeof value !== 'object') return [];

  const items = (value as Record<string, unknown>).items;
  return Array.isArray(items) ? items.filter(isPopupNotice) : [];
};

export const matchesPopupPath = (popupPath: string, currentPath: string): boolean =>
  popupPath === '*' ||
  currentPath === popupPath ||
  (popupPath !== '/' && currentPath.startsWith(`${popupPath}/`));

export const popups = parsePopups(content);
