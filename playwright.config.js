// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
   testMatch: '**/*.spec.{js,ts}',

  /* Timeouts */
  timeout: 5 * 60 * 1000,
  expect: { timeout: 10000 },

  /* Execution control */
  retries: 0,
  fullyParallel: false, // IMPORTANT
  workers: 1,           // REQUIRED for ordered execution

  /* Reporters */
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
    ['json', { outputFile: 'report.json' }],
    ['allure-playwright'],
  ],

  /* Shared settings */
  use: {
    headless: false, // ✅ CI/Jenkins safe
    baseURL: 'https://www.landydev.com',
    actionTimeout: 60000,
    navigationTimeout: 40000,
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
    launchOptions: {
      slowMo: 150,
      args: [
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-background-timer-throttling',
        '--disable-renderer-backgrounding',
      ],
    },
  },

  /* Browser */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],

  /* Test output */
  outputDir: 'test-results/',
});
