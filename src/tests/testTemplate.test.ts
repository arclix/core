import { describe, expect, it } from "vitest";
import testTemplate from "../generate/templates/test";

const mockTestTemplate = (index: boolean): string => {
    return `import React from 'react';
import ${index ? `{ Sample }` : "Sample"} from './Sample';

describe('Sample', () => {
    // write your tests here...
});`;
};

describe("Test Template", () => {
    it("should return template by importing default export function", () => {
        const template = testTemplate("Sample", false);
        expect(template).toBe(mockTestTemplate(false));
    });

    it("should return template by importing normal export function", () => {
        const template = testTemplate("Sample", true);
        expect(template).toBe(mockTestTemplate(true));
    });
});
