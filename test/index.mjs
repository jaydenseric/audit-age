import TestDirector from 'test-director';

import test_cli_audit_age from './cli/audit-age.test.mjs';
import test_comparableAuditedPackagePath from './private/comparableAuditedPackagePath.test.mjs';
import test_getPackageVersionDate from './private/getPackageVersionDate.test.mjs';
import test_isDirectoryPath from './private/isDirectoryPath.test.mjs';
import test_reportCliError from './private/reportCliError.test.mjs';
import test_sortAudit from './private/sortAudit.test.mjs';
import test_auditAge from './public/auditAge.test.mjs';

const tests = new TestDirector();

test_comparableAuditedPackagePath(tests);
test_getPackageVersionDate(tests);
test_isDirectoryPath(tests);
test_reportCliError(tests);
test_sortAudit(tests);
test_auditAge(tests);
test_cli_audit_age(tests);

tests.run();
