#!/usr/bin/env node

const { exec } = require('child_process')
const { promisify } = require('util')
const Table = require('cli-table3')
const chalk = require('chalk')
const moment = require('moment')

const asyncExec = promisify(exec)
const startTime = new Date()
const thresholds = [
  {
    label: 'Day',
    count: 0,
    ms: 8.64e7,
    color: 'green'
  },
  {
    label: 'Week',
    count: 0,
    ms: 6.048e8,
    color: 'cyan'
  },
  {
    label: 'Month',
    count: 0,
    ms: 2.628e9,
    color: 'magenta'
  },
  {
    label: 'Year',
    count: 0,
    ms: 3.154e10,
    color: 'yellow'
  },
  {
    label: 'Year+',
    count: 0,
    ms: Infinity,
    color: 'red'
  }
]
const clearTableChars = {
  top: '',
  'top-mid': '',
  'top-left': '',
  'top-right': '',
  bottom: '',
  'bottom-mid': '',
  'bottom-left': '',
  'bottom-right': '',
  left: '',
  'left-mid': '',
  mid: '',
  'mid-mid': '',
  right: '',
  'right-mid': '',
  middle: ''
}

function thresholdFromDate(date) {
  const msDiff = moment(startTime).diff(date)
  return thresholds.find(({ ms }) => msDiff < ms)
}

async function auditAge() {
  const { stdout: rawTree } = await asyncExec(
    `npm ls --prod --only production --json`
  )
  const tree = JSON.parse(rawTree)
  const lookups = []
  const recurse = (dependencies, ancestorPath = []) =>
    Object.entries(dependencies).forEach(
      ([name, { version, dependencies }]) => {
        const path = [...ancestorPath, `${name}@${version}`]
        lookups.push(
          asyncExec(`npm view ${name} time --json`).then(
            ({ stdout: rawTimes }) => {
              const times = JSON.parse(rawTimes)
              const published = moment(times[version])
              const threshold = thresholdFromDate(published)
              threshold.count++
              return {
                path,
                name,
                version,
                published,
                threshold
              }
            }
          )
        )
        if (dependencies) recurse(dependencies, path)
      }
    )

  recurse(tree.dependencies)

  console.log(`\nFetching ${lookups.length} package ages...\n`)

  const list = await Promise.all(lookups)
  const sorted = list.sort((a, b) => a.published - b.published)
  const packagesTable = new Table({
    chars: {
      ...clearTableChars,
      mid: '─',
      'mid-mid': '─'
    }
  })

  sorted.forEach(({ path, published, threshold }) =>
    packagesTable.push([
      {
        vAlign: 'bottom',
        content: path.reduce((tree, item, index) => {
          if (index > 0) tree += `\n${'   '.repeat(index - 1)}└─ `
          return (index === path.length - 1 ? chalk.dim(tree) : tree) + item
        }, '')
      },
      {
        hAlign: 'right',
        vAlign: 'bottom',
        content: `${chalk[threshold.color](
          published.fromNow()
        )}\n${published.format('lll')}`
      }
    ])
  )

  console.log(`${packagesTable.toString()}\n\n`)

  const summaryTable = new Table({
    chars: clearTableChars
  })

  thresholds.reverse().forEach(({ color, label, count }) =>
    summaryTable.push([
      {
        hAlign: 'right',
        content: chalk[color](label)
      },
      {
        hAlign: 'right',
        content: count
      }
    ])
  )

  console.log(`${summaryTable.toString()}\n`)
  console.log(
    `Audited ${lookups.length} package ages in ${(new Date() - startTime) /
      1000}s.\n`
  )
}

auditAge()
