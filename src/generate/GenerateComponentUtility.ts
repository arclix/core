import fs from 'node:fs';
import path from 'node:path';
import type { ContentArgs, Template } from '../types/type.js';
import {
  componentTemplate,
  testTemplate,
  storyTemplate,
} from './templates/index.js';

/**
 * A utility class to generate component based on arguments.
 *
 * author @aaraamuthan @jitiendran
 */
export class GenerateComponentUtility {
  private readonly template: Template;
  private readonly styleType: string;
  private readonly indexType: '.ts' | '.js';

  constructor(private readonly contentArgs: ContentArgs) {
    this.styleType = `.${this.contentArgs.cssPreprocessor}`;
    [this.indexType, this.template] = this.contentArgs.usesTypeScript
      ? ['.ts', 'tsx']
      : ['.js', 'jsx'];
  }

  private writeToFile = (
    folderPath: string,
    fileName: string,
    content: string,
  ) => {
    fs.writeFile(path.join(folderPath, fileName), content, (err) => {
      if (err) {
        throw err;
      }
    });
  };

  private createComponent = () => {
    const {
      componentName,
      options: { addIndex, scopeStyle, path },
    } = this.contentArgs;
    const content = componentTemplate({
      addIndex,
      componentName,
      scopeStyle,
      styleType: this.styleType,
    });
    const fileName = `${componentName}.${this.template}`;
    this.writeToFile(path, fileName, content);
  };

  private createStyleFile = () => {
    const { scopeStyle, path } = this.contentArgs.options;
    const fileName = `${this.contentArgs.componentName}${
      scopeStyle ? '.module' : ''
    }${this.styleType}`;
    this.writeToFile(path, fileName, '');
  };

  private createTestFile = () => {
    const { addIndex, path } = this.contentArgs.options;
    const fileName = `${this.contentArgs.componentName}.test.${this.template}`;
    const content = testTemplate(this.contentArgs.componentName, addIndex);
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

  private createStoryFile = () => {
    const {
      componentName,
      options: { addIndex, path },
    } = this.contentArgs;
    const fileName = `${componentName}.stories.${this.template}`;
    const content = storyTemplate(componentName, addIndex);
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
