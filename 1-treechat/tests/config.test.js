const { test, expect } = require('@playwright/test');

test.describe('User Configuration', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000'); // Replace with your app URL
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
  });

  test('should add and switch configurations', async ({ page }) => {
    // Add new configuration
    await page.click('#config-tab');
    await page.fill('#base-url', 'https://api.example.com');
    await page.fill('#api-key', 'abc123');
    await page.fill('#model-id', 'model-v1');
    await page.click('#save-config');
    
    // Verify config saved
    const configName = await page.textContent('#config-list > li');
    expect(configName).toContain('model-v1');

    // Add another configuration
    await page.fill('#base-url', 'https://api2.example.com');
    await page.fill('#api-key', 'xyz789');
    await page.fill('#model-id', 'model-v2');
    await page.click('#save-config');

    // Switch to first config
    await page.click('#config-list > li:nth-child(1)');
    const activeUrl = await page.inputValue('#base-url');
    expect(activeUrl).toBe('https://api.example.com');

    // Switch to second config
    await page.click('#config-list > li:nth-child(2)');
    const activeUrl2 = await page.inputValue('#base-url');
    expect(activeUrl2).toBe('https://api2.example.com');
  });
});