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

  Object.entries(report).forEach(([author, { commits, total }]) => {
    console.log(
      colors.bold(author),
      '-',
      colors.cyan(String(total.files)),
      colors.green(String(total.insertions)),
      colors.red(String(total.deletions)),
      colors.yellow(String(total.diff))
    );

    const table = buildTable(
      commits.map((commit) => ({
        date: commit.date,
        message: commit.message,

        files: `%c${commit.activity.files}`,
        insertions: `%g${commit.activity.insertions}`,

        deletions: `%r${commit.activity.deletions}`,
        diff: `%y${commit.activity.diff}`,
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
