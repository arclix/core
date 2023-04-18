import path from "node:path";
import { describe, expect, it } from "vitest";
import getRootPath from "../generate/helpers/getRootPath";

describe("Get Root Path", () => {
    const normalPath = ["C:", "users", "project"].join(path.sep);
    const srcPath = ["C:", "users", "project", "src"].join(path.sep);

    it("should return empty string if it doesn't contain 'src'", () => {
        expect(getRootPath(normalPath)).toBe("");
    });

    it("should return root path if it has 'src'", () => {
        expect(getRootPath(srcPath)).toBe(normalPath);
    });
});
