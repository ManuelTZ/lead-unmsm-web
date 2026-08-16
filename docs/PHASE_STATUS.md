# Phase status

Este archivo se actualiza al cerrar cada PR.

| Fase           | Estado inicial                                                                            | Gate principal                 |
| -------------- | ----------------------------------------------------------------------------------------- | ------------------------------ |
| 0. Fundaciones | 2026-08-11: instalación local y `npm run verify` verdes; pendiente confirmar CI en GitHub | `npm run verify`               |
| 1. Navegación  | 2026-08-11: home, CTA y navegación Eventos/Noticias verdes en desktop y móvil             | E2E desktop + móvil            |
| 2. Eventos     | Datos demo + listado/detalle incluidos                                                    | tests de contenido + CTA real  |
| 3. Countdown   | Lógica/componente incluidos                                                               | Vitest fechas                  |
| 4. Perfil      | Lógica/componente incluidos                                                               | Vitest + E2E                   |
| 5. Noticias    | Datos demo + listado/detalle incluidos                                                    | slugs + navegación             |
| 6. CMS         | No iniciado a propósito                                                                   | contrato de repositorio        |
| 7. UX/UI final | No iniciado a propósito                                                                   | tests existentes siguen verdes |
| 8. Lanzamiento | No iniciado                                                                               | checklist calidad              |
| 9. Handover    | No iniciado                                                                               | documentación + accesos        |

## Regla de actualización

Al cerrar un PR, reemplaza el estado de la fase correspondiente por una nota concreta, por ejemplo:

> 2026-08-15 — Fase 2.1: listado de eventos conectado a datos reales; unit + E2E verdes. Pendiente detalle.

No marques una fase completa si su gate tiene pruebas rojas o datos demo que deberían ser reales.
