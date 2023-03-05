import fs from 'fs';
import path from 'path';
import chalk from 'chalk';
import ContentArgs from '../types/interface.js';
import { spinner } from '../utilities/utility.js';

const createIndex = (args: ContentArgs, fileCreationError: boolean) => {
  const { componentName, folderPath, type } = args;
  const indexFileContent = `export * from './${componentName}'`;
  const fileName = `index${type ? '.ts' : '.js'}`;

  fs.writeFile(path.join(folderPath, fileName), indexFileContent, (err) => {
    if (err) {
      spinner.error({ text: chalk.red(err?.message) });
      fileCreationError = true;
      return;
    }
  });
};

export default createIndex;
