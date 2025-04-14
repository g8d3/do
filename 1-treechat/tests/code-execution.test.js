const { test, expect } = require('@playwright/test');

test.describe('Code Execution', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000');
    await page.fill('#username', 'testuser');
    await page.fill('#password', 'password123');
    await page.click('#login-button');
  });

  test('should execute generated code', async ({ page }) => {
    // Simulate AI generating code
    await page.fill('#chat-input', 'Generate a Python script to print "Hello"');
    await page.click('#send-button');

    // Wait for code block
    await page.waitForSelector('#chat-history code');
    const code = await page.textContent('#chat-history code');
    expect(code).toContain('print("Hello")');

    // Execute code
    await page.click('#run-code-button');
    const output = await page.textContent('#code-output');
    expect(output).toContain('Hello');
  });
});