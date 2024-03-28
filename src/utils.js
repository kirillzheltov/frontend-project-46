import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';

export function readFile(filePath) {
  const filepathResolved = path.resolve(cwd(), filePath);
  return fs.readFileSync(filepathResolved);
}

export function getType(entry1, entry2) {
  const areObjects = (typeof entry1 === 'object' && typeof entry2 === 'object');

  if (areObjects) {
    return 'nested';
  }

  if (entry1 === entry2) {
    return 'unchanged';
  }

  if (_.isUndefined(entry1)) {
    return 'added';
  }

  if (_.isUndefined(entry2)) {
    return 'deleted';
  }

  return 'changed';
}
