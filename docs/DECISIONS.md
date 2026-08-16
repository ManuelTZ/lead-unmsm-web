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

## ADR-005 — Toolchain reproducible en Windows y CI

**Estado:** aceptado.

Se fija Node.js 22 como línea común con CI, se versiona `package-lock.json` y se declara `@types/node` 22 para mantener TypeScript estricto en Vitest y Playwright. Prettier usa `endOfLine: auto` para que `format:check` sea estable con clones Windows configurados con `core.autocrlf`, sin cambiar el formato semántico del código.

## ADR-006 — Colecciones institucionales vacías antes que identidades ficticias

**Estado:** aceptado.

Las colecciones de personas se modelan vacías hasta recibir datos oficiales. No se crean nombres, cargos, biografías, fotografías ni enlaces de demostración para representar integrantes reales.
