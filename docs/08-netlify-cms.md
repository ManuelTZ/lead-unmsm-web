# Netlify + Decap CMS

La web está preparada para publicarse como sitio estático en Netlify y administrarse desde `/admin/` con Decap CMS. El contenido queda versionado en GitHub, pero los editores usan formularios y no necesitan tocar código ni tener acceso directo al repositorio.

## Qué pueden administrar

- nombre, descripción y redes sociales;
- estado, formulario y fecha de una convocatoria;
- portada;
- eventos y enlaces de inscripción;
- noticias;
- integrantes, métricas, alianzas y apariciones en prensa;
- fotografías y otros archivos subidos a `public/uploads`.

## Activación inicial en Netlify

Esta parte la realiza una sola vez la persona propietaria de las cuentas:

1. Confirmar que el repositorio está en GitHub y que la rama de publicación es `main`.
2. Crear una cuenta en Netlify y elegir **Add new project → Import an existing project**.
3. Conectar el repositorio. Netlify leerá `netlify.toml`, ejecutará `npm run verify` y publicará `dist`.
4. El proyecto usa la dirección confirmada `https://lead-unmsm.netlify.app` mediante `PUBLIC_SITE_URL`.
5. Mantener `PUBLIC_PROTOTYPE=true` hasta aprobar los textos y la revisión final. Lanzar un nuevo deploy después de cualquier cambio de entorno.
6. En **Integrations → Identity**, activar Netlify Identity y seleccionar registro **Invite only**.
7. En la configuración de Identity, activar **Git Gateway**.
8. Invitar a cada editor desde Identity. La invitación permite crear su contraseña y entrar luego en `https://NOMBRE.netlify.app/admin/`.

No guardar contraseñas, tokens de Netlify ni accesos de GitHub dentro del repositorio.

## Flujo editorial

1. El editor entra en `/admin/`.
2. Crea o modifica contenido mediante formularios.
3. Guarda el cambio en el flujo editorial y lo publica cuando esté aprobado.
4. Decap guarda el contenido en GitHub y Netlify reconstruye automáticamente la web.

Conviene agrupar correcciones relacionadas en una publicación. El plan Free usa un límite mensual de créditos y cada despliegue de producción consume créditos.

## Antes del lanzamiento indexable

- reemplazar los textos provisionales;
- confirmar el nombre gratuito definitivo o conectar un dominio propio;
- comprobar eventos, formularios, equipo, métricas y fotografías;
- cambiar `PUBLIC_PROTOTYPE` a `false`;
- ejecutar `npm run verify` y `npm run test:e2e`;
- comprobar `/robots.txt`, `/sitemap.xml` y una vista previa social del dominio publicado.

## Transferencia entre equipos

La propiedad debe quedar en cuentas institucionales o transferibles. Registrar fuera de Git:

- propietario de la organización o repositorio de GitHub;
- propietario del equipo y proyecto de Netlify;
- administradores invitados a Identity;
- correo de recuperación y proceso de relevo anual.

Referencias oficiales: [subdominio de Netlify](https://docs.netlify.com/manage/domains/domains-fundamentals/understand-domains/), [Identity](https://docs.netlify.com/manage/security/secure-access-to-sites/identity/usage-and-billing/) y [Git Gateway de Decap](https://decapcms.org/docs/git-gateway-backend/).
