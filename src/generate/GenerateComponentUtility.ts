import fs from 'node:fs';
import path from 'node:path';
import { CustomTemplate } from '../types/type.js';
import type {
  ContentArgs,
  CustomTemplateType,
  Template,
} from '../types/type.js';
import {
  componentTemplate,
  testTemplate,
  storyTemplate,
} from './templates/index.js';
import { logError } from '../utilities/utility.js';

/**
 * A utility class to generate component based on arguments.
 *
 * author @aaraamuthan @jitiendran
 */
export class GenerateComponentUtility {
  private readonly template: Template;
  private readonly styleType: string;
  private readonly indexType: '.ts' | '.js';
  private readonly customTemplate: CustomTemplateType | null;

  constructor(private readonly contentArgs: ContentArgs) {
    this.styleType = `.${this.contentArgs.cssPreprocessor}`;
    [this.indexType, this.template] = this.contentArgs.usesTypeScript
      ? ['.ts', 'tsx']
      : ['.js', 'jsx'];
    this.customTemplate = this.contentArgs.customTemplate ?? null;
  }

  private async getCustomTemplateContent(
    template: CustomTemplate,
    componentName: string,
  ) {
    const filePath = this.customTemplate?.[template];

    if (!filePath) {
      return null;
    }

    try {
      const content = await fs.promises.readFile(filePath, 'utf-8');
      return content.replace(/TemplateComponent/g, componentName);
    } catch (error) {
      logError(
        `No file exists or error reading file in the given path for ${template} in customTemplate`,
      );
      process.exit(1);
    }
  }

  private writeToFile = (
    folderPath: string,
    fileName: string,
    content: string,
  ) => {
    fs.writeFile(path.join(folderPath, fileName), content, (err) => {
      if (err) {
        logError(err.message);
        process.exit(1);
      }
    });
  };

  private createComponent = async () => {
    const {
      componentName,
      options: { addIndex, scopeStyle, path },
    } = this.contentArgs;
    const content =
      (await this.getCustomTemplateContent(
        CustomTemplate.COMPONENT,
        componentName,
      )) ??
      componentTemplate({
        addIndex,
        componentName,
        scopeStyle,
        styleType: this.styleType,
      });
    const fileName = `${componentName}.${this.template}`;
    this.writeToFile(path, fileName, content);
  };

  private createStyleFile = async () => {
    const {
      componentName,
      options: { scopeStyle, path },
    } = this.contentArgs;
    const fileName = `${componentName}${scopeStyle ? '.module' : ''}${
      this.styleType
    }`;
    const content =
      (await this.getCustomTemplateContent(
        CustomTemplate.STYLE,
        componentName,
      )) ?? '';
    this.writeToFile(path, fileName, content);
  };

  private createTestFile = async () => {
    const {
      componentName,
      options: { addIndex, path },
    } = this.contentArgs;
    const fileName = `${componentName}.test.${this.template}`;
    const content =
      (await this.getCustomTemplateContent(
        CustomTemplate.TEST,
        componentName,
      )) ?? testTemplate(this.contentArgs.componentName, addIndex);
    this.writeToFile(path, fileName, content);
  };

  private createIndexFile = () => {
    const { path: folderPath, flat } = this.contentArgs.options;
    const filePath = flat
      ? `"../${folderPath.split(path.sep).pop()}"`
      : `"./${this.contentArgs.componentName}"`;
    const content = `export * from ${filePath}`;
    const fileName = `index${this.indexType}`;
    this.writeToFile(folderPath, fileName, content);
  };

  private createStoryFile = async () => {
    const {
      componentName,
      options: { addIndex, path },
    } = this.contentArgs;
    const fileName = `${componentName}.stories.${this.template}`;
    const content =
      (await this.getCustomTemplateContent(
        CustomTemplate.STORY,
        componentName,
      )) ?? storyTemplate(componentName, addIndex);
    this.writeToFile(path, fileName, content);
  };

  public generateComponent = () => {
    this.createComponent();
    this.createStyleFile();
    this.contentArgs.options.addIndex && this.createIndexFile();
    this.contentArgs.options.addStory && this.createStoryFile();
    this.contentArgs.options.addTest && this.createTestFile();
  };
}
