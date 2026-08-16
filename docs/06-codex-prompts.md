# 06 — Prompts recomendados para Codex

Usar **un prompt por branch/PR**. No pedir “haz toda la web” en una sola tarea.

## Prompt 0 — Auditoría inicial

> Lee AGENTS.md, README.md y docs/01-roadmap.md. No modifiques archivos todavía. Ejecuta `npm run doctor` y, si las dependencias están instaladas, `npm run verify`. Resume el estado, riesgos y la fase que corresponde trabajar. No adelantes fases.

## Prompt 1 — Fase 1 navegación

> Trabaja solo la Fase 1. Revisa las rutas y navegación desktop/móvil. Primero añade o ajusta pruebas E2E para el flujo, luego implementa el cambio mínimo. No hagas rediseño visual. Ejecuta las pruebas y documenta resultados.

## Prompt 2 — Fase 2 eventos

> Trabaja solo la siguiente unidad de Fase 2: listado de eventos y CTA de inscripción. Usa el ContentRepository existente. Añade pruebas antes de implementar. No conectes CMS todavía. No inventes datos reales de LEAD UNMSM; usa placeholders marcados.

## Prompt 3 — Countdown

> Implementa/ajusta únicamente el countdown de Fase 3. La lógica debe permanecer pura en src/lib y cubrir fechas activas, expiradas e inválidas con Vitest. Luego integra el componente. No cambies otras secciones visuales.

## Prompt 4 — Test de perfil

> Trabaja solo la Fase 4. Antes de tocar UI, crea casos de scoring y empate. Después integra el formulario accesible y una prueba E2E que complete todas las preguntas. Mantén los perfiles marcados como provisionales.

## Prompt 5 — Noticias

> Trabaja solo la Fase 5. Añade listado y detalle de noticias usando ContentRepository. Verifica slugs y navegación con pruebas. No conectes todavía el CMS.

## Prompt 6A — Diseño de esquema CMS

> Fase 6, paso 1 únicamente. Propón esquemas para Evento, Noticia, Miembro, Métrica, Prensa y Aliado basados en los modelos actuales. No instales SDK ni modifiques la UI. Registra la decisión en docs/DECISIONS.md.

## Prompt 6B — Primer adaptador CMS

> Fase 6, migrar solo Eventos al CMS aprobado. Implementa un adaptador detrás de ContentRepository y conserva datos locales para desarrollo/fallback. Añade pruebas de contrato y manejo de errores. No migres Noticias todavía.

## Prompt 7 — UX/UI

> Solo después de que Fases 1–6 estén verdes: trabaja Fase 7. Conserva los mismos flujos y tests. Aplica la identidad oficial LEAD UNMSM, negro/rosa sobrio y material visual autorizado. Prioriza legibilidad, jerarquía y mobile. Evita copiar el diseño de LEAD UNI.

## Prompt de revisión antes de PR

> Revisa este branch contra AGENTS.md y la fase activa. Ejecuta pruebas. Identifica bugs, problemas de accesibilidad, datos hardcodeados, dependencias innecesarias, regresiones mobile y features fuera de alcance. Corrige solo problemas del alcance actual.
