import fs from "fs";
import path from "path";
import getRootPath from "./getRootPath.js";
import { ArclixConfig } from "../types/interface.js";

const getConfig = (): ArclixConfig | null => {
    const rootPath = getRootPath(process.cwd());
    const configPath = path.resolve(rootPath, "./arclix.config.json");
    if (fs.existsSync(configPath)) {
        const data = fs.readFileSync(configPath, { encoding: "utf-8" });
        return JSON.parse(data) as ArclixConfig;
    }

    return null;
};

export default getConfig;
