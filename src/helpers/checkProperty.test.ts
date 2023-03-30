import { describe, expect, it } from "vitest";
import { packageType } from "../types/interface";
import checkProperty from "./checkProperty";

describe("Check Property", () => {
    const mockPkg: packageType = {
        dependencies: {},
        devDependencies: {
            typescript: "^4.9.4",
            sass: "^1.58.3",
        },
    };

    it("should return true if it's a typescript project", async () => {
        const isTypeScript = await checkProperty("typescript", mockPkg);
        expect(isTypeScript).toBe(true);
    });

    it("should return true if it's a scss project", async () => {
        const isScss = await checkProperty("sass", mockPkg);
        expect(isScss).toBe(true);
    });

    it("should return false if it's not property project", async () => {
        const isScss = await checkProperty("something", mockPkg);
        expect(isScss).toBe(false);
    });
});
