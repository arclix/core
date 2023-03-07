import fs from "fs";
import path from "path";
import chalk from "chalk";
import ContentArgs from "../types/interface.js";
import { componentTemplate } from "../template/component.js";
import { convertToTitleCase, spinner } from "../utilities/utility.js";
import { testTemplate } from "../template/test.js";

/**
 * A singleton utility class to generate component based on arguments.
 *
 * author @aaraamuthan
 */
export class GenerateComponentUtility {
    private static instance: GenerateComponentUtility;
    private argParams: ContentArgs;
    private styleType: ".scss" | ".css";
    private constructor(
        private readonly args: ContentArgs,
        private fileCreationError: boolean,
    ) {
        this.argParams = args;
        this.argParams.componentName = convertToTitleCase(args.componentName);
        this.styleType = this.argParams.style ? ".scss" : ".css";
    }
    public static getInstance(
        args: ContentArgs,
        fileCreationError: boolean,
    ): GenerateComponentUtility {
        if (!GenerateComponentUtility.instance) {
            GenerateComponentUtility.instance = new GenerateComponentUtility(
                args,
                fileCreationError,
            );
        }
        return GenerateComponentUtility.instance;
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
        const content = `export * from './${this.argParams.componentName}'`;
        const fileName = `index${this.argParams.type ? ".ts" : ".js"}`;
        this.writeToFile(this.argParams.folderPath, fileName, content);
    };

    public generateComponent = (includeTest: boolean, addIndex: boolean) => {
        this.createComponent();
        this.createStyleFile();
        addIndex && this.createIndexFile();
        includeTest && this.createTestFile();
    };
}
