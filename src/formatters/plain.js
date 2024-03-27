function convertToString(entry) {
  if (entry === null) {
    return 'null';
  }
  if (entry === true) {
    return 'true';
  }
  if (entry === false) {
    return 'false';
  }

  if (typeof entry === 'number') {
    return entry;
  }

  if (typeof entry === 'object') {
    return '[complex value]';
  }

  return `'${entry}'`;
}

function applyFormat(entry) {
  const {
    path, type, oldValue, newValue, nested,
  } = entry;

  let string = '';

  if (type === 'added') {
    string += `Property '${path}' was added with value: ${convertToString(newValue)}\n`;
  } else if (type === 'deleted') {
    string += `Property '${path}' was removed\n`;
  } else if (type === 'changed') {
    string += `Property '${path}' was updated. From ${convertToString(oldValue)} to ${convertToString(newValue)}\n`;
  }

  if (nested !== null) {
    const stringifiedNested = nested.map((nestedEntry) => applyFormat(nestedEntry));
    string += stringifiedNested.join('');
  }

  return string;
}

export default applyFormat;
