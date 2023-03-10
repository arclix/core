import { describe, expect, it } from "vitest";
import checkProperty from "./checkProperty";

describe("Check Property", () => {
    const normalPath = "./package.json";
    const wrongPath = "./mocks/mockPackage.json";
    const mockPath = "./src/mocks/mock.package.json";

    it("should return true if it's a typescript project", async () => {
        const isTypeScript = await checkProperty("typescript", mockPath);
        expect(isTypeScript).toBe(true);
    });

    it("should return true if it's a scss project", async () => {
        const isScss = await checkProperty("sass", mockPath);
        expect(isScss).toBe(true);
    });

    it("should return false if it's not property project", async () => {
        const isScss = await checkProperty("sass", normalPath);
        expect(isScss).toBe(false);
    });

    it("should return false if the package doesn't exist in the project", async () => {
        const isTypeScript = await checkProperty("typescript", wrongPath);
        expect(isTypeScript).toBe(false);
    });
});
