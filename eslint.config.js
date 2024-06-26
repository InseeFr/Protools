import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReactConfig from "eslint-plugin-react/configs/recommended.js";
import { fixupConfigRules } from "@eslint/compat";
import eslintConfigPrettier from "eslint-config-prettier";

export default [
  {
    settings: {
      react: { version: "detect" },
    },
  },

  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } } } },
  { languageOptions: { globals: globals.browser } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  eslintConfigPrettier,
  ...fixupConfigRules(pluginReactConfig),
  {
    ignores: ["node_modules", "dist", "public", ".nuxt"],
  },
  {
    rules: {
      "no-extra-boolean-cast": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/ban-types": "off",
      "@typescript-eslint/ban-ts-comment": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": [1, { extensions: [".ts", ".tsx"] }],
      "react/no-unescaped-entities": "off",
    },
  },
];