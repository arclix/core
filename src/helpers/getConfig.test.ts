import getConfig from "./getConfig";
import { describe, expect, it } from "vitest";
import { GenerateConfig } from "../types/interface";

const defaultConfig: GenerateConfig = {
    flat: false,
    addIndex: false,
    skipTest: false,
    scopeStyle: false,
    defaultPath: "./src/",
};

describe("Get Arclix Config", () => {
    it("should return config file contents", () => {
        const config = getConfig("./src/mocks/arclix.config.json");
        expect(config).toMatchObject(defaultConfig);
        expect(config).toBeTypeOf("object");
    });

    it("should return null if the config file doesn't exist", () => {
        const config = getConfig("./arclix.config.json");
        expect(config).toBeNull();
    });
});
