import fs from "node:fs";
import path from "node:path";

/**
 * Get's the root directory of the project.
 * Recursively look's for the root directory until `package.json` is found.
 *
 * @param currentDir current working directory
 * @returns root directory path
 */
const getRootDirectory = (currentDir = process.cwd()): string | null => {
    while (currentDir !== path.sep) {
        if (fs.existsSync(path.join(currentDir, "package.json"))) {
            return currentDir;
        }
        currentDir = path.dirname(currentDir);
    }
    return null;
};

export default getRootDirectory;
