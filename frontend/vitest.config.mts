import path from "node:path";
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths(), react()],
  test: {
    setupFiles: ["./vitest.setup.ts"],
    environment: "jsdom",
    globals: true,
    css: true,

    include: ["**/tests/**/*.test.tsx", "**/tests/**/*.test.ts"],
    exclude: [
      "**/node_modules/**",
      "**/dist/**",
      "**/build/**",
      "**/.next/**",
      "**/coverage/**",
      "**/*.d.ts",
      "**/types/**",
      "**/.types.ts",
      "**/.types.tsx",
      "**/types.ts",
      "**/types.tsx",
    ],

    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.{ts,tsx}"],
      exclude: [
        "**/node_modules/**",
        "**/dist/**",
        "**/build/**",
        "**/.next/**",
        "**/coverage/**",
        "**/tests/**",
        "**/*.d.ts",
        "**/types/**",
        "**/.types.ts",
        "**/.types.tsx",
        "**/types.ts",
        "**/types.tsx",
      ],
    },
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
