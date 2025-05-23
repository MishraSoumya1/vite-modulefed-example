import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// import federation from '@originjs/vite-plugin-federation'

export default defineConfig({
  plugins: [
    react(),
    // federation({
    //   name: 'host-app',
    //   remotes: {
    //     // Remote entries will be loaded dynamically
    //   },
    //   shared: ['react', 'react-dom'],
    // }),
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false,
  },
});
