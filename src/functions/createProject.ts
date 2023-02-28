import inquirer from "inquirer";
import { exec, spawn } from "child_process";
import {
    sleep,
    spinner,
    emptyLine,
    primaryChalk,
} from "../utilities/utility.js";
import chalk from "chalk";
import path from "path";

const currentDir = process.cwd();

const execCommand = async (command: string): Promise<any> => {
    return new Promise((r) => exec(command, r));
};

const changeDirectory = async (dir: string, goBack: boolean = false) => {
    if (goBack) {
        return new Promise((r) => process.chdir(dir));
    } else {
        const finalPath = path.join(process.cwd(), dir);
        return new Promise((r) => process.chdir(finalPath));
    }
};

const installSass = async (projectName: string) => {
    const npmPath = process.platform == "win32" ? "npm.cmd" : "npm";
    const finalPath = path.join(process.cwd(), `./${projectName}`);
    await new Promise((r) => {
        const installProcess = spawn(
            npmPath,
            ["install", "--save-dev", "sass"],
            {
                cwd: finalPath,
            },
        );
        installProcess.on("close", (code) => r(code));
    });
};

const createReactApp = async (language: string, projectName: string) => {
    switch (language) {
        case "TypeScript":
            await execCommand(
                `npx create-react-app ${projectName} --template typescript`,
            );
            break;

        case "JavaScript":
            await execCommand(`npx create-react-app ${projectName}`);
            break;

        default:
            break;
    }
};

const createProject = async (projectName: string) => {
    await sleep(500);
    try {
        const answer2 = await inquirer.prompt({
            name: "language",
            type: "list",
            message: "What template would you like to use?",
            choices: ["JavaScript", "TypeScript"],
        });
        const answer3 = await inquirer.prompt({
            name: "style",
            type: "list",
            message: "What styling would you like to use?",
            choices: ["CSS", "SCSS/SASS"],
        });

        spinner.start({ text: "Installing dependencies...\n" });
        await createReactApp(answer2.language, projectName);
        spinner.success({ text: "Finished installing dependencies" });

        if (answer3.style === "SCSS/SASS") {
            spinner.start({ text: "Installing additional dependencies...\n" });
            await installSass(projectName);
            spinner.success({
                text: "Finished installing additional dependencies\n",
            });
        }

        spinner.success({
            text: `Finished creating ${primaryChalk.italic("React.JS")} project

To run the project
    - cd ${projectName}
    - npm start
            `,
        });
    } catch (error) {
        spinner.error({ text: (error as Error).message });
        process.exit(1);
    }
};

export default createProject;
