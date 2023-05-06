import type { ContentArgs } from "../../types/type.js";

type StoryArgs = Pick<ContentArgs, "componentName" | "addIndex">;

export default function storyTemplate(args: StoryArgs) {
    const { componentName, addIndex } = args;
    return `import React from 'react';
import ${
        addIndex ? `{ ${componentName} }` : componentName
    } from './${componentName}';

// type content here...`;
}
