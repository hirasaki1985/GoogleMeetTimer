import { resolve } from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
    hmr: {
      port: 5173,
    },
  },
  root: resolve(__dirname, 'src'),
  // plugins: [chromeExtension() as unknown as PluginOption],
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        { src: resolve(__dirname, 'manifest.json'), dest: './' }, // manifest.jsonをdistにコピー
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    // manifest: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      external: ['vite-plugin-static-copy'],
      input: {
        index: resolve(__dirname, 'src/index.tsx'),
        background: resolve(__dirname, 'src/background.ts'),
        popup: resolve(__dirname, 'src/popup.html'),
      },
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  // build: {
  // manifest: true,
  // outDir: resolve(__dirname, 'dist'),
  // rollupOptions: {
  // input: {
  //   // index: resolve(__dirname, 'src/index.ts'),
  //   // index: join(__dirname, 'src/index.html'),
  //   input: resolve(__dirname, 'files/manifest.json'),
  // },
  // input: join(resolve(__dirname, 'public'), 'manifest.json'),
  // input: 'public/manifest.json',

  // },
  // },
});
