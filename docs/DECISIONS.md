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

## ADR-007 — Prensa solo con fuentes verificables

**Estado:** aceptado.

La colección de prensa permanece vacía hasta contar con apariciones reales. Cada entrada requiere medio, fecha y URL pública verificable; no se crean menciones de demostración.

## ADR-008 — CMS diferido hasta tener responsable operativo

**Estado:** aceptado temporalmente.

El repositorio local seguirá siendo la fuente activa. La integración con un CMS se retomará cuando el equipo designe quién administrará credenciales, permisos, publicación y continuidad del servicio.

## ADR-009 — Canonical solo con dominio público confirmado

**Estado:** aceptado.

El layout genera títulos y metadatos Open Graph/Twitter desde una única fuente. Las etiquetas `canonical` y `og:url` solo se publican cuando `PUBLIC_SITE_URL` contiene una URL HTTPS válida; así el prototipo no declara `localhost` ni un dominio de ejemplo como URL oficial.

## ADR-010 — El prototipo no permite indexación

**Estado:** aceptado.

`robots.txt` bloquea el rastreo mientras `PUBLIC_PROTOTYPE` esté activo o falte un dominio público válido. En producción permite el rastreo y anuncia un sitemap generado desde las rutas institucionales y los slugs del repositorio de contenido, sin mantener una lista editorial duplicada.

## ADR-011 — Imagen social editorial sin wordmark inventado

**Estado:** aceptado temporalmente.

La vista previa social usa una composición abstracta original en carbón y rosa, generada con ImageGen y sin texto ni logos inventados. Open Graph y Twitter reciben una URL absoluta solo cuando existe `PUBLIC_SITE_URL`; la pieza puede sustituirse por material oficial sin cambiar el contrato de metadatos.

## ADR-012 — Presupuesto de 750 KB para la imagen social

**Estado:** aceptado.

La auditoría del build mostró HTML y CSS pequeños y ningún bundle JavaScript cliente independiente; la imagen social era el único recurso dominante con 2 MB. Se conserva como PNG de 1731 × 909, recomprimido a menos de 750 KB, y una prueba impide que futuras sustituciones excedan ese presupuesto.

## ADR-013 — El countdown no es una región viva por segundo

**Estado:** aceptado.

Los valores del contador usan `role="timer"`, cuyo contenido se consulta bajo demanda y no interrumpe al lector de pantalla en cada actualización. Solo el mensaje de estado usa `role="status"` y `aria-atomic="true"` para anunciar una fecha inválida o el cierre de la convocatoria.

## ADR-014 — El menú móvil expone y sincroniza su estado

**Estado:** aceptado.

El control del menú conserva el elemento nativo `details/summary`, identifica el panel con `aria-controls` y sincroniza `aria-expanded` y su nombre accesible. Escape cierra el menú y devuelve el foco al control para mantener un recorrido de teclado predecible.

## ADR-015 — La auditoría de enlaces del build es determinista

**Estado:** aceptado.

`npm run verify` audita después del build los destinos internos, fragmentos, protocolos externos y la protección de enlaces que abren pestañas nuevas. La disponibilidad remota se comprobará cuando existan URLs oficiales, para no introducir fallos de red inestables en la verificación local o en CI.

## ADR-016 — Netlify y Decap CMS para la primera operación editorial

**Estado:** aceptado temporalmente.

La primera publicación usará el plan gratuito de Netlify con su subdominio `netlify.app`, y Decap CMS con Identity y Git Gateway en modo de invitación. Los editores administran archivos JSON desde `/admin/` sin tocar código ni recibir acceso directo a GitHub. La solución conserva el sitio estático, evita una base de datos y permite transferir el contenido junto con el repositorio.

El límite mensual de créditos de Netlify se vigilará y los cambios editoriales se agruparán. Si el volumen supera el plan gratuito, se reevaluará el hosting sin cambiar los modelos de contenido ni los componentes.

## ADR-017 — El contenido editorial se valida al leerlo

**Estado:** aceptado.

Los archivos generados por Decap CMS se validan antes de exponerlos al repositorio de contenido. Una entrada incompleta se omite del build en lugar de derribar todo el despliegue, mientras los campos necesarios también se marcan explícitamente como obligatorios en el panel. Las pruebas aceptan colecciones vacías o con contenido válido para no bloquear futuras publicaciones reales.
