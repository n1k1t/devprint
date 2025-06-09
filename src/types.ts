import { ConvertTupleToUnion } from '../types';

export type TSummaryFormat = ConvertTupleToUnion<typeof LSummaryFormat>;
export const LSummaryFormat = <const>['json', 'table'];

export interface IDevprintCliOptions {
  summary: {
    after?: string;
    until?: string;
  };
}
