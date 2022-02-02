// @ts-check

import fs from "fs";

/**
 * Checks if a filesystem path is a directory path.
 * @param {string} path Filesystem path to check.
 * @returns {Promise<boolean>} Resolves if it’s a directory path.
 */
export default async function isDirectoryPath(path) {
  if (typeof path !== "string")
    throw new TypeError("Argument 1 `path` must be a string.");

  try {
    const stats = await fs.promises.lstat(path);
    if (!stats.isDirectory()) throw new TypeError("Not a directory.");
  } catch (error) {
    return false;
  }

  return true;
}
