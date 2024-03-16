import { cwd } from 'node:process';
import path from 'node:path';
import fs from 'node:fs';
import _ from 'lodash';

function parseFile(filepath) {
  const filepathResolved = path.resolve(cwd(), filepath);
  const fileContent = fs.readFileSync(filepathResolved);
  // const fileExtention = path.extname(filepath).slice(1);
  const objFromFile = JSON.parse(fileContent);
  return objFromFile;
}

function genDiff(...args) {
  const [obj1, obj2] = args.map((argument) => {
    const parsedFile = parseFile(argument);
    const sortedObj = _.pick(parsedFile, Object.keys(parsedFile).sort());
    return sortedObj;
  });

  const mergedObj = { ...obj1, ...obj2 };
  const resultObj = {};

  Object.keys(mergedObj).forEach((key) => {
    if (obj1[key] === obj2[key]) {
      resultObj[`  ${key}`] = mergedObj[key];
    } else if (_.isUndefined(obj2[key])) {
      resultObj[`- ${key}`] = obj1[key];
    } else if (_.isUndefined(obj1[key])) {
      resultObj[`+ ${key}`] = obj2[key];
    } else {
      resultObj[`- ${key}`] = obj1[key];
      resultObj[`+ ${key}`] = obj2[key];
    }
  });

  let iteratedStr = '';

  Object.entries(resultObj).forEach(([key, value]) => {
    iteratedStr += `  ${key}: ${value}\n`;
  });

  const resultStr = `{\n${iteratedStr}}`;
  console.log(resultStr);
}

export default genDiff;
