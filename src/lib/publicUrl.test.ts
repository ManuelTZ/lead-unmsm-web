import { describe, expect, it } from 'vitest';
import { normalizeGoogleFormsUrl, normalizePublicUrl } from './publicUrl';

describe('normalizePublicUrl', () => {
  it('acepta enlaces HTTPS absolutos y elimina espacios externos', () => {
    expect(normalizePublicUrl('  https://example.com/path?q=lead  ')).toBe(
      'https://example.com/path?q=lead',
    );
  });

  it.each([
    undefined,
    '',
    'https://example.com/REEMPLAZAR',
    'http://example.com',
    '/eventos',
    'javascript:alert(1)',
    'no-es-una-url',
  ])('rechaza valores no publicables: %s', (value) => {
    expect(normalizePublicUrl(value)).toBe('');
  });
});

describe('normalizeGoogleFormsUrl', () => {
  it.each([
    'https://forms.gle/demo123',
    'https://forms.google.com/demo',
    'https://docs.google.com/forms/d/e/demo/viewform',
  ])('acepta un formulario oficial: %s', (url) => {
    expect(normalizeGoogleFormsUrl(url)).toBe(url);
  });

  it('rechaza enlaces HTTPS que no pertenecen a Google Forms', () => {
    expect(normalizeGoogleFormsUrl('https://example.com/formulario')).toBe('');
  });
});
