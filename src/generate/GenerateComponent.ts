import fs from 'node:fs';
import chalk from 'chalk';
import path from 'node:path';
import { spinner, logError } from '../utilities/utility.js';
import type { ArclixConfig, BooleanProps, CLIOptions } from '../types/type.js';
import { GenerateComponentUtility } from './GenerateComponentUtility.js';
import { singleton } from '../types/decorator.js';
import {
  checkReact,
  getRootDirectory,
  getConfig,
  getPackageFile,
} from './helpers/index.js';

/**
 * A singleton class to generate component.
 *
 * author @jitiendran
 */
@singleton
export default class GenerateComponent {
  /**
   * Root directory path of the react project where component is to be generated.
   *
   * @default CWD
   */
  private readonly rootPath: string;
  /**
   * Default path for `package.json` file.
   */
  private readonly defaultPackagePath: string;
  /**
   * Config options got from `arclix.config.json` file.
   */
  private readonly config: ArclixConfig | null;
  /**
   * List of components that are skipped while generating due to error.
   */
  private readonly deletedIndices: number[];

  constructor() {
    this.deletedIndices = [];
    this.config = getConfig('./arclix.config.json');
    this.rootPath = getRootDirectory() ?? process.cwd();
    this.defaultPackagePath = path.join(this.rootPath, 'package.json');
  }

  // Get's the options either from flags or configs.
  // Flags can override config values, so flags take higher priority.
  private getOptions = (
    options: CLIOptions,
    property: keyof BooleanProps<CLIOptions>,
  ): boolean => {
    return (
      options[property] ||
      this.config?.component[options.type ?? 'default'][property] === true
    );
  };

  // Get's the folder path where the component should be generated.
  private getFolderPath = (
    componentName: string,
    options: CLIOptions,
  ): string => {
    const configPath = this.config?.component[options.type ?? 'default'].path;
    /**
     * If path flag is provided then use path specified in path flag.
     * Or else check for path in config file and use the path if it's available.
     * Or else use the current working directory.
     */
    const folderPath = options.path ?? configPath ?? this.rootPath;
    const folderName = this.getOptions(options, 'flat') ? '' : componentName;

    if (!fs.existsSync(folderPath)) {
      throw new Error("Invalid path or path doesn't exist on this project.");
    }
    return path.join(folderPath, folderName);
  };

  // Returns the actual component name from nested component name.
  // E.g Notes/Note here Note is the actual component name needed to be nested inside Notes.
  private handleNestedComponentName = (
    componentName: string,
    flat: boolean,
  ): string => {
    componentName = componentName.trim();
    if (flat && componentName.includes('/')) {
      spinner.error({
        text: `${chalk.red(
          'Cannot nest the component while using --flat or -f option.\n',
        )}`,
      });
      return '';
    }
    return componentName.split('/').pop() ?? componentName;
  };

  private componentExists = (
    folderPath: string,
    componentName: string,
    usesTypeScript: boolean,
  ): boolean => {
    const template = usesTypeScript ? 'tsx' : 'jsx';
    return fs.existsSync(path.join(folderPath, `${componentName}.${template}`));
  };

  public generateComponent = async (
    componentNames: string[],
    options: CLIOptions,
    packagePath = this.defaultPackagePath,
  ) => {
    const pkg = await getPackageFile(packagePath);
    if (!pkg) {
      logError("package.json file doesn't exist.\n");
      return;
    }

    const isReact = await checkReact(pkg);
    if (!isReact) {
      logError('Cannot create component outside of React project.\n');
      return;
    }

    const type = options.type ?? 'default';
    if (this.config && !this.config.component[type]) {
      logError(`Component type ${type} doesn't exist in the config file.\n`);
      return;
    }

    spinner.start({ text: 'Creating component...' });
    // Generate multiple and nested components.
    try {
      componentNames.forEach((componentName, index) => {
        const path = this.getFolderPath(componentName, options);
        const cliOptions: CLIOptions = {
          addIndex: this.getOptions(options, 'addIndex'),
          addStory: this.getOptions(options, 'addStory'),
          addTest: this.getOptions(options, 'addTest'),
          scopeStyle: this.getOptions(options, 'scopeStyle'),
          flat: this.getOptions(options, 'flat'),
          path,
          type,
        };

        componentName = this.handleNestedComponentName(
          componentName,
          cliOptions.flat,
        );

        if (!componentName) {
          this.deletedIndices.push(index);
          return;
        }

        const cssPreprocessor =
          this.config?.component[type].cssPreprocessor ?? 'css';
        const usesTypeScript =
          this.config?.component[type].usesTypeScript ?? true;
        const customTemplate = this.config?.component[type].customTemplate;

        // Skip the generation when the component already exists.
        if (this.componentExists(path, componentName, usesTypeScript)) {
          this.deletedIndices.push(index);
          logError(`Component ${componentName} already exists in this path.\n`);
          return;
        }

        const componentUtilityInstance = new GenerateComponentUtility({
          componentName,
          cssPreprocessor,
          usesTypeScript,
          customTemplate,
          options: cliOptions,
        });

        // Not creating folder if --flat flag is provided.
        if (cliOptions.flat) {
          componentUtilityInstance.generateComponent();
        } else {
          fs.mkdir(path, { recursive: true }, async (err) => {
            if (err) {
              logError(err.message);
              process.exit(1);
            }
            componentUtilityInstance.generateComponent();
          });
        }
      });
    } catch (error) {
      logError((error as Error).message);
    } finally {
      // Cleanup to delete the components which are skipped from componentNames.
      componentNames = componentNames.filter(
        (_, index) => !this.deletedIndices.includes(index),
      );

      if (componentNames.length > 0) {
        spinner.success({
          text: `Component ${chalk.green(
            componentNames.join(', '),
          )} created.\n`,
        });
      }
    }
  };
}
