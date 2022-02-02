#!/usr/bin/env node
// @ts-check

import Duration from "duration-relativetimeformat";
import {
  bold,
  cyan,
  dim,
  green,
  grey,
  magenta,
  red,
  yellow,
} from "kleur/colors";

import auditAge from "./auditAge.mjs";
import reportCliError from "./reportCliError.mjs";

const duration = new Duration("en-US");

/**
 * Runs the `audit-age` CLI.
 * @returns {Promise<void>} Resolves once the operation is done.
 */
async function auditAgeCli() {
  try {
    console.info("Auditing the age of installed production npm packages…");

    const dateAudit = new Date();
    const audit = await auditAge();

    /**
     * Installed package age category for packages with an unknown age.
     * @type {InstalledPackagesAgeCategory}
     */
    const unknownCategory = {
      label: "Unknown",
      color: grey,
      count: 0,
    };

    /**
     * Installed package age categories for packages with a known age, in age
     * threshold ascending order.
     * @type {Array<
     *   { threshold: AgeCategoryThreshold } & InstalledPackagesAgeCategory
     * >}
     */
    const thresholdCategories = [
      {
        threshold: 8.64e7,
        label: "Day",
        color: green,
        count: 0,
      },
      {
        threshold: 6.048e8,
        label: "Week",
        color: cyan,
        count: 0,
      },
      {
        threshold: 2.628e9,
        label: "Month",
        color: magenta,
        count: 0,
      },
      {
        threshold: 3.154e10,
        label: "Year",
        color: yellow,
        count: 0,
      },
      {
        threshold: Infinity,
        label: "Year+",
        color: red,
        count: 0,
      },
    ];

    for (const { path, datePublished } of audit) {
      let category = unknownCategory;

      if (datePublished) {
        const msDiff = dateAudit.getTime() - datePublished.getTime();
        const thresholdCategory = thresholdCategories.find(
          ({ threshold }) => threshold > msDiff
        );
        // The largest threshold is infinity so this should always exist.
        if (thresholdCategory) category = thresholdCategory;
      }

      category.count++;

      let dependencyTree = "";

      path.forEach(({ name, version }, index) => {
        if (index)
          dependencyTree += `
${"   ".repeat(index - 1)}└─ `;

        if (index === path.length - 1) dependencyTree = dim(dependencyTree);

        dependencyTree += name;

        if (version) dependencyTree += `@${version}`;
      });

      console.info(`
${dependencyTree}
${category.color(
  `${dim(datePublished ? datePublished.toISOString() : "Unavailable")} (${
    datePublished ? duration.format(datePublished, dateAudit) : "unknown age"
  })`
)}`);
    }

    const allCategories = [...thresholdCategories.reverse(), unknownCategory];

    // This is needed to align the category count column.
    const longestCategoryLabelLength = Math.max(
      ...allCategories.map(({ label }) => label.length)
    );

    let outputSummary = "";

    for (const { label, color, count } of allCategories)
      outputSummary += `
${" ".repeat(longestCategoryLabelLength - label.length)}${color(
        label
      )} ${count}`;

    outputSummary += `

${bold(
  `Audited the age of ${audit.length} installed production npm package${
    audit.length === 1 ? "" : "s"
  }.`
)}
`;

    console.info(outputSummary);
  } catch (error) {
    reportCliError("audit-age", error);

    process.exitCode = 1;
  }
}

auditAgeCli();

/**
 * Age category threshold in milliseconds.
 * @typedef {number} AgeCategoryThreshold
 */

/**
 * Age category for installed packages.
 * @typedef {object} InstalledPackagesAgeCategory
 * @prop {string} label Age category label.
 * @prop {cyan | green | grey | magenta | red | yellow} color Text ANSI
 *   colorizer to highlight CLI output.
 * @prop {number} count Installed packages count.
 */
