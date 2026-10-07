import { access, readFile, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { gzipSync } from 'node:zlib';

const workspaceRoot = process.cwd();
const distRoot = path.join(workspaceRoot, 'dist');
const deferredLegalRoutes = new Set();

export function fail(message) {
  throw new Error(message);
}

export function routeToFile(route, root = distRoot) {
  if (route === '/404/' || route === '/404.html') return path.join(root, '404.html');
  const relative = route.replace(/^\/+|\/+$/g, '');
  return relative
    ? path.join(root, ...relative.split('/'), 'index.html')
    : path.join(root, 'index.html');
}

function decodeAttribute(value) {
  return value
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'");
}

export function attributeValue(tag, attribute) {
  const quoted = tag.match(new RegExp(`\\b${attribute}\\s*=\\s*(["'])(.*?)\\1`, 'i'));
  if (quoted) return decodeAttribute(quoted[2]);
  return tag.match(new RegExp(`\\b${attribute}\\s*=\\s*([^\\s>]+)`, 'i'))?.[1] ?? null;
}

function findTag(html, name, selectorAttribute, selectorValue) {
  const tags = html.match(new RegExp(`<${name}\\b[^>]*>`, 'gi')) ?? [];
  return tags.find((tag) => attributeValue(tag, selectorAttribute)?.toLowerCase() === selectorValue) ?? null;
}

function visibleText(html) {
  return html
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&mdash;/g, '—')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function productionPlaceholderLabels(html) {
  const text = visibleText(html);
  const checks = [
    ['lorem ipsum', /lorem\s+ipsum/i],
    ['status DRAFT', /\bDRAFT\b/i],
    ['data do uzupełnienia', /\[DATA\]/i],
    ['adres do uzupełnienia', /\[ADRES KORESPONDENCYJNY\]/i],
    ['domena przykładowa', /(?:example\.(?:com|org|net)|przyklad\.pl)/i],
    ['kontakt przykładowy', /(?:example@|kontakt@przyklad|test@test)/i],
    ['Publisher ID przykładowy', /ca-app-pub-(?:0{6,}|x{4,}|123456)/i],
  ];

  return checks.filter(([, expression]) => expression.test(text) || expression.test(html)).map(([label]) => label);
}

export function assertProductionLegal(html, route) {
  const labels = productionPlaceholderLabels(html);
  if (labels.length > 0) fail(`[release-placeholder] ${route}: ${labels.join(', ')}`);
}

export function assertPreviewLegal(html, route) {
  const labels = productionPlaceholderLabels(html);
  if (labels.length === 0) return;

  const robots = findTag(html, 'meta', 'name', 'robots');
  if (attributeValue(robots ?? '', 'content')?.toLowerCase() !== 'noindex, nofollow') {
    fail(`[preview-draft] ${route}: brak noindex, nofollow`);
  }
}

export function assertResourceOrigins(html, route, publicUrl) {
  const publicOrigin = new URL(publicUrl).origin;
  const resourceTags = html.match(/<(?:script|img|iframe|source|video|audio|object|form|link)\b[^>]*>/gi) ?? [];

  for (const tag of resourceTags) {
    const tagName = tag.match(/^<([a-z]+)/i)?.[1].toLowerCase();
    const rel = attributeValue(tag, 'rel')?.toLowerCase() ?? '';
    const attribute = tagName === 'object'
      ? 'data'
      : tagName === 'form'
        ? 'action'
        : tagName === 'video' && attributeValue(tag, 'poster')
          ? 'poster'
          : tagName === 'link'
            ? 'href'
            : 'src';
    const value = attributeValue(tag, attribute);

    if (!value || value.startsWith('data:') || value.startsWith('#')) continue;
    if (tagName === 'link' && /(?:canonical|alternate)/.test(rel)) continue;

    const url = new URL(value, publicUrl);
    if (/^https?:$/.test(url.protocol) && url.origin !== publicOrigin) {
      fail(`[external-resource] ${route}: ${value}`);
    }
  }
}

function publicPathToFile(pathname, publicBase, root) {
  if (!pathname.startsWith(publicBase.pathname)) return null;
  const relative = decodeURIComponent(pathname.slice(publicBase.pathname.length));
  if (!relative) return path.join(root, 'index.html');
  if (relative === '404/' || relative === '404.html') return path.join(root, '404.html');
  if (relative.endsWith('/')) return path.join(root, ...relative.split('/').filter(Boolean), 'index.html');
  return path.join(root, ...relative.split('/').filter(Boolean));
}

export async function assertInternalLinks(html, route, publicUrl, options = {}) {
  const publicBase = new URL(publicUrl);
  const pageUrl = new URL(route.replace(/^\//, ''), publicBase);
  const links = [...html.matchAll(/<a\b[^>]*href\s*=\s*(["'])(.*?)\1[^>]*>/gi)].map((match) => decodeAttribute(match[2]));
  const exists = options.exists ?? (async (file) => {
    try {
      await access(file);
      return true;
    } catch {
      return false;
    }
  });
  const root = options.root ?? distRoot;

  for (const href of links) {
    if (/^(?:mailto:|tel:)/i.test(href)) continue;
    const resolved = new URL(href, pageUrl);
    if (resolved.origin !== publicBase.origin || !resolved.pathname.startsWith(publicBase.pathname)) continue;
    const targetFile = publicPathToFile(resolved.pathname, publicBase, root);
    if (!targetFile || !(await exists(targetFile))) {
      fail(`[internal-link] ${route}: brak celu ${resolved.pathname}`);
    }
    if (resolved.hash && targetFile.endsWith('.html')) {
      const targetHtml = options.targetHtml ?? await readFile(targetFile, 'utf8');
      const id = decodeURIComponent(resolved.hash.slice(1));
      if (!targetHtml.includes(`id="${id}"`)) {
        fail(`[internal-link] ${route}: brak kotwicy ${resolved.hash}`);
      }
    }
  }
}

async function listFiles(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const target = path.join(root, entry.name);
    if (entry.isDirectory()) files.push(...await listFiles(target));
    else files.push(target);
  }
  return files;
}

export function assertWorkflowSafety(workflow) {
  const uses = [...workflow.matchAll(/uses:\s*[^@\s]+@([^\s#]+)/g)].map((match) => match[1]);
  if (uses.length === 0 || uses.some((reference) => !/^[0-9a-f]{40}$/.test(reference))) {
    fail('[workflow-pin] każda zewnętrzna akcja musi używać pełnego SHA');
  }

  const globalPermissions = workflow.match(/^permissions:\s*\r?\n((?: {2}[^\r\n]+\r?\n?)*)/m)?.[1]
    ?.trim()
    .split(/\r?\n/)
    .map((line) => line.trim()) ?? [];
  if (globalPermissions.length !== 1 || globalPermissions[0] !== 'contents: read') {
    fail('[workflow-permissions] globalne uprawnienia muszą ograniczać się do contents: read');
  }

  const lines = workflow.split(/\r?\n/);
  const deployStart = lines.findIndex((line) => line === '  deploy:');
  const deployEnd = deployStart < 0
    ? -1
    : lines.findIndex((line, index) => index > deployStart && /^  [a-zA-Z0-9_-]+:\s*$/.test(line));
  const deployJob = deployStart < 0
    ? ''
    : lines.slice(deployStart, deployEnd < 0 ? undefined : deployEnd).join('\n');

  if (!deployJob) fail('[workflow-deploy] brak osobnego joba deploy');
  if (!/^    if: github\.event_name != 'pull_request'$/m.test(deployJob) || !/^    needs: build$/m.test(deployJob)) {
    fail('[workflow-deploy-guard] publikacja musi zależeć od builda i pomijać pull requesty');
  }

  const deployPermissions = deployJob.match(/^    permissions:\s*\n((?: {6}[^\n]+\n?)*)/m)?.[1]
    ?.trim()
    .split('\n')
    .map((line) => line.trim())
    .sort() ?? [];
  if (deployPermissions.join('|') !== ['id-token: write', 'pages: write'].sort().join('|')) {
    fail('[workflow-permissions] deploy może mieć wyłącznie pages: write i id-token: write');
  }

  const writes = [...workflow.matchAll(/^\s+([a-zA-Z0-9_-]+):\s*write\s*$/gm)]
    .map((match) => match[1])
    .sort();
  if (writes.join('|') !== ['id-token', 'pages'].sort().join('|')) {
    fail('[workflow-permissions] wykryto dodatkowe uprawnienia zapisu');
  }
  const normalizedWorkflow = workflow.replace(/\r\n/g, '\n');
  const productionStep = normalizedWorkflow.indexOf('      - name: Build publishable site\n        run: npm run build:production');
  const uploadStep = normalizedWorkflow.indexOf('      - name: Upload GitHub Pages artifact');
  if (productionStep < 0 || uploadStep < 0 || productionStep > uploadStep) {
    fail('[workflow-production] artefakt Pages musi powstać z build:production po testach');
  }
  if (!/^      - name: Deploy GitHub Pages artifact$/m.test(deployJob)
      || !/^        id: deployment$/m.test(deployJob)
      || !/^        uses: actions\/deploy-pages@[0-9a-f]{40}(?:\s+#.*)?$/m.test(deployJob)) {
    fail('[workflow-deploy] job deploy nie używa przypiętej akcji actions/deploy-pages');
  }
}

async function assertSourceSafety() {
  const publicationRoots = ['public', 'src', 'scripts', 'tests', 'config', '.github']
    .map((directory) => path.join(workspaceRoot, directory));
  const privateExtensions = /\.(?:jks|keystore|p12|pfx|pem|key|sqlite|sqlite3|db|bak|zip)$/i;
  const secretPatterns = [
    /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/,
    /\bAKIA[0-9A-Z]{16}\b/,
    /\bAIza[0-9A-Za-z_-]{30,}\b/,
    /\bghp_[0-9A-Za-z]{30,}\b/,
    /\bgithub_pat_[0-9A-Za-z_]{40,}\b/,
  ];

  for (const root of publicationRoots) {
    const files = await listFiles(root);
    for (const file of files) {
      if (privateExtensions.test(file)) fail(`[private-file] niedozwolony typ pliku: ${path.relative(workspaceRoot, file)}`);
      const info = await stat(file);
      if (info.size > 2_000_000 || /\.(?:webp|png|jpe?g|gif|ico)$/i.test(file)) continue;
      const source = await readFile(file, 'utf8');
      if (secretPatterns.some((expression) => expression.test(source))) {
        fail(`[secret-scan] wykryto wzorzec sekretu w ${path.relative(workspaceRoot, file)}`);
      }
    }
  }

  const workflow = await readFile(path.join(workspaceRoot, '.github', 'workflows', 'build-pages.yml'), 'utf8');
  assertWorkflowSafety(workflow);
}

async function assertSitemap(contract, mode) {
  const sitemapFiles = (await listFiles(distRoot)).filter((file) => /sitemap.*\.xml$/i.test(path.basename(file)));
  if (sitemapFiles.length === 0) fail('[sitemap] brak wygenerowanej mapy witryny');
  const sitemap = (await Promise.all(sitemapFiles.map((file) => readFile(file, 'utf8')))).join('\n');
  const publicBase = new URL(contract.publicUrl);

  for (const page of contract.pages.filter(({ route }) => route !== '/404/')) {
    const url = new URL(page.route.replace(/^\//, ''), publicBase).href;
    const present = sitemap.includes(url);
    if (present !== page.indexable) {
      fail(`[sitemap] ${page.route}: oczekiwano indexable=${page.indexable}, otrzymano ${present}`);
    }
  }
  if (mode === 'production') {
    for (const route of deferredLegalRoutes) {
      const url = new URL(route.replace(/^\//, ''), publicBase).href;
      if (sitemap.includes(url)) fail(`[sitemap] szkic ${route} znalazł się w mapie witryny MVP`);
    }
  }
}

async function assertBudgets(contract, files) {
  const css = files.filter((file) => file.endsWith('.css'));
  const javascript = files.filter((file) => /\.(?:js|mjs)$/i.test(file));
  const images = files.filter((file) => /\.(?:webp|png|jpe?g|gif|svg|ico)$/i.test(file));
  const cssGzipBytes = (await Promise.all(css.map((file) => readFile(file)))).reduce((sum, buffer) => sum + gzipSync(buffer).byteLength, 0);
  const javascriptBytes = (await Promise.all(javascript.map((file) => stat(file)))).reduce((sum, info) => sum + info.size, 0);
  const artifactBytes = (await Promise.all(files.map((file) => stat(file)))).reduce((sum, info) => sum + info.size, 0);

  if (cssGzipBytes > contract.budgets.cssGzipBytes) fail(`[resource-budget] CSS gzip ${cssGzipBytes} B > ${contract.budgets.cssGzipBytes} B`);
  if (javascriptBytes > contract.budgets.javascriptBytes) fail(`[resource-budget] JavaScript ${javascriptBytes} B > ${contract.budgets.javascriptBytes} B`);
  if (artifactBytes > contract.budgets.artifactBytes) fail(`[resource-budget] artefakt ${artifactBytes} B > ${contract.budgets.artifactBytes} B`);

  for (const image of images) {
    const bytes = (await stat(image)).size;
    if (bytes > contract.budgets.imageBytesEach) {
      fail(`[resource-budget] obraz ${path.relative(distRoot, image)} ${bytes} B > ${contract.budgets.imageBytesEach} B`);
    }
  }

  return { cssGzipBytes, javascriptBytes, artifactBytes, imageCount: images.length };
}

export async function runSiteAudit(mode = 'preview') {
  if (!['preview', 'production'].includes(mode)) fail(`Nieznany tryb audytu: ${mode}`);
  const contract = JSON.parse(await readFile(path.join(workspaceRoot, 'tests', 'fixtures', 'site-contract.json'), 'utf8'));
  if (mode === 'production') {
    contract.pages = contract.pages.filter(({ route }) => !deferredLegalRoutes.has(route));
    for (const route of deferredLegalRoutes) {
      try {
        await access(routeToFile(route));
        fail(`[publication-safety] szkic ${route} znalazł się w pakiecie MVP`);
      } catch (error) {
        if (error?.code !== 'ENOENT') throw error;
      }
    }
  }
  const defaultPublicUrl = new URL(contract.publicUrl);
  const origin = process.env.SITE_ORIGIN ?? defaultPublicUrl.origin;
  const base = process.env.SITE_BASE ?? defaultPublicUrl.pathname;
  const normalizedBase = base === '/' ? '/' : `/${base.replace(/^\/+|\/+$/g, '')}/`;
  contract.publicUrl = new URL(normalizedBase, `${origin.replace(/\/+$/, '')}/`).href;
  const publicBase = new URL(contract.publicUrl);
  const productionBlockers = [];

  for (const page of contract.pages) {
    const file = routeToFile(page.route);
    const html = await readFile(file, 'utf8');
    const expectedCanonical = new URL(page.route.replace(/^\//, ''), publicBase).href;
    const canonical = findTag(html, 'link', 'rel', 'canonical');
    const robots = findTag(html, 'meta', 'name', 'robots');
    const isNoIndex = attributeValue(robots ?? '', 'content')?.toLowerCase() === 'noindex, nofollow';

    if (!/^<!doctype html>/i.test(html)) fail(`[html-contract] ${page.route}: brak doctype`);
    if (!/<html\b[^>]*lang="pl"/i.test(html)) fail(`[html-contract] ${page.route}: brak lang=pl`);
    if ((html.match(/<main\b/gi) ?? []).length !== 1) fail(`[html-contract] ${page.route}: oczekiwano jednego main`);
    if ((html.match(/<h1\b/gi) ?? []).length !== 1) fail(`[html-contract] ${page.route}: oczekiwano jednego h1`);
    if (!/<title>[^<]+<\/title>/i.test(html)) fail(`[html-contract] ${page.route}: brak title`);
    if (attributeValue(canonical ?? '', 'href') !== expectedCanonical) fail(`[canonical] ${page.route}: oczekiwano ${expectedCanonical}`);
    if (isNoIndex === page.indexable) fail(`[robots] ${page.route}: nieprawidłowy status indeksowania`);

    assertResourceOrigins(html, page.route, contract.publicUrl);
    await assertInternalLinks(html, page.route, contract.publicUrl);

    if (page.legal) {
      if ((html.match(/<script\b/gi) ?? []).length > 0) fail(`[legal-javascript] ${page.route}: wykryto tag script`);
      if (mode === 'production') {
        const labels = productionPlaceholderLabels(html);
        if (labels.length > 0) productionBlockers.push(`${page.route}: ${labels.join(', ')}`);
      } else {
        assertPreviewLegal(html, page.route);
      }
    }
  }

  if (productionBlockers.length > 0) {
    fail(`[release-placeholder] Produkcja zablokowana:\n- ${productionBlockers.join('\n- ')}`);
  }

  const files = await listFiles(distRoot);
  for (const forbidden of ['app-ads.txt', path.join('.well-known', 'security.txt')]) {
    if (files.includes(path.join(distRoot, forbidden))) fail(`[publication-safety] opublikowano niedozwolony ${forbidden}`);
  }

  for (const cssFile of files.filter((file) => file.endsWith('.css'))) {
    const css = await readFile(cssFile, 'utf8');
    if (/(?:@import\s+|url\()["']?https?:\/\//i.test(css)) {
      fail(`[external-resource] CSS: ${path.relative(distRoot, cssFile)}`);
    }
  }

  const robots = await readFile(path.join(distRoot, 'robots.txt'), 'utf8');
  if (!robots.includes(`Sitemap: ${new URL('sitemap-index.xml', contract.publicUrl).href}`) || !/User-agent:\s*\*/i.test(robots)) {
    fail('[robots] brak poprawnego odwołania do sitemap-index.xml');
  }

  const buildMetadata = JSON.parse(await readFile(path.join(distRoot, 'build-meta.json'), 'utf8'));
  if (buildMetadata.mode !== mode || !/^[0-9a-f]{40}$/i.test(buildMetadata.sourceRevision)) {
    fail('[build-meta] brak trybu lub pełnej wersji źródła');
  }

  await assertSitemap(contract, mode);
  await assertSourceSafety();
  const budgets = await assertBudgets(contract, files);
  console.log(`Audyt statyczny ${mode}: ${contract.pages.length} tras; CSS gzip ${budgets.cssGzipBytes} B; JS ${budgets.javascriptBytes} B; artefakt ${budgets.artifactBytes} B.`);
  return { pages: contract.pages.length, budgets };
}
