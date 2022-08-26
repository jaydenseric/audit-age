// @ts-check

import { deepStrictEqual, rejects } from "node:assert";
import { fileURLToPath } from "node:url";

import auditAge from "./auditAge.mjs";

/**
 * Adds `auditAge` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add(
    "`auditAge` with argument 1 `packageDirPath` not a string.",
    async () => {
      await rejects(
        auditAge(
          // @ts-expect-error Testing invalid.
          true
        ),
        new TypeError("Argument 1 `packageDirPath` must be a string.")
      );
    }
  );

  tests.add(
    "`auditAge` with argument 1 `packageDirPath` an inaccessible directory path.",
    async () => {
      await rejects(
        auditAge(fileURLToPath(new URL("nonexistent/", import.meta.url))),
        new TypeError(
          "Argument 1 `packageDirPath` must be an accessible directory path."
        )
      );
    }
  );

  tests.add("`auditAge` with a package, broken `package.json`.", async () => {
    await rejects(
      auditAge(
        fileURLToPath(
          new URL("./test/fixtures/package-json-broken/", import.meta.url)
        )
      ),
      new Error("Failed to list installed npm packages.")
    );
  });

  tests.add(
    "`auditAge` with a package, not installed, no dependencies.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-not-installed-no-dependencies/",
              import.meta.url
            )
          )
        ),
        []
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, no dependencies.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-no-dependencies/",
              import.meta.url
            )
          )
        ),
        []
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, file dependency.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-file-dependency/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "package-not-installed-no-dependencies",
              },
            ],
          },
        ]
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, Git dependency.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-git-dependency/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "fake-tag",
                version: "2.0.0",
              },
            ],
          },
        ]
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, published dependency.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-published-dependency/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "fake-tag",
                version: "2.0.0",
              },
            ],
            datePublished: new Date("2019-12-23T11:44:44.504Z"),
          },
        ]
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, published dependency and published dev dependency.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-published-dependency-and-published-dev-dependency/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "fake-tag",
                version: "2.0.0",
              },
            ],
            datePublished: new Date("2019-12-23T11:44:44.504Z"),
          },
        ]
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, published dependency with sub dependencies.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-published-dependency-with-sub-dependencies/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "stack-utils",
                version: "2.0.3",
              },
              {
                name: "escape-string-regexp",
                version: "2.0.0",
              },
            ],
            datePublished: new Date("2019-04-17T07:49:09.559Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "stack-utils",
                version: "2.0.3",
              },
            ],
            datePublished: new Date("2020-11-13T23:10:10.505Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "kleur",
                version: "4.1.4",
              },
            ],
            datePublished: new Date("2021-01-22T20:16:29.328Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
            ],
            datePublished: new Date("2021-04-26T01:59:59.404Z"),
          },
        ]
      );
    }
  );

  tests.add(
    "`auditAge` with a package, installed, assorted dependencies.",
    async () => {
      deepStrictEqual(
        await auditAge(
          fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-assorted-dependencies/",
              import.meta.url
            )
          )
        ),
        [
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "stack-utils",
                version: "2.0.3",
              },
              {
                name: "escape-string-regexp",
                version: "2.0.0",
              },
            ],
            datePublished: new Date("2019-04-17T07:49:09.559Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "stack-utils",
                version: "2.0.3",
              },
            ],
            datePublished: new Date("2020-11-13T23:10:10.505Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
              {
                name: "kleur",
                version: "4.1.4",
              },
            ],
            datePublished: new Date("2021-01-22T20:16:29.328Z"),
          },
          {
            path: [
              {
                name: "test-director",
                version: "6.0.0",
              },
            ],
            datePublished: new Date("2021-04-26T01:59:59.404Z"),
          },
          {
            path: [
              {
                name: "fake-tag",
                version: "2.0.0",
              },
            ],
          },
          {
            path: [
              {
                name: "package-not-installed-no-dependencies",
              },
            ],
          },
        ]
      );
    }
  );
};
