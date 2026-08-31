import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const LOCAL_ORIGIN = 'https://local.invalid';

function readAttribute(tag, name) {
  const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  return match?.[2] ?? null;
}

function routeAliases(filePath) {
  const normalized = `/${filePath.replaceAll('\\\\', '/')}`;

  if (normalized === '/index.html') {
    return ['/', '/index.html'];
  }

  if (normalized.endsWith('/index.html')) {
    const directoryRoute = normalized.slice(0, -'index.html'.length);
    return [directoryRoute.slice(0, -1), directoryRoute, normalized];
  }

  return [normalized];
}

function routeForDocument(filePath) {
  const aliases = routeAliases(filePath);
  return aliases.find((alias) => alias.endsWith('/')) ?? aliases[0];
}

function decodeUrlPart(value) {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

function collectIds(html) {
  return new Set([...html.matchAll(/\bid\s*=\s*(["'])(.*?)\1/gi)].map((match) => match[2]));
}

export function auditDocuments(files) {
  const issues = [];
  const knownPaths = new Set();
  const documentsByRoute = new Map();
  let linksChecked = 0;
  let pagesChecked = 0;

  for (const [filePath, content] of files) {
    for (const alias of routeAliases(filePath)) {
      knownPaths.add(alias);
    }

    if (typeof content === 'string' && filePath.endsWith('.html')) {
      const document = { filePath, html: content, ids: collectIds(content) };
      pagesChecked += 1;

      for (const alias of routeAliases(filePath)) {
        documentsByRoute.set(alias, document);
      }
    }
  }

  for (const [filePath, content] of files) {
    if (typeof content !== 'string' || !filePath.endsWith('.html')) continue;

    const sourceRoute = routeForDocument(filePath);
    const anchorTags = content.match(/<a\b[^>]*>/gi) ?? [];

    for (const tag of anchorTags) {
      const href = readAttribute(tag, 'href')?.trim();
      if (href === null || href === undefined) continue;

      linksChecked += 1;

      if (href === '') {
        issues.push(`${filePath}: contiene un enlace con href vacío.`);
        continue;
      }

      const target = readAttribute(tag, 'target')?.toLowerCase();
      const relTokens = new Set(
        (readAttribute(tag, 'rel') ?? '').toLowerCase().split(/\s+/).filter(Boolean),
      );

      if (target === '_blank' && !relTokens.has('noreferrer') && !relTokens.has('noopener')) {
        issues.push(
          `${filePath}: ${href} abre una pestaña nueva y requiere rel="noreferrer" o "noopener".`,
        );
      }

      let url;
      try {
        url = new URL(href, `${LOCAL_ORIGIN}${sourceRoute}`);
      } catch {
        issues.push(`${filePath}: ${href} no es una URL válida.`);
        continue;
      }

      if (url.protocol === 'mailto:' || url.protocol === 'tel:') continue;

      if (url.origin !== LOCAL_ORIGIN) {
        if (url.protocol === 'http:') {
          issues.push(`${filePath}: ${href} usa HTTP; los enlaces externos deben usar HTTPS.`);
        } else if (url.protocol !== 'https:') {
          issues.push(`${filePath}: ${href} usa el protocolo no permitido ${url.protocol}`);
        }
        continue;
      }

      const pathname = decodeUrlPart(url.pathname);
      if (!knownPaths.has(pathname)) {
        issues.push(`${filePath}: ${href} apunta a un destino interno inexistente.`);
        continue;
      }

      if (url.hash && url.hash !== '#') {
        const fragment = decodeUrlPart(url.hash.slice(1));
        const targetDocument = documentsByRoute.get(pathname);

        if (!targetDocument || !targetDocument.ids.has(fragment)) {
          issues.push(`${filePath}: ${href} apunta a un fragmento inexistente.`);
        }
      }
    }
  }

  return { issues, linksChecked, pagesChecked };
}

function collectBuildFiles(rootDirectory) {
  const files = new Map();

  function visit(directory) {
    for (const entry of readdirSync(directory, { withFileTypes: true })) {
      const absolutePath = join(directory, entry.name);
      if (entry.isDirectory()) {
        visit(absolutePath);
        continue;
      }

      const filePath = relative(rootDirectory, absolutePath).split(sep).join('/');
      files.set(filePath, filePath.endsWith('.html') ? readFileSync(absolutePath, 'utf8') : null);
    }
  }

  visit(rootDirectory);
  return files;
}

function run() {
  const buildDirectory = resolve('dist');
  if (!existsSync(buildDirectory)) {
    console.error('❌ No existe dist/. Ejecuta npm run build antes de auditar enlaces.');
    process.exitCode = 1;
    return;
  }

  const result = auditDocuments(collectBuildFiles(buildDirectory));
  if (result.issues.length > 0) {
    console.error(`❌ Auditoría de enlaces: ${result.issues.length} problema(s).`);
    for (const issue of result.issues) console.error(`- ${issue}`);
    process.exitCode = 1;
    return;
  }

  console.log(
    `✅ Enlaces: ${result.pagesChecked} páginas y ${result.linksChecked} enlaces verificados.`,
  );
}

const currentFile = fileURLToPath(import.meta.url);
const invokedFile = process.argv[1] ? resolve(process.argv[1]) : null;

if (invokedFile === currentFile) run();
