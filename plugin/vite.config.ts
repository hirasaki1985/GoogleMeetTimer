import { resolve, join } from 'path';
import { defineConfig, PluginOption } from 'vite';
import { chromeExtension } from 'vite-plugin-chrome-extension';

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
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  build: {
    manifest: true,
    outDir: resolve(__dirname, 'dist'),
    rollupOptions: {
      // input: join(__dirname, 'public/manifest.json'),
      input: {
        index: join(__dirname, 'src/index.tsx'),
      },
      output: {
        // entryFileNames: '[name].js',
        chunkFileNames: 'assets/chunk-[hash].js',
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
