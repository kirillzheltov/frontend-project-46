import makeStylish from './stylish.js';

function formate(entry, formatName) {
  switch (formatName) {
    case 'stylish':
      return makeStylish(entry);
    default:
      throw new Error(`Unknown style: '${formatName}'. Try 'stylish' instead.`);
  }
}

export default formate;
