import fs from "node:fs";
import path from "node:path";
import type { PackageType } from "../../types/type.js";
import getRootPath from "./getRootPath.js";

/**
 * Get the dependencies and devDependencies from package
 *
 * @param pkgPath of the package.json file
 * @returns dependencies and devDependencies from package.json or null
 */
const getPackageFile = async (pkgPath: string): Promise<PackageType | null> => {
    const pkgJsonPath = path.resolve(getRootPath(process.cwd()), pkgPath);

    if (!fs.existsSync(pkgJsonPath)) {
        return null;
    }

    const data = await fs.promises.readFile(pkgJsonPath, "utf-8");
    const { dependencies = {}, devDependencies = {} } = JSON.parse(data);
    return { dependencies, devDependencies };
};

export default getPackageFile;
