import type { PackageType } from "../../types/type.js";

/**
 * Checks whether the given property exists or not
 *
 * @param property property to check
 * @param pkg package.json contents
 * @returns true if exists or false
 */
const checkProperty = async (
    property: string,
    pkg: PackageType,
): Promise<boolean> => {
    const { dependencies, devDependencies } = pkg;
    return property in dependencies || property in devDependencies;
};

export default checkProperty;
