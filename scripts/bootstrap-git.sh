#!/usr/bin/env bash
set -euo pipefail
REMOTE="${1:-}"
if [ -z "$REMOTE" ]; then
  echo "Uso: bash scripts/bootstrap-git.sh https://github.com/USUARIO/lead-unmsm-web.git"
  exit 1
fi

git init
git branch -M main
git add .
git commit -m "chore: bootstrap LEAD UNMSM web"
git remote add origin "$REMOTE"
git push -u origin main
