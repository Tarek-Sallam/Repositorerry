import { defineConfig } from 'vite';

export default defineConfig(({ command }) => {
  if (command === 'serve') {
    // Development specific options
    return {
      server: {
        port: 3000,
        open: true,
      },
    };
  } else {
    // Build specific options
    return {

      base: '/Repositorerry/', 
      esbuild: {
        target: 'esnext',  // Set the ECMAScript target to ESNext for top-level await support
      },
    };
  }
});