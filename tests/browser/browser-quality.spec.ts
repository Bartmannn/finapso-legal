import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';
import type { Page } from '@playwright/test';

const keyRoutes = ['/', '/features/', '/docs/', '/privacy/', '/terms/', '/support/'];
const localOrigin = 'http://127.0.0.1:4321';

function relativeRoute(route: string) {
  return route === '/' ? './' : route.replace(/^\//, '');
}

function watchExternalRequests(page: Page) {
  const external: string[] = [];
  page.on('request', (request: { url(): string }) => {
    const url = new URL(request.url());
    if (/^https?:$/.test(url.protocol) && url.origin !== localOrigin) external.push(url.href);
  });
  return external;
}

for (const route of keyRoutes) {
  test(`${route} ma poprawną odpowiedź, brak zewnętrznych żądań i axe serious/critical`, async ({ page }) => {
    const external = watchExternalRequests(page);
    const response = await page.goto(relativeRoute(route), { waitUntil: 'networkidle' });

    expect(response?.status()).toBe(200);
    expect(response?.headers()['content-type']).toContain('text/html');
    await expect(page.locator('main#main-content')).toBeVisible();
    await expect(page.locator('h1')).toHaveCount(1);
    expect(external).toEqual([]);

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const blocking = results.violations.filter(({ impact }) => impact === 'critical' || impact === 'serious');
    expect(blocking, JSON.stringify(blocking, null, 2)).toEqual([]);
  });
}

test('klawiatura uruchamia skip link, a fokus pozostaje widoczny', async ({ page }) => {
  await page.goto('./');
  await page.keyboard.press('Tab');

  const skipLink = page.locator('.skip-link');
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toBeVisible();
  const focusStyle = await skipLink.evaluate((element) => {
    const style = getComputedStyle(element);
    return { width: style.outlineWidth, style: style.outlineStyle };
  });
  expect(Number.parseFloat(focusStyle.width)).toBeGreaterThanOrEqual(3);
  expect(focusStyle.style).not.toBe('none');

  await page.keyboard.press('Enter');
  await expect(page.locator('#main-content')).toBeFocused();
});

test('mobilna nawigacja i cele dotykowe działają od 320 px', async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 800 });
  await page.goto('./');

  await expect(page.locator('header nav')).toBeVisible();
  const dimensions = await page.evaluate(() => ({
    clientWidth: document.documentElement.clientWidth,
    scrollWidth: document.documentElement.scrollWidth,
    targets: [...document.querySelectorAll<HTMLElement>('a, button')].map((element) => {
      const rect = element.getBoundingClientRect();
      return { label: element.textContent?.trim(), width: rect.width, height: rect.height };
    }),
  }));

  expect(dimensions.scrollWidth).toBeLessThanOrEqual(dimensions.clientWidth);
  for (const target of dimensions.targets) {
    expect(target.width, `${target.label}: szerokość`).toBeGreaterThanOrEqual(44);
    expect(target.height, `${target.label}: wysokość`).toBeGreaterThanOrEqual(44);
  }
});

test('formularz kontaktowy przygotowuje wiadomość w programie pocztowym bez zewnętrznego backendu', async ({ page }) => {
  await page.goto('support/', { waitUntil: 'networkidle' });

  const form = page.locator('form.contact-form');
  await expect(form).toHaveAttribute('action', 'mailto:finapso.support@gmail.com');
  await expect(form.getByLabel('Imię lub nazwa (opcjonalnie)')).toHaveCount(1);
  await expect(form.getByLabel('Adres e-mail')).toHaveAttribute('required', '');
  await expect(form.getByLabel('Temat')).toHaveAttribute('required', '');
  await expect(form.getByLabel('Wiadomość')).toHaveAttribute('required', '');
  await expect(page.getByText('Wiadomość zostanie wysłana dopiero po zatwierdzeniu jej w tym programie.')).toBeVisible();
});

for (const route of ['/', '/privacy/']) {
  test(`${route} utrzymuje CLS poniżej 0,1 w lokalnym profilu`, async ({ page }) => {
    await page.addInitScript(() => {
      (window as typeof window & { __finapsoCls: number }).__finapsoCls = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries() as (PerformanceEntry & { hadRecentInput: boolean; value: number })[]) {
          if (!entry.hadRecentInput) {
            (window as typeof window & { __finapsoCls: number }).__finapsoCls += entry.value;
          }
        }
      }).observe({ type: 'layout-shift', buffered: true });
    });
    await page.goto(relativeRoute(route), { waitUntil: 'networkidle' });
    const cls = await page.evaluate(() => (window as typeof window & { __finapsoCls: number }).__finapsoCls);
    expect(cls).toBeLessThan(0.1);
  });
}
