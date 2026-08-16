import { normalizeGoogleFormsUrl, normalizePublicUrl } from '@/lib/publicUrl';

export const siteConfig = {
  name: 'LEAD UNMSM',
  description:
    'Comunidad universitaria orientada a STEM, liderazgo, innovación e impacto desde la UNMSM.',
  prototype: import.meta.env.PUBLIC_PROTOTYPE !== 'false',
  applicationFormUrl: normalizeGoogleFormsUrl(import.meta.env.PUBLIC_APPLICATION_FORM_URL),
  contactFormUrl: normalizePublicUrl(import.meta.env.PUBLIC_CONTACT_FORM_URL),
  applicationDeadline: import.meta.env.PUBLIC_APPLICATION_DEADLINE ?? '',
  socials: {
    instagram: normalizePublicUrl(import.meta.env.PUBLIC_INSTAGRAM_URL),
    linkedin: normalizePublicUrl(import.meta.env.PUBLIC_LINKEDIN_URL),
    tiktok: normalizePublicUrl(import.meta.env.PUBLIC_TIKTOK_URL),
  },
};
