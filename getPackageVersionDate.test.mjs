// @ts-check

import { deepStrictEqual, rejects } from "assert";
import { fileURLToPath } from "url";

import getPackageVersionDate from "./getPackageVersionDate.mjs";

/**
 * Adds `getPackageVersionDate` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add(
    "`getPackageVersionDate` with argument 1 `name` not a string.",
    async () => {
      await rejects(
        getPackageVersionDate(
          // @ts-expect-error Testing invalid.
          true,
          "1.0.0"
        ),
        new TypeError("Argument 1 `name` must be a string.")
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with argument 2 `version` not a string.",
    async () => {
      await rejects(
        getPackageVersionDate(
          "audit-age",
          // @ts-expect-error Testing invalid.
          true
        ),
        new TypeError("Argument 2 `version` must be a string.")
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with argument 3 `cwd` not a string.",
    async () => {
      await rejects(
        getPackageVersionDate(
          "audit-age",
          "0.1.0",
          // @ts-expect-error Testing invalid.
          true
        ),
        new TypeError("Argument 3 `cwd` must be a string.")
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with argument 3 `cwd` an inaccessible directory path.",
    async () => {
      await rejects(
        getPackageVersionDate(
          "audit-age",
          "0.1.0",
          fileURLToPath(new URL("nonexistent/", import.meta.url))
        ),
        new TypeError("Argument 3 `cwd` must be an accessible directory path.")
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with a package name that doesn’t exist.",
    async () => {
      const name = "abc-123-lets-hope-this-never-gets-published";
      const version = "1.0.0";

      await rejects(
        getPackageVersionDate(name, version),
        new Error(`Failed to get the date ${name}@${version} was published.`)
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with a package version that doesn’t exist.",
    async () => {
      const name = "audit-age";
      const version = "10000.0.0";

      await rejects(
        getPackageVersionDate(name, version),
        new Error(`Missing npm package \`${name}\` version \`${version}\`.`)
      );
    }
  );

  tests.add(
    "`getPackageVersionDate` with a package version that exists.",
    async () => {
      const date = await getPackageVersionDate("audit-age", "0.1.0");

      deepStrictEqual(date, new Date("2018-05-31T05:50:24.603Z"));
    }
  );
};
