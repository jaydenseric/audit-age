// @ts-check

import execFilePromise from "./execFilePromise.mjs";
import isDirectoryPath from "./isDirectoryPath.mjs";

/**
 * Gets the date an [npm](https://npmjs.com) package version was published.
 * @param {string} name [npm](https://npmjs.com) package name.
 * @param {string} version [npm](https://npmjs.com) package version.
 * @param {string} [cwd] Current working directory, defaulting to
 *   `process.cwd()`. `.npmrc` files can affect how the [npm](https://npmjs.com)
 *   CLI reads from the [npm](https://npmjs.com) registry.
 * @returns {Promise<Date>} Date published.
 */
export default async function getPackageVersionDate(
  name,
  version,
  cwd = process.cwd()
) {
  if (typeof name !== "string")
    throw new TypeError("Argument 1 `name` must be a string.");

  if (typeof version !== "string")
    throw new TypeError("Argument 2 `version` must be a string.");

  if (typeof cwd !== "string")
    throw new TypeError("Argument 3 `cwd` must be a string.");

  if (!(await isDirectoryPath(cwd)))
    throw new TypeError(
      "Argument 3 `cwd` must be an accessible directory path."
    );

  try {
    var { stdout } = await execFilePromise(
      "npm",
      ["view", name, "time", "--json"],
      { cwd }
    );
    var { [version]: date } = JSON.parse(stdout);
  } catch (error) {
    throw new Error(`Failed to get the date ${name}@${version} was published.`);
  }

  if (!date)
    throw new Error(`Missing npm package \`${name}\` version \`${version}\`.`);

  return new Date(date);
}
