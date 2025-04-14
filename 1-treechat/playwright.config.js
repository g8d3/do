/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    headless: false, // Run in headed mode for visibility
    viewport: { width: 1280, height: 720 },
    actionTimeout: 10000,
    video: 'retain-on-failure',
  },
  retries: 2,
  reporter: [['list'], ['html', { outputFolder: 'playwright-report' }]],
};

module.exports = config;