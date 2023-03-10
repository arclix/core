import { describe, expect, it } from "vitest";
import checkReact from "./checkReact";

describe("Check React", () => {
    const normalPath = "./package.json";
    const wrongPath = "./mocks/mockPackage.json";
    const mockPath = "./src/mocks/mock.package.json";

    it("should return true if it's a react project", async () => {
        const isReact = await checkReact(mockPath);
        expect(isReact).toBe(true);
    });

    it("should return false if it's not a react project", async () => {
        const isReact = await checkReact(normalPath);
        expect(isReact).toBe(false);
    });

    it("should return false if the package doesn't exist in the project", async () => {
        const isReact = await checkReact(wrongPath);
        expect(isReact).toBe(false);
    });
});
