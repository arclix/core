import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ContentArgs from '../types/interface.js';
import { convertToTitleCase, spinner } from '../utilities/utility.js';

const createTest = (args: ContentArgs, fileCreationError: boolean) => {
  const { componentName, folderPath, type } = args;
  const reactTestContent = `import { render } from '@testing-library/react';
import ${convertToTitleCase(componentName)} from './${componentName}';

test('renders ${componentName} component', () => {
    const { getByText } = render(<${convertToTitleCase(componentName)} />);
    const linkElement = getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
});
    `;

  const fileName = `${componentName}${type ? '.test.tsx' : '.test.jsx'}`;

  fs.writeFile(path.join(folderPath, fileName), reactTestContent, (err) => {
    if (err) {
      spinner.error({ text: chalk.red(err?.message) });
      fileCreationError = true;
      return;
    }
  });
};

export default createTest;
