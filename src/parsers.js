import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import yaml from 'js-yaml';

function parseFile(filepath) {
  const filepathResolved = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(filepathResolved);
  const fileExtention = path.extname(filepath);
  let objFromFile;
  switch (fileExtention) {
    case '.json':
      objFromFile = JSON.parse(fileContent);
      break;
    case '.yaml':
    case '.yml':
      objFromFile = yaml.load(fileContent);
      break;
    default:
      throw new Error(`Unknown file extention: '${fileExtention}'!`);
  }
  return objFromFile;
}

export default parseFile;
