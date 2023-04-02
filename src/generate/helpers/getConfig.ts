import fs from "fs";
import path from "path";
import getRootPath from "./getRootPath.js";
import { ArclixConfig } from "../../types/type.js";

/**
 * Get's the config file contents
 *
 * @param defaultPath path to the config file
 * @returns config content if the file exists otherwise null
 */
const getConfig = (defaultPath: string): ArclixConfig | null => {
    const rootPath = getRootPath(process.cwd());
    const configPath = path.resolve(rootPath, defaultPath);
    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, { encoding: "utf-8" });
        return JSON.parse(data) as ArclixConfig;
    }

    return null;
};

export default getConfig;
