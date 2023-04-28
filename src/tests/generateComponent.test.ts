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
                path: "./src/mocks",
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

    it.skip("should generate component 'Sample' with index file", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample"],
            {
                flat: false,
                addIndex: true,
                skipTest: false,
                path: "./src/mocks",
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

    it.skip("should generate component 'Sample1' without test file", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample1"],
            {
                flat: false,
                addIndex: false,
                skipTest: true,
                path: "./src/mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample1");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample1/Sample1.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample1/Sample1.scss"),
            );

            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it.skip("should generate component 'Sample2' with scoped style", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample2"],
            {
                flat: false,
                addIndex: false,
                skipTest: false,
                path: "./src/mocks",
                scopeStyle: true,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample2");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample2/Sample2.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample2/Sample2.module.scss"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample2/Sample2.test.tsx"),
            );

            expect(folderExists).toBe(true);
            expect(componentFileExists).toBe(true);
            expect(styleFileExists).toBe(true);
            expect(testFileExists).toBe(true);
        }, 5000);
    }, 10000);

    it("should generate multiple and nested components", async () => {
        await generateComponentInstance.generateComponent(
            ["Sample3", "Sample3/Nested"],
            {
                flat: false,
                addIndex: false,
                skipTest: false,
                path: "./src/mocks",
                scopeStyle: false,
            },
            packagePath,
        );

        setTimeout(async () => {
            const folderExists = await exists("./src/mocks/Sample3");
            const componentFileExists = await exists(
                path.join(mockPath, "./Sample3/Sample3.tsx"),
            );
            const styleFileExists = await exists(
                path.join(mockPath, "./Sample3/Sample3.scss"),
            );
            const testFileExists = await exists(
                path.join(mockPath, "./Sample3/Sample3.test.tsx"),
            );

            const nestedFolderExists = await exists(
                "./src/mocks/Sample3/Nested",
            );
            const nestedComponentFileExists = await exists(
                path.join(mockPath, "./Sample3/Nested/Nested.tsx"),
            );
            const nestedStyleFileExists = await exists(
                path.join(mockPath, "./Sample3/Nested/Nested.scss"),
            );
            const nestedTestFileExists = await exists(
                path.join(mockPath, "./Sample3/Nested/Nested.test.tsx"),
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
        await fs.rm("./src/mocks/Sample3/Sample3.tsx");
        await fs.rm("./src/mocks/Sample3/Sample3.scss");
        await fs.rm("./src/mocks/Sample3/Sample3.test.tsx");
        await fs.rm("./src/mocks/Sample3/Nested/Nested.tsx");
        await fs.rm("./src/mocks/Sample3/Nested/Nested.scss");
        await fs.rm("./src/mocks/Sample3/Nested/Nested.test.tsx");
        await fs.rmdir("./src/mocks/Sample3/Nested", { recursive: true });
        await fs.rmdir("./src/mocks/Sample3", { recursive: true });
    });
});
