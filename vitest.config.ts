/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';
import vue from '@vitejs/plugin-vue';
import path from 'path';

export default mergeConfig(
  viteConfig,
  defineConfig({
    plugins: [vue()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    test: {
      globals: true,
      environment: 'jsdom',
      include: ['**/*.test.ts', '**/*.spec.ts'],
      coverage: {
        exclude: ['src/main.ts', '**/*.config.js', '**/*.config.ts'],
        provider: 'v8',
        reporter: ['text', 'json', 'html'],
      },
    },
  }),
);