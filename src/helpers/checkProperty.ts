import fs from "fs";
import path from "path";
import getRootPath from "./getRootPath.js";

/**
 * Checks whether the given property exists or not
 *
 * @param property property to check
 * @param packagePath path to package.json
 * @returns true if exists or false
 */
const checkProperty = async (
    property: string,
    packagePath: string,
): Promise<boolean> => {
    const rootPath = getRootPath(process.cwd());
    const packageJsonPath = path.resolve(rootPath, packagePath);

    try {
        const data = await fs.promises.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        if (
            Object.hasOwn(dependencies, property) ||
            Object.hasOwn(devDependencies, property)
        ) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export default checkProperty;
