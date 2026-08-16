import { describe, expect, it } from 'vitest';
import { resolveEventRegistrationUrl } from './eventRegistration';

describe('resolveEventRegistrationUrl', () => {
  it('acepta Google Forms únicamente para eventos próximos', () => {
    expect(
      resolveEventRegistrationUrl({
        status: 'upcoming',
        registrationUrl: 'https://forms.gle/evento-demo',
      }),
    ).toBe('https://forms.gle/evento-demo');
  });

  it.each([undefined, '', 'https://example.com/registro', 'javascript:alert(1)'])(
    'oculta una inscripción próxima no publicable: %s',
    (registrationUrl) => {
      expect(resolveEventRegistrationUrl({ status: 'upcoming', registrationUrl })).toBe('');
    },
  );

  it('oculta la inscripción de un evento pasado aunque tenga formulario', () => {
    expect(
      resolveEventRegistrationUrl({
        status: 'past',
        registrationUrl: 'https://forms.gle/evento-finalizado',
      }),
    ).toBe('');
  });
});
