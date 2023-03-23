import inquirer from "inquirer";
import { exec, spawn } from "child_process";
import { spinner, primaryChalk } from "../utilities/utility.js";
import path from "path";

/**
 * A singleton class to create React project.
 *
 * author @jitiendran
 */
export default class CreateProject {
    private static instance: CreateProject;

    public static getInstance(): CreateProject {
        if (!CreateProject.instance) {
            CreateProject.instance = new CreateProject();
        }

        return CreateProject.instance;
    }

    private execCommand = async (command: string): Promise<any> => {
        return new Promise((r) => exec(command, r));
    };

    private installSass = async (projectName: string) => {
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

    private createReactApp = async (language: string, projectName: string) => {
        switch (language) {
            case "TypeScript":
                await this.execCommand(
                    `npx create-react-app ${projectName} --template typescript`,
                );
                break;

            case "JavaScript":
                await this.execCommand(`npx create-react-app ${projectName}`);
                break;

            default:
                break;
        }
    };

    public createProject = async (projectName: string) => {
        try {
            const answers = await inquirer.prompt([
                {
                    name: "language",
                    type: "list",
                    message: "What template would you like to use?",
                    choices: ["JavaScript", "TypeScript"],
                },
                {
                    name: "style",
                    type: "list",
                    message: "What styling would you like to use?",
                    choices: ["CSS", "SCSS/SASS"],
                },
            ]);

            spinner.start({ text: "Installing dependencies...\n" });
            await this.createReactApp(answers.language, projectName);
            spinner.success({ text: "Finished installing dependencies" });

            if (answers.style === "SCSS/SASS") {
                spinner.start({
                    text: "Installing additional dependencies...\n",
                });
                await this.installSass(projectName);
                spinner.success({
                    text: "Finished installing additional dependencies\n",
                });
            }

            spinner.success({
                text: `Finished creating ${primaryChalk.italic(
                    "React.JS",
                )} project
    
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
}
