import { describe, expect, it } from 'vitest';
import { calculateProfile } from './quiz';

describe('calculateProfile', () => {
  it('devuelve null sin respuestas', () => {
    expect(calculateProfile([])).toBeNull();
  });

  it('devuelve el perfil con mayor puntaje', () => {
    expect(calculateProfile(['tech', 'tech', 'ops', 'comms'])).toBe('tech');
  });

  it('resuelve empates de forma determinista', () => {
    expect(calculateProfile(['impact', 'tech'])).toBe('tech');
  });
});
