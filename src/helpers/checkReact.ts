import { packageType } from "../types/interface.js";

/**
 * Check wether the project is a React project or not
 *
 * @param pkg package.json contents
 * @returns true it it's a react project or flase
 */
const checkReact = async (pkg: packageType): Promise<boolean> => {
    const { dependencies, devDependencies } = pkg;
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
};

export default checkReact;
