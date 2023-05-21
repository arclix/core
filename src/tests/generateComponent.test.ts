import path from 'node:path';
import fs from 'node:fs/promises';
import { spinner } from '../utilities/utility';
import { afterAll, describe, expect, it, vi } from 'vitest';
import GenerateComponent from '../generate/GenerateComponent';

const exists = async (path: string): Promise<boolean> => {
  return new Promise((r) => {
    fs.access(path).then(() => r(true));
  });
};

describe('Generate Component', () => {
  const packagePath = './src/mocks/mock.package.json';
  const mockPath = path.join(process.cwd(), './src/mocks');
  const generateComponentInstance = new GenerateComponent();

  it('should throw error when package.json file is not present', async () => {
    const spinnerError = vi.spyOn(spinner, 'error');
    await generateComponentInstance.generateComponent(
      ['Sample'],
      {
        flat: true,
        addIndex: false,
        addStory: false,
        addTest: true,
        path: './src/mocks',
        scopeStyle: false,
        type: 'default',
      },
      '../tests',
    );
    expect(spinnerError).toHaveBeenCalled();
  });

  it("should throw error if it's not a react project", async () => {
    const spinnerError = vi.spyOn(spinner, 'error');
    await generateComponentInstance.generateComponent(
      ['Sample'],
      {
        flat: true,
        addIndex: false,
        addStory: false,
        addTest: true,
        path: './src/mocks',
        scopeStyle: false,
        type: 'default',
      },
      'package.json',
    );
    expect(spinnerError).toHaveBeenCalled();
  });

  it('should throw error if the given path is invalid', async () => {
    const spinnerError = vi.spyOn(spinner, 'error');
    await generateComponentInstance.generateComponent(
      ['Sample'],
      {
        flat: true,
        addIndex: false,
        addStory: false,
        addTest: true,
        path: './src/mock',
        scopeStyle: false,
        type: 'default',
      },
      packagePath,
    );
    expect(spinnerError).toHaveBeenCalled();
  });

  it("should generate component without folder with name 'Sample'", async () => {
    await generateComponentInstance.generateComponent(
      ['Sample'],
      {
        flat: true,
        addIndex: false,
        addStory: false,
        addTest: true,
        path: './src/mocks',
        scopeStyle: false,
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists(mockPath);
      const componentFileExists = await exists(
        path.join(mockPath, './Sample.tsx'),
      );
      const styleFileExists = await exists(path.join(mockPath, './Sample.css'));
      const testFileExists = await exists(
        path.join(mockPath, './Sample.test.tsx'),
      );

      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
      expect(testFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it.skip("should generate component 'Sample' with index file", async () => {
    await generateComponentInstance.generateComponent(
      ['Sample'],
      {
        flat: false,
        addIndex: true,
        addStory: false,
        addTest: true,
        scopeStyle: false,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists('./src/mocks/Sample');
      const componentFileExists = await exists(
        path.join(mockPath, './Sample/Sample.tsx'),
      );
      const styleFileExists = await exists(
        path.join(mockPath, './Sample/Sample.css'),
      );
      const indexFileExists = await exists(
        path.join(mockPath, './Sample/index.ts'),
      );
      const testFileExists = await exists(
        path.join(mockPath, './Sample/Sample.test.tsx'),
      );
      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
      expect(indexFileExists).toBe(true);
      expect(testFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it.skip("should generate component 'Sample1' without test file", async () => {
    await generateComponentInstance.generateComponent(
      ['Sample1'],
      {
        flat: false,
        addIndex: false,
        addStory: false,
        addTest: false,
        scopeStyle: false,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists('./src/mocks/Sample1');
      const componentFileExists = await exists(
        path.join(mockPath, './Sample1/Sample1.tsx'),
      );
      const styleFileExists = await exists(
        path.join(mockPath, './Sample1/Sample1.css'),
      );

      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it.skip("should generate component 'Sample2' with scoped style", async () => {
    await generateComponentInstance.generateComponent(
      ['Sample2'],
      {
        flat: false,
        addIndex: false,
        addStory: false,
        addTest: true,
        scopeStyle: true,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists('./src/mocks/Sample2');
      const componentFileExists = await exists(
        path.join(mockPath, './Sample2/Sample2.tsx'),
      );
      const styleFileExists = await exists(
        path.join(mockPath, './Sample2/Sample2.module.css'),
      );
      const testFileExists = await exists(
        path.join(mockPath, './Sample2/Sample2.test.tsx'),
      );

      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
      expect(testFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it.skip("should generate component 'Sample3' with story file", async () => {
    await generateComponentInstance.generateComponent(
      ['Sample3'],
      {
        flat: false,
        addIndex: false,
        addStory: true,
        addTest: true,
        scopeStyle: false,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists('./src/mocks/Sample3');
      const componentFileExists = await exists(
        path.join(mockPath, './Sample2/Sample3.tsx'),
      );
      const styleFileExists = await exists(
        path.join(mockPath, './Sample2/Sample3.css'),
      );
      const testFileExists = await exists(
        path.join(mockPath, './Sample2/Sample3.test.tsx'),
      );
      const storyFileExists = await exists(
        path.join(mockPath, './Sample3/Sample3.story.tsx'),
      );

      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
      expect(testFileExists).toBe(true);
      expect(storyFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it('should generate multiple and nested components', async () => {
    await generateComponentInstance.generateComponent(
      ['Sample3', 'Sample3/Nested'],
      {
        flat: false,
        addIndex: false,
        addStory: false,
        addTest: true,
        scopeStyle: false,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );

    setTimeout(async () => {
      const folderExists = await exists('./src/mocks/Sample3');
      const componentFileExists = await exists(
        path.join(mockPath, './Sample3/Sample3.tsx'),
      );
      const styleFileExists = await exists(
        path.join(mockPath, './Sample3/Sample3.css'),
      );
      const testFileExists = await exists(
        path.join(mockPath, './Sample3/Sample3.test.tsx'),
      );

      const nestedFolderExists = await exists('./src/mocks/Sample3/Nested');
      const nestedComponentFileExists = await exists(
        path.join(mockPath, './Sample3/Nested/Nested.tsx'),
      );
      const nestedStyleFileExists = await exists(
        path.join(mockPath, './Sample3/Nested/Nested.css'),
      );
      const nestedTestFileExists = await exists(
        path.join(mockPath, './Sample3/Nested/Nested.test.tsx'),
      );

      expect(folderExists).toBe(true);
      expect(componentFileExists).toBe(true);
      expect(styleFileExists).toBe(true);
      expect(testFileExists).toBe(true);
      expect(nestedFolderExists).toBe(true);
      expect(nestedComponentFileExists).toBe(true);
      expect(nestedStyleFileExists).toBe(true);
      expect(nestedTestFileExists).toBe(true);
    }, 5000);
  }, 10000);

  it('should throw error while generating nested components with --flat option', async () => {
    const spinnerError = vi.spyOn(spinner, 'error');
    await generateComponentInstance.generateComponent(
      ['Sample4/Nested'],
      {
        flat: true,
        addIndex: false,
        addStory: false,
        addTest: true,
        scopeStyle: false,
        path: './src/mocks',
        type: 'default',
      },
      packagePath,
    );
    expect(spinnerError).toHaveBeenCalled();
  }, 10000);

  afterAll(async () => {
    await fs.rm('./src/mocks/Sample.tsx');
    await fs.rm('./src/mocks/Sample.css');
    await fs.rm('./src/mocks/Sample.test.tsx');
    await fs.rm('./src/mocks/Sample3/Sample3.tsx');
    await fs.rm('./src/mocks/Sample3/Sample3.css');
    await fs.rm('./src/mocks/Sample3/Sample3.test.tsx');
    await fs.rm('./src/mocks/Sample3/Nested/Nested.tsx');
    await fs.rm('./src/mocks/Sample3/Nested/Nested.css');
    await fs.rm('./src/mocks/Sample3/Nested/Nested.test.tsx');
    await fs.rmdir('./src/mocks/Sample3/Nested', { recursive: true });
    await fs.rmdir('./src/mocks/Sample3', { recursive: true });
  });
});
