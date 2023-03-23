export function componentTemplate({
    addIndex,
    componentName,
    scopeStyle,
    styleType,
}: {
    addIndex: boolean;
    componentName: string;
    scopeStyle: boolean;
    styleType: string;
}) {
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
