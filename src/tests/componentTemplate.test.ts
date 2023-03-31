import { describe, expect, it } from "vitest";
import { componentTemplate } from "../generate/template/component.js";

const mockComponent = (
    style: string,
    module: boolean,
    index: boolean = false,
) => {
    return `${
        module
            ? `import styles from './Sample.module${style}';`
            : `import './Sample${style}';`
    }

${index ? "export " : ""}const Sample = () => {
    return (
        <>
            {/* Type content here */}
        </>
    );
};
${
    !index
        ? `
export default Sample;`
        : ""
}`;
};

describe("Component", () => {
    it("should return template with scss", () => {
        const template = componentTemplate({
            addIndex: false,
            componentName: "Sample",
            scopeStyle: false,
            styleType: "scss",
        });
        expect(template).toBe(mockComponent("scss", false));
    });

    it("should return template with css", () => {
        const template = componentTemplate({
            addIndex: false,
            componentName: "Sample",
            scopeStyle: false,
            styleType: "css",
        });
        expect(template).toBe(mockComponent("css", false));
    });

    it("should return template with scoped scss", () => {
        const template = componentTemplate({
            addIndex: false,
            componentName: "Sample",
            scopeStyle: true,
            styleType: "scss",
        });
        expect(template).toBe(mockComponent("scss", true));
    });

    it("should return template with scss", () => {
        const template = componentTemplate({
            addIndex: false,
            componentName: "Sample",
            scopeStyle: true,
            styleType: "css",
        });
        expect(template).toBe(mockComponent("css", true));
    });

    it("should return template with inline export function", () => {
        const template = componentTemplate({
            addIndex: true,
            componentName: "Sample",
            scopeStyle: true,
            styleType: "css",
        });
        expect(template).toBe(mockComponent("css", true, true));
    });
});
