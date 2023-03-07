import fs from "fs";
import chalk from "chalk";
import { OptionValues } from "commander";
import { spinner } from "../utilities/utility.js";
import {
    checkType,
    checkReact,
    getRootPath,
    checkStyle,
} from "../helpers/index.js";
import { GenerateComponentUtility } from "../core/GenerateComponentUtility.js";

/**
 * A singleton class to generate component.
 *
 * author @jitiendran
 */
export default class GenerateComponent {
    private fileCreationError: boolean;
    private static instance: GenerateComponent;

    private constructor() {
        this.fileCreationError = false;
    }

    public static getInstance(): GenerateComponent {
        if (!GenerateComponent.instance) {
            GenerateComponent.instance = new GenerateComponent();
        }

        return GenerateComponent.instance;
    }

    private handlePath = (path: string): string => {
        // Do nothing because default path is src
        if (path === "./src") {
            return "";
        }

        // Add '/' to the end of path if not provided
        if (path[path.length - 1] !== "/") {
            return path + "/";
        }
        return path;
    };

    public generateProject = async (
        componentName: string,
        options: OptionValues,
    ) => {
        const isReact = await checkReact();

        if (isReact) {
            const hasTypeScript = await checkType();
            const hasScss = await checkStyle();

            // Default folder path
            let folderPath = !getRootPath(process.cwd()) ? "./src/" : "";

            /**
             * If "flat" then don't create a folder with name componentName
             * Else create a folder with name componentName
             */
            if (options.flat) {
                // If path is provided append it with defaultPath
                if (options.path) {
                    folderPath += options.path;
                }
            } else {
                // If path is provided append it with defaultPath
                if (options.path) {
                    folderPath += this.handlePath(options.path) + componentName;
                } else {
                    folderPath += componentName;
                }
            }

            const componentUtilityInstance =
                GenerateComponentUtility.getInstance(
                    {
                        componentName,
                        folderPath,
                        type: hasTypeScript,
                        style: hasScss,
                        scopeStyle: options.scopeStyle,
                        addIndex: options.addIndex,
                    },
                    this.fileCreationError,
                );

            // NOTE: Not creating folder if --flat flag is provided
            spinner.start({ text: "Creating component..." });
            if (options.flat) {
                componentUtilityInstance.generateComponent(
                    !options.skipTest,
                    options.addIndex,
                );
            } else {
                fs.mkdir(folderPath, { recursive: true }, async (err) => {
                    if (err) {
                        spinner.error({ text: err.message });
                    }
                    componentUtilityInstance.generateComponent(
                        !options.skipTest,
                        options.addIndex,
                    );
                });
            }

            // IMPORTANT: This is where response is sent to the user.
            if (this.fileCreationError) {
                spinner.error({
                    text: `${chalk.red(
                        `Component ${componentName} is not created.\n`,
                    )}`,
                });
            } else {
                spinner.success({
                    text: `Component ${chalk.green(componentName)} created\n`,
                });
            }
        } else {
            spinner.error({
                text: chalk.red(
                    "Cannot create component outside of React project.\n",
                ),
            });
        }
    };
}
