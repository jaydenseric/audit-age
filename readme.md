# audit-age

[![npm version](https://badgen.net/npm/v/audit-age)](https://npm.im/audit-age) [![CI status](https://github.com/jaydenseric/audit-age/workflows/CI/badge.svg)](https://github.com/jaydenseric/audit-age/actions)

A [Node.js](https://nodejs.org) [CLI](#cli) and equivalent JS [API](#api) to audit the age of installed production [npm](https://npmjs.com) packages.

## Setup

Installation isn’t required to use the [CLI](#cli) command [`audit-age`](#command-audit-age) with [`npx`](https://docs.npmjs.com/cli/v7/commands/npx).

To install with [npm](https://npmjs.com/get-npm), run:

```sh
npm install audit-age --save-dev
```

Then, use either the [CLI](#cli) command [`audit-age`](#command-audit-age) or the JS [API](#api) function [`auditAge`](#function-auditage).

## CLI

### Command `audit-age`

Audits the age of installed production [npm](https://npmjs.com) packages.

It implements the function [`auditAge`](#function-auditage).

#### Examples

_Using [`npx`](https://docs.npmjs.com/cli/v7/commands/npx) in a package directory with installed dependencies:_

> ```sh
> npx audit-age
> ```

## API

- [function auditAge](#function-auditage)
- [type Audit](#type-audit)
- [type AuditedPackage](#type-auditedpackage)
- [type AuditedPackageId](#type-auditedpackageid)
- [type AuditedPackagePath](#type-auditedpackagepath)

### function auditAge

Audits the age of installed production [npm](https://npmjs.com) packages.

| Parameter | Type | Description |
| :-- | :-- | :-- |
| `packageDirPath` | string? | [npm](https://npmjs.com) package directory path, defaulting to `process.cwd()`. |

**Returns:** Promise<[Audit](#type-audit)> — Audit.

#### Examples

_Ways to `import`._

> ```js
> import { auditAge } from 'audit-age';
> ```
>
> ```js
> import auditAge from 'audit-age/auditAge.mjs';
> ```

---

### type Audit

An audit of installed [npm](https://npmjs.com) package production dependencies.

**Type:** Array<[AuditedPackage](#type-auditedpackage)>

---

### type AuditedPackage

An audited [npm](https://npmjs.com) package and the date it was published.

**Type:** object

| Property | Type | Description |
| :-- | :-- | :-- |
| `path` | [AuditedPackagePath](#type-auditedpackagepath) | Path within installed packages. |
| `datePublished` | Date? | Date published or undefined if not published (e.g. it’s a local file or Git dependency). |

---

### type AuditedPackageId

An audited [npm](https://npmjs.com) package name and version.

**Type:** object

| Property | Type | Description |
| :-- | :-- | :-- |
| `name` | string | Name. |
| `version` | string? | Version or undefined if not published (e.g. it’s a local file or Git dependency). |

---

### type AuditedPackagePath

An audited [npm](https://npmjs.com) package path within installed packages, ordered ancestor first.

**Type:** Array<[AuditedPackageId](#type-auditedpackageid)>
