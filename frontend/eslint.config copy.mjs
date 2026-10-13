import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import importPlugin from "eslint-plugin-import";
import tailwind from "eslint-plugin-tailwindcss";
import eslintConfigPrettier from "eslint-config-prettier";
import pluginQuery from "@tanstack/eslint-plugin-query";

const MAX_FILE_LINES = 350;

export default defineConfig([
  ...nextVitals,
  ...nextTs,

  // --- TanStack Query Configuration ---
  ...pluginQuery.configs["flat/recommended"],
  
  // Combines Next's default ignores with your custom UI component ignores
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "src/components/ui/**/*"
  ]),

  // --- Tailwind CSS Configuration ---
  {
    extends: [tailwind.configs.recommended],
    settings: {
      tailwindcss: {
        cssConfigPath: "./src/app/globals.css",
      },
    },
    // Customize specific Tailwind rules here if needed
    rules: {
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-arbitrary-value": "warn",
      "tailwindcss/no-custom-classname": [
        "warn",
        { whitelist: ["custom\\-*"] },
      ],
      "tailwindcss/no-contradicting-classname": "warn",
    }
  },

  // --- Custom Rules ---
  {
    plugins: {
      import: importPlugin,
    },
    rules: {
      // Enforce a specific order for import statements.
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          "newlines-between": "always",
          pathGroups: [
            {
              pattern: "@app/**",
              group: "external",
              position: "after",
            },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          alphabetize: {
            order: "asc",
            caseInsensitive: true,
          },
        },
      ],

      // Disable the rule that enforces trailing commas
      "comma-dangle": "off",

      // Enforce a maximum number of lines per file
      "max-lines": [
        "error",
        {
          max: MAX_FILE_LINES,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
    },
  },

  // --- Overrides ---

  // Disable no-undef rule for TypeScript files
  {
    files: ["**/*.ts", "**/*.tsx"],
    rules: {
      "no-undef": "off",
    },
  },

  // Disable max-lines rule for config files, scripts, and tests
  {
    files: [
      "**/*.config.js",
      "**/*.config.ts",
      "**/*.config.mjs",
      "**/scripts/**",
      "**/tests/**",
    ],
    rules: {
      "max-lines": "off",
    },
  },

  // --- Prettier ---
  // Must be the absolute LAST item in the array to disable conflicting rules
  eslintConfigPrettier,
]);