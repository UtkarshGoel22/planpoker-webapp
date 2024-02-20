import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@components": "/src/components",
      "@constants": "/src/constants",
      "@context": "/src/context",
      "@enums": "/src/enums",
      "@helpers": "/src/helpers",
      "@hooks": "/src/hooks",
      "@layouts": "/src/layouts",
      "@pages": "/src/pages",
      "@services": "/src/services",
      "@src": "/src",
      "@state": "/src/state",
      "@utils": "/src/utils",
    },
  },
  server: {
    open: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "src/setupTests",
    mockReset: true,
  },
})
