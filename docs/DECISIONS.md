# Decisiones de arquitectura (ADR ligero)

## ADR-001 — Static-first
**Estado:** aceptado.

Se usa Astro con salida estática. La mayoría del sitio es contenido; countdown y quiz son las únicas interacciones de cliente necesarias en el MVP.

## ADR-002 — No copiar el referente LEAD UNI
**Estado:** aceptado.

El ZIP suministrado se trata como benchmark funcional. No se reutilizan assets, endpoints, copy, código ni composición visual.

## ADR-003 — CMS después de validar funciones
**Estado:** aceptado.

Primero datos locales detrás de `ContentRepository`; CMS en Fase 6.

## ADR-004 — Identidad pre-UX/UI
**Estado:** aceptado.

Negro/carbón + rosa, sin gradientes dominantes. La identidad final se valida en Fase 7 con logos y material oficial.
