# audit-age

[![npm version](https://badgen.net/npm/v/audit-age)](https://npm.im/audit-age) [![CI status](https://github.com/jaydenseric/audit-age/workflows/CI/badge.svg)](https://github.com/jaydenseric/audit-age/actions)

A [Node.js](https://nodejs.org) [CLI](#cli) and equivalent JS [API](#exports) to audit the age of installed production [npm](https://npmjs.com) packages.

## Setup

Installation isn’t required to use the [CLI](#cli) command [`audit-age`](#command-audit-age) with [`npx`](https://docs.npmjs.com/cli/v7/commands/npx).

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install audit-age --save-dev
```

Then, use either the [CLI](#cli) command [`audit-age`](#command-audit-age) or the JS [API](#exports) function `auditAge`.

## CLI

### Command `audit-age`

Audits the age of installed production [npm](https://npmjs.com) packages.

It implements the JS [API](#exports) function `auditAge`.

#### Examples

_Using [`npx`](https://docs.npmjs.com/cli/v7/commands/npx) in a package directory with installed dependencies:_

> ```sh
> npx audit-age
> ```

## Exports

These ECMAScript modules are published to [npm](https://npmjs.com) and exported via the [`package.json`](./package.json) `exports` field:

- [`auditAge.mjs`](./auditAge.mjs)
