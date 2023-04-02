import fs from "fs/promises";
import path from "path";
import { afterAll, describe, expect, it } from "vitest";
import GenerateComponent from "../generate/GenerateComponent.js";

describe("Generate Component", () => {
    const packagePath = "./src/mocks/mock.package.json";
    const mockPath = path.join(process.cwd(), "./src/mocks");
    const generateComponentInstance = GenerateComponent.getInstance();

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

        const folderExists = await fs.stat(mockPath);
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample.tsx"),
        );
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample.scss"),
        );
        const testFileExists = await fs.stat(
            path.join(mockPath, "./Sample.test.tsx"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
        expect(testFileExists.isFile()).toBe(true);
    }, 70000);

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

        const folderExists = await fs.stat("./src/mocks/Sample");
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.tsx"),
        );
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.scss"),
        );
        const indexFileExists = await fs.stat(
            path.join(mockPath, "./Sample/index.ts"),
        );
        const testFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.test.tsx"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
        expect(indexFileExists.isFile()).toBe(true);
        expect(testFileExists.isFile()).toBe(true);
    }, 70000);

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

        const folderExists = await fs.stat("./src/mocks/Sample");
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.tsx"),
        );
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.scss"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
    }, 70000);

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

        const folderExists = await fs.stat("./src/mocks/Sample");
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.tsx"),
        );
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.module.scss"),
        );
        const testFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.test.tsx"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
        expect(testFileExists.isFile()).toBe(true);
    }, 70000);

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

        const folderExists = await fs.stat("./src/mocks/Sample");
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.tsx"),
        );
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.scss"),
        );
        const testFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Sample.test.tsx"),
        );

        const nestedFolderExists = await fs.stat("./src/mocks/Sample/Nested");
        const nestedComponentFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Nested/Nested.tsx"),
        );
        const nestedStyleFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Nested/Nested.scss"),
        );
        const nestedTestFileExists = await fs.stat(
            path.join(mockPath, "./Sample/Nested/Nested.test.tsx"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
        expect(testFileExists.isFile()).toBe(true);
        expect(nestedFolderExists.isDirectory()).toBe(true);
        expect(nestedComponentFileExists.isFile()).toBe(true);
        expect(nestedStyleFileExists.isFile()).toBe(true);
        expect(nestedTestFileExists.isFile()).toBe(true);
    }, 70000);

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
        await fs.rmdir("./src/mocks/Sample/Nested");
        await fs.rmdir("./src/mocks/Sample");
    });
});
