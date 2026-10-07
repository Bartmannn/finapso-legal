import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const root = process.cwd();
const dist = path.join(root, 'dist');
const publicBase = new URL('https://bartmannn.github.io/finapso-legal/');
const fixtures = JSON.parse(await readFile(path.join(root, 'tests/fixtures/legal-center.json'), 'utf8'));

function fail(message) {
  throw new Error(message);
}

for (const fixture of fixtures) {
  const route = fixture.route;
  const page = path.join(dist, route.replaceAll('/', ''), 'index.html');
  const html = await readFile(page, 'utf8');
  const visibleText = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');
  const canonical = new URL(route.slice(1), publicBase).href;

  if (!html.includes(`<title>${fixture.title}</title>`)) fail(`${route}: nieprawidłowy tytuł`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) fail(`${route}: oczekiwano jednego h1`);
  if (/Wersja robocza|DRAFT|historia zmian|rewizja|package name|app\.finapso\.android/i.test(visibleText)) fail(`${route}: zbędne informacje poza dokumentem`);
  if (!/<meta name="robots" content="noindex, nofollow"\s*\/?\s*>/.test(html)) fail(`${route}: brak noindex`);
  if (!html.includes(`href="${canonical}"`)) fail(`${route}: nieprawidłowy canonical`);
  if (!html.includes('class="legal-verbatim"')) fail(`${route}: brak treści dokumentu`);
  if (/<script\b|<form\b|contenteditable/i.test(html)) fail(`${route}: nieoczekiwany skrypt lub formularz`);
}

for (const fixture of fixtures) {
  try {
    await access(path.join(dist, fixture.source));
    fail(`Źródłowy plik ${fixture.source} został opublikowany poza stroną HTML.`);
  } catch (error) {
    if (error?.code !== 'ENOENT') throw error;
  }
}

console.log(`Sprawdzono ${fixtures.length} stron z dosłowną treścią dokumentów.`);
