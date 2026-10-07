import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { expect, test } from '@playwright/test';

const legalRoutes = [
  { route: '/privacy/', source: 'FINAL_Polityka_prywatności_FINAPSO.md' },
  { route: '/terms/', source: 'FINAL_Regulamin_aplikacji_FINAPSO.md' },
];
const localOrigin = 'http://127.0.0.1:4321';

for (const { route, source } of legalRoutes) {
  test(`${route} działa jako HTML przy wyłączonym JavaScripcie`, async ({ page }) => {
    const external: string[] = [];
    page.on('request', (request) => {
      const url = new URL(request.url());
      if (/^https?:$/.test(url.protocol) && url.origin !== localOrigin) external.push(url.href);
    });

    const response = await page.goto(route.replace(/^\//, ''), { waitUntil: 'networkidle' });
    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('text/html');
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const original = await readFile(path.join(process.cwd(), 'src/content/legal', source), 'utf8');
    const rendered = await page.locator('.legal-reading').evaluate((article) => {
      const parts = [...article.children].map((element, index) => {
        if (index === 0 && element.tagName === 'H1') return `${element.textContent}\n`;
        if (element.tagName === 'H2') return `## ${element.textContent}`;
        if (element.tagName === 'H3') return `### ${element.textContent}`;
        return element.textContent ?? '';
      });
      return parts.join('');
    });
    const expected = original.replaceAll('\r\n', '\n').replace(/^#\s+/, '');
    expect(rendered).toBe(expected);
    await expect(page.locator('.legal-reading')).not.toContainText('Wersja robocza');
    await expect(page.locator('script')).toHaveCount(0);
    expect(external).toEqual([]);
  });
}
