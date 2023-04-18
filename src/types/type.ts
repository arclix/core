export interface ContentArgs {
    componentName: string;
    folderPath: string;
    style?: boolean;
    type: boolean;
    scopeStyle: boolean;
    addIndex: boolean;
    flat: boolean;
}

export interface GenerateConfig {
    flat: boolean;
    addIndex: boolean;
    skipTest: boolean;
    scopeStyle: boolean;
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
