import parseFile from './parsers.js';
import compare from './compare.js';
import formate from './formatters/index.js';

function genDiff(filePath1, filePath2, format = 'stylish') {
  const fileContent1 = parseFile(filePath1);
  const fileContent2 = parseFile(filePath2);
  const rawDiffArray = compare(fileContent1, fileContent2);
  const formattedDiffArray = rawDiffArray.map((enrty) => formate(enrty, format));
  const diffString = `{${formattedDiffArray.join('')}\n}`;
  console.log(diffString);
  return diffString;
}

export default genDiff;
