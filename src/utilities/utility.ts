import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

const { log } = console;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const emptyLine = () => log();

const primaryChalk = chalk.hex('#09d3ac');
const errorLog = (log: string) => chalk.red(log);
const spinner = createSpinner();

const convertToTitleCase = (componentName: string) =>
  componentName.slice(0, 1).toUpperCase() + componentName.slice(1, componentName.length);

export { log, sleep, spinner, emptyLine, errorLog, primaryChalk, convertToTitleCase };
