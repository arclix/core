import fs from "fs/promises";
import path from "path";
import GenerateComponent from "./GenerateComponent";
import { afterAll, describe, expect, it } from "vitest";

describe("Generate Component", () => {
    const packagePath = "./src/mocks/mock.package.json";
    const mockPath = path.join(process.cwd(), "./src/mocks");
    const generateComponentInstance = GenerateComponent.getInstance();

    it("should generate component without folder with name 'Sample' with all options", async () => {
        await generateComponentInstance.generateProject(
            "Sample",
            {
                flat: true,
                addIndex: true,
                skipTest: true,
                path: "./mocks",
                scopeStyle: true,
            },
            packagePath,
        );

        const folderExists = await fs.stat(mockPath);
        const styleFileExists = await fs.stat(
            path.join(mockPath, "./Sample.module.scss"),
        );
        const indexFileExists = await fs.stat(
            path.join(mockPath, "./index.ts"),
        );
        const componentFileExists = await fs.stat(
            path.join(mockPath, "./Sample.tsx"),
        );

        expect(folderExists.isDirectory()).toBe(true);
        expect(styleFileExists.isFile()).toBe(true);
        expect(indexFileExists.isFile()).toBe(true);
        expect(componentFileExists.isFile()).toBe(true);
    });

    afterAll(async () => {
        // await fs.rm(srcPath, { recursive: true });
        // await fs.rm(mockPath, { recursive: true });
        await fs.rm("./src/mocks/index.ts");
        await fs.rm("./src/mocks/Sample.tsx");
        await fs.rm("./src/mocks/Sample.module.scss");
    });
});
