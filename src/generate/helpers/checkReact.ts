import type { PackageType } from "../../types/type.js";

/**
 * Check wether the project is a React project or not
 *
 * @param pkg package.json contents
 * @returns true it it's a react project or flase
 */
const checkReact = async (pkg: PackageType): Promise<boolean> => {
    const { dependencies, devDependencies } = pkg;
    const hasReact = "react" in dependencies || "react" in devDependencies;
    const hasReactDom =
        "react-dom" in dependencies || "react-dom" in devDependencies;

    return hasReact && hasReactDom;
};

export default checkReact;
