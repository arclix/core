import fs from "fs";
import path from "path";

const fileExists = async (filePath: string): Promise<boolean> => {
    let isFileExists = false;
    const finalPath = path.resolve(process.cwd(), filePath);
    await fs.promises
        .stat(finalPath)
        .then(() => {
            isFileExists = true;
        })
        .catch(() => {
            isFileExists = false;
        });
    return isFileExists;
};

export default fileExists;
