import { defineConfig } from '@playwright/test';

const baseURL = 'http://127.0.0.1:4321/finapso-legal/';

export default defineConfig({
  testDir: './tests/browser',
  fullyParallel: false,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  ...(process.env.CI ? { workers: 1 } : {}),
  reporter: [['list'], ['html', { open: 'never', outputFolder: '.artifacts/playwright-report' }]],
  outputDir: '.artifacts/playwright-results',
  use: {
    baseURL,
    browserName: 'chromium',
    locale: 'pl-PL',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium-quality',
      testMatch: /browser-quality\.spec\.ts/,
    },
    {
      name: 'legal-no-javascript',
      testMatch: /legal-no-javascript\.spec\.ts/,
      use: {
        javaScriptEnabled: false,
      },
    },
  ],
  webServer: {
    command: 'node scripts/serve-dist.mjs 4321',
    url: baseURL,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
    stdout: 'ignore',
    stderr: 'pipe',
  },
});
