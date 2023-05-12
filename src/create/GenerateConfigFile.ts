import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { singleton } from "../types/decorator.js";
import { emptyLine, log, spinner } from "../utilities/utility.js";
import type { ArclixConfig, ComponentConfig } from "../types/type.js";
import getRootDirectory from "../generate/helpers/getRootDirectory.js";

/**
 * A singleton class to generate config file.
 *
 * author @jitiendran
 */
@singleton
export default class GenerateConfigFile {
    private readonly config: ArclixConfig;
    private readonly defaultComponentConfig: ComponentConfig;

    constructor() {
        this.defaultComponentConfig = {
            cssPreprocessor: "css",
            usesTypeScript: true,
            scopeStyle: false,
            addStory: false,
            addIndex: false,
            addTest: false,
            flat: false,
            path: "./",
        };

        this.config = {
            component: {
                default: this.defaultComponentConfig,
            },
        };
    }

    /**
     * Generates config file while creating the project if projectName exists.
     * Otherwise generates config file to the existing project.
     *
     * @param projectName to be created with arclix
     */
    public generateConfigFile = (projectName?: string) => {
        const currentDir = process.cwd();
        const content = `${JSON.stringify(this.config, null, 2)}\n`;

        if (projectName) {
            process.chdir(path.join(currentDir, projectName));
            fs.writeFileSync("arclix.config.json", content);
            process.chdir(currentDir);
        } else {
            const rootPath = getRootDirectory() ?? currentDir;
            const configPath = path.join(rootPath, "arclix.config.json");

            if (fs.existsSync(configPath)) {
                log("\nArclix config file already exists.\n");
                return;
            }

            fs.writeFileSync(configPath, content);
            emptyLine();
            spinner.success({
                text: `Generated ${chalk.green("arclix.config.json")} file.\n`,
            });
        }
    };
}
