#!/usr/bin/env node

import { program } from 'commander';
import { MaxCommand, MinCommand } from './types/enum.js';
import { log, emptyLine, primaryChalk, spinner } from './utilities/utility.js';
import createProject from './functions/createProject.js';
import generateProjects from './functions/generateProject.js';
import chalk from 'chalk';

const checkProjectName = (projectName: string): boolean => {
  if (projectName !== projectName.toLowerCase()) {
    return false;
  }
  return true;
};

program
  .option('-p, --path <string>', 'Generates components based on the path')
  .option('--flat', 'Generates components without parent folder')
  .option('--scopeStyle', 'Scopes the style to the component')
  .option('--skipTest', 'Skip the test file while generating component')
  .option('-v, --version', 'Displays the version of Arclix in use');

program.parse();

log('\n' + primaryChalk.italic.bold('ARCLIX v0.0.8'));

await (async (command: string) => {
  const options = program.opts();

  if (options.version) {
    return;
  }

  if (command === MaxCommand.CREATE) {
    emptyLine();
    if (!program.args[1]) {
      spinner.error({ text: chalk.red('Missing Project Name.') });
      return;
    }

    if (!checkProjectName(program.args[1])) {
      emptyLine();
      spinner.error({
        text: chalk.red('Project name should be in lowercase\n'),
      });
      return;
    }

    await createProject(program.args[1]);
  } else if (command === MaxCommand.GENERATE || command === MinCommand.GENERATE) {
    emptyLine();
    await generateProjects(program);
  } else {
    emptyLine();
    spinner.error({ text: chalk.red('Unknown Command.\n') });
  }
})(program.args[0]);
