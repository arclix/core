import { PackageType } from "./../types/type";
import { describe, expect, expectTypeOf, it } from "vitest";
import getPackageFile from "../generate/helpers/getPackageFile.js";

describe("Get package.json file", () => {
    it("should return package.json file content if exists", async () => {
        const pkg = await getPackageFile("./src/mocks/mock.package.json");
        expect(pkg).not.toBeNull();
        expect(pkg?.dependencies).not.toEqual({});
        expect(pkg?.devDependencies).not.toEqual({});
        expectTypeOf(pkg).toEqualTypeOf<PackageType | null>();
    });

    it("should return null if package.json file doesn't exists", async () => {
        const pkg = await getPackageFile("./mocks/mock.package.json");
        expect(pkg).toBeNull();
    });
});
