interface MCPClient {
  call(tool: string, params: Record<string, unknown>): Promise<unknown>;
}

interface FigmaFile {
  name: string;
  lastModified: string;
  document: unknown;
}

interface Component {
  id: string;
  name: string;
  description: string;
}

interface PullRequest {
  url: string;
  number: number;
  state: string;
}

class FigmaMCPClient implements MCPClient {
  private baseUrl: string;

  constructor(baseUrl: string = 'http://localhost:5348') {
    this.baseUrl = baseUrl;
  }

  async call(tool: string, params: Record<string, unknown>): Promise<unknown> {
    const response = await fetch(`${this.baseUrl}/tools/${tool}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params)
    });
    return response.json();
  }
}

class DesignToTestFlow {
  private figma: FigmaMCPClient;

  constructor() {
    this.figma = new FigmaMCPClient();
  }

  async getFigmaFile(fileKey: string): Promise<FigmaFile> {
    return await this.figma.call('figma/get_file', {
      fileKey,
      depth: 2
    }) as FigmaFile;
  }

  async getComponents(fileKey: string): Promise<Component[]> {
    return await this.figma.call('figma/get_file_components', {
      fileKey
    }) as Component[];
  }

  async generateFromDesign(fileKey: string): Promise<string> {
    const file = await this.getFigmaFile(fileKey);
    const components = await this.getComponents(fileKey);
    
    return this.generateTestCode(file, components);
  }

  private generateTestCode(file: FigmaFile, components: Component[]): string {
    let testCode = `import { test, expect } from '@playwright/test';\n\n`;
    testCode += `test.describe('Generated from Figma: ${file.name}', () => {\n`;
    
    for (const comp of components) {
      testCode += `  test('${comp.name} component', async ({ page }) => {\n`;
      testCode += `    // Component: ${comp.description}\n`;
      testCode += `    // TODO: Implement assertions based on Figma design\n`;
      testCode += `  });\n`;
    }
    
    testCode += `});\n`;
    return testCode;
  }
}

export { DesignToTestFlow, FigmaMCPClient, MCPClient };
