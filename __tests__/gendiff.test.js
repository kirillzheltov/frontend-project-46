import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';
import parseFile from '../src/parseFile.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

const file1Path = getFixturePath('file1.json');
const file2Path = getFixturePath('file2.json');
const file1File2DiffPath = getFixturePath('file1File2Diff.json');
const parsedfile1File2Diff = parseFile(file1File2DiffPath);
console.log(file1Path);
console.log(file2Path);
// console.log(genDiff(file1Path, file2Path));

test('gets diff for plain jsons', () => {
  expect(genDiff(file1Path, file2Path)).toBe(parsedfile1File2Diff.string);
});
