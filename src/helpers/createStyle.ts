import fs from "fs";
import path from "path";
import chalk from "chalk";
import ContentArgs from "../types/interface.js";
import { spinner } from "../utilities/utility.js";

const createStyle = (args: ContentArgs, fileCreationError: boolean) => {
    const { componentName, folderPath, style, scopeStyle } = args;
    const styleType = style ? ".scss" : ".css";
    const fileName = `${componentName}${
        scopeStyle ? `.module${styleType}` : styleType
    }`;

    fs.writeFile(path.join(folderPath, fileName), "", (err) => {
        if (err) {
            spinner.error({ text: chalk.red(err?.message) });
            fileCreationError = true;
            return;
        }
    });
};

export default createStyle;
