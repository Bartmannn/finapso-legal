import { readFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';

import { productionPlaceholderLabels, routeToFile } from './lib/site-audit.mjs';

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Uruchom kontrakt przez npm, aby ustalić ścieżkę npm-cli.');
const legalRoutes = ['/privacy/', '/privacy/archive/', '/terms/', '/support/', '/licenses/'];

function run(script, capture = false) {
  const result = spawnSync(process.execPath, [npmCli, 'run', script], {
    cwd: process.cwd(),
    env: process.env,
    encoding: capture ? 'utf8' : undefined,
    stdio: capture ? 'pipe' : 'inherit',
  });
  if (result.error) throw result.error;
  return result;
}

let preview = run('build:preview');
if (preview.status !== 0) process.exit(preview.status ?? 1);

const expectedBlockers = [];
for (const route of legalRoutes) {
  const labels = productionPlaceholderLabels(await readFile(routeToFile(route), 'utf8'));
  if (labels.length > 0) expectedBlockers.push({ route, labels });
}

const production = run('build:production', true);
const output = `${production.stdout ?? ''}\n${production.stderr ?? ''}`;

if (expectedBlockers.length > 0) {
  if (production.status === 0) {
    throw new Error('Produkcja przeszła mimo wykrytych szkiców prawnych.');
  }
  if (!output.includes('[release-placeholder]')) {
    process.stdout.write(output);
    throw new Error('Produkcja nie przeszła, ale nie z powodu bramki placeholderów.');
  }
  for (const blocker of expectedBlockers) {
    if (!output.includes(blocker.route) || blocker.labels.some((label) => !output.includes(label))) {
      process.stdout.write(output);
      throw new Error(`Raport produkcyjny nie wymienia pełnego blokera dla ${blocker.route}.`);
    }
  }

  console.log(`Kontrakt produkcyjny: oczekiwane BLOCKED (${expectedBlockers.length} tras prawnych).`);
  preview = run('build:preview');
  if (preview.status !== 0) process.exit(preview.status ?? 1);
} else if (production.status !== 0) {
  process.stdout.write(output);
  throw new Error('Brak szkiców prawnych, ale build produkcyjny nie przeszedł.');
} else {
  console.log('Kontrakt produkcyjny: PASS.');
}
