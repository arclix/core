export type Template = "jsx" | "tsx";

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

export interface ContentArgs {
    componentName: string;
    template: Template;
    folderPath: string;
    style?: boolean;
    scopeStyle: boolean;
    addIndex: boolean;
    addStory: boolean;
    flat: boolean;
}

export interface GenerateConfig {
    flat: boolean;
    addIndex: boolean;
    addStory: boolean;
    skipTest: boolean;
    scopeStyle: boolean;
    template: Template;
    defaultPath: string;
}

export interface ArclixConfig {
    generate: GenerateConfig;
}

export interface PackageType {
    dependencies: any;
    devDependencies: any;
}

export enum Command {
    CREATE = "create",
    GENERATE = "generate",
    COMPONENT = "component",
    INIT = "init",
}

export enum AliasCommand {
    GENERATE = "g",
    COMPONENT = "c",
}
