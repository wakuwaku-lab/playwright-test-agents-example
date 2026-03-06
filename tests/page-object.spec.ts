import { test, expect } from '@playwright/test';
import { ExamplePage } from '../src/pages/ExamplePage';

test.describe('Shipping Registration - Page Object Model', () => {
  let examplePage: ExamplePage;

  test.beforeEach(async ({ page }) => {
    examplePage = new ExamplePage(page);
    await examplePage.navigate();
  });

  test('should display heading correctly', async () => {
    await expect(examplePage.heading).toBeVisible();
  });

  test('should demonstrate fallback selector strategy', async () => {
    const link = examplePage.firstLink;
    await expect(link).toBeVisible();
  });
});

test.describe('Authentication Flow - Best Practices', () => {
  test('should demonstrate robust auth flow', async ({ page }) => {
    await page.goto('https://example.com');
    
    await page.waitForLoadState('networkidle');
    
    await page.waitForFunction(() => {
      return document.readyState === 'complete';
    }, { timeout: 10000 });
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
  });
});
