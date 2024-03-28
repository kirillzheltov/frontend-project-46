import path from 'node:path';
import { readFile } from './utils.js';
import parseFile from './parseFile.js';
import compare from './compare.js';
import formate from './formatters/index.js';

function genDiff(filePath1, filePath2, formatName = 'stylish') {
  const filePaths = [filePath1, filePath2];
  const fileContent = filePaths.map((filePath) => {
    const file = readFile(filePath);
    const fileExtention = path.extname(filePath);
    return parseFile(file, fileExtention);
  });
  const [fileContent1, fileContent2] = fileContent;
  const rawDiffArray = compare(fileContent1, fileContent2);
  const diffString = formate(rawDiffArray, formatName);

  return diffString;
}

export default genDiff;
