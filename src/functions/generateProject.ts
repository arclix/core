import fs from "fs";
import chalk from "chalk";
import { Command } from "commander";
import { MaxCommand, MinCommand } from "../types/enum.js";
import { sleep, spinner } from "../utilities/utility.js";
import {
    checkType,
    checkReact,
    createTest,
    getRootPath,
    createComponent,
    createStyle,
    checkStyle,
} from "../helpers/index.js";

let fileCreationError: boolean = false;

const handlePath = (path: string): string => {
    if (path === "./src") {
        return "";
    }
    if (path[path.length - 1] !== "/") {
        return path + "/";
    }
    return path;
};

const generateProjects = async (program: Command) => {
    const isReact = await checkReact();

    if (isReact) {
        const options = program.opts();

        if (
            program.args[1] === MaxCommand.COMPONENT ||
            program.args[1] === MinCommand.COMPONENT
        ) {
            // NOTE: Display error if "component" argument is not provided.
            if (!program.args[2]) {
                spinner.error({
                    text: `${chalk.red("Filename is required.")}

Correct usage is ${chalk.green("clix generate component <filename>")}\n`,
                });
                return;
            }

            const hasTypeScript = await checkType();
            const hasScss = await checkStyle();

            const defaultPath =
                getRootPath(process.cwd()) === "" ? "./src/" : "";
            const folderPath =
                defaultPath +
                (options.path
                    ? handlePath(options.path) + program.args[2]
                    : program.args[2]);

            // NOTE: Not creating folder if --flat flag is provided
            spinner.start({ text: "Creating component..." });
            if (options.flat) {
                createComponent(
                    {
                        componentName: program.args[2],
                        folderPath: options.path
                            ? defaultPath + options.path
                            : defaultPath,
                        type: hasTypeScript,
                        style: hasScss,
                    },
                    fileCreationError
                );
                createStyle(
                    {
                        componentName: program.args[2],
                        folderPath: options.path
                            ? defaultPath + options.path
                            : defaultPath,
                        type: hasTypeScript,
                        style: hasScss,
                    },
                    fileCreationError
                );
                !options.skipTest &&
                    createTest(
                        {
                            componentName: program.args[2],
                            folderPath: options.path
                                ? defaultPath + options.path
                                : defaultPath,
                            type: hasTypeScript,
                        },
                        fileCreationError
                    );
            } else {
                fs.mkdir(folderPath, { recursive: true }, async (err) => {
                    if (err) {
                        spinner.error({ text: err.message });
                    }
                    createComponent(
                        {
                            componentName: program.args[2],
                            folderPath,
                            type: hasTypeScript,
                            style: hasScss,
                        },
                        fileCreationError
                    );
                    createStyle(
                        {
                            componentName: program.args[2],
                            folderPath,
                            type: hasTypeScript,
                            style: hasScss,
                        },
                        fileCreationError
                    );
                    !options.skipTest &&
                        createTest(
                            {
                                componentName: program.args[2],
                                folderPath,
                                type: hasTypeScript,
                            },
                            fileCreationError
                        );
                });
            }

            // IMPORTANT: This is where response is sent to the user.
            await sleep(300);
            if (fileCreationError) {
                spinner.error({
                    text: `${chalk.red(
                        `Component ${program.args[2]} is not created.\n`
                    )}`,
                });
            } else {
                spinner.success({
                    text: `Component ${chalk.green(program.args[2])} created\n`,
                });
            }
        } else {
            spinner.error({ text: chalk.red("Unknown command\n") });
        }
    } else {
        spinner.error({
            text: chalk.red(
                "Cannot create component outside of React project.\n"
            ),
        });
    }
};

export default generateProjects;
