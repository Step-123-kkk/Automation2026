// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  timeout: 10 * 60 * 1000, // 10 minutes
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,

  reporter: [
    ['html', { open: 'never' }],
    ['allure-playwright'],
  ],

  use: {
    headless: true, // ✅ REQUIRED for GitHub Actions
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});
