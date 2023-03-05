import fs from 'fs';
import chalk from 'chalk';
import { Command } from 'commander';
import { MaxCommand, MinCommand } from '../types/enum.js';
import { sleep, spinner } from '../utilities/utility.js';
import { checkType, checkReact, getRootPath, checkStyle } from '../helpers/index.js';
import { GenerateProject } from '../core/generateComponent.js';

let fileCreationError: boolean = false;

const handlePath = (path: string): string => {
  if (path === './src') {
    return '';
  }
  if (path[path.length - 1] !== '/') {
    return path + '/';
  }
  return path;
};

const generateProjects = async (program: Command) => {
  const isReact = await checkReact();

  if (isReact) {
    const options = program.opts();

    if (program.args[1] === MaxCommand.COMPONENT || program.args[1] === MinCommand.COMPONENT) {
      // NOTE: Display error if "component" argument is not provided.
      if (!program.args[2]) {
        spinner.error({
          text: `${chalk.red('Filename is required.')}

Correct usage is ${chalk.green('npx arclix generate component <filename>')}\n`,
        });
        return;
      }

      const hasTypeScript = await checkType();
      const hasScss = await checkStyle();

      const defaultPath = getRootPath(process.cwd()) === '' ? './src/' : '';
      const folderPath = defaultPath + (options.path ? handlePath(options.path) + program.args[2] : program.args[2]);

      const componentUtilityInstance = GenerateProject.getInstance(
        {
          componentName: program.args[2],
          folderPath: options.flat ? (options.path ? defaultPath + options.path : defaultPath) : folderPath,
          type: hasTypeScript,
          style: hasScss,
          scopeStyle: options.scopeStyle,
        },
        fileCreationError
      );

      // NOTE: Not creating folder if --flat flag is provided
      spinner.start({ text: 'Creating component...' });
      if (options.flat) {
        componentUtilityInstance.generateComponent(!options.skipTest);
      } else {
        fs.mkdir(folderPath, { recursive: true }, async (err) => {
          if (err) {
            spinner.error({ text: err.message });
          }
          componentUtilityInstance.generateComponent(!options.skipTest);
        });
      }

      // IMPORTANT: This is where response is sent to the user.
      await sleep(300);
      if (fileCreationError) {
        spinner.error({
          text: `${chalk.red(`Component ${program.args[2]} is not created.\n`)}`,
        });
      } else {
        spinner.success({
          text: `Component ${chalk.green(program.args[2])} created\n`,
        });
      }
    } else {
      spinner.error({ text: chalk.red('Unknown command\n') });
    }
  } else {
    spinner.error({
      text: chalk.red('Cannot create component outside of React project.\n'),
    });
  }
};

export default generateProjects;
