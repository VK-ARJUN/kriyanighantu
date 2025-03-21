import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    watch: {
      usePolling: true,
    },
    proxy: {
      "/api": {
        target: "http://192.168.136.68:3001",
        secure: false,
        changeOrigin: true,
      },
    },
    host: true,
    strictPort: true,
    port: 5001,
  },
});
