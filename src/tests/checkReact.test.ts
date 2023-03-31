import { describe, expect, it } from "vitest";
import { packageType } from "../types/interface.js";
import checkReact from "../generate/helpers/checkReact.js";

describe("Check React", () => {
    const wrongPkg: packageType = {
        dependencies: {},
        devDependencies: {},
    } as const;
    const mockPkg: packageType = {
        dependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
        },
        devDependencies: {
            react: "^18.2.0",
            "react-dom": "^18.2.0",
        },
    } as const;

    it("should return true if it's a react project", async () => {
        const isReact = await checkReact(mockPkg);
        expect(isReact).toBe(true);
    });

    it("should return false if it's not a react project", async () => {
        const isReact = await checkReact(wrongPkg);
        expect(isReact).toBe(false);
    });
});
