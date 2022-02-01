/**
 * Converts an audited package’s path into a string suitable for sort
 * comparison.
 * @kind function
 * @name comparableAuditedPackagePath
 * @param {AuditedPackagePath} path Path within installed packages.
 * @returns {string} Comparable string.
 * @ignore
 */
export default function comparableAuditedPackagePath(path) {
  if (!Array.isArray(path))
    throw new TypeError('Argument 1 `path` must be an array.');

  return path
    .map(({ name, version }) => (version ? `${name}@${version}` : name))
    .join('/');
}
