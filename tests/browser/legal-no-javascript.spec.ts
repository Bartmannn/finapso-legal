import { expect, test } from '@playwright/test';

const legalRoutes = [
  { route: '/privacy/', draft: false },
  { route: '/terms/', draft: true },
  { route: '/support/', draft: false },
  { route: '/licenses/', draft: true },
  { route: '/privacy/archive/', draft: true },
];
const localOrigin = 'http://127.0.0.1:4321';
const warning = 'Wersja robocza — nie jest zatwierdzonym dokumentem i nie może zostać użyta w Google Play Console.';

for (const { route, draft } of legalRoutes) {
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
    if (draft) {
      await expect(page.getByText(warning, { exact: true })).toBeVisible();
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'noindex, nofollow');
    } else {
      await expect(page.getByText(warning, { exact: true })).toHaveCount(0);
      await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    }
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
