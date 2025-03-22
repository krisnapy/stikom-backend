const { FlatCompat } = require("@eslint/eslintrc");
const js = require("@eslint/js");
const tseslint = require("typescript-eslint");

// Create compat instance
const compat = new FlatCompat();

module.exports = [
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...compat.extends(
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript"
  ),
  {
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "module",
      parser: tseslint.parser,
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // TypeScript specific
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",

      // Import organization
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],

      // Elysia specific
      "no-unused-expressions": "off",

      // Code style
      quotes: ["error", "single", { avoidEscape: true }],
      semi: ["error", "always"],
      "comma-dangle": ["error", "always-multiline"],
      "max-len": ["warn", { code: 100, ignoreUrls: true }],

      // Error prevention
      "no-console": "warn",
      "no-return-await": "error",
      "require-await": "error",
    },

    ignores: ["**/node_modules/**", "**/dist/**", "**/build/**"],
  },
];
