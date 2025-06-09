#!/usr/bin/env node

import { Command, program } from 'commander';

import { IDevprintCliOptions, LSummaryFormat, TSummaryFormat } from './types';
import { cast } from './utils';

import * as commands from './commands';

program
  .description('It helps to summarize code changes using git')
  .addCommand(
    new Command()
      .command('summary')
      .description('Summarizes git commits by each developer in a code project')
      .option(`--after [date]`, 'After date')
      .option(`--until [date]`, 'Until date')
      .option(`-f --format [${LSummaryFormat.join('|')}]`, 'Output format', cast<TSummaryFormat>('table'))
      .action((options: IDevprintCliOptions['summary']) => commands.summary(options))
  )
  .parse();
