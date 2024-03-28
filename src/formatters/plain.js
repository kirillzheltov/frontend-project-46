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

  if (type === 'added') {
    return `Property '${path}' was added with value: ${stringify(newValue)}`;
  }

  if (type === 'deleted') {
    return `Property '${path}' was removed`;
  }

  if (type === 'changed') {
    return `Property '${path}' was updated. From ${stringify(oldValue)} to ${stringify(newValue)}`;
  }

  if (nested !== null) {
    const stringifiedNested = nested.filter((element) => (element.type !== 'unchanged'))
      .map((nestedEntry) => applyFormat(nestedEntry));

    return stringifiedNested.join('\n');
  }
  console.log(type);
  return '';
}

export default applyFormat;
