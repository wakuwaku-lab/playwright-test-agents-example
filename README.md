# Playwright Test Agents Example

## Overview

## Prerequisites

- Node.js 18+ (recommended 20+)
- Git
- VS Code or Cursor

## Installation

```bash
cd playwright-test-agents-example
npm install
npx playwright install chromium
```

## Running Tests

```bash
# Run all tests
npm test

# Run tests with visible browser
npm run test:headed

# Run tests in UI mode
npm run test:ui

# Run tests in debug mode
npm run test:debug

# Show test report
npm run test:report
```

## Project Structure

```
playwright-test-agents-example/
├── src/
│   ├── pages/              # Page Object Models
│   │   └── ExamplePage.ts
│   ├── fixtures/           # Test fixtures
│   │   └── test-data.ts
│   └── mcp/                # MCP integration examples
│       └── figma-mcp.ts
├── tests/                  # Test files
│   ├── basic.spec.ts
│   └── page-object.spec.ts
├── package.json
├── playwright.config.ts
└── tsconfig.json
```

## Key Concepts Demonstrated

### 1. Robust Selector Strategy
```typescript
const element = page.locator('[data-testid="primary-id"]')
  .or(page.locator('[data-cy="fallback-id"]'))
  .or(page.locator('text=visible-text'));
```

### 2. Wait Strategies
```typescript
await page.waitForLoadState('networkidle');
await expect(element).toBeVisible({ timeout: 10000 });
```

### 3. Page Object Model
```typescript
export class ExamplePage extends BasePage {
  async navigate() {
    await this.page.goto('https://example.com');
    await this.waitForStableState();
  }
}
```

### 4. MCP Integration
```typescript
const figmaClient = new FigmaMCPClient();
const components = await figmaClient.getComponents(fileKey);
```

## Initialize Agents (Optional)

```bash
npm run init-agents
```

This sets up the AI agent loop for VS Code.

---

**Author:** [exia.huang](https://github.com/exiahuang)  
**Organization:** [wakuwaku-lab](https://github.com/wakuwaku-lab)
