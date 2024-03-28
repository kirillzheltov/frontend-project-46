function stringify(entry) {
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

  switch (type) {
    case 'added':
      return `Property '${path}' was added with value: ${stringify(newValue)}`;
    case 'deleted':
      return `Property '${path}' was removed`;
    case 'changed':
      return `Property '${path}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
    default:
      return nested
        .filter((element) => (element.type !== 'unchanged'))
        .map((nestedEntry) => applyFormat(nestedEntry))
        .join('\n');
  }
}

export default applyFormat;
