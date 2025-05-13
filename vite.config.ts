import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    host: "0.0.0.0",
    port: 6969,
    proxy: {
      "/get": {
        target: "https://chatapi.dmanikanta.site",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
