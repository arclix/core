export function testTemplate(componentName: string, addIndex: boolean) {
    return `import { render } from '@testing-library/react';
import ${
        addIndex ? `{ ${componentName} }` : componentName
    } from './${componentName}';

test('renders ${componentName} component', () => {
    const { getByText } = render(<${componentName} />);
    const linkElement = getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
});`;
}
