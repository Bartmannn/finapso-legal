import { readFile } from 'node:fs/promises';
import path from 'node:path';

import {
  assertInternalLinks,
  assertProductionLegal,
  assertResourceOrigins,
  assertWorkflowSafety,
} from './lib/site-audit.mjs';

const fixtures = JSON.parse(
  await readFile(path.join(process.cwd(), 'tests', 'fixtures', 'negative-gates.json'), 'utf8'),
);
const publicUrl = 'https://bartmannn.github.io/finapso-legal/';

for (const fixture of fixtures) {
  let thrown;
  try {
    if (fixture.gate === 'productionLegal') {
      assertProductionLegal(fixture.html, fixture.route);
    } else if (fixture.gate === 'resourceOrigins') {
      assertResourceOrigins(fixture.html, fixture.route, publicUrl);
    } else if (fixture.gate === 'internalLinks') {
      await assertInternalLinks(fixture.html, fixture.route, publicUrl, {
        exists: async () => false,
        targetHtml: '',
      });
    } else if (fixture.gate === 'workflowSafety') {
      assertWorkflowSafety(fixture.workflow);
    } else {
      throw new Error(`Nieznana bramka fixture: ${fixture.gate}`);
    }
  } catch (error) {
    thrown = error;
  }

  if (!thrown) throw new Error(`${fixture.id}: negatywny fixture nie zatrzymał bramki`);
  if (!String(thrown.message).includes(fixture.expected)) {
    throw new Error(`${fixture.id}: oczekiwano "${fixture.expected}", otrzymano "${thrown.message}"`);
  }
  console.log(`Negatywny fixture ${fixture.id}: PASS (${fixture.expected})`);
}

const workflow = await readFile(path.join(process.cwd(), '.github/workflows/build-pages.yml'), 'utf8');
const withoutProductionBuild = workflow.replace(/      - name: Build publishable site\r?\n        run: npm run build:production\r?\n\r?\n/, '');
if (withoutProductionBuild === workflow) throw new Error('Nie znaleziono produkcyjnego kroku workflow.');
let unsafeWorkflowError;
try {
  assertWorkflowSafety(withoutProductionBuild);
} catch (error) {
  unsafeWorkflowError = error;
}
if (!String(unsafeWorkflowError?.message).includes('[workflow-production]')) {
  throw new Error('Workflow bez build:production nie został zatrzymany przez bramkę.');
}
console.log('Negatywny fixture preview-artifact-deploy: PASS ([workflow-production]).');
