import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/',
  assetsInclude: ['**/*.md'],
  build: {
    chunkSizeWarningLimit: 700,
    modulePreload: { polyfill: false },
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (
            id.includes('/react/') ||
            id.includes('/react-dom/') ||
            id.includes('/react-router-dom/')
          ) {
            return 'react-vendor';
          }

          if (
            id.includes('/react-markdown/') ||
            id.includes('/remark-gfm/') ||
            id.includes('/marked/')
          ) {
            return 'markdown-vendor';
          }

          if (id.includes('/katex/')) {
            return 'katex-vendor';
          }

          if (id.includes('/cytoscape/')) {
            return 'cytoscape-vendor';
          }
        },
      },
    },
  },
});
