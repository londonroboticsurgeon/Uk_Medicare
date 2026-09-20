import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      include: [
        'src/config/**/*.ts',
        'src/routes/**/*.ts',
        'src/seo/**/*.ts',
        'src/entry-server.tsx',
      ],
      exclude: ['**/*.test.ts', '**/*.test.tsx'],
      thresholds: {
        branches: 80,
        functions: 80,
        lines: 80,
        statements: 80,
      },
    },
  },
});
