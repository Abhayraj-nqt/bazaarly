export default {
  extends: ["@commitlint/config-conventional"],

  rules: {
    // 0 = disable, 1 = warning, 2 = error
    // "always" = enforce, "never" = forbid

    // Enforce standard commit types
    "type-enum": [
      2,
      "always",
      [
        "feat", // A new feature
        "fix", // A bug fix
        "docs", // Documentation only changes
        "style", // Formatting, missing semicolons, etc (no code logic change)
        "refactor", // Code change that neither fixes a bug nor adds a feature
        "perf", // Code change that improves performance
        "test", // Adding missing tests or correcting existing ones
        "build", // Changes affecting the build system or dependencies (npm, typescript)
        "ci", // Changes to CI/CD config files and scripts (GitHub Actions, etc)
        "chore", // Minor maintenance, chores, or tooling changes
        "revert", // Reverts a previous commit
        "wip",    // Work in progress
      ],
    ],

    // Forbids Start-Case, PascalCase, and UPPER-CASE 
    // (but allows lower-case, camelCase, kebab-case, etc.)
    "subject-case": [
      2, 
      "never", 
      ["start-case", "pascal-case", "upper-case"]
    ],

    // Enforce Git standard subject length of 72 characters max
    "subject-max-length": [2, "always", 72],

    // Wrap body lines at 100 characters max for readability
    "body-max-line-length": [2, "always", 100],

    // Ensure the subject doesn't end with a period
    "subject-full-stop": [2, "never", "."],

    // Max length of the header line (type + scope + subject)
    "header-max-length": [2, "always", 100],
  },
};
