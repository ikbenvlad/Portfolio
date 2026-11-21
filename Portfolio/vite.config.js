import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { copyFileSync } from 'node:fs';

const spa404 = { name: 'spa-404', apply: 'build', closeBundle() { copyFileSync('dist/index.html', 'dist/404.html'); } };

export default defineConfig({
  plugins: [react(), spa404],
  base: '/Portfolio/',
  root: '.',
  publicDir: 'public',
  server: {
    port: 5174,
    open: true
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': './sources'
    }
  }
});