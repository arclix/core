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

const createReactApp = async (language: string, projectName: string) => {
    switch (language) {
        case "TypeScript":
            await execCommand(
                `npx create-react-app ${projectName} --template typescript`
            );
            break;

        case "JavaScript":
            await execCommand(`npx create-react-app ${projectName}`);
            break;

        default:
            break;
    }
};

const checkProjectName = (projectName: string): boolean => {
    if (projectName !== projectName.toLowerCase()) {
        return false;
    }
    return true;
};

const createProject = async () => {
    await sleep(500);
    try {
        const answer1 = await inquirer.prompt({
            name: "project",
            type: "input",
            message: "Project name?",
            default: () => {
                return "sample-react-app";
            },
        });

        if (!checkProjectName(answer1.project)) {
            emptyLine();
            spinner.error({
                text: chalk.red("Project name should be in lowercase\n"),
            });
            return;
        }

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
        await createReactApp(answer2.language, answer1.project);
        spinner.success({ text: "Finished installing dependencies" });

        if (answer3.style === "SCSS/SASS") {
            spinner.start({ text: "Installing additional dependencies...\n" });
            const npmPath = process.platform == "win32" ? "npm.cmd" : "npm";
            const finalPath = path.join(process.cwd(), `./${answer1.project}`);
            await new Promise((r) => {
                const installProcess = spawn(
                    npmPath,
                    ["install", "--save-dev", "sass"],
                    {
                        cwd: finalPath,
                    }
                );
                installProcess.on("close", (code) => r(code));
            });
            spinner.success({
                text: "Finished installing additional dependencies\n",
            });
        }
        spinner.success({
            text: `Finished creating ${primaryChalk.italic("React.JS")} project

To run the project
    - cd ${answer1.project}
    - npm start
            `,
        });
    } catch (error) {
        spinner.error({ text: (error as Error).message });
        process.exit(1);
    }
};

export default createProject;
