import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

function parseFile(filepath) {
  const filepathResolved = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(filepathResolved);
  // const fileExtention = path.extname(filepath).slice(1);
  const objFromFile = JSON.parse(fileContent);
  return objFromFile;
}

export default parseFile;
