import path from "node:path";
import fs from "node:fs/promises";
import { afterAll, describe, expect, it } from "vitest";
import GenerateComponent from "../generate/GenerateComponent";

const exists = async (path: string): Promise<boolean> => {
    return new Promise((r) => {
        fs.access(path).then(() => r(true));
    });
};

describe("Generate Component", () => {
    const packagePath = "./src/mocks/mock.package.json";
    const mockPath = path.join(process.cwd(), "./src/mocks");
    const generateComponentInstance = new GenerateComponent();

    it("should generate component without folder with name 'Sample'", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample"],
            {
                flat: true,
                addIndex: false,
                skipTest: false,
                path: "./mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists(mockPath);
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample.scss"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample.test.tsx"),
            );

            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
            expect(testFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it("should generate component 'Sample' with index file", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample"],
            {
                flat: false,
                addIndex: true,
                skipTest: false,
                path: "./mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.scss"),
            );
            const indexFileExists = await exists(
                path.join(mockPath, "./Sample/index.ts"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.test.tsx"),
            );
            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
            expect(indexFileExists).toBe(true);
            expect(testFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it("should generate component 'Sample' without test file", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample"],
            {
                flat: false,
                addIndex: false,
                skipTest: true,
                path: "./mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.scss"),
            );

            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it("should generate component 'Sample' with scoped style", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample"],
            {
                flat: false,
                addIndex: false,
                skipTest: false,
                path: "./mocks",
                scopeStyle: true,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.module.scss"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.test.tsx"),
            );

            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
            expect(testFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it("should generate multiple and nested components", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample", "Sample/Nested"],
            {
                flat: false,
                addIndex: false,
                skipTest: false,
                path: "./mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.scss"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample/Sample.test.tsx"),
            );

            const nestedFolderExists = await exists(
                "./src/mocks/Sample/Nested",
            );
            const nestedComponentFileExists = await exists(
                path.join(mockPath, "./Sample/Nested/Nested.tsx"),
            );
            const nestedStyleFileExists = await exists(
                path.join(mockPath, "./Sample/Nested/Nested.scss"),
            );
            const nestedTestFileExists = await exists(
                path.join(mockPath, "./Sample/Nested/Nested.test.tsx"),
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

    afterAll(async () => {
        await fs.rm("./src/mocks/Sample.tsx");
        await fs.rm("./src/mocks/Sample.scss");
        await fs.rm("./src/mocks/Sample.test.tsx");
        await fs.rm("./src/mocks/Sample/Sample.tsx");
        await fs.rm("./src/mocks/Sample/Sample.scss");
        await fs.rm("./src/mocks/Sample/Sample.test.tsx");
        await fs.rm("./src/mocks/Sample/index.ts");
        await fs.rm("./src/mocks/Sample/Sample.module.scss");
        await fs.rm("./src/mocks/Sample/Nested/Nested.tsx");
        await fs.rm("./src/mocks/Sample/Nested/Nested.scss");
        await fs.rm("./src/mocks/Sample/Nested/Nested.test.tsx");
        await fs.rmdir("./src/mocks/Sample/Nested", { recursive: true });
        await fs.rmdir("./src/mocks/Sample", { recursive: true });
    });
});
