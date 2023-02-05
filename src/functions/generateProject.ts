import fs from "fs";
import path from "path";
import { Command } from "commander";
import { MaxCommand, MinCommand } from "../types/enum.js";
import {
    errorLog,
    primaryChalk,
    sleep,
    spinner,
} from "../utilities/utility.js";
import chalk from "chalk";
import fileExists from "../helpers/fileExists.js";
import checkReact from "../helpers/checkReact.js";

interface ContentArgs {
    componentName: string;
    folderPath: string;
    type: boolean;
}

const createReactContent = (args: ContentArgs) => {
    const { componentName, folderPath, type } = args;
    const reactContent = `const ${componentName} = () => {
    return (
        <>
            // Type content here
        </>
    );
};

export default ${componentName};
    `;

    const fileName = `${componentName}${type ? ".tsx" : ".jsx"}`;

    fs.writeFile(path.join(folderPath, fileName), reactContent, (err) => {
        errorLog((err as Error)?.message);
    });
};

const createReactTestContent = (args: ContentArgs) => {
    const { componentName, folderPath, type } = args;
    const reactTestContent = `import { render } from '@testing-library/react';
import ${componentName} from './${componentName}';

test('renders ${componentName} component', () => {
    const { getByText } = render(<${componentName} />);
    const linkElement = getByText(/Hello, World!/i);
    expect(linkElement).toBeInTheDocument();
});
    `;

    const fileName = `${componentName}${type ? ".test.tsx" : ".test.jsx"}`;

    fs.writeFile(path.join(folderPath, fileName), reactTestContent, (err) => {
        errorLog((err as Error)?.message);
    });
};

const generateProjects = async (program: Command) => {
    const isReact = await checkReact();

    if (isReact) {
        const options = program.opts();

        if (
            program.args[1] === MaxCommand.COMPONENT ||
            program.args[1] === MinCommand.COMPONENT
        ) {
            if (!program.args[2]) {
                errorLog(`
                    Filename is required.
    
                    Correct usage is ${primaryChalk.bold(
                        "clix generate component <filename>"
                    )}
                `);
                return;
            }
            const path = options.path
                ? options.path + program.args[2]
                : program.args[2];

            const isTypeScript =
                (await fileExists("./src/App.ts")) ||
                (await fileExists("./src/App.tsx"));

            // NOTE: Not creating folder if --flat flag is provided
            spinner.start({ text: "Creating component..." });
            if (options.flat) {
                createReactContent({
                    componentName: program.args[2],
                    folderPath: options.path ?? "",
                    type: options.type,
                });
                createReactTestContent({
                    componentName: program.args[2],
                    folderPath: options.path ?? "",
                    type: options.type,
                });
            } else {
                fs.mkdir(path, { recursive: true }, async (err) => {
                    if (err) {
                        spinner.error({ text: err.message });
                    }
                    createReactContent({
                        componentName: program.args[2],
                        folderPath: path,
                        type: options.type,
                    });
                    createReactTestContent({
                        componentName: program.args[2],
                        folderPath: path,
                        type: options.type,
                    });
                });
            }
            await sleep(300);
            spinner.success({
                text: `Component ${chalk.green(program.args[2])} created`,
            });
        }
    } else {
        spinner.error({
            text: "Cannot create component outside of React project.",
        });
    }
};

export default generateProjects;
