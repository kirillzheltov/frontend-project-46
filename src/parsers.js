import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

function parseFile(filePath) {
  const filepathResolved = path.resolve(cwd(), filePath);
  const file = fs.readFileSync(filepathResolved);
  const fileExtention = path.extname(filePath);

  switch (fileExtention) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown file extention: '${fileExtention}'!`);
  }
}

export default parseFile;
