// @ts-check

import { strictEqual, throws } from "node:assert";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import replaceStackTraces from "replace-stack-traces";
import assertSnapshot from "snapshot-assertion";

import reportCliError from "./reportCliError.mjs";

/**
 * Adds `reportCliError` tests.
 * @param {import("test-director").default} tests Test director.
 */
export default (tests) => {
  tests.add(
    "`reportCliError` with argument 1 `cliDescription` not a string.",
    () => {
      throws(() => {
        reportCliError(
          // @ts-expect-error Testing invalid.
          true,
          new Error("Message.")
        );
      }, new TypeError("Argument 1 `cliDescription` must be a string."));
    }
  );

  tests.add(
    "`reportCliError` with a `Error` instance, with stack.",
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        "node",
        [
          fileURLToPath(
            new URL(
              "./test/fixtures/reportCliError/Error-instance-with-stack.mjs",
              import.meta.url
            )
          ),
        ],
        {
          env: {
            ...process.env,
            FORCE_COLOR: "1",
          },
        }
      );

      if (error) throw error;

      strictEqual(stdout.toString(), "");

      await assertSnapshot(
        replaceStackTraces(stderr.toString()),
        new URL(
          "./test/snapshots/reportCliError/Error-instance-with-stack-stderr.ans",
          import.meta.url
        )
      );

      strictEqual(status, 0);
    }
  );

  tests.add(
    "`reportCliError` with a `Error` instance, without stack.",
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        "node",
        [
          fileURLToPath(
            new URL(
              "./test/fixtures/reportCliError/Error-instance-without-stack.mjs",
              import.meta.url
            )
          ),
        ],
        {
          env: {
            ...process.env,
            FORCE_COLOR: "1",
          },
        }
      );

      if (error) throw error;

      strictEqual(stdout.toString(), "");

      await assertSnapshot(
        replaceStackTraces(stderr.toString()),
        new URL(
          "./test/snapshots/reportCliError/Error-instance-without-stack-stderr.ans",
          import.meta.url
        )
      );

      strictEqual(status, 0);
    }
  );

  tests.add("`reportCliError` with a primitive value.", async () => {
    const { stdout, stderr, status, error } = spawnSync(
      "node",
      [
        fileURLToPath(
          new URL(
            "./test/fixtures/reportCliError/primitive-value.mjs",
            import.meta.url
          )
        ),
      ],
      {
        env: {
          ...process.env,
          FORCE_COLOR: "1",
        },
      }
    );

    if (error) throw error;

    strictEqual(stdout.toString(), "");

    await assertSnapshot(
      replaceStackTraces(stderr.toString()),
      new URL(
        "./test/snapshots/reportCliError/primitive-value-stderr.ans",
        import.meta.url
      )
    );

    strictEqual(status, 0);
  });
};
