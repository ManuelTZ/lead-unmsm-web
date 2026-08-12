# Paso a paso — de esta carpeta a GitHub + Codex

## A. Preparar el proyecto local

1. Descomprime `lead-unmsm-web.zip`.
2. Abre una terminal dentro de `lead-unmsm-web`.
3. Copia las variables de entorno:

```bash
cp .env.example .env
```

En Windows PowerShell:

```powershell
Copy-Item .env.example .env
```

4. Edita `.env` y, cuando existan, agrega Google Forms, redes y fecha de cierre. Mantén `PUBLIC_PROTOTYPE=true` hasta que el contenido sea real.
5. Instala dependencias:

```bash
npm install
npx playwright install chromium
```

6. Guarda `package-lock.json` en Git después del primer install.
7. Comprueba la base:

```bash
npm run doctor
npm run verify
npm run test:e2e
```

8. Levanta el sitio:

```bash
npm run dev
```

## B. Crear el repositorio de GitHub

1. Crea un repo vacío llamado `lead-unmsm-web`.
2. Desde esta carpeta:

```bash
git init
git branch -M main
git add .
git commit -m "chore: bootstrap LEAD UNMSM web"
git remote add origin https://github.com/TU-USUARIO/lead-unmsm-web.git
git push -u origin main
```

También puedes usar `scripts/bootstrap-git.sh` o `scripts/bootstrap-git.ps1`.

## C. Usarlo con Codex

### Opción local
Abre Codex en el directorio del repositorio. Codex leerá `AGENTS.md`, donde están las reglas del proyecto.

### Opción cloud/GitHub
Conecta GitHub desde Codex y selecciona este repositorio. Trabaja por branch/PR, no directamente en `main`.

Documentación oficial de referencia:
- https://developers.openai.com/codex/quickstart
- https://developers.openai.com/codex/agent-configuration/agents-md
- https://developers.openai.com/codex/integrations/github

## D. Orden de desarrollo

No pidas a Codex “haz toda la web”. Sigue este orden:

1. **Fase 0:** repo, CI y build.
2. **Fase 1:** navegación y rutas.
3. **Fase 2:** eventos + inscripción.
4. **Fase 3:** countdown.
5. **Fase 4:** test de perfil.
6. **Fase 5:** noticias.
7. **Fase 6:** CMS para no programadores.
8. **Fase 7:** UX/UI y marca oficial.
9. **Fase 8:** accesibilidad, SEO, performance y lanzamiento.
10. **Fase 9:** transferencia al siguiente equipo.

Los prompts exactos están en `docs/06-codex-prompts.md`.

## E. Rutina para cada update

```bash
git checkout main
git pull
git checkout -b feat/XX-nombre
```

Luego pide a Codex **una sola función**. Antes de commit:

```bash
npm run verify
npm run test:e2e
```

Si todo pasa:

```bash
git add .
git commit -m "feat(scope): descripcion corta"
git push -u origin feat/XX-nombre
```

Abre PR y fusiona únicamente con CI verde.

## F. Cuando recibas los logos oficiales

1. Ponlos en `public/brand/`.
2. No reemplaces todavía toda la UI.
3. Crea un branch `design/07-brand-integration`.
4. Usa el prompt de Fase 7.
5. Ejecuta los mismos E2E antes y después para verificar que el rediseño no rompió funciones.

## G. Publicación

Una vez estable, conecta el repositorio al proveedor de hosting estático elegido. Build: `npm run build`. Directorio de salida: `dist`. Antes del lanzamiento cambia `PUBLIC_PROTOTYPE=false` y sustituye todo dato demo.
