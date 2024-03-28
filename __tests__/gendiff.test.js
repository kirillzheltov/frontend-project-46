import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'node:path';
import fs from 'node:fs';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (fileName) => path.join(__dirname, '..', '__fixtures__', fileName);

test('gendiff .json .json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffPath = getFixturePath('diffStylish.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path)).toBe(diffParced);
});

test('gendiff .yaml .yml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const diffPath = getFixturePath('diffStylish.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path)).toBe(diffParced);
});

test('gendiff --format stylish .json .json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffPath = getFixturePath('diffStylish.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(diffParced);
});

test('gendiff --format stylish .yaml .yml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const diffPath = getFixturePath('diffStylish.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'stylish')).toBe(diffParced);
});

test('gendiff --format plain .json .json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffPath = getFixturePath('diffPlain.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'plain')).toBe(diffParced);
});

test('gendiff --format plain .yaml .yml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const diffPath = getFixturePath('diffPlain.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'plain')).toBe(diffParced);
});

test('gendiff --format json .json .json', () => {
  const file1Path = getFixturePath('file1.json');
  const file2Path = getFixturePath('file2.json');
  const diffPath = getFixturePath('diffJSON.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'json')).toBe(diffParced);
});

test('gendiff --format json .yaml .yml', () => {
  const file1Path = getFixturePath('file1.yaml');
  const file2Path = getFixturePath('file2.yml');
  const diffPath = getFixturePath('diffJSON.txt');
  const diffParced = fs.readFileSync(diffPath, 'utf-8');
  expect(genDiff(file1Path, file2Path, 'json')).toBe(diffParced);
});
