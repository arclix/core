export function ComponentTemplate({
  componentName,
  scopeStyle,
  styleType,
}: {
  componentName: string;
  scopeStyle: boolean;
  styleType: string;
}) {
  return `${
    scopeStyle
      ? `import styles from './${componentName}.module${styleType}';`
      : `import './${componentName}${styleType}';`
  }
    
    export const ${componentName} = () => {
        return (
            <>
              {/* Type content here */}
            </>
        );
    };
  `;
}
