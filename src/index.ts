#!/usr/bin/env node

import GenerateComponent from './generate/GenerateComponent.js';
import GenerateConfigFile from './generate/GenerateConfigFile.js';
import { program } from 'commander';
import type { CLIOptions } from './types/type.js';
import { Command, AliasCommand } from './types/type.js';
import { log, emptyLine, primaryChalk } from './utilities/utility.js';

const version = 'ARCLIX v0.1.4';
const generateComponentInstance = new GenerateComponent();
const generateConfigFileInstance = new GenerateConfigFile();

program.version(
  version,
  '-v --version',
  'Displays the version of Arclix in use',
);

const generate = program
  .command(Command.GENERATE)
  .alias(AliasCommand.GENERATE)
  .description('Generates based on argument in the current directory.');

generate
  .command(Command.COMPONENT)
  .alias(AliasCommand.COMPONENT)
  .description('Generates component in the current directory.')
  .argument('<component name>', 'component name to be generated.')
  .option('--scopeStyle', 'Scopes the style to the component.')
  .option('--addTest', 'Adds the test file while generating component.')
  .option('--addIndex', 'Adds index file to make the imports easier.')
  .option('--addStory', 'Adds storybook story to the component.')
  .option('-f, --flat', 'Generates components without parent folder.')
  .option('-p, --path <string>', 'Generates components based on the path.')
  .option(
    '--type <string>',
    'Specify the component type based on config to be generated.',
  )
  .action(async (...actions) => {
    log('\n' + primaryChalk.italic.bold(version));
    emptyLine();
    const componentNames: string[] = actions[2].args;
    const options: CLIOptions = actions[2]._optionValues;
    await generateComponentInstance.generateComponent(componentNames, options);
  });

program
  .command(Command.INIT)
  .description('Generates config file to the existing react project.')
  .action(() => {
    log('\n' + primaryChalk.italic.bold(version));
    generateConfigFileInstance.generateConfigFile();
  });

program.parse(process.argv);
