import fs from "node:fs";
import path from "node:path";
import chalk from "chalk";
import { spinner } from "../utilities/utility.js";
import type { ContentArgs } from "../types/type.js";
import { componentTemplate, testTemplate } from "./templates/index.js";

/**
 * A utility class to generate component based on arguments.
 *
 * author @aaraamuthan @jitiendran
 */
export class GenerateComponentUtility {
    private readonly styleType: ".scss" | ".css";
    private readonly indexType: ".ts" | ".js";
    constructor(
        private readonly contentArgs: ContentArgs,
        public fileCreationError: boolean,
    ) {
        this.styleType = this.contentArgs.style ? ".scss" : ".css";
        this.indexType = this.contentArgs.template === "tsx" ? ".ts" : ".js";
    }
    private writeToFile = (
        folderPath: string,
        fileName: string,
        content: string,
    ) => {
        fs.writeFile(path.join(folderPath, fileName), content, (err) => {
            if (err) {
                spinner.error({ text: chalk.red(err?.message) });
                this.fileCreationError = true;
                return;
            }
        });
    };
    private createComponent = () => {
        const content = componentTemplate({
            addIndex: this.contentArgs.addIndex,
            componentName: this.contentArgs.componentName,
            scopeStyle: this.contentArgs.scopeStyle,
            styleType: this.styleType,
        });
        const fileName = `${this.contentArgs.componentName}.${this.contentArgs.template}`;
        this.writeToFile(this.contentArgs.folderPath, fileName, content);
    };
    private createStyleFile = () => {
        const fileName = `${this.contentArgs.componentName}${
            this.contentArgs.scopeStyle ? ".module" : ""
        }${this.styleType}`;
        this.writeToFile(this.contentArgs.folderPath, fileName, "");
    };
    private createTestFile = () => {
        const fileName = `${this.contentArgs.componentName}.test.${this.contentArgs.template}`;
        const content = testTemplate(
            this.contentArgs.componentName,
            this.contentArgs.addIndex,
        );
        this.writeToFile(this.contentArgs.folderPath, fileName, content);
    };
    private createIndexFile = () => {
        const { flat, folderPath, componentName } = this.contentArgs;
        const filePath = flat
            ? `"../${folderPath.split("/").slice(-2, -1)[0]}"`
            : `"./${componentName}"`;
        const content = `export * from ${filePath}`;
        const fileName = `index${this.indexType}`;
        this.writeToFile(folderPath, fileName, content);
    };

    public generateComponent = (skipTest: boolean) => {
        this.createComponent();
        this.createStyleFile();
        this.contentArgs.addIndex && this.createIndexFile();
        !skipTest && this.createTestFile();
    };
}
