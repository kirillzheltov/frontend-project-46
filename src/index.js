import _ from 'lodash';
import parseFile from './parsers.js';

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
  return resultStr;
}

export default genDiff;
