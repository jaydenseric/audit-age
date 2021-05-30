# audit-age changelog

## Next

### Patch

- Removed `npm-debug.log` from the `.gitignore` file as npm [v4.2.0](https://github.com/npm/npm/releases/tag/v4.2.0)+ doesn’t create it in the current working directory.
- Updated the EditorConfig.
- Amended the changelog entry for v0.1.1.

## 0.1.1

### Patch

- Updated dependencies.
- Use [`eslint-config-env`](https://npm.im/eslint-config-env) to simplify ESLint config.
- JSDoc annotated the source code.
- Compact package `repository` field.
- Readme badge changes to deal with [shields.io](https://shields.io) unreliability:
  - Used the more reliable build status badge provided by Travis and placed it first as it loads the quickest.
  - Removed the license badge. The license can be found in `package.json` and rarely changes.
  - Removed the GitHub issues and stars badges. The readme is most viewed on GitHub anyway.

## 0.1.0

- Initial release.
