module.exports = [
  {
    files: ["assets/**/*.js"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      env: { browser: true }
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn"
    }
  }
];