import makeStylish from './stylish.js';
import makePlain from './plain.js';

function formate(rawDiffArray, formatName) {
  if (formatName === 'stylish') {
    return `{\n${rawDiffArray.flatMap((entry) => makeStylish(entry)).join('\n')}\n}`;
  }

  if (formatName === 'plain') {
    return rawDiffArray.flatMap((entry) => makePlain(entry)).join('\n');
  }

  if (formatName === 'json') {
    return JSON.stringify(rawDiffArray[0]);
  }
  
  throw new Error(`Unknown style: '${formatName}'. Try 'stylish' instead.`);
}

export default formate;
