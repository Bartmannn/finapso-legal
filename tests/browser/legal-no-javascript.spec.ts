import { expect, test } from '@playwright/test';

const legalRoutes = ['/privacy/', '/terms/', '/support/', '/licenses/', '/privacy/archive/'];
const localOrigin = 'http://127.0.0.1:4321';
const warning = 'Wersja demonstracyjna — treść przykładowa, nie stanowi dokumentu prawnego i nie może zostać użyta w Google Play Console.';

for (const route of legalRoutes) {
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
    await expect(page.locator('script')).toHaveCount(0);
    expect(external).toEqual([]);
  });
}

for (const route of ['/privacy/', '/terms/']) {
  test(`${route} zachowuje działające kotwice bez JavaScriptu`, async ({ page }) => {
    await page.goto(route.replace(/^\//, ''));
    const firstLink = page.locator('.table-of-contents a').first();
    const href = await firstLink.getAttribute('href');
    expect(href).toMatch(/^#/);
    await firstLink.click();
    await expect(page).toHaveURL(new RegExp(`${href?.replace('#', '#')}$`));
    await expect(page.locator(href ?? '#missing')).toBeVisible();
  });
}
