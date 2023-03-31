import fs from "fs";
import path from "path";
import { packageType } from "../../types/interface.js";
import getRootPath from "./getRootPath.js";

/**
 * Get the dependencies and deveDepencies from package
 *
 * @param packagePath of the package.json file
 * @returns dependencies and deveDependencies from package.json or null
 */
const getPackageFile = async (
    packagePath: string,
): Promise<packageType | null> => {
    const rootPath = getRootPath(process.cwd());
    const packageJsonPath = path.resolve(rootPath, packagePath);

    if (fs.existsSync(packageJsonPath)) {
        const data = await fs.promises.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        return { dependencies, devDependencies };
    }

    return null;
};

export default getPackageFile;
