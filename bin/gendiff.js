#!/usr/bin/env node
import { program } from 'commander';
import parseFiles from '../src/index.js';

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('0.8.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format')
  .action((filepath1, filepath2) => parseFiles(filepath1, filepath2));

program.parse();
