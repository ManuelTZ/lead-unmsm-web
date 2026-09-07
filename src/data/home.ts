import content from '@/content/home.json';
import { normalizeLocalMediaPath } from '@/lib/media';

export type HeroBackgroundType = 'none' | 'image' | 'video';

export interface HeroAppearance {
  backgroundType: HeroBackgroundType;
  backgroundImage: string;
  backgroundVideo: string;
  animationEnabled: boolean;
}

export type HomeSectionType = 'events' | 'news' | 'team' | 'alliances';

export interface HomeSection {
  sectionType: HomeSectionType;
  enabled: boolean;
  eyebrow: string;
  title: string;
  introduction: string;
}

const homeSectionTypes = new Set<HomeSectionType>(['events', 'news', 'team', 'alliances']);
const isNonEmptyString = (value: unknown): value is string =>
  typeof value === 'string' && value.trim().length > 0;

export const parseHeroAppearance = (value: unknown): HeroAppearance => {
  const appearance = value && typeof value === 'object' ? (value as Record<string, unknown>) : {};
  const backgroundImage = normalizeLocalMediaPath(appearance.backgroundImage);
  const backgroundVideo = normalizeLocalMediaPath(appearance.backgroundVideo);
  const requestedType = appearance.backgroundType;
  const backgroundType: HeroBackgroundType =
    requestedType === 'image' && backgroundImage
      ? 'image'
      : requestedType === 'video' && backgroundVideo
        ? 'video'
        : 'none';

  return {
    backgroundType,
    backgroundImage,
    backgroundVideo,
    animationEnabled: appearance.animationEnabled === true,
  };
};

const isHomeSection = (value: unknown): value is HomeSection => {
  if (!value || typeof value !== 'object') return false;

  const section = value as Record<string, unknown>;
  return (
    homeSectionTypes.has(section.sectionType as HomeSectionType) &&
    typeof section.enabled === 'boolean' &&
    isNonEmptyString(section.eyebrow) &&
    isNonEmptyString(section.title) &&
    isNonEmptyString(section.introduction)
  );
};

export const parseHomeSections = (value: unknown): HomeSection[] => {
  if (!Array.isArray(value)) return [];

  const sectionTypes = new Set<HomeSectionType>();
  return value.filter((section): section is HomeSection => {
    if (!isHomeSection(section) || sectionTypes.has(section.sectionType)) return false;

    sectionTypes.add(section.sectionType);
    return true;
  });
};

export const homeContent = {
  ...content,
  heroAppearance: parseHeroAppearance(content.heroAppearance),
  sections: parseHomeSections(content.sections),
};
