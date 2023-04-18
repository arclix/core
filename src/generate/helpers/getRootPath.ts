import path from "node:path";

/**
 * Get's the root path of the project (i.e. src)
 *
 * @param currentDir current directory where the function is called
 * @returns root path
 */
const getRootPath = (currentDir: string): string => {
    const paths = currentDir.split(path.sep);
    const index = paths.indexOf("src");

    if (index === -1) {
        return "";
    }
    return paths.slice(0, index).join(path.sep);
};

export default getRootPath;
