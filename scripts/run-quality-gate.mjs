import { spawnSync } from 'node:child_process';

const npmCli = process.env.npm_execpath;
if (!npmCli) throw new Error('Uruchom bramkę przez npm, aby ustalić ścieżkę npm-cli.');

function run(script) {
  console.log(`\n> bramka: npm run ${script}`);
  const result = spawnSync(process.execPath, [npmCli, 'run', script], {
    cwd: process.cwd(),
    env: process.env,
    stdio: 'inherit',
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}

function runMode(mode) {
  run('check');
  run(`build:${mode}`);
  run('validate:html');
  if (mode === 'preview') {
    run('check:legal-center');
    run('test:browser');
  }
}

const mode = process.argv[2] ?? 'all';
if (mode === 'preview') {
  runMode('preview');
  run('test:negative');
} else if (mode === 'production') {
  runMode('production');
} else if (mode === 'all') {
  runMode('preview');
  run('test:negative');
  run('test:production-contract');
} else {
  throw new Error(`Nieznany tryb bramki: ${mode}`);
}
