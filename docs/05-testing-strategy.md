# 05 — Estrategia de pruebas

## Pirámide

1. **Unitarias (Vitest):** lógica pura como countdown, scoring, validación de slugs/datos.
2. **Integración ligera:** repositorio de contenido y configuración.
3. **E2E (Playwright):** rutas, CTA, navegación móvil y test de perfil.
4. **Revisión UX/UI manual:** teclado, responsive, contenido real y contraste.

## Regla por update

Cada PR debe responder: “¿qué comportamiento nuevo existe y qué prueba lo protege?”.

## Comandos

```bash
npm run test:unit
npm run test:e2e
npm run verify
```

## Casos críticos

- la home carga sin JS roto.
- navegación funciona con teclado.
- formulario de inscripción no muestra un enlace inválido.
- countdown no muestra NaN.
- test de perfil no calcula sin todas las respuestas.
- rutas de detalle existen para eventos/noticias.
- cambios visuales no eliminan contenido ni CTAs.

## Cuando se conecte CMS

Añadir pruebas de contrato para evitar que un campo faltante tumbe la web completa.
