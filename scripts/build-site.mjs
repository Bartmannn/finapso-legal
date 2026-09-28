import { mkdir, rm, writeFile } from 'node:fs/promises';
import { execFileSync, spawnSync } from 'node:child_process';
import path from 'node:path';

import { runSiteAudit } from './lib/site-audit.mjs';

const mode = process.argv[2] ?? 'preview';
if (!['preview', 'production'].includes(mode)) {
  throw new Error(`Nieznany tryb builda: ${mode}`);
}

const astroCli = path.join(process.cwd(), 'node_modules', 'astro', 'bin', 'astro.mjs');
const result = spawnSync(
  process.execPath,
  ['--env-file=config/astro.env', astroCli, 'build'],
  { cwd: process.cwd(), env: process.env, stdio: 'inherit' },
);
if (result.status !== 0) process.exit(result.status ?? 1);

let sourceRevision = process.env.GITHUB_SHA;
if (!/^[0-9a-f]{40}$/i.test(sourceRevision ?? '')) {
  sourceRevision = execFileSync('git', ['rev-parse', 'HEAD'], { encoding: 'utf8' }).trim();
}

const distRoot = path.join(process.cwd(), 'dist');
if (mode === 'production') {
  // The MVP publishes only approved legal routes; these drafts remain local.
  for (const segments of [['privacy', 'archive'], ['terms'], ['licenses']]) {
    const target = path.resolve(distRoot, ...segments);
    const relative = path.relative(path.resolve(distRoot), target);
    if (!relative || relative.startsWith('..') || path.isAbsolute(relative)) {
      throw new Error(`Niebezpieczny cel usunięcia szkicu: ${target}`);
    }
    await rm(target, { recursive: true, force: true });
  }
}
await mkdir(distRoot, { recursive: true });
await writeFile(
  path.join(distRoot, 'build-meta.json'),
  `${JSON.stringify({
    schemaVersion: 1,
    sourceRevision,
    mode,
    builtAt: new Date().toISOString(),
  }, null, 2)}\n`,
  'utf8',
);

await runSiteAudit(mode);
