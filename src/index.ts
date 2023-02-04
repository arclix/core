#!/usr/bin/env nod

import { program } from "commander";
import createProject from "./functions/createProject.js";
import generateProjects from "./functions/generateProject.js";
import { MaxCommand, MinCommand } from "./types/enum.js";
import { log, emptyLine, primaryChalk } from "./utilities/utility.js";

program
    .option(
        "-t, --type",
        "Generates react general and test TypeScript components"
    )
    .option("-p, --path <string>", "Generates components based on the path")
    .option("--flat", "Generates components without parent folder");

program.parse();

log("\n" + primaryChalk.bold("> CLIX v0.0.1"));

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
        log("Unknown Commands 💀💀");
    }
})(program.args[0]);
