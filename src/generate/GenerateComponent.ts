import fs from "node:fs";
import chalk from "chalk";
import path from "node:path";
import { OptionValues } from "commander";
import { spinner } from "../utilities/utility.js";
import type { ArclixConfig, GenerateConfig } from "../types/type.js";
import { GenerateComponentUtility } from "./GenerateComponentUtility.js";
import { singleton } from "../types/decorator.js";
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
@singleton
export default class GenerateComponent {
    private fileCreationError: boolean;
    private readonly defaultPath: string;
    private readonly deletedIndices: number[];
    private readonly config: ArclixConfig | null;
    private readonly defaultPackagePath: string;

    constructor() {
        this.deletedIndices = [];
        this.fileCreationError = false;
        this.config = getConfig("./arclix.config.json");
        this.defaultPath = this.config?.generate.defaultPath ?? process.cwd();
        this.defaultPackagePath = "./package.json";
    }

    // Get's the options either from flags or configs
    // Flags can override config values, so flags take higher priority
    private getOptions = (
        options: OptionValues,
        property: keyof GenerateConfig,
    ): boolean => {
        return options[property] || this.config?.generate[property];
    };

    // Get's the folder path where the component should be generated.
    private getFolderPath = (
        componentName: string,
        options: OptionValues,
    ): string => {
        const defaultPath = getRootPath(process.cwd())
            ? ""
            : this.handlePath(this.defaultPath);
        // If the `path` option is provided then add the path provided in the option.
        const pathSuffix = options.path ? this.handlePath(options.path) : "";
        // If the `flat` option is provided then there is no need to add folder name.
        const folderName = this.getOptions(options, "flat")
            ? ""
            : componentName;
        return `${defaultPath}${pathSuffix}${folderName}`;
    };

    // Add trailing '/' to the path if not provided
    private handlePath = (path: string): string => {
        return path.endsWith("/") ? path : path + "/";
    };

    private handleNestedComponentName = (
        componentName: string,
        options: OptionValues,
    ): string => {
        const nestedComponentName = componentName.split("/").pop();
        if (componentName.includes("/") && this.getOptions(options, "flat")) {
            spinner.error({
                text: `${chalk.red(
                    "Cannot nest the component while using --flat or -f option\n",
                )}`,
            });
            return "";
        }
        return nestedComponentName ?? componentName;
    };

    private componentExists = (
        folderPath: string,
        componentName: string,
        type: boolean,
    ) => {
        const componentType = type ? ".tsx" : ".jsx";
        return fs.existsSync(
            path.join(folderPath, `${componentName}${componentType}`),
        );
    };

    public generateComponent = async (
        componentNames: string[],
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

        spinner.start({ text: "Creating component..." });
        // Generate multiple and nested components
        componentNames.forEach((componentName, index) => {
            const folderPath = this.getFolderPath(componentName, options);
            componentName = this.handleNestedComponentName(
                componentName,
                options,
            );

            if (!componentName) {
                this.deletedIndices.push(index);
                return;
            }

            // Skip the generation when the component already exists
            if (
                this.componentExists(folderPath, componentName, hasTypeScript)
            ) {
                this.deletedIndices.push(index);
                spinner.error({
                    text: chalk.red(
                        `Component ${componentName} already exists.\n`,
                    ),
                });
                return;
            }

            const componentUtilityInstance = new GenerateComponentUtility(
                {
                    componentName,
                    folderPath,
                    type: hasTypeScript,
                    style: hasScss,
                    scopeStyle: this.getOptions(options, "scopeStyle"),
                    addIndex: this.getOptions(options, "addIndex"),
                    flat: this.getOptions(options, "flat"),
                },
                this.fileCreationError,
            );

            // Not creating folder if --flat flag is provided
            if (this.getOptions(options, "flat")) {
                componentUtilityInstance.generateComponent(
                    this.getOptions(options, "skipTest"),
                );
            } else {
                fs.mkdir(folderPath, { recursive: true }, async (err) => {
                    if (err) {
                        spinner.error({ text: err.message });
                        return;
                    }
                    componentUtilityInstance.generateComponent(
                        this.getOptions(options, "skipTest"),
                    );
                });
            }
        });

        // Cleanup to delete the components which are skipped from componentNames
        componentNames = componentNames.filter(
            (_, index) => !this.deletedIndices.includes(index),
        );

        if (this.fileCreationError) {
            spinner.error({
                text: `${chalk.red(`Components are not created.\n`)}`,
            });
        } else if (componentNames.length > 0) {
            spinner.success({
                text: `Component ${chalk.green(
                    componentNames.join(", "),
                )} created.\n`,
            });
        }
    };
}
