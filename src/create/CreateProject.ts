import path from 'node:path';
import inquirer from 'inquirer';
import GenerateConfigFile from '../generate/GenerateConfigFile.js';
import { singleton } from '../types/decorator.js';
import { exec, spawn } from 'node:child_process';
import { spinner, primaryChalk } from '../utilities/utility.js';

/**
 * A singleton class to create React project.
 *
 * author @jitiendran
 */
@singleton
export default class CreateProject {
  private readonly generateConfigFileInstance: GenerateConfigFile;

  constructor() {
    this.generateConfigFileInstance = new GenerateConfigFile();
  }

  private execCommand = async (command: string): Promise<any> => {
    return new Promise((r) => exec(command, r));
  };

  private installSass = async (projectName: string) => {
    const npmPath = process.platform == 'win32' ? 'npm.cmd' : 'npm';
    const finalPath = path.join(process.cwd(), projectName);
    await new Promise((r) => {
      const installProcess = spawn(npmPath, ['install', '--save-dev', 'sass'], {
        cwd: finalPath,
      });
      installProcess.on('close', (code) => r(code));
    });
  };

  private createReactApp = async (language: string, projectName: string) => {
    switch (language) {
      case 'TypeScript':
        await this.execCommand(
          `npx create-react-app ${projectName} --template typescript`,
        );
        break;

      case 'JavaScript':
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
          name: 'language',
          type: 'list',
          message: 'What template would you like to use?',
          choices: ['JavaScript', 'TypeScript'],
        },
        {
          name: 'style',
          type: 'list',
          message: 'What styling would you like to use?',
          choices: ['CSS', 'SCSS/SASS'],
        },
      ]);

      spinner.start({ text: 'Installing dependencies...\n' });
      await this.createReactApp(answers.language, projectName);
      spinner.success({ text: 'Finished installing dependencies' });

      if (answers.style === 'SCSS/SASS') {
        spinner.start({
          text: 'Installing additional dependencies...\n',
        });
        await this.installSass(projectName);
        spinner.success({
          text: 'Finished installing additional dependencies\n',
        });
      }

      this.generateConfigFileInstance.generateConfigFile(projectName);

      spinner.success({
        text: `Finished creating ${primaryChalk.italic('React.JS')} project
    
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
