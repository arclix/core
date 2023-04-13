import { describe, expect, it } from "vitest";
import getRootPath from "../generate/helpers/getRootPath";

describe("Get Root Path", () => {
    it("should return empty string if it doesn't contain 'src'", () => {
        expect(getRootPath("C:\\users\\project")).toBe("");
    });

    it("should return root path if it has 'src'", () => {
        expect(getRootPath("C:\\users\\project\\src")).toBe(
            "C:\\users\\project",
        );
    });
});
