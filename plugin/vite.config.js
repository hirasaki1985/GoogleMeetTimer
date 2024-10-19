import { resolve, join } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig((opt) => {
  return {
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173,
      },
    },
    root: resolve(__dirname, 'src'),
    publicDir: resolve(__dirname, 'public'),
    build: {
      outDir: resolve(__dirname, 'dist'),
      rollupOptions: {
        input: {
          // index: resolve(__dirname, 'src/index.ts'),
          index: join(__dirname, 'src/index.html'),
        },
        output: {
          // entryFileNames: '[name].js',
          chunkFileNames: 'assets/chunk-[hash].js',
        },
      },
    },
  };
});
