import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  server: {
    port: 3000,
    host: "0.0.0.0",
  },

  plugins: [
    react(),

  ],

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },

  build: {
    sourcemap: false,
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        passes: 2,
      },
      mangle: {
        safari10: true,
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      treeshake: {
        moduleSideEffects: false,
        propertyReadSideEffects: false,
      },
      input: {
        main: "./index.html",
      },
      output: {
        manualChunks(id) {
          // Split React ecosystem into vendor chunk
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("node_modules/react-router")) {
            return "react-vendor";
          }
          // PostHog is large - load it separately
          if (id.includes("node_modules/posthog")) {
            return "posthog";
          }
          // Lucide icons
          if (id.includes("node_modules/lucide-react")) {
            return "icons";
          }
        },
      },
    },
    chunkSizeWarningLimit: 500,
    target: "esnext",
  },
});
