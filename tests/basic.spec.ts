import { test, expect } from '@playwright/test';

test.describe('Example E2E Test - Basic Flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://example.com');
  });

  test('should display main heading', async ({ page }) => {
    const heading = page.locator('h1');
    await expect(heading).toBeVisible();
    await expect(heading).toContainText('Example Domain');
  });

  test('should have working links', async ({ page }) => {
    const link = page.locator('a').first();
    await expect(link).toBeVisible();
  });
});

test.describe('Example E2E Test - Form Interaction', () => {
  test('should demonstrate robust selector strategy', async ({ page }) => {
    await page.goto('https://example.com');
    
    const primaryElement = page.locator('[data-testid="primary"]')
      .or(page.locator('h1'))
      .or(page.locator('text=Example'));
    
    await expect(primaryElement.first()).toBeVisible();
  });

  test('should demonstrate safe click with wait strategy', async ({ page }) => {
    await page.goto('https://example.com');
    
    await page.waitForLoadState('networkidle');
    
    const heading = page.locator('h1');
    await expect(heading).toBeVisible({ timeout: 10000 });
  });
});
