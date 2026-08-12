# LEAD UNMSM Web — starter para Codex + GitHub

Base de proyecto creada para desarrollar la web de LEAD UNMSM con una metodología incremental: **funcionalidad primero, pruebas en cada incremento y fase UX/UI después de validar el producto**.

## Qué contiene

- Astro + TypeScript, salida estática.
- Diseño inicial sobrio negro/rosa, deliberadamente distinto del referente LEAD UNI.
- Páginas: Inicio, Eventos, Noticias, Nosotros, Alianzas y Test de perfil.
- Datos demo tipados y desacoplados de la UI.
- Countdown y test de perfil como funciones testeables.
- Vitest para pruebas unitarias.
- Playwright para pruebas end-to-end desktop y móvil.
- CI de GitHub Actions.
- `AGENTS.md` para que Codex respete la metodología del repositorio.
- Roadmap por fases y prompts listos para Codex.

## 1. Requisitos

- Node.js 20 o superior.
- Git.
- Una cuenta de GitHub.
- Codex CLI, app o Codex conectado al repositorio de GitHub.

## 2. Primera ejecución

```bash
cp .env.example .env
npm install
npx playwright install chromium
npm run doctor
npm run dev
```

Abrir `http://localhost:4321`.

Después del primer `npm install`, **commitear `package-lock.json`** para que CI y el resto del equipo usen exactamente las mismas dependencias.

## 3. Antes de cada push

```bash
npm run verify
npm run test:e2e
```

## 4. Flujo recomendado por feature

```bash
git checkout main
git pull
git checkout -b feat/02-eventos
# Pedir a Codex una sola unidad funcional
npm run verify
npm run test:e2e
git add .
git commit -m "feat(events): add event listing and registration CTA"
git push -u origin feat/02-eventos
```

Abrir PR, revisar CI y fusionar solo con todas las pruebas verdes.

## 5. Contenido editable

Durante las primeras fases los datos viven en `src/data`. Es intencional: permite validar navegación, eventos, noticias y test sin pagar ni depender de un CMS.

En Fase 6 se conecta un CMS. La opción recomendada en la propuesta es Sanity; la capa `src/services/content` está preparada para sustituir el repositorio local sin rehacer los componentes.

## 6. Marca

No se incluye el logo de LEAD UNI. Cuando tengas los archivos oficiales de LEAD UNMSM, colócalos en `public/brand/` siguiendo `public/brand/README.md`.

## Documentación

Empieza por:

1. `docs/00-product-spec.md`
2. `docs/01-roadmap.md`
3. `docs/06-codex-prompts.md`
4. `docs/07-github-workflow.md`

## Estado

Este repositorio es un **starter funcional/prototipo**. Los textos, cifras y eventos están marcados como demostración y deben sustituirse por información oficial antes de publicar.
