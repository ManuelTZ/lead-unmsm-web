import { existsSync, readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

const read = (path: string) => readFileSync(path, 'utf8');

describe('configuración del CMS', () => {
  it('publica un panel Decap conectado mediante Git Gateway', () => {
    const admin = read('public/admin/index.html');
    const config = read('public/admin/config.yml');
    const home = read('src/pages/index.astro');

    expect(admin).toContain('decap-cms');
    expect(admin).toContain('netlify-identity-widget');
    expect(home).toContain('invite_token');
    expect(home).toContain('netlify-identity-widget');
    expect(config).toContain('name: git-gateway');
    expect(config).toContain('publish_mode: editorial_workflow');
  });

  it.each(['site', 'home', 'contact', 'popups', 'members', 'partners'])(
    'expone la colección administrable %s',
    (collection) => {
      const config = read('public/admin/config.yml');
      expect(config).toContain(`name: ${collection}`);
      expect(config).toContain(`file: src/content/${collection}.json`);
    },
  );

  it('alinea el formulario exclusivo de Inicio con una sección Contacto en el CMS', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('label: ✉️ Contáctanos — solo Inicio');
    expect(config).toContain('name: introduction');
    expect(config).not.toContain('label: Correo visible');
    expect(config).toContain('name: subjects');
  });

  it('permite añadir, ordenar y eliminar popups desde el CMS', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('label: 📣 Popups y avisos');
    expect(config).toContain('name: popups');
    expect(config).toContain('label: Avisos');
    expect(config).toContain('name: items');
    expect(config).toContain('name: delaySeconds');
    expect(config).toContain('label: Imagen del popup');
    expect(config).toContain('label: Descripción accesible de la imagen del popup');
  });

  it('oculta Métricas y Prensa del panel hasta que tengan una edición confiable', () => {
    const config = read('public/admin/config.yml');

    expect(config).not.toContain('- name: metrics');
    expect(config).not.toContain('- name: press');
    expect(config).not.toContain('label: 📊 Nosotros — Métricas');
    expect(config).not.toContain('label: 📰 Nosotros — Prensa');
  });

  it('permite administrar el fondo y la animación del hero', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('name: heroAppearance');
    expect(config).toContain('name: backgroundType');
    expect(config).toContain('name: backgroundImage');
    expect(config).toContain('name: backgroundVideo');
    expect(config).toContain('name: animationEnabled');
    expect(config).toContain('label: Mostrar respiración luminosa del fondo');
  });

  it('presenta el panel con marca, iconos y nombres alineados con la web', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('logo_url: /brand/lead-mark.png');
    expect(config).toContain('site_url: /');
    expect(config).toContain('label: 🏠 Inicio');
    expect(config).toContain('label: 📅 Eventos');
    expect(config).toContain('label: 🗞️ Noticias');
    expect(config).toContain('label: 👥 Nosotros — Equipo');
    expect(config).toContain('label: 🤝 Alianzas');
  });

  it('permite añadir, ordenar, ocultar y eliminar secciones del inicio', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('label: Secciones de Inicio');
    expect(config).toContain('name: sections');
    expect(config).toContain('name: sectionType');
    expect(config).toContain('name: enabled');
    expect(config).not.toContain('value: profile');
    expect(config).not.toContain("value: '/perfil'");
  });

  it('permite añadir imágenes accesibles a popups, eventos, noticias y equipo', () => {
    const config = read('public/admin/config.yml');

    expect(config.match(/name: imageSrc/g)).toHaveLength(4);
    expect(config.match(/name: imageAlt/g)).toHaveLength(3);
    expect(config).toContain('Fotografía del integrante');
    expect(config).toContain('Imagen principal del evento');
    expect(config).toContain('Imagen principal de la noticia');
  });

  it('permite administrar el enlace institucional de LEAD Perú', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('label: Enlace de LEAD Perú');
    expect(config).toContain('name: leadPeruUrl');
  });

  it('configura Eventos como colección de archivos con slug automático', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('folder: content/events');
    expect(config).toContain("slug: '{{fields.date}}-{{slug}}'");
    expect(config).not.toContain('file: src/content/events.json');
    expect(existsSync('src/content/events.json')).toBe(false);
  });

  it('configura Noticias como colección de archivos con slug automático', () => {
    const config = read('public/admin/config.yml');

    expect(config).toContain('folder: content/news');
    expect(config).toContain('create: true');
    expect(config).toContain("slug: '{{fields.publishedAt}}-{{slug}}'");
    expect(config).not.toContain('file: src/content/news.json');
    expect(existsSync('src/content/news.json')).toBe(false);
  });

  it('exige los datos necesarios para publicar un evento', () => {
    const config = read('public/admin/config.yml');

    expect(config).toMatch(
      /label: Fecha,\s+name: date,\s+widget: datetime,\s+date_format: YYYY-MM-DD,\s+time_format: false,\s+format: YYYY-MM-DD,\s+required: true(?:,|\s*})/,
    );
  });

  it('exige los datos necesarios para publicar una noticia', () => {
    const config = read('public/admin/config.yml');

    expect(config).toMatch(
      /label: Fecha,\s+name: publishedAt,\s+widget: datetime,\s+date_format: YYYY-MM-DD,\s+time_format: false,\s+format: YYYY-MM-DD,\s+required: true(?:,|\s*})/,
    );
    expect(config).toContain('{ label: Autor, name: author, widget: string, required: true }');
  });

  it('deja que Decap serialice su contenido JSON sin bloquear el gate de formato', () => {
    const prettierIgnore = read('.prettierignore');

    expect(prettierIgnore).toContain('content/**/*.json');
    expect(prettierIgnore).toContain('src/content/*.json');
  });

  it('configura un build verificable y publicable en Netlify', () => {
    const netlify = read('netlify.toml');

    expect(netlify).toContain('command = "npm run verify"');
    expect(netlify).toContain('publish = "dist"');
    expect(netlify).toContain('PUBLIC_SITE_URL = "https://lead-unmsm.netlify.app"');
    expect(netlify).toContain('PUBLIC_PROTOTYPE = "true"');
  });
});
