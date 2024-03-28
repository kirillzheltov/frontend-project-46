import makeStylish from './stylish.js';
import makePlain from './plain.js';

function formate(rawDiffArray, formatName) {
  switch (formatName) {
    case 'stylish':
      return `{\n${rawDiffArray.flatMap((entry) => makeStylish(entry)).join('\n')}\n}`;
    case 'plain':
      return rawDiffArray.filter((element) => (element.type !== 'unchanged'))
        .flatMap((entry) => makePlain(entry)).join('\n');
    case 'json':
      return JSON.stringify(rawDiffArray[0]);
    default:
      throw new Error(`Unknown style: '${formatName}'. Try 'stylish' instead.`);
  }
}

export default formate;
