import colors from 'colors';

import { ISummaryCommandParameters } from './types';
import { buildTable } from '../../utils';
import { TFunction } from '../../../types';
import { summarize } from './utils';

export default async (parameters: ISummaryCommandParameters = {}) => {
  const report = await summarize(parameters);

  if (parameters.format === 'json') {
    return console.log(JSON.stringify(report));
  }

  const aliases: Record<string, TFunction<string, [number]>> = {
    '%y': (value) => colors.yellow(String(value)),
    '%g': (value) => colors.green(String(value)),
    '%c': (value) => colors.cyan(String(value)),
    '%r': (value) => colors.red(String(value)),
  };

  Object.entries(report).forEach(([author, { commits, summary }]) => {
    console.log(
      colors.bold(author),
      '-',
      colors.cyan(String(summary.files)),
      colors.green(String(summary.insertions)),
      colors.red(String(summary.deletions)),
      colors.yellow(String(summary.new))
    );

    const table = buildTable(
      commits.map((commit) => ({
        date: commit.date,
        message: commit.message,

        files: `%c${commit.changes.files}`,
        insertions: `%g${commit.changes.insertions}`,
        deletions: `%r${commit.changes.deletions}`,
        new: `%y${commit.changes.new}`,
      }))
    );

    console.log(
      table
        .split('\'%')
        .map((segment: string) => {
          const char = segment[0];
          const code = `%${char}`;

          if (!aliases[code]) {
            return segment;
          }

          const [, value] = segment.match(/(\d+)'/) ?? [];
          return segment.substring(1).replace(`${value}'`, `${aliases[code](Number(value))}    `);
        })
        .join('')
    );
  });
};
