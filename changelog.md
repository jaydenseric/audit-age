# audit-age changelog

## Next

### Major

- Updated Node.js support to `^12.22.0 || ^14.17.0 || >= 16.0.0`.
- Updated dev dependencies, some of which require newer Node.js versions than previously supported.
- Removed `./package` from the package `exports` field; the full `package.json` filename must be used in a `require` path.
- Public modules are now individually listed in the package `files` and `exports` fields.
- Shortened public module deep import paths, removing the `/public/`.

### Patch

- Simplified package scripts.
- Simplified dev dependencies and config for ESLint.
- Use a new [`replace-stack-traces`](https://npm.im/replace-stack-traces) dev dependency in tests.
- Reorganized the test file structure.

## 1.0.1

### Patch

- Updated the [`duration-relativetimeformat`](https://npm.im/duration-relativetimeformat) dependency to v2, fixing [#4](https://github.com/jaydenseric/audit-age/issues/4).
- Updated dev dependencies.
- Amended the changelog entry for v1.0.0.

## 1.0.0

### Major

- Updated Node.js support to `^12.20 || >= 14.13`.
- Updated npm support to `>= 7`.
- Updated dependencies, some of which require newer Node.js versions than were previously supported.
- Published modules are now ESM in `.mjs` files instead of CJS in `.js` files.
- Added a package `exports` field.
- Stop displaying the execution time in CLI output.
- Added tests with 100% code coverage, using ESM in `.mjs` files, a new package `test:api` script, and new dev dependencies:
  - [`coverage-node`](https://npm.im/coverage-node)
  - [`snapshot-assertion`](https://npm.im/snapshot-assertion)
  - [`test-director`](https://npm.im/test-director)

### Minor

- Added a package `sideEffects` field.
- Added a package `main` field and a public JS API.
- Added a new “unknown” age category to `audit-age` command output, and correctly handle packages without a published date (e.g. it’s a local file or Git dependency).
- Handle errors and display them with nice formatting in CLI output.
- Setup [GitHub Sponsors funding](https://github.com/sponsors/jaydenseric):
  - Added `.github/funding.yml` to display a sponsor button in GitHub.
  - Added a package `funding` field to enable npm CLI funding features.

### Patch

- Use [`duration-relativetimeformat`](https://npm.im/duration-relativetimeformat) instead of [`moment`](https://npm.im/moment) to format durations.
- Use [`kleur`](https://npm.im/kleur) instead of [`chalk`](https://npm.im/chalk) to format CLI output with ANSI colors.
- Stop using [`husky`](https://npm.im/husky) and [`lint-staged`](https://npm.im/lint-staged).
- Removed the [`cli-table3`](https://npm.im/cli-table3) dependency and manually align CLI output instead.
- Use [`jsdoc-md`](https://npm.im/jsdoc-md) to generate and check the new readme section “API” via new package `jsdoc` and `test:jsdoc` scripts.
- Updated the package description.
- Updated the package `keywords` field.
- Removed the package `engines.npm` field.
- More specific package `bin` field.
- Improved the package scripts.
- Moved dev config from `package.json` to separate files, for a leaner install size.
- Only audit deduped packages once to massively speedup audits and simplify output.
- Made the `audit-age` CLI output the audit in smaller `stdout` chunks instead of all at once, fixing [#3](https://github.com/jaydenseric/audit-age/issues/3).
- Use the more efficient Node.js `child_process` function `execFile` instead of `exec` when running the npm CLI.
- Updated the `npm ls` command arguments used to get the dependency tree for the package being audited:
  - Added `--all` to fix npm v7+ no longer including nested dependencies by default.
  - Removed the redundant `--only production`.
- Configured Prettier option `semi` to the default, `true`.
- Use GitHub Actions instead of Travis for CI.
- Updated the EditorConfig.
- Removed `package-lock.json` from the `.gitignore` and `.prettierignore` files as it’s disabled in `.npmrc` anyway.
- Removed `npm-debug.log` from the `.gitignore` file as npm [v4.2.0](https://github.com/npm/npm/releases/tag/v4.2.0)+ doesn’t create it in the current working directory.
- Use [Badgen](https://badgen.net) instead of [Shields](https://shields.io) for the readme npm version badge.
- Removed the readme section “Demo”.
- Improved documentation.
- The file `changelog.md` is no longer published.
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
