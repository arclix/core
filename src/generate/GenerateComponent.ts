import fs from "fs";
import chalk from "chalk";
import { OptionValues } from "commander";
import { spinner } from "../utilities/utility.js";
import { ArclixConfig } from "../types/interface.js";
import { GenerateComponentUtility } from "./GenerateComponentUtility.js";
import {
    checkReact,
    checkProperty,
    getRootPath,
    getConfig,
    getPackageFile,
} from "./helpers/index.js";

/**
 * A singleton class to generate component.
 *
 * author @jitiendran
 */
export default class GenerateComponent {
    private fileCreationError: boolean;
    private readonly config: ArclixConfig | null;
    private readonly defaultPath: string;
    private readonly defaultPackagePath: string;
    private static instance: GenerateComponent;

    private constructor() {
        this.config = getConfig("./arclix.config.json");
        if (this.config) {
            this.defaultPath = this.config.generate.defaultPath;
        } else {
            this.defaultPath = "./src/";
        }
        this.defaultPackagePath = "./package.json";
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
        packagePath = this.defaultPackagePath,
    ) => {
        const pkg = await getPackageFile(packagePath);

        // Throw error if package.json doesn't exist
        if (!pkg) {
            spinner.error({
                text: chalk.red("package.json file doesn't exist.\n"),
            });
            return;
        }

        const isReact = await checkReact(pkg);

        // Throw error if it isn't a react project
        if (!isReact) {
            spinner.error({
                text: chalk.red(
                    "Cannot create component outside of React project.\n",
                ),
            });
            return;
        }

        const hasTypeScript = await checkProperty("typescript", pkg);
        const hasScss = await checkProperty("sass", pkg);

        // Default folder path
        let folderPath = !getRootPath(process.cwd()) ? this.defaultPath : "";

        /**
         * If "flat" then don't create a folder with name componentName
         * Else create a folder with name componentName
         */
        if (options.flat || this.config?.generate.flat) {
            // If path is provided append it with defaultPath
            if (options.path) {
                folderPath += this.handlePath(options.path);
            }
        } else {
            // If path is provided append it with defaultPath
            if (options.path) {
                folderPath += this.handlePath(options.path) + componentName;
            } else {
                folderPath += componentName;
            }
        }

        const componentUtilityInstance = GenerateComponentUtility.getInstance(
            {
                componentName,
                folderPath,
                type: hasTypeScript,
                style: hasScss,
                scopeStyle:
                    options.scopeStyle || this.config?.generate.scopeStyle,
                addIndex: options.addIndex || this.config?.generate.addIndex,
            },
            this.fileCreationError,
        );

        // NOTE: Not creating folder if --flat flag is provided
        spinner.start({ text: "Creating component..." });
        if (options.flat || this.config?.generate.flat) {
            componentUtilityInstance.generateComponent(
                options.skipTest || this.config?.generate.skipTest,
            );
        } else {
            fs.mkdir(folderPath, { recursive: true }, async (err) => {
                if (err) {
                    spinner.error({ text: err.message });
                }
                componentUtilityInstance.generateComponent(
                    options.skipTest || this.config?.generate.skipTest,
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
                text: `Component ${chalk.green(componentName)} created.\n`,
            });
        }
    };
}
