#!/usr/bin/env node

import createFormatDuration from 'duration-relativetimeformat';
import kleur from 'kleur';
import reportCliError from '../private/reportCliError.mjs';
import auditAge from '../public/auditAge.mjs';

const formatDuration = createFormatDuration('en-US');

/**
 * Runs the `audit-age` CLI.
 * @kind function
 * @name auditAgeCli
 * @returns {Promise<void>} Resolves once the operation is done.
 * @ignore
 */
async function auditAgeCli() {
  try {
    console.info('Auditing the age of installed production npm packages…');

    const dateAudit = new Date();
    const audit = await auditAge();
    const unknownCategory = {
      label: 'Unknown',
      color: 'grey',
      count: 0,
    };
    const thresholdCategories = [
      {
        label: 'Day',
        ms: 8.64e7,
        color: 'green',
        count: 0,
      },
      {
        label: 'Week',
        ms: 6.048e8,
        color: 'cyan',
        count: 0,
      },
      {
        label: 'Month',
        ms: 2.628e9,
        color: 'magenta',
        count: 0,
      },
      {
        label: 'Year',
        ms: 3.154e10,
        color: 'yellow',
        count: 0,
      },
      {
        label: 'Year+',
        ms: Infinity,
        color: 'red',
        count: 0,
      },
    ];

    for (const { path, datePublished } of audit) {
      let category;

      if (datePublished) {
        const msDiff = dateAudit - datePublished;

        category = thresholdCategories.find(({ ms }) => msDiff < ms);
      } else category = unknownCategory;

      category.count++;

      let dependencyTree = '';

      path.forEach(({ name, version }, index) => {
        if (index)
          dependencyTree += `
${'   '.repeat(index - 1)}└─ `;

        if (index === path.length - 1)
          dependencyTree = kleur.dim(dependencyTree);

        dependencyTree += name;

        if (version) dependencyTree += `@${version}`;
      });

      console.info(`
${dependencyTree}
${kleur[category.color](
  `${kleur.dim(datePublished ? datePublished.toISOString() : 'Unavailable')} (${
    datePublished ? formatDuration(datePublished, dateAudit) : 'unknown age'
  })`
)}`);
    }

    const allCategories = [...thresholdCategories.reverse(), unknownCategory];

    // This is needed to align the category count column.
    const longestCategoryLabelLength = Math.max(
      ...allCategories.map(({ label }) => label.length)
    );

    let outputSummary = '';

    for (const { label, color, count } of allCategories)
      outputSummary += `
${' '.repeat(longestCategoryLabelLength - label.length)}${kleur[color](
        label
      )} ${count}`;

    outputSummary += `

${kleur.bold(
  `Audited the age of ${audit.length} installed production npm package${
    audit.length === 1 ? '' : 's'
  }.`
)}
`;

    console.info(outputSummary);
  } catch (error) {
    reportCliError('audit-age', error);

    process.exitCode = 1;
  }
}

auditAgeCli();
