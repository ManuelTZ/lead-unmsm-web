import { describe, expect, it } from 'vitest';
import { siteConfig } from './site';

describe('configuración editorial del sitio', () => {
  it('publica las redes oficiales confirmadas', () => {
    expect(siteConfig.socials).toMatchObject({
      instagram: 'https://www.instagram.com/lead_unmsm/',
      linkedin: 'https://www.linkedin.com/company/lead-unmsm',
    });
  });

  it('mantiene cerrada la convocatoria mientras no exista una oficial', () => {
    expect(siteConfig.applicationOpen).toBe(false);
    expect(siteConfig.applicationFormUrl).toBe('');
    expect(siteConfig.applicationDeadline).toBe('');
  });
});
