import path from 'node:path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import genDiff from '../src/index.js';
import parseFile from '../src/parsers.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gets diff for plain jsons', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const file1File2DiffPath = getFixturePath('file1File2Diff.json');
  const parsedfile1File2Diff = parseFile(file1File2DiffPath);
  expect(genDiff(file1Path, file2Path)).toBe(parsedfile1File2Diff.string);
});

test('gets diff for plain yamls', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const file1File2DiffPath = getFixturePath('file1File2Diff.yaml');
  const parsedfile1File2Diff = parseFile(file1File2DiffPath);
  expect(genDiff(file1Path, file2Path)).toBe(parsedfile1File2Diff.string);
});