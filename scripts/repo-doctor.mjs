import { existsSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const required = [
  'AGENTS.md',
  'README.md',
  'docs/01-roadmap.md',
  'src/pages/index.astro',
  'src/pages/eventos/index.astro',
  'src/pages/noticias/index.astro',
  'src/pages/perfil.astro',
  'src/lib/countdown.test.ts',
  'src/lib/quiz.test.ts',
  'tests/e2e/home.spec.ts',
  '.github/workflows/ci.yml',
];

const missing = required.filter((file) => !existsSync(resolve(file)));
if (missing.length) {
  console.error('❌ Faltan archivos requeridos:\n' + missing.map((x) => ` - ${x}`).join('\n'));
  process.exit(1);
}

const sourceFiles = [
  'src/components/Header.astro',
  'src/pages/index.astro',
  'src/config/site.ts',
];
for (const file of sourceFiles) {
  const text = readFileSync(resolve(file), 'utf8');
  if (/LEAD UNI(?!MSM)/i.test(text)) {
    console.error(`❌ Referencia inesperada a LEAD UNI en código de producto: ${file}`);
    process.exit(1);
  }
}

const env = readFileSync(resolve('.env.example'), 'utf8');
for (const key of ['PUBLIC_APPLICATION_FORM_URL', 'PUBLIC_APPLICATION_DEADLINE']) {
  if (!env.includes(key)) {
    console.error(`❌ .env.example no documenta ${key}`);
    process.exit(1);
  }
}

console.log('✅ Repo doctor: estructura, marca y configuración base correctas.');
