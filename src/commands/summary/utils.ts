import simpleGit from 'simple-git';
import dayjs from 'dayjs';
import _ from 'lodash';

import { IActivity, ISummaryCommandParameters, TCompiledSummary } from './types';
import env from '../../env';

const git = simpleGit({ baseDir: process.cwd(), binary: 'git', maxConcurrentProcesses: 16 });
const regex = { version: /^\d+.\d+.\d+$/ };

export const filter = (message: string): boolean => {
  const lowercased = message.toLowerCase();

  return !(lowercased.includes('merge branch') && lowercased.includes('into'))
    && !(env.ignore.length && env.ignore.some((segment) => lowercased.includes(segment)))
    && !regex.version.test(lowercased)
    && !(lowercased.includes('merge') && message.includes('master'));
};

export const diff = async (hash: string): Promise<IActivity> => {
  const raw = await git.raw('diff-tree', '--no-commit-id', '--shortstat', '-r', hash);

  if (!raw.trim().length) {
    return { files: 0, insertions: 0, deletions: 0, diff: 0 };
  }

  const [files, insertions, deletions = 0] = raw.split(',').map(v => Number(v.trim().match(/\d+/)?.[0] ?? 0));
  return { files, insertions, deletions, diff: insertions - deletions };
}

export const summarize = async (
  parameters: Pick<ISummaryCommandParameters, 'after' | 'until'>
): Promise<TCompiledSummary> => {
  const after = +dayjs(parameters.after ?? dayjs().subtract(1, 'day'));
  const until = +dayjs(parameters.until);

  const output = await git.log();
  const commits = await Promise.all(
    output.all
      .filter((commit) => _.inRange(+dayjs(commit.date), until, after) && filter(commit.message))
      .map(async (commit) => Object.assign(commit, { changes: await diff(commit.hash) }))
  );

  return commits.reduce<TCompiledSummary>(
    (acc, { date, message, author_name, changes }) => {
      if (acc[author_name] === undefined) {
        acc[author_name] = { commits: [], total: { files: 0, insertions: 0, deletions: 0, diff: 0 } };
      }

      acc[author_name].commits.push({
        activity: changes,

        date: dayjs(date).format('YYYY-MM-DD HH:mm:ss'),
        message: message.length > 80 ? message.substring(0, 80).padEnd(83, '...') : message,
      });

      acc[author_name].total.files += changes.files;
      acc[author_name].total.insertions += changes.insertions;
      acc[author_name].total.deletions += changes.deletions;
      acc[author_name].total.diff += changes.diff;

      return acc;
    },
    {}
  );
}
