//vite.config.ts

import { reactRouter } from "@react-router/dev/vite";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  envDir: './deploy',
  plugins: [
    tailwindcss(), 
    reactRouter(),
    {
      name: 'server-log-custom',
      configureServer(server) {
        server.httpServer?.once('listening', () => {
          const address = server.httpServer?.address();
          const port = typeof address === 'object' ? address?.port : address;
          console.log("\n" + "=".repeat(50));
          console.log(`🚀 App tareas FRONTEND IS LIVE`);
          console.log(`🌐 Local:   http://localhost:${port}`);
          console.log(`📡 Proxy:   /api → http://app-tareas-backend:3000`);
          console.log("=".repeat(50) + "\n");
        });
      },
    }
  ],
  server: {
    host: true, // Permite que Docker exponga el puerto
    port: 5173,
    strictPort: true,
    proxy: {
      '/api': {
        // Aquí debemos apuntar al nombre del contenedor de Docker que ejecuta el backend, no a localhost
        target: 'http://app-tareas-backend:3000',
        changeOrigin: true,
        secure: false,
      },
    },
    // Esto ayuda a que el HMR (Hot Module Replacement) funcione bien en Docker
    watch: {
      usePolling: true,
    },
  },
});