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
        emptyLine();
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
            message: "What would like to use?",
            choices: ["JavaScript", "TypeScript"],
        });

        if (answer2.language === "TypeScript") {
            spinner.start({ text: "Installing dependencies..." });

            await new Promise((r) =>
                exec(
                    `npx create-react-app ${answer1.project} --template typescript`,
                    r
                )
            );

            spinner.stop();
        } else {
            spinner.start({ text: "Installing dependencies..." });

            await new Promise((r) =>
                exec(`npx create-react-app ${answer1.project}`, r)
            );

            spinner.stop();
        }

        emptyLine();
        spinner.success({
            text: `Finished creating ${primaryChalk.italic(
                "React.JS"
            )} project`,
        });
    } catch (error) {
        spinner.error({ text: error.message });
        process.exit(1);
    }
};

export default createProject;
