# Phase status

Este archivo se actualiza al cerrar cada PR.

| Fase           | Estado inicial                                                                                       | Gate principal                  |
| -------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------- |
| 0. Fundaciones | 2026-08-15: `npm run verify` y CI del PR #1 verdes; repositorio sincronizado con GitHub              | `npm run verify`                |
| 1. Navegación  | 2026-08-15: seis rutas y encabezados principales verificados en desktop y móvil                      | E2E desktop + móvil             |
| 2. Eventos     | 2026-08-15: inscripción por evento y estados sin formulario/pasado cubiertos; faltan URLs oficiales  | unit + E2E; CTA real pendiente  |
| 3. Countdown   | 2026-08-15: visible en Inicio y estados activo/expirado/inválido cubiertos; falta fecha oficial      | Vitest + E2E; fecha pendiente   |
| 4. Perfil      | 2026-08-15: scoring, empate, aviso provisional, resultado y CTA cubiertos en desktop/móvil           | Vitest + E2E                    |
| 5. Noticias    | 2026-08-15: listado, detalles y navegación verificados en desktop/móvil; contenido oficial pendiente | unit + E2E; contenido pendiente |
| 6. CMS         | No iniciado a propósito                                                                              | contrato de repositorio         |
| 7. UX/UI final | No iniciado a propósito                                                                              | tests existentes siguen verdes  |
| 8. Lanzamiento | No iniciado                                                                                          | checklist calidad               |
| 9. Handover    | No iniciado                                                                                          | documentación + accesos         |

## Regla de actualización

Al cerrar un PR, reemplaza el estado de la fase correspondiente por una nota concreta, por ejemplo:

> 2026-08-15 — Fase 2.1: listado de eventos conectado a datos reales; unit + E2E verdes. Pendiente detalle.

No marques una fase completa si su gate tiene pruebas rojas o datos demo que deberían ser reales.
