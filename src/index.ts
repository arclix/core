#!/usr/bin/env node

import chalk from "chalk";
import CreateProject from "./functions/CreateProject.js";
import GenerateComponent from "./functions/GenerateComponent.js";
import GenerateConfigFile from "./functions/GenerateConfigFile.js";
import { OptionValues, program } from "commander";
import { Command, AliasCommand } from "./types/enum.js";
import { log, emptyLine, primaryChalk, spinner } from "./utilities/utility.js";

const version = "ARCLIX v0.1.1";
const createProjectInstance = CreateProject.getInstance();
const generateComponentInstance = GenerateComponent.getInstance();
const generateConfigFileInstance = GenerateConfigFile.getInstance();

const checkProjectName = (projectName: string): boolean => {
    if (projectName !== projectName.toLowerCase()) {
        return false;
    }
    return true;
};

program.version(
    version,
    "-v --version",
    "Displays the version of Arclix in use",
);

program
    .command(Command.CREATE)
    .description("Creates React project in the current directory")
    .action(async (_str, options) => {
        log("\n" + primaryChalk.italic.bold(version));
        emptyLine();

        const projectName = options.args[0];

        // Throw error if projectname is empty or null
        if (options.args.length === 0) {
            spinner.error({ text: chalk.red("Missing Project Name.") });
            return;
        }

        // Throw error if there are two or more arguments
        if (options.args.length > 1) {
            spinner.error({ text: chalk.red("Unknown option.") });
            return;
        }

        // Throw error if the projectname is not in lowercase
        if (!checkProjectName(projectName)) {
            spinner.error({
                text: chalk.red("Project name should be in lowercase\n"),
            });
            return;
        }

        await createProjectInstance.createProject(projectName);
    });

const generate = program
    .command(Command.GENERATE)
    .alias(AliasCommand.GENERATE)
    .description("Generates based on argument in the current directory.");

generate
    .command(Command.COMPONENT)
    .alias(AliasCommand.COMPONENT)
    .description("Generates component in the current directory.")
    .argument("<component name>", "component name to be generated.")
    .option("--scopeStyle", "Scopes the style to the component.")
    .option("--skipTest", "Skip the test file while generating component.")
    .option("--addIndex", "Adds index file to make the imports easier.")
    .option("-f, --flat", "Generates components without parent folder.")
    .option("-p, --path <string>", "Generates components based on the path.")
    .action((componentName: string, options: OptionValues) => {
        log("\n" + primaryChalk.italic.bold(version));
        emptyLine();
        generateComponentInstance.generateProject(componentName, options);
    });

program
    .command(Command.INIT)
    .description("Generated config file to the existing react project.")
    .action(() => {
        log("\n" + primaryChalk.italic.bold(version));
        generateConfigFileInstance.generateConfigFile();
    });

program.parse(process.argv);
