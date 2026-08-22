import type { APIRoute } from 'astro';

import { siteConfig } from '../config/site.mjs';

export const prerender = true;

export const GET: APIRoute = () => {
  const origin = process.env.SITE_ORIGIN ?? siteConfig.origin;
  const base = process.env.SITE_BASE ?? siteConfig.basePath;
  const normalizedBase = base === '/' ? '/' : `/${base.replace(/^\/+|\/+$/g, '')}/`;
  const sitemapUrl = new URL(`${normalizedBase.replace(/^\//, '')}sitemap-index.xml`, `${origin.replace(/\/+$/, '')}/`).href;

  return new Response(
  [
    'User-agent: *',
    'Allow: /',
    `Sitemap: ${sitemapUrl}`,
    '',
  ].join('\n'),
  {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  },
  );
};
