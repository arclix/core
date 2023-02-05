#!/usr/bin/env node

import { program } from "commander";
import { MaxCommand, MinCommand } from "./types/enum.js";
import { log, emptyLine, primaryChalk, spinner } from "./utilities/utility.js";
import createProject from "./functions/createProject.js";
import generateProjects from "./functions/generateProject.js";
import chalk from "chalk";

program
    .option("-p, --path <string>", "Generates components based on the path")
    .option("--flat", "Generates components without parent folder")
    .option("--skipTest", "Skip the test file while generating component");

program.parse();

log("\n" + primaryChalk.italic.bold("> ARCLIX v0.0.3"));

await (async (command: string) => {
    if (command === MaxCommand.CREATE) {
        emptyLine();
        await createProject();
    } else if (
        command === MaxCommand.GENERATE ||
        command === MinCommand.GENERATE
    ) {
        emptyLine();
        await generateProjects(program);
    } else {
        emptyLine();
        spinner.error({ text: chalk.red("Unknown Command.\n") });
    }
})(program.args[0]);
