// eslint.config.js
import tseslint from "typescript-eslint";
import pluginVue from "eslint-plugin-vue";
import globals from "globals";
import js from "@eslint/js"; // Import ESLint's recommended rules
import eslintConfigPrettier from "eslint-config-prettier"; // Import prettier config

export default tseslint.config(
  // Global ignores
  {
    ignores: [
      "**/dist/*",
      "**/.vitepress/cache/*",
      "**/.vitepress/dist/*",
      "node_modules",
      "src/frontend/components/ui/**", // Ignore shadcn/ui components
      "**/*.story.vue", // Ignore Histoire story files
    ],
  },

  // Apply ESLint recommended rules globally
  js.configs.recommended,

  // Apply TypeScript recommended rules globally (using tseslint.configs.recommended)
  // This includes the parser, plugin, and base rules.
  ...tseslint.configs.recommended,

  // Apply Vue recommended rules to .vue files
  ...pluginVue.configs["flat/recommended"],

  // Explicitly define parser for <script> sections in .vue files
  {
    files: ["**/*.vue"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
      },
    },
  },

  // Configuration applied to most files (JS, TS, Vue)
  {
    files: ["**/*.{js,mjs,cjs,ts,vue}"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      // Parser is set by tseslint/pluginVue configs, but specify globals
      globals: {
        ...globals.browser,
        ...globals.node,
        // Add known auto-imported globals manually
        ref: "readonly",
        computed: "readonly", // Add other common Vue ones if needed
        reactive: "readonly",
        watch: "readonly",
        watchEffect: "readonly",
        onMounted: "readonly",
        onUnmounted: "readonly",
        useHead: "readonly", // From @unhead/vue via auto-import
        // Vue compiler macros (they are defined in Vue's recommended config too, but explicit is fine)
        defineProps: "readonly",
        defineEmits: "readonly",
        defineExpose: "readonly",
        withDefaults: "readonly",
      },
      // Specify parser options for Vue files (within Vue config is cleaner, but here is possible too)
      // parserOptions: { // This might be redundant if pluginVue.configs['flat/recommended'] handles it
      //   project: true,
      //   tsconfigRootDir: __dirname,
      //   extraFileExtensions: ['.vue'],
      // }
    },
    rules: {
      // Your specific rule overrides/additions
      "no-unused-vars": "off", // Use TS version
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_" },
      ],
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        { "ts-expect-error": "allow-with-description" },
      ], // Allow ts-expect-error with description
      "@typescript-eslint/no-require-imports": "warn", // Warn about require

      // Vue specific rule adjustments (optional)
      "vue/multi-word-component-names": "off",
      "vue/max-attributes-per-line": ["warn", { singleline: 3, multiline: 1 }],
      "vue/html-self-closing": [
        "warn",
        {
          html: {
            void: "always",
            normal: "never",
            component: "always",
          },
          svg: "always",
          math: "always",
        },
      ],
      "vue/require-default-prop": "off", // Disable this rule
    },
  },

  // Specific overrides for JS config files (e.g., tailwind.config.js)
  {
    files: ["*.js", "*.cjs"], // Adjust glob pattern as needed
    rules: {
      "@typescript-eslint/no-require-imports": "off", // Allow require in JS config files
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Add Prettier config last to override conflicting rules
  eslintConfigPrettier,
);
