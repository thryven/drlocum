import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: 'jsdom',
    // setup file lives at the repo root `test/setup.ts`
    setupFiles: ['./test/setup.ts'],
    globals: true,
    css: false // You can switch this to true if you need CSS parsing
    ,
    // Only run tests under `src/` and limit to typical test file suffixes
    include: ['src/**/*.{test,spec}.{ts,tsx}'],
    // Exclude CI/tooling or queued-work dirs like `.trunk` which can contain unrelated tests
    exclude: ['**/.trunk/**', 'node_modules', 'dist', 'coverage'],
    coverage: {
      provider: 'v8', // or 'istanbul'
      enabled: true,
      include: ['src/**/*.{ts,tsx}']
    },
    projects: [{
      extends: true,
      plugins: [],
      test: {}
    }]
  }
});
