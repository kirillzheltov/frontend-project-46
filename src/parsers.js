import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

function parseFile(filePath) {
  const filepathResolved = path.resolve(cwd(), filePath);
  const file = fs.readFileSync(filepathResolved);
  const fileExtention = path.extname(filePath);
  let fileContent;

  switch (fileExtention) {
    case '.json':
      fileContent = JSON.parse(file);
      break;
    case '.yaml':
    case '.yml':
      fileContent = yaml.load(file);
      break;
    default:
      throw new Error(`Unknown file extention: '${fileExtention}'!`);
  }

  return fileContent;
}

export default parseFile;
