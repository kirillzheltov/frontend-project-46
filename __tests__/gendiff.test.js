import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('gets diff for nested jsons', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffPath = getFixturePath('diff.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(diffParced);
});

test('gets diff for nested yamls', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const diffPath = getFixturePath('diff.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(diffParced);
});
