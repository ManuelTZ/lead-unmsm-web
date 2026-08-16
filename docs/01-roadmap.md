# 01 — Roadmap incremental

La regla es: **una fase produce una versión usable y comprobable**. No se inicia la fase siguiente con pruebas rojas.

## Fase 0 — Fundaciones y repositorio

**Objetivo:** proyecto reproducible y sincronizado con GitHub.

Entregables:

- Astro + TypeScript.
- Git + GitHub.
- CI.
- AGENTS.md.
- variables `.env` documentadas.

Pruebas/gate:

- `npm run doctor`
- `npm run check`
- `npm run build`

## Fase 1 — Shell funcional y navegación

**Objetivo:** todas las rutas principales existen y la navegación funciona en desktop/móvil.

Entregables:

- Header/footer.
- Inicio, Eventos, Noticias, Nosotros, Alianzas, Perfil.
- 404.

Pruebas:

- E2E navega a las rutas principales.
- CTA principal existe.

## Fase 2 — Eventos + inscripción

**Objetivo:** convertir visitas en registros.

Entregables:

- Modelo tipado de evento.
- listado de próximos/pasados.
- detalle de evento.
- CTA a Google Forms.
- estado de formulario no configurado.

Pruebas:

- datos de evento válidos.
- CTA externo solo aparece si existe URL.
- detalle carga por slug.

## Fase 3 — Countdown

**Objetivo:** urgencia de convocatoria sin backend.

Entregables:

- fecha configurable por env.
- estados activo, expirado e inválido.

Pruebas unitarias:

- cálculo días/horas/minutos/segundos.
- expiración.
- fecha inválida.

## Fase 4 — Test “Descubre tu perfil LEAD”

**Objetivo:** orientar al estudiante y llevarlo a una acción.

Entregables:

- cuestionario local.
- cálculo de perfil.
- resultado con CTA.
- aviso de que el modelo de áreas es provisional hasta validación del chapter.

Pruebas:

- scoring.
- empate determinista.
- E2E completa el formulario y muestra resultado.

## Fase 5 — Noticias / periódico digital

**Objetivo:** publicar y posicionar contenido editorial.

Entregables:

- listado.
- detalle.
- categorías/tags básicos.
- fecha/autor.

Pruebas:

- slugs únicos.
- páginas de detalle generadas.
- navegación lista → detalle.

## Fase 6 — Edición no técnica / CMS

**Objetivo:** comunicaciones puede publicar sin tocar Git.

Primera opción: Sanity. Alternativa: CMS basado en Git si el equipo prioriza menos servicios.

Proceso obligatorio:

1. Definir esquema de Evento, Noticia, Miembro, Métrica, Prensa y Aliado.
2. Implementar `SanityContentRepository` detrás de la interfaz existente.
3. Mantener el repositorio local como fallback de desarrollo.
4. Migrar primero Eventos.
5. Probar.
6. Migrar Noticias.
7. Probar.
8. Migrar el resto.

Pruebas:

- contrato del repositorio.
- manejo de CMS caído/vacío.
- contenido incompleto no rompe la build.

## Fase 7 — UX/UI y sistema visual

**Objetivo:** pulir experiencia después de tener funciones estables.

Actividades:

- validar arquitectura de información con 5–8 usuarios.
- definir jerarquía y wireframes.
- aplicar marca oficial LEAD UNMSM.
- sistema de espaciado, tipografía, botones, tarjetas y estados.
- ajustar negro/rosa para contraste y sobriedad.
- reemplazar todos los placeholders por material propio.

Gate:

- flujos críticos pasan pruebas E2E antes y después del rediseño.
- no empeorar accesibilidad.

## Fase 8 — Calidad de lanzamiento

**Objetivo:** publicar con confianza.

Checklist:

- SEO técnico y metadatos.
- Open Graph.
- sitemap/robots.
- imágenes optimizadas.
- accesibilidad teclado.
- rendimiento móvil.
- enlaces externos.
- analytics solo si hay una necesidad y política clara.

## Fase 9 — Handover

**Objetivo:** que el siguiente programador pueda mantenerlo.

Entregables:

- README actualizado.
- credenciales/propiedad de servicios documentadas fuera de Git.
- video o sesión de transferencia.
- responsables de dominio, CMS y GitHub.
- proceso de renovación de accesos.
