import inquirer from "inquirer";
import { exec } from "child_process";
import {
    sleep,
    spinner,
    emptyLine,
    primaryChalk,
} from "../utilities/utility.js";

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

        if (answer2.language === "TypeScript") {
            spinner.start({ text: "Installing dependencies..." });

            await new Promise((r) =>
                exec(
                    `npx create-react-app ${answer1.project} --template typescript`,
                    r
                )
            );
        } else {
            spinner.start({ text: "Installing dependencies..." });

            await new Promise((r) =>
                exec(`npx create-react-app ${answer1.project}`, r)
            );
        }

        if (answer3.style === "SCSS/SASS") {
            await new Promise((r) => exec("npm install node-sass", r));
        }

        emptyLine();
        spinner.stop();
        spinner.success({
            text: `Finished creating ${primaryChalk.italic(
                "React.JS"
            )} project`,
        });
    } catch (error) {
        spinner.error({ text: (error as Error).message });
        process.exit(1);
    }
};

export default createProject;
