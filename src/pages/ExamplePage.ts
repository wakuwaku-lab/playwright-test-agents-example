export class BasePage {
  constructor(public page: Page) {}

  async waitForStableState() {
    await this.page.waitForLoadState('networkidle');
  }

  async safeClick(selector: string) {
    await this.page.waitForSelector(`${selector}:not([disabled])`);
    await this.page.click(selector);
    await this.waitForStableState();
  }

  async safeFill(selector: string, value: string) {
    await this.page.waitForSelector(selector);
    await this.page.fill(selector, value);
  }
}

export class ExamplePage extends BasePage {
  async navigate() {
    await this.page.goto('https://example.com');
    await this.waitForStableState();
  }

  get heading() {
    return this.page.locator('h1');
  }

  get firstLink() {
    return this.page.locator('a').first();
  }

  getReceptionInput() {
    return this.page.locator('[data-testid="reception-input"]')
      .or(this.page.locator('input[placeholder*="受付票"]'))
      .or(this.page.locator('input[id*="reception"]'))
      .or(this.page.locator('input').first());
  }

  async submitForm() {
    const submitButton = this.page.locator('button[type="submit"]')
      .or(this.page.locator('text=確認に進む'))
      .first();
    
    await expect(submitButton).toBeEnabled({ timeout: 10000 });
    await submitButton.click();
    await this.waitForStableState();
  }
}

import { Page, expect } from '@playwright/test';
