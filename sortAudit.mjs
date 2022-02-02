// @ts-check

import comparableAuditedPackagePath from "./comparableAuditedPackagePath.mjs";

/**
 * Sorts an audit by date published in ascending order (with items without date
 * published at the end), and then for items with the same date published (or
 * lack thereof), by path in alphabetical ascending order. This ensures a user
 * investigating a recent change in behavior in their project sees the most
 * relevant results at the start of upwards scrolling terminal output.
 * @param {Array<import("./auditAge.mjs").AuditedPackage>} audit Installed
 *   package age audits.
 * @returns {Array<import("./auditAge.mjs").AuditedPackage>} Installed package
 *   age audits mutated to be sorted.
 */
export default function sortAudit(audit) {
  if (!Array.isArray(audit))
    throw new TypeError("Argument 1 `audit` must be an array.");

  return audit.sort((a, b) =>
    a.datePublished === b.datePublished
      ? // Sort items with identical (existing or undefined) date published by
        // path in alphabetical ascending order.
        comparableAuditedPackagePath(a.path).localeCompare(
          comparableAuditedPackagePath(b.path),
          "en-US"
        )
      : !a.datePublished
      ? // Move left item without date published to the right.
        1
      : !b.datePublished
      ? // Move left item before the right item without date published.
        -1
      : // Sort items by date published in ascending order.
        a.datePublished.getTime() - b.datePublished.getTime()
  );
}
