import fs from "fs";
import path from "path";
import { ArclixConfig, GenerateConfig } from "../types/interface.js";

/**
 * A singleton class to generate config file.
 *
 * author @jitiendran
 */
export default class GenerateConfigFile {
    private readonly config: ArclixConfig;
    private readonly generateConfig: GenerateConfig;
    private static instance: GenerateConfigFile;

    private constructor() {
        this.generateConfig = {
            flat: false,
            addIndex: false,
            skipTest: false,
            scopeStyle: false,
            defaultPath: "./src",
        };

        this.config = {
            generate: this.generateConfig,
        };
    }

    public static getInstance(): GenerateConfigFile {
        if (!GenerateConfigFile.instance) {
            GenerateConfigFile.instance = new GenerateConfigFile();
        }
        return GenerateConfigFile.instance;
    }

    public generateConfigFile = (projectName: string) => {
        const currentDir = process.cwd();
        const content = `${JSON.stringify(this.config, null, 2)}\n`;

        process.chdir(path.join(currentDir, `./${projectName}`));
        fs.writeFileSync("arclix.config.json", content);
        process.chdir(currentDir);
    };
}
