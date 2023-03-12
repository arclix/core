import fs from "fs";
import path from "path";
import getRootPath from "./getRootPath.js";

/**
 * Check wether the project is a React project or not
 *
 * @param packagePath path to package.json
 * @returns true it it's a react project or flase
 */
const checkReact = async (packagePath: string): Promise<boolean> => {
    const rootPath = getRootPath(process.cwd());
    const packageJsonPath = path.resolve(rootPath, packagePath);

    try {
        const data = await fs.promises.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        const dependenciesCheck: boolean =
            Object.hasOwn(dependencies, "react") &&
            Object.hasOwn(dependencies, "react-dom");
        const devDependenciesCheck: boolean =
            Object.hasOwn(devDependencies, "react") &&
            Object.hasOwn(devDependencies, "react-dom");

        if (dependenciesCheck || devDependenciesCheck) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export default checkReact;
