import { strictEqual } from 'assert';
import { spawnSync } from 'child_process';
import replaceStackTraces from 'replace-stack-traces';
import snapshot from 'snapshot-assertion';
import { fileURLToPath } from 'url';

const AUDIT_AGE_CLI_PATH = fileURLToPath(
  new URL('../../cli/audit-age.mjs', import.meta.url)
);

export default (tests) => {
  tests.add(
    '`audit-age` CLI with a package, broken `package.json`.',
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        'node',
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL('../fixtures/package-json-broken/', import.meta.url)
          ),
          env: {
            ...process.env,
            FORCE_COLOR: 1,
          },
        }
      );

      if (error) throw error;

      await snapshot(
        stdout.toString(),
        new URL(
          '../snapshots/cli/audit-age/package-json-broken-stdout.ans',
          import.meta.url
        )
      );
      await snapshot(
        replaceStackTraces(stderr.toString()),
        new URL(
          '../snapshots/cli/audit-age/package-json-broken-stderr.ans',
          import.meta.url
        )
      );
      strictEqual(status, 1);
    }
  );

  tests.add(
    '`audit-age` CLI with a package, installed, single dependency.',
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        'node',
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL(
              '../fixtures/package-installed-published-dependency/',
              import.meta.url
            )
          ),
          env: {
            ...process.env,
            FORCE_COLOR: 1,
          },
        }
      );

      if (error) throw error;

      await snapshot(
        stdout.toString(),
        new URL(
          '../snapshots/cli/audit-age/package-installed-single-dependency-stdout.ans',
          import.meta.url
        )
      );
      strictEqual(stderr.toString(), '');
      strictEqual(status, 0);
    }
  );

  tests.add(
    '`audit-age` CLI with a package, installed, assorted dependencies.',
    async () => {
      const { stdout, stderr, status, error } = spawnSync(
        'node',
        [AUDIT_AGE_CLI_PATH],
        {
          cwd: fileURLToPath(
            new URL(
              '../fixtures/package-installed-assorted-dependencies/',
              import.meta.url
            )
          ),
          env: {
            ...process.env,
            FORCE_COLOR: 1,
          },
        }
      );

      if (error) throw error;

      await snapshot(
        stdout.toString(),
        new URL(
          '../snapshots/cli/audit-age/package-installed-assorted-dependencies-stdout.ans',
          import.meta.url
        )
      );
      strictEqual(stderr.toString(), '');
      strictEqual(status, 0);
    }
  );
};
