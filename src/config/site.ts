import { normalizeGoogleFormsUrl, normalizePublicUrl } from '@/lib/publicUrl';
import content from '@/content/site.json';

const editablePublicUrl = (contentValue: string, environmentValue: string | undefined) =>
  normalizePublicUrl(contentValue) || normalizePublicUrl(environmentValue);

const applicationOpen = content.application.open;

export const siteConfig = {
  name: content.name,
  description: content.description,
  siteUrl: normalizePublicUrl(import.meta.env.PUBLIC_SITE_URL),
  socialImage: {
    path: '/brand/social-share.png',
    width: 1731,
    height: 909,
    alt: 'Composición editorial abstracta en carbón y rosa sobre liderazgo, STEM y conexión.',
  },
  prototype: import.meta.env.PUBLIC_PROTOTYPE !== 'false',
  applicationOpen,
  applicationFormUrl: applicationOpen
    ? normalizeGoogleFormsUrl(content.application.formUrl) ||
      normalizeGoogleFormsUrl(import.meta.env.PUBLIC_APPLICATION_FORM_URL)
    : '',
  contactFormUrl: editablePublicUrl(
    content.contactFormUrl,
    import.meta.env.PUBLIC_CONTACT_FORM_URL,
  ),
  applicationDeadline: applicationOpen
    ? content.application.deadline || import.meta.env.PUBLIC_APPLICATION_DEADLINE || ''
    : '',
  socials: {
    instagram: editablePublicUrl(content.socials.instagram, import.meta.env.PUBLIC_INSTAGRAM_URL),
    linkedin: editablePublicUrl(content.socials.linkedin, import.meta.env.PUBLIC_LINKEDIN_URL),
    tiktok: editablePublicUrl(content.socials.tiktok, import.meta.env.PUBLIC_TIKTOK_URL),
  },
};
