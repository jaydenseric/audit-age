// @ts-check

import { strictEqual, throws } from "node:assert";

import comparableAuditedPackagePath from "./comparableAuditedPackagePath.mjs";

/**
 * Adds `comparableAuditedPackagePath` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add(
    "`comparableAuditedPackagePath` with argument 1 `path` not an array.",
    () => {
      throws(
        () =>
          comparableAuditedPackagePath(
            // @ts-expect-error Testing invalid.
            true
          ),
        new TypeError("Argument 1 `path` must be an array.")
      );
    }
  );

  tests.add("`comparableAuditedPackagePath` with a deep path.", () => {
    strictEqual(
      comparableAuditedPackagePath([
        {
          name: "a",
          version: "1.0.0",
        },
        {
          name: "b",
        },
        {
          name: "c",
          version: "2.0.0",
        },
      ]),
      "a@1.0.0/b/c@2.0.0"
    );
  });
};
