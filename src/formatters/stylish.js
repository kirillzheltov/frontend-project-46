const indentSpacerSign = ' ';
const indentFactor = 4;
const addedSign = '+';
const deletedSign = '-';
const unchangedSign = ' ';
const signToKeySpacerSign = ' ';
const signAndSpacerLength = (unchangedSign + signToKeySpacerSign).length;

function convertToString(entry, level) {
  if (entry === null) {
    return 'null';
  }

  if (typeof entry === 'object') {
    const indentPreviousCount = level * indentFactor;
    const indentPreviousString = indentSpacerSign.repeat(indentPreviousCount);
    const indentCurrentCount = level * indentFactor + signAndSpacerLength;
    const indentCurrentString = indentSpacerSign.repeat(indentCurrentCount);

    let string = '{\n';
    Object.entries(entry).forEach(([key, value]) => {
      string += `${indentCurrentString}${unchangedSign}${signToKeySpacerSign}`;
      string += `${key}: ${convertToString(value, level + 1)}\n`;
    });
    string += `${indentPreviousString}}`;

    return string;
  }

  return entry;
}

function stylish(entry) {
  const {
    name,
    level,
    type,
    oldValue,
    newValue,
    nested,
  } = entry;

  const indentCount = level * indentFactor - signAndSpacerLength;
  const indentString = indentSpacerSign.repeat(indentCount);

  let string = '';

  switch (type) {
    case 'unchanged':
      string += `\n${indentString}${unchangedSign}${signToKeySpacerSign}${name}: ${convertToString(oldValue, level)}`;
      break;
    case 'added':
      string += `\n${indentString}${addedSign}${signToKeySpacerSign}${name}: ${convertToString(newValue, level)}`;
      break;
    case 'deleted':
      string += `\n${indentString}${deletedSign}${signToKeySpacerSign}${name}: ${convertToString(oldValue, level)}`;
      break;
    case 'changed':
      string += `\n${indentString}${deletedSign}${signToKeySpacerSign}${name}: ${convertToString(oldValue, level)}`;
      string += `\n${indentString}${addedSign}${signToKeySpacerSign}${name}: ${convertToString(newValue, level)}`;
      break;
    default:
      string += `\n${indentString}${unchangedSign}${signToKeySpacerSign}${name}: `;
  }

  if (nested !== null) {
    const stringifiedNested = nested.map((nestedEntry) => stylish(nestedEntry));
    string += `{${stringifiedNested.join('')}\n${indentString}  }`;
  }

  return string;
}

export default stylish;
