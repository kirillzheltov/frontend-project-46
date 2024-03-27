import makeStylish from './stylish.js';
import makePlain from './plain.js';

function formate(rawDiffArray, formatName) {
  if (formatName === 'stylish') {
    const formattedDiffArray = rawDiffArray.map((entry) => makeStylish(entry));
    return `{${formattedDiffArray.join('')}\n}`;
  }
  if (formatName === 'plain') {
    const formattedDiffArray = rawDiffArray.map((entry) => makePlain(entry));
    return formattedDiffArray.join('').trim();
  }
  if (formatName === 'json') {
    return JSON.stringify(rawDiffArray[0]);
  }
  throw new Error(`Unknown style: '${formatName}'. Try 'stylish' instead.`);
}

export default formate;
