import fs from "node:fs";
import path from "node:path";
import getRootPath from "./getRootPath.js";
import { ArclixConfig } from "../../types/type.js";

/**
 * Get's the config file contents
 *
 * @param defaultPath path to the config file
 * @returns config content if the file exists otherwise null
 */
const getConfig = (defaultPath: string): ArclixConfig | null => {
    const configPath = path.resolve(getRootPath(process.cwd()), defaultPath);
    if (!fs.existsSync(configPath)) {
        return null;
    }

    const data = fs.readFileSync(configPath, "utf-8");
    return JSON.parse(data) as ArclixConfig;
};

export default getConfig;
