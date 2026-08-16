# 07 — GitHub y sincronización

## Crear repositorio

1. Crear un repositorio vacío en GitHub, por ejemplo `lead-unmsm-web`.
2. No crear README remoto si ya usarás esta carpeta.
3. Desde esta carpeta:

```bash
git init
git branch -M main
git add .
git commit -m "chore: bootstrap LEAD UNMSM web"
git remote add origin https://github.com/TU-USUARIO/lead-unmsm-web.git
git push -u origin main
```

O usar `scripts/bootstrap-git.sh URL` (macOS/Linux/Git Bash) o `scripts/bootstrap-git.ps1 URL` (PowerShell).

## Trabajo diario

Nunca desarrollar directamente en `main`.

```bash
git checkout main
git pull
git checkout -b feat/04-profile-quiz
# cambio + tests
git push -u origin feat/04-profile-quiz
```

Después abrir un Pull Request.

## Ramas sugeridas

- `feat/01-navigation`
- `feat/02-events`
- `feat/03-countdown`
- `feat/04-profile-quiz`
- `feat/05-news`
- `feat/06-cms-events`
- `design/07-ux-ui`
- `chore/08-launch-quality`

## Protección de main

Cuando el repositorio ya esté en GitHub:

- requerir Pull Request para mergear.
- requerir que el workflow CI pase.
- evitar force push.
- opcional: activar revisión de código con Codex.

## Codex

Codex puede trabajar directamente sobre un checkout local o sobre un repositorio conectado a GitHub. El archivo `AGENTS.md` viaja con el repo y define las reglas del proyecto.
