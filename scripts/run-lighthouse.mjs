import { mkdir, readFile, unlink, writeFile } from 'node:fs/promises';
import { spawn, spawnSync } from 'node:child_process';
import path from 'node:path';

import { chromium } from '@playwright/test';

const workspaceRoot = process.cwd();
const port = 4322;
const baseUrl = `http://127.0.0.1:${port}/finapso-legal/`;
const artifactRoot = path.join(workspaceRoot, '.artifacts', 'lighthouse');
const staticServer = path.join(workspaceRoot, 'scripts', 'serve-dist.mjs');
const lighthouseCli = path.join(workspaceRoot, 'node_modules', 'lighthouse', 'cli', 'index.js');
const routes = [
  { id: 'home', path: '' },
  { id: 'privacy', path: 'privacy/' },
];

await mkdir(artifactRoot, { recursive: true });

const server = spawn(
  process.execPath,
  [staticServer, String(port)],
  { cwd: workspaceRoot, env: process.env, stdio: ['ignore', 'ignore', 'pipe'] },
);

async function waitForServer() {
  const deadline = Date.now() + 30_000;
  while (Date.now() < deadline) {
    if (server.exitCode !== null) throw new Error(`Podgląd Astro zakończył się kodem ${server.exitCode}.`);
    try {
      const response = await fetch(baseUrl);
      if (response.ok) return;
    } catch {
      // Serwer jeszcze się uruchamia.
    }
    await new Promise((resolve) => setTimeout(resolve, 250));
  }
  throw new Error('Podgląd Astro nie uruchomił się w ciągu 30 s.');
}

try {
  await waitForServer();
  const summary = [];

  for (const route of routes) {
    const reportPath = path.join(artifactRoot, `${route.id}.json`);
    await unlink(reportPath).catch(() => {});
    const result = spawnSync(
      process.execPath,
      [
        lighthouseCli,
        new URL(route.path, baseUrl).href,
        '--quiet',
        '--output=json',
        `--output-path=${reportPath}`,
        '--only-categories=performance,accessibility,best-practices,seo',
        '--chrome-flags=--headless --no-sandbox --disable-gpu',
      ],
      {
        cwd: workspaceRoot,
        env: { ...process.env, CHROME_PATH: chromium.executablePath() },
        encoding: 'utf8',
      },
    );
    let report;
    try {
      report = JSON.parse(await readFile(reportPath, 'utf8'));
    } catch {
      process.stdout.write(result.stdout ?? '');
      process.stderr.write(result.stderr ?? '');
      throw new Error(`Lighthouse nie utworzył prawidłowego raportu ${route.id}.`);
    }
    if (result.status !== 0) {
      console.warn(`Lighthouse ${route.id}: raport powstał, ale proces zwrócił ${result.status} podczas sprzątania profilu Chromium.`);
    }
    const scores = Object.fromEntries(
      Object.entries(report.categories).map(([key, value]) => [key, Math.round(value.score * 100)]),
    );
    const lcp = report.audits['largest-contentful-paint']?.numericValue ?? null;
    const cls = report.audits['cumulative-layout-shift']?.numericValue ?? null;
    const goalMet = Object.values(scores).every((score) => score >= 95) && lcp < 2500 && cls < 0.1;
    summary.push({ route: route.path || '/', scores, lcpMilliseconds: lcp, cls, goalMet });
    console.log(`Lighthouse ${route.id}: ${JSON.stringify(scores)}, LCP ${Math.round(lcp)} ms, CLS ${cls}, cel=${goalMet ? 'PASS' : 'DO PRZEGLĄDU'}.`);
  }

  await writeFile(path.join(artifactRoot, 'summary.json'), `${JSON.stringify(summary, null, 2)}\n`, 'utf8');
  console.log('Wyniki Lighthouse są raportem środowiskowym; CI egzekwuje deterministyczne budżety zasobów i CLS Playwright.');
} finally {
  server.kill();
}
