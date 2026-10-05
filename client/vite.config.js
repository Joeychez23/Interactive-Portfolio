import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  // Relative asset paths so the build works from any S3/CloudFront prefix
  base: './',
  // REACT_APP_ keeps the old CRA .env working as-is
  envPrefix: ['VITE_', 'REACT_APP_'],
  server: {
    port: 3000,
    proxy: { '/api': 'http://localhost:3001' },
  },
  // Same output folder CRA used, so server.js doesn't change
  build: { outDir: 'build' },
  test: { environment: 'jsdom' },
});
