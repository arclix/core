import fs from "fs";
import path from "path";
import chalk from "chalk";
import { ContentArgs } from "../types/type.js";
import { convertToTitleCase, spinner } from "../utilities/utility.js";
import { componentTemplate, testTemplate } from "./templates/index.js";

/**
 * A utility class to generate component based on arguments.
 *
 * author @aaraamuthan @jitiendran
 */
export class GenerateComponentUtility {
    private argParams: ContentArgs;
    private styleType: ".scss" | ".css";
    constructor(
        private readonly args: ContentArgs,
        public fileCreationError: boolean,
    ) {
        this.argParams = args;
        this.argParams.componentName = convertToTitleCase(args.componentName);
        this.styleType = this.argParams.style ? ".scss" : ".css";
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
            addIndex: this.argParams.addIndex,
            componentName: this.args.componentName,
            scopeStyle: this.argParams.scopeStyle,
            styleType: this.styleType,
        });
        const fileName =
            this.args.componentName +
            `${this.argParams.type ? ".tsx" : ".jsx"}`;
        this.writeToFile(this.argParams.folderPath, fileName, content);
    };
    private createStyleFile = () => {
        const fileName =
            this.args.componentName +
            `${
                this.argParams.scopeStyle
                    ? `.module${this.styleType}`
                    : this.styleType
            }`;
        this.writeToFile(this.argParams.folderPath, fileName, "");
    };
    private createTestFile = () => {
        const fileName =
            this.args.componentName +
            `${this.argParams.type ? ".test.tsx" : ".test.jsx"}`;
        const content = testTemplate(
            this.argParams.componentName,
            this.argParams.addIndex,
        );
        this.writeToFile(this.argParams.folderPath, fileName, content);
    };
    private createIndexFile = () => {
        let content = "";
        if (this.argParams.flat) {
            content = `export * from './${this.argParams.componentName}'`;
        } else {
            const splitedPath = this.argParams.folderPath.split("/");
            content = `export * from '../${
                splitedPath[splitedPath.length - 2]
            }'`;
        }
        const fileName = `index${this.argParams.type ? ".ts" : ".js"}`;
        this.writeToFile(this.argParams.folderPath, fileName, content);
    };

    public generateComponent = (skipTest: boolean) => {
        this.createComponent();
        this.createStyleFile();
        this.argParams.addIndex && this.createIndexFile();
        !skipTest && this.createTestFile();
    };
}
