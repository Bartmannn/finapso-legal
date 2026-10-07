import { readFile } from 'node:fs/promises';
import path from 'node:path';

import { expect, test } from '@playwright/test';

const legalRoutes = [
  { route: '/privacy/', source: 'FINAL_Polityka_prywatności_FINAPSO.txt' },
  { route: '/terms/', source: 'FINAL_Regulamin_aplikacji_FINAPSO.txt' },
];
const localOrigin = 'http://127.0.0.1:4321';
const warning = 'Wersja robocza — nie jest zatwierdzonym dokumentem i nie może zostać użyta w Google Play Console.';

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
    await expect(page.getByText(warning, { exact: true })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    const original = await readFile(path.join(process.cwd(), 'src/content/legal', source), 'utf8');
    const rendered = await page.locator('.legal-verbatim').textContent();
    expect(rendered?.replaceAll('\r\n', '\n').trim()).toBe(original.replaceAll('\r\n', '\n').trim());
    await expect(page.locator('script')).toHaveCount(0);
    expect(external).toEqual([]);
  });
}
