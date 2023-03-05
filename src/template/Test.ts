export function TestTemplate(componentName: string) {
  return `import { render } from '@testing-library/react';
  import ${componentName} from './${componentName}';
  
  test('renders ${componentName} component', () => {
      const { getByText } = render(<${componentName} />);
      const linkElement = getByText(/Hello, World!/i);
      expect(linkElement).toBeInTheDocument();
  });
      `;
}
