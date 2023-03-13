module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/essential",
    "eslint:recommended",
    "@vue/prettier",
    "./.eslintrc-auto-import.json",
  ],
  parserOptions: {
    parser: "babel-eslint",
  },
  rules: {
    "prettier/prettier": [
      "off",
      {
        semi: true,
        trailingComma: "es5",
        printWidth: 150,
        tabWidth: 2,
        useTabs: false,
        endOfLine: "auto",
        bracketSpacing: true,
        bracketSameLine: false,
      },
    ],
    "no-tabs": "off",
    "comma-dangle": ["error", "only-multiline"],
    "no-multiple-empty-lines": "off",
    "no-unused-vars": "off",
    "no-undef": "off",
    "vue/valid-v-model": "off",
    "vue/no-v-model-argument": "off",
  },
};
