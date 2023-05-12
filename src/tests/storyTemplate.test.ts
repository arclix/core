import { describe, expect, it } from "vitest";
import storyTemplate from "../generate/templates/story";

const mockStoryTemplate = (index: boolean) => {
    return `import React from 'react';
import ${index ? "{ Sample }" : "Sample"} from './Sample';

// type content here...`;
};

describe("Story Template", () => {
    it("should return template by importing default export function", () => {
        const template = storyTemplate("Sample", false);
        expect(template).toBe(mockStoryTemplate(false));
    });

    it("should return template by importing normal export function", () => {
        const template = storyTemplate("Sample", true);
        expect(template).toBe(mockStoryTemplate(true));
    });
});
