import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

const spaFallbackPlugin = {
  name: 'spa-fallback',
  apply: 'serve',
  configureServer(server) {
    return () => {
      server.middlewares.use((req, res, next) => {
        const url = req.url.split('?')[0];
        
        // Skip non-GET requests, api calls, and actual files
        if (req.method !== 'GET' || url.startsWith('/api/') || /\.[a-z]+$/i.test(url)) {
          next();
          return;
        }

        // Rewrite SPA routes to index.html
        req.url = '/index.html';
        next();
      });
    };
  }
};

export default defineConfig({
  plugins: [react(), spaFallbackPlugin],
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