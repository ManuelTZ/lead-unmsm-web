import { describe, expect, it } from 'vitest';
import { getCountdownState } from './countdown';

describe('getCountdownState', () => {
  it('calcula días, horas, minutos y segundos', () => {
    const now = new Date('2026-08-11T12:00:00-05:00');
    const result = getCountdownState('2026-08-12T13:02:03-05:00', now);

    expect(result).toEqual({
      isValid: true,
      isExpired: false,
      days: 1,
      hours: 1,
      minutes: 2,
      seconds: 3,
    });
  });

  it('marca una fecha pasada como expirada', () => {
    const now = new Date('2026-08-11T12:00:00-05:00');
    expect(getCountdownState('2026-08-10T12:00:00-05:00', now).isExpired).toBe(true);
  });

  it('maneja fecha inválida sin producir NaN', () => {
    expect(getCountdownState('no-es-fecha')).toEqual({
      isValid: false,
      isExpired: false,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
  });
});
