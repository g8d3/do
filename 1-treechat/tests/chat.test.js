const { test, expect } = require('@playwright/test');

test.describe('Chat Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
  });

  test('should send message and receive response', async ({ page }) => {
    await page.fill('#chat-input', 'Hello, AI!');
    await page.click('#send-button');

    // Wait for response
    await page.waitForSelector('#chat-history > div:last-child');
    const response = await page.textContent('#chat-history > div:last-child');
    expect(response).toContain('AI:'); // Adjust based on response format

    // Verify chat history as tree/graph
    const chatNodes = await page.$$('#chat-history > div');
    expect(chatNodes.length).toBeGreaterThan(0);
  });
});