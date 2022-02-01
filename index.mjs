export { default as auditAge } from "./auditAge.mjs";

/**
 * An audit of installed [npm](https://npmjs.com) package production
 * dependencies.
 * @kind typedef
 * @name Audit
 * @type {Array<AuditedPackage>}
 */

/**
 * An audited [npm](https://npmjs.com) package and the date it was published.
 * @kind typedef
 * @name AuditedPackage
 * @type {object}
 * @prop {AuditedPackagePath} path Path within installed packages.
 * @prop {Date} [datePublished] Date published or undefined if not published (e.g. it’s a local file or Git dependency).
 */

/**
 * An audited [npm](https://npmjs.com) package name and version.
 * @kind typedef
 * @name AuditedPackageId
 * @type {object}
 * @prop {string} name Name.
 * @prop {string} [version] Version or undefined if not published (e.g. it’s a local file or Git dependency).
 */

/**
 * An audited [npm](https://npmjs.com) package path within installed packages,
 * ordered ancestor first.
 * @kind typedef
 * @name AuditedPackagePath
 * @type {Array<AuditedPackageId>}
 */
