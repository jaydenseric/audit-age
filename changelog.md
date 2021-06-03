# audit-age changelog

## Next

### Major

- Updated Node.js support to `^12.20 || >= 14.13`.
- Updated dependencies, some of which require newer Node.js versions than were previously supported.
- Published modules are now ESM in `.mjs` files instead of CJS in `.js` files.

### Minor

- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a package `funding` field to enable npm CLI funding features.

### Patch

- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Removed `package-lock.json` from the `.gitignore` and `.prettierignore` files as it’s disabled in `.npmrc` anyway.
- Removed `npm-debug.log` from the `.gitignore` file as npm [v4.2.0](https://github.com/npm/npm/releases/tag/v4.2.0)+ doesn’t create it in the current working directory.
- Updated the package `keywords` field.
- Removed the package `engines.npm` field.
- More specific package `bin` field.
- Improved the package scripts.
- Moved dev config from `package.json` to separate files, for a leaner install size.
- Configured Prettier option `semi` to the default, `true`.
- Use GitHub Actions instead of Travis for CI.
- Updated the EditorConfig.
- Use [Badgen](https://badgen.net) instead of [Shields](https://shields.io) for the readme npm version badge.
- Removed the readme section “Demo”.
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
