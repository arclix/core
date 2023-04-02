import { defineConfig } from "vitest/config";

export default defineConfig({
    test: {
        exclude: ["**/node_modules/**", "**/dist/**"],
        include: ["src/tests/*test.ts"],
        silent: true,
        coverage: {
            reporter: ["text", "json", "html"],
            reportsDirectory: "./coverage",
            provider: "c8",
            clean: true,
        },
    },
    esbuild: {
        target: "node14",
    },
});
