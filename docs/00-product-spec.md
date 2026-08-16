# 00 — Product spec

## Problema

LEAD UNMSM necesita una presencia web que permita informar, captar postulantes, mostrar eventos/noticias y generar confianza ante aliados, sin crear una carga de mantenimiento cara para un grupo universitario.

## Usuarios principales

1. **Estudiante:** quiere entender qué es LEAD, ver oportunidades y postular rápido.
2. **Empresa/institución:** quiere validar impacto, actividades y vías de alianza.
3. **Equipo de LEAD:** quiere publicar eventos/noticias sin tocar el diseño.
4. **Programador/a de relevo:** necesita entender y modificar el proyecto con poco contexto previo.

## Objetivos MVP

- Navegación clara y mobile-first.
- Eventos próximos con CTA de inscripción.
- Página de noticias.
- Sección institucional y de impacto.
- Test de perfil ejecutado en cliente.
- Countdown configurable de convocatoria.
- Contacto/alianzas mediante enlace externo.
- Arquitectura preparada para CMS.

## No objetivos del MVP

- Login de usuarios.
- Portal privado.
- Base de datos propia.
- Sistema de postulaciones propio.
- Feed automático completo de redes sociales.
- Panel administrativo hecho a medida.

## Principios

- Static-first.
- Costo operativo mínimo.
- Contenido separado de presentación.
- Accesibilidad y rendimiento antes que efectos visuales.
- Identidad propia de LEAD UNMSM, no clon de LEAD UNI.

## Definición de terminado de una feature

- Criterios de aceptación cumplidos.
- Prueba unitaria o E2E adecuada.
- `npm run verify` verde.
- Sin secretos hardcodeados.
- Responsive revisado.
- Documentación ajustada si cambia comportamiento o arquitectura.
