import { describe, expect, it } from "vitest";
import getPackageFile from "../generate/helpers/getPackageFile.js";

describe("Get package.json file", () => {
    it("should return package.json file content if exists", async () => {
        const pkg = await getPackageFile("./src/mocks/mock.package.json");
        expect(pkg).toBeTypeOf("object");
    });

    it("should return null if package.json file doesn't exists", async () => {
        const pkg = await getPackageFile("./mocks/mock.package.json");
        expect(pkg).toBe(null);
    });
});
