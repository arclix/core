export default function testTemplate(componentName: string, addIndex: boolean) {
    return `import React from 'react';
import ${
        addIndex ? `{ ${componentName} }` : componentName
    } from './${componentName}';

describe('${componentName}', () => {
    // write your tests here...
});`;
}
