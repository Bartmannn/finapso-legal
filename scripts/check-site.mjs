import { runSiteAudit } from './lib/site-audit.mjs';

const mode = process.argv[2] ?? 'preview';
await runSiteAudit(mode);
