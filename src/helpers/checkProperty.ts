import { packageType } from "../types/interface.js";

/**
 * Checks whether the given property exists or not
 *
 * @param property property to check
 * @param pkg package.json contents
 * @returns true if exists or false
 */
const checkProperty = async (
    property: string,
    pkg: packageType,
): Promise<boolean> => {
    const { dependencies, devDependencies } = pkg;
    if (
        Object.hasOwn(dependencies, property) ||
        Object.hasOwn(devDependencies, property)
    ) {
        return true;
    }
    return false;
};

export default checkProperty;
