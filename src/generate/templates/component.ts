import type { ContentArgs } from "../../types/type.js";

interface ComponentArgs
    extends Pick<ContentArgs, "addIndex" | "scopeStyle" | "componentName"> {
    styleType: string;
}

export function componentTemplate({
    addIndex,
    componentName,
    scopeStyle,
    styleType,
}: ComponentArgs) {
    return `${
        scopeStyle
            ? `import styles from './${componentName}.module${styleType}';`
            : `import './${componentName}${styleType}';`
    }

${addIndex ? "export " : ""}const ${componentName} = () => {
    return (
        <>
            {/* Type content here */}
        </>
    );
};
${
    !addIndex
        ? `
export default ${componentName};`
        : ""
}`;
}
