import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([  {
    ignores: [
      "_site/**",
      "node_modules/**",
      "vendor/**",
      "assets/**",
      "catalog/**",
      "charts/**",
      "collections/**",
      "images/**",
      "integrations/**",
      "**/*.min.js",
    ],
  },
  {
    
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "script", // IMPORTANT for browser scripts
      globals: {
        ...globals.browser,
        ...globals.es2021,

        // jQuery
        $: "readonly",
        jQuery: "readonly",

        // Project globals
        FullCalendar: "readonly",
        url: "writable",
        page: "writable"
      }
    },
    rules: {
      /* ---- from eslint:recommended ---- */
      ...js.configs.recommended.rules,

      /* ---- your custom rules ---- */
      "valid-typeof": "warn",
      "array-bracket-spacing": ["error", "never"],
      "comma-style": ["error"],
      "block-scoped-var": "error",
      "keyword-spacing": "error",
      "no-trailing-spaces": "error",
      "object-curly-spacing": ["error", "always"],
      "arrow-spacing": ["error", { "before": true, "after": true }],
      "key-spacing": ["error", { "beforeColon": false, "afterColon": true }],
      "block-spacing": "error",
      "brace-style": ["error", "1tbs"],
      "indent": [
        "error",
        2,
        {
          "FunctionExpression": { "parameters": "first" },
          "FunctionDeclaration": { "parameters": "first" },
          "MemberExpression": 1,
          "SwitchCase": 1,
          "outerIIFEBody": 0,
          "VariableDeclarator": {
            "var": 2,
            "let": 2,
            "const": 3
          },
          "ignoredNodes": ["TemplateLiteral"]
        }
      ],
      "no-undef": "error",
      "no-console": "off",
      "no-unused-vars": "error",
      "no-dupe-keys": "error"
    }
  }
]);