import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  timeout: 60000,
  retries: 2,
  
  use: {
    baseURL: 'https://example.com',
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    actionTimeout: 10000,
    launchOptions: {
      slowMo: 500,
    },
  },
  
  projects: [
    { 
      name: 'chromium', 
      use: { ...devices['Desktop Chrome'] } 
    }
  ],
  
  reporter: [
    ['html'],
    ['json', { outputFile: 'test-results/results.json' }]
  ]
});
