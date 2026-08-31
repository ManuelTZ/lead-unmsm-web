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

  it.each(['site', 'home', 'events', 'members', 'metrics', 'partners', 'press'])(
    'expone la colección administrable %s',
    (collection) => {
      const config = read('public/admin/config.yml');
      expect(config).toContain(`name: ${collection}`);
      expect(config).toContain(`file: src/content/${collection}.json`);
    },
  );

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

    expect(config).toContain(
      '{ label: Fecha, name: date, widget: date, format: YYYY-MM-DD, required: true }',
    );
    expect(config).toContain(
      '{ label: Identificador URL, name: slug, widget: string, required: true }',
    );
  });

  it('exige los datos necesarios para publicar una noticia', () => {
    const config = read('public/admin/config.yml');

    expect(config).toMatch(
      /label: Fecha,\s+name: publishedAt,\s+widget: date,\s+format: YYYY-MM-DD,\s+required: true(?:,|\s*})/,
    );
    expect(config).toContain('{ label: Autor, name: author, widget: string, required: true }');
  });

  it('configura un build verificable y publicable en Netlify', () => {
    const netlify = read('netlify.toml');

    expect(netlify).toContain('command = "npm run verify"');
    expect(netlify).toContain('publish = "dist"');
    expect(netlify).toContain('PUBLIC_SITE_URL = "https://lead-unmsm.netlify.app"');
    expect(netlify).toContain('PUBLIC_PROTOTYPE = "true"');
  });
});
