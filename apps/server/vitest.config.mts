import path from 'path';
import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [swc.vite()],
  oxc: false,
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
      '@test': path.resolve(import.meta.dirname, './test'),
    },
  },
  test: {
    globals: true,
    setupFiles: 'vitest.setup.ts',
    globalSetup: 'vitest.globalSetup.ts',
    include: ['src/**/*.spec.ts'],
  },
});
