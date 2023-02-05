import fs from "fs";
import path from "path";
import getRootPath from "./getRootPath.js";

const checkType = async (): Promise<boolean> => {
    const rootPath = getRootPath(process.cwd());
    const packageJsonPath = path.resolve(rootPath, "./package.json");

    try {
        const data = await fs.promises.readFile(packageJsonPath, "utf-8");
        const packageJson = JSON.parse(data);
        const dependencies = packageJson.dependencies || {};
        const devDependencies = packageJson.devDependencies || {};

        if (
            dependencies.hasOwnProperty("typescript") ||
            devDependencies.hasOwnProperty("typescript")
        ) {
            return true;
        }
        return false;
    } catch (error) {
        return false;
    }
};

export default checkType;
