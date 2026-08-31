import { describe, expect, it } from 'vitest';
import { auditDocuments } from './check-links.mjs';

describe('auditDocuments', () => {
  it('acepta rutas internas, fragmentos, assets y enlaces externos seguros', () => {
    const result = auditDocuments(
      new Map([
        [
          'index.html',
          '<main id="main-content"><a href="/eventos">Eventos</a><a href="#main-content">Saltar</a></main>',
        ],
        [
          'eventos/index.html',
          '<h1 id="agenda">Agenda</h1><a href="/">Inicio</a><a href="/brand/favicon.png">Icono</a><a href="https://example.com">Referencia</a>',
        ],
        ['brand/favicon.png', null],
      ]),
    );

    expect(result.issues).toEqual([]);
    expect(result.linksChecked).toBe(5);
  });

  it('reporta destinos, fragmentos y enlaces externos inseguros', () => {
    const result = auditDocuments(
      new Map([
        [
          'index.html',
          [
            '<main id="main-content">',
            '<a href="/ruta-ausente">Ausente</a>',
            '<a href="#fragmento-ausente">Fragmento</a>',
            '<a href="http://example.com">HTTP</a>',
            '<a href="https://example.com" target="_blank">Nueva pestaña</a>',
            '</main>',
          ].join(''),
        ],
      ]),
    );

    expect(result.issues).toEqual(
      expect.arrayContaining([
        expect.stringContaining('/ruta-ausente'),
        expect.stringContaining('#fragmento-ausente'),
        expect.stringContaining('HTTP'),
        expect.stringContaining('noreferrer'),
      ]),
    );
  });
});
