import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import { type Config, tanstackRouter } from '@tanstack/router-plugin/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import path from 'path';
import { defineConfig } from 'vitest/config';

const routerConfig: Partial<Config> = {
  target: 'react',
  autoCodeSplitting: true,
};

export default defineConfig({
  plugins: [tanstackRouter(routerConfig), react(), babel({ presets: [reactCompilerPreset()] }), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, 'src'),
    },
  },
  server: {
    host: '0.0.0.0',
  },
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
});
