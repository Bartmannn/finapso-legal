import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = process.cwd();
const distRoot = path.join(workspaceRoot, 'dist');
const publicBase = new URL('https://bartmannn.github.io/finapso-legal/');
const exactWarning = 'Wersja robocza — nie jest zatwierdzonym dokumentem i nie może zostać użyta w Google Play Console.';
const fixtures = JSON.parse(
  await readFile(path.join(workspaceRoot, 'tests', 'fixtures', 'legal-center.json'), 'utf8'),
);

function fail(message) {
  throw new Error(message);
}

function routeToFile(route) {
  const relative = route.replace(/^\/+|\/+$/g, '');
  return relative
    ? path.join(distRoot, ...relative.split('/'), 'index.html')
    : path.join(distRoot, 'index.html');
}

function attributeValue(tag, attribute) {
  return tag.match(new RegExp(`${attribute}="([^"]*)"`))?.[1] ?? null;
}

function findTag(html, selectorAttribute, selectorValue) {
  const tags = html.match(/<(?:meta|link)\b[^>]*>/g) ?? [];
  return tags.find((tag) => attributeValue(tag, selectorAttribute) === selectorValue) ?? null;
}

function visibleText(html) {
  return html
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/\s+/g, ' ')
    .trim();
}

async function assertInternalLinks(html, pageUrl, sourceRoute) {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);

  for (const href of links) {
    if (/^(?:mailto:|tel:|https?:\/\/)/.test(href) && !href.startsWith(publicBase.origin)) continue;

    const resolved = new URL(href, pageUrl);
    if (resolved.origin !== publicBase.origin || !resolved.pathname.startsWith(publicBase.pathname)) continue;

    const routePath = `/${resolved.pathname.slice(publicBase.pathname.length)}`.replace(/\/{2,}/g, '/');
    const normalizedRoute = routePath === '/' ? '/' : `${routePath.replace(/\/+$/, '')}/`;
    const targetFile = routeToFile(normalizedRoute);

    try {
      await access(targetFile);
    } catch {
      fail(`${sourceRoute}: niedziałający link wewnętrzny ${href}`);
    }

    if (resolved.hash) {
      const targetHtml = await readFile(targetFile, 'utf8');
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (!targetHtml.includes(`id="${id}"`)) fail(`${sourceRoute}: brak celu ${resolved.hash}`);
    }
  }
}

for (const fixture of fixtures) {
  const file = routeToFile(fixture.route);
  const html = await readFile(file, 'utf8');
  const text = visibleText(html);
  const expectedCanonical = new URL(fixture.route.replace(/^\//, ''), publicBase).href;

  if (!html.includes('<html lang="pl">')) fail(`${fixture.route}: brak lang=pl`);
  if (!html.includes(`<title>${fixture.title}</title>`)) fail(`${fixture.route}: nieprawidłowy title`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) fail(`${fixture.route}: oczekiwano jednego h1`);
  if (fixture.draft) {
    if (!text.includes(exactWarning)) fail(`${fixture.route}: brak dokładnego ostrzeżenia o szkicu`);
    if (!text.includes('DRAFT')) fail(`${fixture.route}: brak widocznego statusu DRAFT`);
    if (!text.includes('Nie obowiązuje — szkic')) fail(`${fixture.route}: szkic wygląda jak dokument obowiązujący`);
  } else if (text.includes(exactWarning) || text.includes('DRAFT')) {
    fail(`${fixture.route}: zatwierdzona strona wygląda jak szkic`);
  }
  if (!text.includes('Wersja')) fail(`${fixture.route}: brak numeru wersji`);
  if (!text.includes('Obowiązuje od')) fail(`${fixture.route}: brak daty obowiązywania`);

  const robots = findTag(html, 'name', 'robots');
  const hasNoIndex = attributeValue(robots ?? '', 'content') === 'noindex, nofollow';
  if (hasNoIndex !== fixture.draft) {
    fail(`${fixture.route}: nieprawidłowy status indeksowania`);
  }

  const canonical = findTag(html, 'rel', 'canonical');
  if (attributeValue(canonical ?? '', 'href') !== expectedCanonical) {
    fail(`${fixture.route}: canonical nie wskazuje ${expectedCanonical}`);
  }

  if ((html.match(/<script\b/g) ?? []).length !== 0) fail(`${fixture.route}: wykryto JavaScript`);
  if (/contenteditable|<form\b|<textarea\b/i.test(html)) fail(`${fixture.route}: treść jest edytowalna albo zawiera formularz`);

  const containsLorem = /lorem ipsum/i.test(text);
  if (containsLorem !== fixture.lorem) fail(`${fixture.route}: nieprawidłowy zakres lorem ipsum`);

  const hasToc = html.includes('aria-labelledby="toc-title"');
  if (hasToc !== fixture.toc) fail(`${fixture.route}: nieprawidłowa obecność spisu treści`);

  for (const anchor of fixture.anchors) {
    if (!html.includes(`id="${anchor}"`)) fail(`${fixture.route}: brak stabilnej kotwicy #${anchor}`);
    if (fixture.toc && !html.includes(`href="#${anchor}"`)) fail(`${fixture.route}: spis treści nie linkuje #${anchor}`);
  }

  await assertInternalLinks(html, new URL(fixture.route.replace(/^\//, ''), publicBase), fixture.route);
}

try {
  await access(path.join(distRoot, '.well-known', 'security.txt'));
  fail('Niepotwierdzony security.txt został opublikowany.');
} catch (error) {
  if (error?.message === 'Niepotwierdzony security.txt został opublikowany.') throw error;
}

const printCss = (await readFile(path.join(workspaceRoot, 'src', 'styles', 'global.css'), 'utf8')).split('@media print')[1] ?? '';
for (const selector of ['.site-header', '.site-footer', '.table-of-contents', '.button-row']) {
  if (!printCss.includes(selector)) fail(`Druk: brak reguły dla ${selector}`);
}

console.log(`Sprawdzono ${fixtures.length} chronionych tras centrum prawnego.`);
