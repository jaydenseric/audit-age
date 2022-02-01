import { strictEqual, throws } from 'assert';

import comparableAuditedPackagePath from '../../private/comparableAuditedPackagePath.mjs';

export default (tests) => {
  tests.add(
    '`comparableAuditedPackagePath` with argument 1 `path` not an array.',
    () => {
      throws(
        () => comparableAuditedPackagePath(true),
        new TypeError('Argument 1 `path` must be an array.')
      );
    }
  );

  tests.add('`comparableAuditedPackagePath` with a deep path.', () => {
    strictEqual(
      comparableAuditedPackagePath([
        {
          name: 'a',
          version: '1.0.0',
        },
        {
          name: 'b',
        },
        {
          name: 'c',
          version: '2.0.0',
        },
      ]),
      'a@1.0.0/b/c@2.0.0'
    );
  });
};
