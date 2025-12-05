import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
    plugins: [react()],
    base: './',
    root: resolve('./src'),
    build: {
        outDir: resolve('./.vite/renderer/main_window'),
        emptyOutDir: true,
        rollupOptions: {
            input: resolve('./src/index.html'),
        },
    },
    server: {
        port: 3000,
    },
    resolve: {
        alias: {
            '@': resolve('./src'),
        },
    },
});
