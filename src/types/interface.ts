interface ContentArgs {
    componentName: string;
    folderPath: string;
    style?: boolean;
    type: boolean;
    scopeStyle: boolean;
    addIndex: boolean;
}

type GenerateConfig = {
    flat: boolean;
    addIndex: boolean;
    skipTest: boolean;
    scopeStyle: boolean;
    defaultPath: string;
};

interface ArclixConfig {
    generate: GenerateConfig;
}

export { ContentArgs, ArclixConfig, GenerateConfig };
