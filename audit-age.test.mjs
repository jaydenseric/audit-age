// @ts-check

import { strictEqual } from "node:assert";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import replaceStackTraces from "replace-stack-traces";
import assertSnapshot from "snapshot-assertion";

const AUDIT_AGE_CLI_PATH = fileURLToPath(
  new URL("./audit-age.mjs", import.meta.url)
);

/**
 * Adds `audit-age` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add(
    "`audit-age` CLI with a package, broken `package.json`.",
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        "node",
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL("./test/fixtures/package-json-broken/", import.meta.url)
          ),
          env: {
            ...process.env,
            FORCE_COLOR: "1",
          },
        }
      );

      if (error) throw error;

      await assertSnapshot(
        stdout.toString(),
        new URL(
          "./test/snapshots/audit-age/package-json-broken-stdout.ans",
          import.meta.url
        )
      );
      await assertSnapshot(
        replaceStackTraces(stderr.toString()),
        new URL(
          "./test/snapshots/audit-age/package-json-broken-stderr.ans",
          import.meta.url
        )
      );
      strictEqual(status, 1);
    }
  );

  tests.add(
    "`audit-age` CLI with a package, installed, single dependency.",
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        "node",
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-published-dependency/",
              import.meta.url
            )
          ),
          env: {
            ...process.env,
            FORCE_COLOR: "1",
          },
        }
      );

      if (error) throw error;

      await assertSnapshot(
        stdout.toString(),
        new URL(
          "./test/snapshots/audit-age/package-installed-single-dependency-stdout.ans",
          import.meta.url
        )
      );
      strictEqual(stderr.toString(), "");
      strictEqual(status, 0);
    }
  );

  tests.add(
    "`audit-age` CLI with a package, installed, assorted dependencies.",
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        "node",
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL(
              "./test/fixtures/package-installed-assorted-dependencies/",
              import.meta.url
            )
          ),
          env: {
            ...process.env,
            FORCE_COLOR: "1",
          },
        }
      );

      if (error) throw error;

      await assertSnapshot(
        stdout.toString(),
        new URL(
          "./test/snapshots/audit-age/package-installed-assorted-dependencies-stdout.ans",
          import.meta.url
        )
      );
      strictEqual(stderr.toString(), "");
      strictEqual(status, 0);
    }
  );
};
