import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';

function getFileExtention(filepath) {
  console.log(path.extname(filepath).slice(1));
}

function parseFile(filepath) {
  const filepathResolved = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(filepathResolved);
  const objFromFile = JSON.parse(fileContent);
  getFileExtention(filepathResolved);
  return objFromFile;
}

function parseFiles(...args) {
  const [obj1, obj2] = args.map((argument) => parseFile(argument));
  console.log(obj1, obj2);
}

export default parseFiles;
