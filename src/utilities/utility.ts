import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

const log = console.log;
const spinner = createSpinner();
const emptyLine = () => log();
const primaryChalk = chalk.hex('#09d3ac');

const convertToTitleCase = (componentName: string) =>
  componentName.slice(0, 1).toUpperCase() +
  componentName.slice(1, componentName.length);

export { log, spinner, emptyLine, primaryChalk, convertToTitleCase };
