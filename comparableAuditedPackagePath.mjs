// @ts-check

/**
 * Converts an audited package’s path into a string suitable for sort
 * comparison.
 * @param {import("./auditAge.mjs").InstalledPackagePath} path Path within
 *   installed packages.
 * @returns {string} Comparable string.
 */
export default function comparableAuditedPackagePath(path) {
  if (!Array.isArray(path))
    throw new TypeError("Argument 1 `path` must be an array.");

  return path
    .map(({ name, version }) => (version ? `${name}@${version}` : name))
    .join("/");
}
