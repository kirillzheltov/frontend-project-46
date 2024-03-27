import makeStylish from './stylish.js';

function formate(entry, format) {
  switch (format) {
    case 'stylish':
      return makeStylish(entry);
    default:
      throw new Error(`Unknown style: '${format}'. Try 'stylish' instead.`);
  }
}

export default formate;
