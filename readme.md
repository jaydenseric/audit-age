# audit-age

A [Node.js](https://nodejs.org) [CLI](#cli) and equivalent JS [API](#exports) to audit the age of installed production [npm](https://npmjs.com) packages.

## Installation

> **Note**
>
> Installation isn’t required to use the [CLI](#cli) command [`audit-age`](#command-audit-age) with [`npx`](https://docs.npmjs.com/cli/v8/commands/npx).

To install [`audit-age`](https://npm.im/audit-age) with [npm](https://npmjs.com/get-npm), run:

```sh
npm install audit-age --save-dev
```

Then, use either the [CLI](#cli) command [`audit-age`](#command-audit-age) or the function [`auditAge`](./auditAge.mjs).

## Requirements

Supported runtime environments:

- [Node.js](https://nodejs.org) versions `^14.17.0 || ^16.0.0 || >= 18.0.0`.

Projects must configure [TypeScript](https://typescriptlang.org) to use types from the ECMAScript modules that have a `// @ts-check` comment:

- [`compilerOptions.allowJs`](https://typescriptlang.org/tsconfig#allowJs) should be `true`.
- [`compilerOptions.maxNodeModuleJsDepth`](https://typescriptlang.org/tsconfig#maxNodeModuleJsDepth) should be reasonably large, e.g. `10`.
- [`compilerOptions.module`](https://typescriptlang.org/tsconfig#module) should be `"node16"` or `"nodenext"`.

## CLI

### Command `audit-age`

Audits the age of installed production [npm](https://npmjs.com) packages.

It implements the function [`auditAge`](./auditAge.mjs).

#### Examples

Using [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) in a package directory with installed dependencies:

```sh
npx audit-age
```

## Exports

The [npm](https://npmjs.com) package [`audit-age`](https://npm.im/audit-age) features [optimal JavaScript module design](https://jaydenseric.com/blog/optimal-javascript-module-design). It doesn’t have a main index module, so use deep imports from the ECMAScript modules that are exported via the [`package.json`](./package.json) field [`exports`](https://nodejs.org/api/packages.html#exports):

- [`auditAge.mjs`](./auditAge.mjs)
