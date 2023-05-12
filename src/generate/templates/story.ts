export default function storyTemplate(
    componentName: string,
    addIndex: boolean,
) {
    return `import React from 'react';
import ${
        addIndex ? `{ ${componentName} }` : componentName
    } from './${componentName}';

// type content here...`;
}
