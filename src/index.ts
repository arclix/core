#!/usr/bin/env node

import chalk from "chalk";
import CreateProject from "./create/CreateProject.js";
import GenerateComponent from "./generate/GenerateComponent.js";
import GenerateConfigFile from "./create/GenerateConfigFile.js";
import { OptionValues, program } from "commander";
import { Command, AliasCommand } from "./types/type.js";
import { log, emptyLine, primaryChalk, spinner } from "./utilities/utility.js";

const version = "ARCLIX v0.1.3";
const createProjectInstance = new CreateProject();
const generateComponentInstance = new GenerateComponent();
const generateConfigFileInstance = new GenerateConfigFile();

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
    .argument("<project name>", "name of project to be generated")
    .description("Creates React project in the current directory")
    .action(async (projectName: string) => {
        log("\n" + primaryChalk.italic.bold(version));
        emptyLine();

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
    .option("--addStory", "Adds storybook story to the component.")
    .option("-f, --flat", "Generates components without parent folder.")
    .option("-p, --path <string>", "Generates components based on the path.")
    .action(async (...actions) => {
        log("\n" + primaryChalk.italic.bold(version));
        emptyLine();
        const componentNames: string[] = actions[2].args;
        const options: OptionValues = actions[2]._optionValues;
        await generateComponentInstance.generateComponent(
            componentNames,
            options,
        );
    });

program
    .command(Command.INIT)
    .description("Generated config file to the existing react project.")
    .action(() => {
        log("\n" + primaryChalk.italic.bold(version));
        generateConfigFileInstance.generateConfigFile();
    });

program.parse(process.argv);
