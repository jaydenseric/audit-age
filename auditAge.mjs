import execFilePromise from './execFilePromise.mjs';
import getPackageVersionDate from './getPackageVersionDate.mjs';
import isDirectoryPath from './isDirectoryPath.mjs';
import sortAudit from './sortAudit.mjs';

/**
 * Audits the age of installed production [npm](https://npmjs.com) packages.
 * @kind function
 * @name auditAge
 * @param {string} [packageDirPath] [npm](https://npmjs.com) package directory path, defaulting to `process.cwd()`.
 * @returns {Promise<Audit>} Audit.
 * @example <caption>Ways to `import`.</caption>
 * ```js
 * import { auditAge } from 'audit-age';
 * ```
 *
 * ```js
 * import auditAge from 'audit-age/auditAge.mjs';
 * ```
 */
export default async function auditAge(packageDirPath = process.cwd()) {
  if (typeof packageDirPath !== 'string')
    throw new TypeError('Argument 1 `packageDirPath` must be a string.');

  if (!(await isDirectoryPath(packageDirPath)))
    throw new TypeError(
      'Argument 1 `packageDirPath` must be an accessible directory path.'
    );

  try {
    var { stdout: dependencyTreeJson } = await execFilePromise(
      'npm',
      ['ls', '--all', '--prod', '--json'],
      { cwd: packageDirPath }
    );
  } catch (error) {
    throw new Error('Failed to list installed npm packages.');
  }

  const dependencyTree = JSON.parse(dependencyTreeJson);
  const audit = [];

  if (dependencyTree.dependencies) {
    const loading = [];

    /**
     * Recurses dependencies to prepare the audit.
     * @kind function
     * @name auditAge~recurse
     * @param {Array<object>} ancestorDependencies Dependencies nested at the current level.
     * @param {Array<InstalledPackage>} ancestorPath How the dependency is nested.
     * @ignore
     */
    const recurse = (ancestorDependencies, ancestorPath) => {
      for (const [name, { version, resolved, dependencies }] of Object.entries(
        ancestorDependencies
      )) {
        const pathNode = { name };

        if (version) pathNode.version = version;

        const path = [...ancestorPath, pathNode];

        // No `resolved` field means the dependency at this path wasn’t actually
        // installed, because it’s optional or deduped.
        if (resolved)
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
            resolved.startsWith('http')
          )
            loading.push(
              // Using `p-limit` to limit concurrency didn’t seem to improve
              // performance, and in testing with 327 installed production
              // packages no npm API rate limit was encountered.
              getPackageVersionDate(name, version, packageDirPath).then(
                (datePublished) => {
                  audit.push({ path, datePublished });
                }
              )
            );
          else audit.push({ path });

        if (dependencies) recurse(dependencies, path);
      }
    };

    recurse(dependencyTree.dependencies, []);

    await Promise.all(loading);

    sortAudit(audit);
  }

  return audit;
}
