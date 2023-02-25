import chalk from "chalk";
import { createSpinner } from "nanospinner";

const { log } = console;
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
const emptyLine = () => log();

const primaryChalk = chalk.hex("#09d3ac");
const errorLog = (log: string) => chalk.red(log);
const spinner = createSpinner();

export { log, sleep, spinner, emptyLine, errorLog, primaryChalk };
