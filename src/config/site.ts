const usableUrl = (value?: string) => {
  if (!value || value.includes('REEMPLAZAR')) return '';
  return value;
};

export const siteConfig = {
  name: 'LEAD UNMSM',
  description:
    'Comunidad universitaria orientada a STEM, liderazgo, innovación e impacto desde la UNMSM.',
  prototype: import.meta.env.PUBLIC_PROTOTYPE !== 'false',
  applicationFormUrl: usableUrl(import.meta.env.PUBLIC_APPLICATION_FORM_URL),
  contactFormUrl: usableUrl(import.meta.env.PUBLIC_CONTACT_FORM_URL),
  applicationDeadline: import.meta.env.PUBLIC_APPLICATION_DEADLINE ?? '',
  socials: {
    instagram: usableUrl(import.meta.env.PUBLIC_INSTAGRAM_URL),
    linkedin: usableUrl(import.meta.env.PUBLIC_LINKEDIN_URL),
    tiktok: usableUrl(import.meta.env.PUBLIC_TIKTOK_URL),
  },
};
