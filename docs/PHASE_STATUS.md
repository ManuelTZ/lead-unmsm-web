# Phase status

Este archivo se actualiza al cerrar cada PR.

| Fase           | Estado inicial                                                                                    | Gate principal                  |
| -------------- | ------------------------------------------------------------------------------------------------- | ------------------------------- |
| 0. Fundaciones | 2026-08-15: `npm run verify` y CI del PR #1 verdes; repositorio sincronizado con GitHub           | `npm run verify`                |
| 1. Navegación  | 2026-08-15: seis rutas y encabezados principales verificados en desktop y móvil                   | E2E desktop + móvil             |
| 2. Eventos     | 2026-08-30: estado vacío oficial y colección CMS listos; falta recibir el primer evento           | unit + E2E; CTA real pendiente  |
| 3. Countdown   | 2026-08-30: comunica convocatoria cerrada; apertura y fechas quedan administrables                | Vitest + E2E; fecha pendiente   |
| 4. Perfil      | 2026-08-15: scoring, empate, aviso provisional, resultado y CTA cubiertos en desktop/móvil        | Vitest + E2E                    |
| 5. Noticias    | 2026-08-30: estado vacío oficial y colección CMS listos; falta la primera publicación             | unit + E2E; contenido pendiente |
| 6. CMS         | 2026-08-30: Decap, contenido JSON y Netlify configurados; falta activar Identity y Git Gateway    | unit + E2E; alta externa        |
| 7. UX/UI final | 2026-08-17: salto por teclado y página actual accesible en desktop/móvil; validación UX pendiente | E2E; investigación pendiente    |
| 8. Lanzamiento | 2026-08-30: SEO, accesibilidad, enlaces y Netlify preparados; falta despliegue público            | unit + E2E; checklist pendiente |
| 9. Handover    | 2026-08-30: guía de Netlify/CMS creada; falta registrar propietarios y realizar transferencia     | documentación + accesos         |

## Regla de actualización

Al cerrar un PR, reemplaza el estado de la fase correspondiente por una nota concreta, por ejemplo:

> 2026-08-15 — Fase 2.1: listado de eventos conectado a datos reales; unit + E2E verdes. Pendiente detalle.

No marques una fase completa si su gate tiene pruebas rojas o datos demo que deberían ser reales.
