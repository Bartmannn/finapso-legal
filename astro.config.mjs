import { defineConfig } from 'astro/config';

import { siteConfig } from './src/config/site.mjs';

const site = process.env.SITE_ORIGIN ?? siteConfig.origin;
const base = process.env.SITE_BASE ?? siteConfig.basePath;

export default defineConfig({
  site,
  base,
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
