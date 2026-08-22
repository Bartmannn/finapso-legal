import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

import { noIndexRoutes, siteConfig } from './src/config/site.mjs';

const site = process.env.SITE_ORIGIN ?? siteConfig.origin;
const base = process.env.SITE_BASE ?? siteConfig.basePath;

export default defineConfig({
  site,
  base,
  integrations: [
    sitemap({
      filter(page) {
        const pathname = new URL(page).pathname;
        const normalizedBase = base === '/' ? '/' : `/${base.replace(/^\/+|\/+$/g, '')}/`;
        const relativePath = normalizedBase === '/'
          ? pathname
          : `/${pathname.slice(normalizedBase.length)}`;
        const normalizedPath = relativePath === '/' ? '/' : `/${relativePath.replace(/^\/+|\/+$/g, '')}/`;

        return !noIndexRoutes.includes(normalizedPath);
      },
    }),
  ],
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
