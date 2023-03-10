import { describe, expect, it } from "vitest";
import { testTemplate } from "./test";

const mockTestTemplate = (index: boolean): string => {
    return `import { render } from '@testing-library/react';
import ${index ? `{ Sample }` : "Sample"} from './Sample';

test('renders Sample component', () => {
    const { getByText } = render(<Sample />);
    const linkElement = getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
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
