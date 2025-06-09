
<div align='center'>
  <h1>DevPrint</h1>
  <p>CLI util that helps to summarize code changes using git</p>

  <img src="https://raw.githubusercontent.com/n1k1t/devprint/refs/heads/master/images/preview.png?raw=true" />

  <br />
  <br />

  ![License](https://img.shields.io/badge/License-MIT-yellow.svg)
  ![npm version](https://badge.fury.io/js/@n1k1t%2Fdevprint.svg)
  ![Dynamic XML Badge](https://img.shields.io/badge/dynamic/xml?url=https%3A%2F%2Fgithub.com%2Fn1k1t%2Fdevprint%2Fblob%2Fmaster%2Fcoverage%2Fcobertura-coverage.xml%3Fraw%3Dtrue&query=round(%2Fcoverage%2F%40line-rate%20*%201000)%20div%201000&label=coverage)
</div>

## Install

```bash
npm i -g @n1k1t/devprint
```

## API

### General

```bash
$ devprint -h

Usage: cli [options] [command]

It helps to summarize code changes using git

Options:
  -h, --help         display help for command

Commands:
  summary [options]  Summarizes git commits by each developer in a code project
  help [command]     display help for command
```

### Command `summary`

```bash
$ devprint summary -h

Usage: cli summary [options]

Summarizes git commits by each developer in a code project

Options:
  --after [date]            After date
  --until [date]            Until date
  -f --format [json|table]  Output format (default: "table")
  -h, --help                display help for command
```

**Examples**

```bash
$ devprint summary --after 2025-06-01 --until 2025-06-09

n1k1t - 75 448 362 86
┌─────────┬───────────────────────┬───────────────────────────────────────┬────────┬────────────┬───────────┬────────┐
│ (index) │ date                  │ message                               │ files  │ insertions │ deletions │ new    │
├─────────┼───────────────────────┼───────────────────────────────────────┼────────┼────────────┼───────────┼────────┤
│ 0       │ '2025-06-06 10:46:35' │ 'fix: not found expectation behavior' │ 2      │ 18         │ 7         │ 11     │
│ 1       │ '2025-06-06 09:55:05' │ 'fix: types'                          │ 26     │ 220        │ 148       │ 72     │
│ 2       │ '2025-06-05 14:15:16' │ 'fix: .npmignore & .gitignore'        │ 2      │ 20         │ 21        │ -1     │
│ 3       │ '2025-06-05 14:06:30' │ 'fix: .npmignore & types'             │ 2      │ 17         │ 19        │ -2     │
│ 4       │ '2025-06-05 13:09:13' │ 'fix: .npmignore'                     │ 1      │ 2          │ 0         │ 2      │
│ 5       │ '2025-06-05 12:59:35' │ 'fix: .npmignore'                     │ 1      │ 6          │ 3         │ 3      │
│ 6       │ '2025-06-05 12:57:07' │ 'fix: project types organization'     │ 38     │ 162        │ 162       │ 0      │
│ 7       │ '2025-06-05 12:51:49' │ 'fix: gui redirect'                   │ 3      │ 3          │ 2         │ 1      │
└─────────┴───────────────────────┴───────────────────────────────────────┴────────┴────────────┴───────────┴────────┘
```

```bash
$ devprint summary --after 2025-06-01 --until 2025-06-09 -f json

{"n1k1t":{"commits":[{"changes":{"files":2,"insertions":18,"deletions":7,"new":11},"date":"2025-06-06 10:46:35","message":"fix: not found expectation behavior"},{"changes":{"files":26,"insertions":220,"deletions":148,"new":72},"date":"2025-06-06 09:55:05","message":"fix: types"},{"changes":{"files":2,"insertions":20,"deletions":21,"new":-1},"date":"2025-06-05 14:15:16","message":"fix: .npmignore & .gitignore"},{"changes":{"files":2,"insertions":17,"deletions":19,"new":-2},"date":"2025-06-05 14:06:30","message":"fix: .npmignore & types"},{"changes":{"files":1,"insertions":2,"deletions":0,"new":2},"date":"2025-06-05 13:09:13","message":"fix: .npmignore"},{"changes":{"files":1,"insertions":6,"deletions":3,"new":3},"date":"2025-06-05 12:59:35","message":"fix: .npmignore"},{"changes":{"files":38,"insertions":162,"deletions":162,"new":0},"date":"2025-06-05 12:57:07","message":"fix: project types organization"},{"changes":{"files":3,"insertions":3,"deletions":2,"new":1},"date":"2025-06-05 12:51:49","message":"fix: gui redirect"}],"summary":{"files":75,"insertions":448,"deletions":362,"new":86}}}
```

## Additional

### ENV

```bash
# Ignore lowercased commit messages that includes text segments separated by ";"
export DEVPRINT_COMMIT_MESSAGE_IGNORE = "pull request; merged to"
```
