import { access, readFile } from 'node:fs/promises';
import path from 'node:path';

const workspaceRoot = process.cwd();
const distRoot = path.join(workspaceRoot, 'dist');
const publicBase = new URL('https://bartmannn.github.io/finapso-legal/');
const fixtures = JSON.parse(
  await readFile(path.join(workspaceRoot, 'tests', 'fixtures', 'product-pages.json'), 'utf8'),
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

function expectedCanonical(route) {
  return new URL(route.replace(/^\//, ''), publicBase).href;
}

async function assertInternalLinks(html, pageUrl, sourceRoute) {
  const links = [...html.matchAll(/<a\b[^>]*href="([^"]+)"[^>]*>/g)].map((match) => match[1]);

  for (const href of links) {
    if (/^(?:mailto:|tel:|https?:\/\/)/.test(href) && !href.startsWith(publicBase.origin)) {
      continue;
    }

    const resolved = new URL(href, pageUrl);
    if (resolved.origin !== publicBase.origin || !resolved.pathname.startsWith(publicBase.pathname)) {
      continue;
    }

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
      if (!targetHtml.includes(`id="${id}"`)) {
        fail(`${sourceRoute}: brak celu ${resolved.hash} dla linku ${href}`);
      }
    }
  }
}

for (const fixture of fixtures) {
  const file = routeToFile(fixture.route);
  const html = await readFile(file, 'utf8');
  const canonical = expectedCanonical(fixture.route);

  if (!html.includes('<html lang="pl">')) fail(`${fixture.route}: brak lang=pl`);
  if (!html.includes(`<title>${fixture.title}</title>`)) fail(`${fixture.route}: nieprawidłowy title`);
  if ((html.match(/<h1\b/g) ?? []).length !== 1) fail(`${fixture.route}: oczekiwano jednego h1`);
  if (!html.includes('<main id="main-content"')) fail(`${fixture.route}: brak głównego landmarku`);

  const description = findTag(html, 'name', 'description');
  if (!description || !attributeValue(description, 'content')) fail(`${fixture.route}: brak opisu meta`);

  const canonicalTag = findTag(html, 'rel', 'canonical');
  if (attributeValue(canonicalTag ?? '', 'href') !== canonical) {
    fail(`${fixture.route}: canonical nie wskazuje ${canonical}`);
  }

  for (const property of ['og:title', 'og:description', 'og:url', 'og:image', 'og:image:alt']) {
    const tag = findTag(html, 'property', property);
    if (!tag || !attributeValue(tag, 'content')) fail(`${fixture.route}: brak ${property}`);
  }

  const robotsTag = findTag(html, 'name', 'robots');
  const isNoIndex = attributeValue(robotsTag ?? '', 'content') === 'noindex, nofollow';
  if (isNoIndex !== fixture.draft) fail(`${fixture.route}: nieprawidłowy status indeksowania`);

  const scripts = [...html.matchAll(/<script\b([^>]*)>/g)].map((match) => match[1]);
  if (scripts.some((attributes) => !attributes.includes('type="application/ld+json"'))) {
    fail(`${fixture.route}: wykryto wykonywalny JavaScript`);
  }

  const structuredData = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)?.[1];
  if (fixture.structuredData) {
    const parsed = JSON.parse(structuredData ?? fail(`${fixture.route}: brak danych SoftwareApplication`));
    if (parsed['@type'] !== 'SoftwareApplication' || parsed.softwareVersion !== '1.37.25') {
      fail(`${fixture.route}: nieprawidłowe dane SoftwareApplication`);
    }
  } else if (structuredData) {
    fail(`${fixture.route}: nieoczekiwane dane strukturalne aplikacji`);
  }

  if (/lorem ipsum/i.test(html)) fail(`${fixture.route}: wykryto lorem ipsum`);
  await assertInternalLinks(html, new URL(fixture.route.replace(/^\//, ''), publicBase), fixture.route);
}

console.log(`Sprawdzono ${fixtures.length} tras produktowych i dokumentacyjnych.`);
