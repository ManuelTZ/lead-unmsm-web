import { describe, expect, it } from 'vitest';
import { matchesPopupPath, parsePopups } from './popups';

const validPopup = {
  id: 'alianzas-demo',
  enabled: true,
  path: '/alianzas',
  title: 'Conversemos',
  message: 'Un aviso administrable.',
  actionLabel: 'Ir a contacto',
  actionUrl: '/alianzas#contacto',
  delaySeconds: 1,
};

describe('popups administrables', () => {
  it('acepta avisos completos con acciones internas', () => {
    expect(parsePopups({ items: [validPopup] })).toEqual([validPopup]);
  });

  it('descarta identificadores, rutas o acciones inseguras', () => {
    expect(
      parsePopups({
        items: [
          { ...validPopup, id: 'Con espacios' },
          { ...validPopup, path: '/ruta-inventada' },
          { ...validPopup, actionUrl: 'javascript:alert(1)' },
        ],
      }),
    ).toEqual([]);
  });

  it('muestra una sección también en sus páginas de detalle', () => {
    expect(matchesPopupPath('/eventos', '/eventos/encuentro-lead')).toBe(true);
    expect(matchesPopupPath('/', '/eventos')).toBe(false);
    expect(matchesPopupPath('*', '/noticias')).toBe(true);
  });
});
