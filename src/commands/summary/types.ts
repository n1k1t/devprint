import { TSummaryFormat } from '../../types';

export interface ISummaryCommandParameters {
  format?: TSummaryFormat;
  after?: string | number;
  until?: string | number;
}

export interface ISummary {
  new: number;
  files: number;
  insertions: number;
  deletions: number;
}

export interface ICommit {
  date: string;
  message: string;
  changes: ISummary;
}

export type TCompiledSummary = Record<string, { commits: ICommit[], summary: ISummary }>;
