// @ts-check

import execFilePromise from "./execFilePromise.mjs";
import getPackageVersionDate from "./getPackageVersionDate.mjs";
import isDirectoryPath from "./isDirectoryPath.mjs";
import sortAudit from "./sortAudit.mjs";

/**
 * Audits the age of installed production [npm](https://npmjs.com) packages.
 * @param {string} [packageDirPath] [npm](https://npmjs.com) package directory
 *   path, defaulting to `process.cwd()`.
 * @returns {Promise<Array<AuditedPackage>>} Resolves installed package age
 *   audits.
 */
export default async function auditAge(packageDirPath = process.cwd()) {
  if (typeof packageDirPath !== "string")
    throw new TypeError("Argument 1 `packageDirPath` must be a string.");

  if (!(await isDirectoryPath(packageDirPath)))
    throw new TypeError(
      "Argument 1 `packageDirPath` must be an accessible directory path."
    );

  try {
    var { stdout: dependencyTreeJson } = await execFilePromise(
      "npm",
      ["ls", "--all", "--prod", "--json"],
      { cwd: packageDirPath }
    );
  } catch (error) {
    throw new Error("Failed to list installed npm packages.");
  }

  /** @type {InstalledPackage} */
  const installedPackage = JSON.parse(dependencyTreeJson);

  /** @type {Array<AuditedPackage>} */
  const auditedPackages = [];

  if (installedPackage.dependencies) {
    /** @type {Array<Promise<void>>} */
    const loading = [];

    /**
     * Recurses installed package dependencies to generate the audit.
     * @param {InstalledPackageDependencies} dependencies Installed package
     *   dependencies.
     * @param {InstalledPackagePath} path Path within installed packages.
     */
    const recurseInstalledPackageDependencies = (dependencies, path) => {
      for (const [dependencyName, dependencyMeta] of Object.entries(
        dependencies
      )) {
        /** @type {PackageId} */
        const packageId = { name: dependencyName };

        if (dependencyMeta.version) packageId.version = dependencyMeta.version;

        const dependencyPath = [...path, packageId];

        // No `resolved` field means the dependency at this path wasn’t actually
        // installed, because it’s optional or deduped.
        if (dependencyMeta.resolved)
          if (
            // Only get the package version date if the package was installed
            // from an npm registry, and isn’t a local package path (starts with
            // `file:`) or a Git repo (e.g. starts with `git+ssh://`). Note that
            // the global npm config `registry` URL can be overridden via a
            // project `.npmrc` file, and the command `npm config get registry`
            // only reads from the global npm config. Also, npm registries can
            // be configured per package namespaces. Due to all this complexity,
            // assume that the package installed from an npm registry if
            // `resolved` is a URL starting with `http`.
            dependencyMeta.resolved.startsWith("http")
          )
            loading.push(
              // Using `p-limit` to limit concurrency didn’t seem to improve
              // performance, and in testing with 327 installed production
              // packages no npm API rate limit was encountered.
              getPackageVersionDate(
                dependencyName,

                /**
                 * A published npm package definitely has a version.
                 * @type {string}
                 */ (dependencyMeta.version),
                packageDirPath
              ).then((datePublished) => {
                auditedPackages.push({
                  path: dependencyPath,
                  datePublished,
                });
              })
            );
          else auditedPackages.push({ path: dependencyPath });

        if (dependencyMeta.dependencies)
          recurseInstalledPackageDependencies(
            dependencyMeta.dependencies,
            dependencyPath
          );
      }
    };

    recurseInstalledPackageDependencies(installedPackage.dependencies, []);

    await Promise.all(loading);

    sortAudit(auditedPackages);
  }

  return auditedPackages;
}

/**
 * Audited [npm](https://npmjs.com) package and the date it was published.
 * @typedef {object} AuditedPackage
 * @prop {InstalledPackagePath} path Path within installed packages.
 * @prop {Date} [datePublished] Date published or undefined if not published
 *   (e.g. it’s a local file or Git dependency).
 */

/**
 * Installed [npm](https://npmjs.com) package path within installed packages,
 * ordered ancestor first.
 * @typedef {Array<PackageId>} InstalledPackagePath
 */

/**
 * Audited [npm](https://npmjs.com) package name and version.
 * @typedef {object} PackageId
 * @prop {string} name Name.
 * @prop {string} [version] Version or undefined if not published (e.g. it’s a
 *   local file or Git dependency).
 */

/**
 * Installed [npm](https://npmjs.com) package.
 * @typedef {object} InstalledPackage
 * @prop {string} [version] Version or undefined if not published (e.g. it’s a
 *   local file or Git dependency).
 * @prop {string} [resolved] Where it was installed from, if it’s really
 *   installed and not deduped or optional and missing.
 * @prop {InstalledPackageDependencies} [dependencies] Dependencies.
 */

/**
 * Installed [npm](https://npmjs.com) package dependencies keyed by name.
 * @typedef {{
 *   [packageName: string]: InstalledPackage
 * }} InstalledPackageDependencies
 */
