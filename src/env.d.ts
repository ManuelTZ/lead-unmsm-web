/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_APPLICATION_FORM_URL?: string;
  readonly PUBLIC_CONTACT_FORM_URL?: string;
  readonly PUBLIC_APPLICATION_DEADLINE?: string;
  readonly PUBLIC_INSTAGRAM_URL?: string;
  readonly PUBLIC_LINKEDIN_URL?: string;
  readonly PUBLIC_TIKTOK_URL?: string;
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_PROTOTYPE?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
