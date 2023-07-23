import fs from 'node:fs';
import chalk from 'chalk';
import { createSpinner } from 'nanospinner';

const log = console.log;
const spinner = createSpinner();
const logError = (error: string) => spinner.error({ text: chalk.red(error) });
const emptyLine = () => log();
const primaryChalk = chalk.hex('#09d3ac');

const convertToTitleCase = (componentName: string) =>
  componentName.slice(0, 1).toUpperCase() +
  componentName.slice(1, componentName.length);

const getPkg = async (pkgPath: string) => {
  const data = await fs.promises.readFile(pkgPath, 'utf-8');
  return JSON.parse(data);
};

export {
  log,
  spinner,
  logError,
  emptyLine,
  getPkg,
  primaryChalk,
  convertToTitleCase,
};
