import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Fixed port: a second copy fails instead of taking 5174, which belongs to M3alemConnect.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
  },
});
