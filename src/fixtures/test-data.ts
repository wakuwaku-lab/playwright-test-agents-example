import { test as base } from '@playwright/test';

interface TestData {
  validUser: {
    employeeCode: string;
    password: string;
  };
  testReceptionNumbers: {
    processed: string;
    unprocessed: string;
    completed: string;
  };
}

const testData: TestData = {
  validUser: {
    employeeCode: 'TEST001',
    password: 'testpassword'
  },
  testReceptionNumbers: {
    processed: 'UH35072668105',
    unprocessed: 'UH35072668101',
    completed: 'UH35072668106'
  }
};

export const testWithData = base.extend<{ testData: TestData }>({
  testData: [testData, { scope: 'session' }]
});

export { testData };
