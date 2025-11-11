import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
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