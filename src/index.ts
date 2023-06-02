#!/usr/bin/env node

import chalk from 'chalk';
import pacote from 'pacote';
import path, { dirname } from 'node:path';
import { program } from 'commander';
import GenerateComponent from './generate/GenerateComponent.js';
import GenerateConfigFile from './generate/GenerateConfigFile.js';
import type { CLIOptions } from './types/type.js';
import { Command, AliasCommand } from './types/type.js';
import boxen, { type Options as BoxenOptions } from 'boxen';
import { log, emptyLine, getPkg, primaryChalk } from './utilities/utility.js';
import { fileURLToPath } from 'node:url';

const version = 'ARCLIX v0.1.5';
const generateComponentInstance = new GenerateComponent();
const generateConfigFileInstance = new GenerateConfigFile();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const pkg = await getPkg(path.join(__dirname, '../package.json'));

// Notify users when there is update available.
const notifyUpdate = async () => {
  const currentVersion = pkg.version;
  const pkgManifest = await pacote.manifest('arclix@latest');
  const latestVersion = pkgManifest.version;

  if (currentVersion === latestVersion) {
    return;
  }

  const boxOptions: BoxenOptions = {
    padding: 1,
    margin: 1,
    align: 'center',
    borderColor: 'yellow',
    borderStyle: 'round',
  };

  const updateMessage = boxen(
    `Update available ${chalk.dim(currentVersion)} -> ${chalk.green(
      latestVersion,
    )}

To upgrade Arclix to latest version run the following command:

${primaryChalk(`npm i -D arclix@${latestVersion}`)}
  `,
    boxOptions,
  );

  log(updateMessage);
};

await notifyUpdate();

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
