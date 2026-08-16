# AGENTS.md — LEAD UNMSM Web

## Objetivo

Construir una web institucional/editorial para LEAD UNMSM que sea sobria, rápida, barata de operar y fácil de transferir entre generaciones del equipo.

## Regla principal de trabajo

Trabajar **función por función**. No mezclar varias funcionalidades grandes en un mismo cambio.

## Orden obligatorio

1. Leer `docs/01-roadmap.md` y localizar la fase activa.
2. Escribir o actualizar la prueba que demuestra el comportamiento esperado.
3. Implementar la mínima funcionalidad que hace pasar la prueba.
4. Ejecutar `npm run verify`.
5. Si la fase incluye interacción, ejecutar también `npm run test:e2e`.
6. Solo después hacer refactor o pulido visual.
7. Registrar decisiones importantes en `docs/DECISIONS.md`.

## Restricciones de producto

- Inspirarse en el proyecto LEAD UNI suministrado, pero **no copiar código, textos, logos, imágenes ni composición visual**.
- Identidad visual de esta propuesta: negro/carbón + rosa; evitar el lenguaje visual morado/neón del referente.
- No usar stock genérico como contenido final.
- Mantener contenido demo claramente marcado como demo hasta recibir datos oficiales.
- No añadir backend, base de datos o login sin una necesidad de producto aprobada.
- Inscripciones deben enlazar inicialmente a Google Forms.
- El contenido editable debe estar desacoplado de los componentes para migrarlo a un CMS en una fase posterior.

## Calidad

- TypeScript estricto.
- Accesibilidad por defecto: HTML semántico, teclado, foco visible y contraste suficiente.
- Mobile-first.
- JS cliente solo para interacciones que lo necesiten.
- No introducir dependencias sin justificar su beneficio de mantenimiento/costo.
- Nunca commitear secretos ni tokens.

## Fases

No adelantar el rediseño visual final. La fase UX/UI formal es la Fase 7; antes de ella la interfaz puede ser limpia y usable, pero el objetivo es validar funciones.

## Antes de cerrar cualquier tarea

Reportar:

- archivos modificados,
- pruebas ejecutadas y resultado,
- riesgos/TODO,
- siguiente unidad funcional recomendada.

## Code Review Rules

- Rechazar cambios que mezclen múltiples features sin motivo.
- Rechazar features sin prueba correspondiente cuando sean testeables.
- Rechazar secretos, endpoints privados o datos personales hardcodeados.
- Señalar regresiones mobile, accesibilidad y enlaces rotos.
- Preferir soluciones simples/static-first frente a infraestructura permanente.
