# 02 — Arquitectura

## Decisión base

Astro + TypeScript, salida estática.

```text
Equipo editorial
      │
      ▼
  CMS (fase 6)
      │
      ▼
ContentRepository ───────► Astro ───────► archivos estáticos ───────► CDN
      ▲                       │
      │                       ├── countdown (cliente)
Datos locales (MVP)           └── test de perfil (cliente)
```

## Por qué separar `ContentRepository`

Los componentes no deberían saber si el contenido viene de archivos locales, Sanity u otra fuente. Así se puede validar el producto antes de añadir un servicio externo y luego migrar tipo de contenido por tipo de contenido.

## Capas

- `src/pages`: rutas.
- `src/components`: UI reutilizable.
- `src/data`: contenido demo/local.
- `src/models`: tipos de dominio.
- `src/services/content`: acceso a contenido.
- `src/lib`: lógica pura testeable.
- `src/config`: configuración de sitio y features.
- `src/styles`: tokens y CSS global.

## Backend

No hay backend en MVP. Si aparece una función que realmente necesita persistencia/autenticación, crear un ADR en `docs/DECISIONS.md` antes de introducirla.

## CMS futuro

La integración se hace por adaptador. No importar SDK del CMS dentro de componentes visuales.
