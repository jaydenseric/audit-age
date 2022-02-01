import { deepStrictEqual, strictEqual, throws } from 'assert';

import sortAudit from './sortAudit.mjs';

export default (tests) => {
  tests.add('`sortAudit` with argument 1 `path` not an array.', () => {
    throws(
      () => sortAudit(true),
      new TypeError('Argument 1 `audit` must be an array.')
    );
  });

  tests.add(
    '`sortAudit` with audited packages with the same dates published.',
    () => {
      const datePublished = new Date();
      const auditedPackage1 = {
        path: [
          {
            name: 'a',
            version: '1.0.0',
          },
        ],
        datePublished,
      };
      const auditedPackage2 = {
        path: [
          {
            name: 'b',
            version: '2.0.0',
          },
        ],
        datePublished,
      };
      const auditedPackage3 = {
        path: [
          {
            name: 'c',
            version: '3.0.0',
          },
        ],
        datePublished,
      };
      const audit = [auditedPackage2, auditedPackage1, auditedPackage3];
      const auditSorted = sortAudit(audit);

      strictEqual(audit, auditSorted);
      deepStrictEqual(auditSorted, [
        auditedPackage1,
        auditedPackage2,
        auditedPackage3,
      ]);
    }
  );

  tests.add(
    '`sortAudit` with audited packages without dates published.',
    () => {
      const auditedPackage1 = {
        path: [
          {
            name: 'a',
          },
        ],
      };
      const auditedPackage2 = {
        path: [
          {
            name: 'b',
          },
        ],
      };
      const auditedPackage3 = {
        path: [
          {
            name: 'c',
          },
        ],
      };
      const audit = [auditedPackage2, auditedPackage1, auditedPackage3];
      const auditSorted = sortAudit(audit);

      strictEqual(audit, auditSorted);
      deepStrictEqual(auditSorted, [
        auditedPackage1,
        auditedPackage2,
        auditedPackage3,
      ]);
    }
  );

  tests.add(
    '`sortAudit` with audited packages with different dates published.',
    () => {
      const auditedPackage1 = {
        path: [
          {
            name: 'b',
            version: '1.0.0',
          },
        ],
        datePublished: new Date('2021-01-01'),
      };
      const auditedPackage2 = {
        path: [
          {
            name: 'a',
            version: '2.0.0',
          },
        ],
        datePublished: new Date('2021-01-02'),
      };
      const auditedPackage3 = {
        path: [
          {
            name: 'c',
            version: '3.0.0',
          },
        ],
        datePublished: new Date('2021-01-03'),
      };
      const audit = [auditedPackage2, auditedPackage1, auditedPackage3];
      const auditSorted = sortAudit(audit);

      strictEqual(audit, auditSorted);
      deepStrictEqual(auditSorted, [
        auditedPackage1,
        auditedPackage2,
        auditedPackage3,
      ]);
    }
  );

  tests.add(
    '`sortAudit` with audited packages with some dates published.',
    () => {
      const auditedPackage1 = {
        path: [
          {
            name: 'b',
            version: '1.0.0',
          },
        ],
        datePublished: new Date('2021-01-01'),
      };
      const auditedPackage2 = {
        path: [
          {
            name: 'a',
            version: '2.0.0',
          },
        ],
        datePublished: new Date('2021-01-02'),
      };
      const auditedPackage3 = {
        path: [
          {
            name: 'c',
            version: '3.0.0',
          },
        ],
        datePublished: new Date('2021-01-03'),
      };
      const auditedPackage4 = {
        path: [
          {
            name: 'd',
          },
        ],
      };
      const auditedPackage5 = {
        path: [
          {
            name: 'e',
          },
        ],
      };
      const audit = [
        auditedPackage5,
        auditedPackage2,
        auditedPackage4,
        auditedPackage1,
        auditedPackage3,
      ];
      const auditSorted = sortAudit(audit);

      strictEqual(audit, auditSorted);
      deepStrictEqual(auditSorted, [
        auditedPackage1,
        auditedPackage2,
        auditedPackage3,
        auditedPackage4,
        auditedPackage5,
      ]);
    }
  );
};
