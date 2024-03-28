const spaceSign = ' ';
const indentFactor = 4;
const signConfig = {
  unchanged: ' ', added: '+', deleted: '-',
};

function stringify(entry, level) {
  if (entry === null) {
    return 'null';
  }

  if (typeof entry === 'object') {
    const indentCount = level * indentFactor;
    const indentPrevious = spaceSign.repeat(indentCount);
    const indentCurrent = spaceSign.repeat(indentCount + 2);
    const string = Object.entries(entry)
      .map(([key, value]) => `${indentCurrent}${signConfig.unchanged} ${key}: ${stringify(value, level + 1)}`).join('\n');
    return `{\n${string}\n${indentPrevious}}`;
  }

  return entry;
}

function applyFormat(entry) {
  const {
    name, level, type, oldValue, newValue, nested,
  } = entry;
  const indentCount = level * indentFactor;
  const indentPrevious = spaceSign.repeat(indentCount);
  const indentCurrent = spaceSign.repeat(indentCount - 2);
  const valueConfig = {
    unchanged: oldValue, added: newValue, deleted: oldValue,
  };

  switch (type) {
    case 'nested': {
      const stringifiedNested = nested.map((nestedEntry) => applyFormat(nestedEntry));
      const line1 = `${indentCurrent}${signConfig.unchanged} ${name}: {`;
      const line2 = `${stringifiedNested.join('\n')}`;
      return `${line1}\n${line2}\n${indentPrevious}}`;
    }
    case 'changed': {
      const line1 = `${indentCurrent}${signConfig.deleted} ${name}: ${stringify(oldValue, level)}`;
      const line2 = `${indentCurrent}${signConfig.added} ${name}: ${stringify(newValue, level)}`;
      return `${line1}\n${line2}`;
    }
    default:
      return `${indentCurrent}${signConfig[type]} ${name}: ${stringify(valueConfig[type], level)}`;
  }
}
export default applyFormat;
