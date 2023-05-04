import fs from "node:fs";
import type { PackageType } from "../../types/type.js";

/**
 * Get the dependencies and devDependencies from package
 *
 * @param pkgPath of the package.json file
 * @returns dependencies and devDependencies from package.json or null
 */
const getPackageFile = async (pkgPath: string): Promise<PackageType | null> => {
    if (!fs.existsSync(pkgPath)) {
        return null;
    }

    const data = await fs.promises.readFile(pkgPath, "utf-8");
    const { dependencies = {}, devDependencies = {} } = JSON.parse(data);
    return { dependencies, devDependencies };
};

export default getPackageFile;
