import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ContentArgs from '../types/interface.js';
import { convertToTitleCase, spinner } from '../utilities/utility.js';

const createComponent = (args: ContentArgs, fileCreationError: boolean) => {
  const { componentName, folderPath, type, style, scopeStyle } = args;
  const styleType = style ? '.scss' : '.css';
  const reactContent = `${
    scopeStyle
      ? `import styles from './${componentName}.module${styleType}';`
      : `import './${componentName}${styleType}';`
  }

const ${convertToTitleCase(componentName)} = () => {
    return (
        <>
            // Type content here
        </>
    );
};

export default ${convertToTitleCase(componentName)};
    `;

  const fileName = `${componentName}${type ? '.tsx' : '.jsx'}`;

  fs.writeFile(path.join(folderPath, fileName), reactContent, (err) => {
    if (err) {
      spinner.error({ text: chalk.red(err?.message) });
      fileCreationError = true;
      return;
    }
  });
};

export default createComponent;
