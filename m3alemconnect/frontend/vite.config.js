import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The site talks to Supabase directly, so there is no local API to proxy.
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5174,
    // Artifecta's project link points here, so fail loudly rather than move to another port.
    strictPort: true,
  },
});
