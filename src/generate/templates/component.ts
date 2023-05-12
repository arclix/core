interface ComponentArgs {
    addIndex: boolean;
    styleType: string;
    scopeStyle: boolean;
    componentName: string;
}

export default function componentTemplate({
    addIndex,
    styleType,
    scopeStyle,
    componentName,
}: ComponentArgs) {
    return `import React from 'react';
${
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
