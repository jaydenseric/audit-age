import TestDirector from "test-director";

import test_cli_audit_age from "./audit-age.test.mjs";
import test_auditAge from "./auditAge.test.mjs";
import test_comparableAuditedPackagePath from "./comparableAuditedPackagePath.test.mjs";
import test_getPackageVersionDate from "./getPackageVersionDate.test.mjs";
import test_isDirectoryPath from "./isDirectoryPath.test.mjs";
import test_reportCliError from "./reportCliError.test.mjs";
import test_sortAudit from "./sortAudit.test.mjs";

const tests = new TestDirector();

test_cli_audit_age(tests);
test_auditAge(tests);
test_comparableAuditedPackagePath(tests);
test_getPackageVersionDate(tests);
test_isDirectoryPath(tests);
test_reportCliError(tests);
test_sortAudit(tests);

tests.run();
