export type Template = 'jsx' | 'tsx';

/**
 * Get's boolean properties from an existing type.
 *
 * @example
 * interface Content {
 *  name: string
 *  isVisible: boolean
 *  isReadonly: boolean
 * }
 * type BooleanContent = BooleanProps<Content> // {isVisible: boolean, isReadonly: boolean}
 */
export type BooleanProps<T> = {
  [K in keyof T as T[K] extends boolean ? K : never]: boolean;
};

export interface CLIOptions {
  addIndex: boolean;
  addStory: boolean;
  addTest: boolean;
  scopeStyle: boolean;
  flat: boolean;
  path: string;
  type: string;
}

export interface ComponentConfig extends Omit<CLIOptions, 'type'> {
  cssPreprocessor: string;
  usesTypeScript: boolean;
}

export interface ContentArgs {
  componentName: string;
  cssPreprocessor: string;
  usesTypeScript: boolean;
  options: CLIOptions;
}

export interface ArclixConfig {
  readonly component: {
    [type: string]: ComponentConfig;
  };
}

export interface PackageType {
  dependencies: any;
  devDependencies: any;
}

export enum Command {
  CREATE = 'create',
  GENERATE = 'generate',
  COMPONENT = 'component',
  INIT = 'init',
}

export enum AliasCommand {
  GENERATE = 'g',
  COMPONENT = 'c',
}
