import { TSummaryFormat } from '../../types';

export interface ISummaryCommandParameters {
  format?: TSummaryFormat;
  after?: string | number;
  until?: string | number;
}

export interface IActivity {
  diff: number;
  files: number;
  deletions: number;
  insertions: number;
}

export interface ICommit {
  date: string;
  message: string;
  activity: IActivity;
}

export type TCompiledSummary = Record<string, { commits: ICommit[], total: IActivity }>;
