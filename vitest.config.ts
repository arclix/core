import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    exclude: ['**/node_modules/**', '**/dist/**'],
    include: ['src/tests/*test.ts'],
    silent: true,
    coverage: {
      reporter: ['text', 'json', 'html'],
      reportsDirectory: './coverage',
      provider: 'c8',
      clean: true,
      lines: 70,
      functions: 70,
      statements: 70,
      branches: 70,
    },
  },
  esbuild: {
    target: 'node14',
  },
});
