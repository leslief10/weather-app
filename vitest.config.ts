/// <reference types="vitest/config" />
import { defineConfig, mergeConfig } from 'vite';
import viteConfig from './vite.config';

export default mergeConfig(
  viteConfig,
  defineConfig({
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
