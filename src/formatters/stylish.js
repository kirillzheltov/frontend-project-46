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
    value,
    nested,
  } = entry;

  const indentPreviousCount = level * indentFactor;
  const indentPreviousString = indentSpacerSign.repeat(indentPreviousCount);
  const indentCurrentCount = level * indentFactor - signAndSpacerLength;
  const indentCurrentString = indentSpacerSign.repeat(indentCurrentCount);
  const currentType = Object.prototype.hasOwnProperty.call(entry, 'type') ? type : 'unchanged';

  let currentSign;
  switch (currentType) {
    case 'deleted':
      currentSign = deletedSign;
      break;
    case 'added':
      currentSign = addedSign;
      break;
    case 'unchanged':
      currentSign = unchangedSign;
      break;
    default:
      currentSign = unchangedSign;
  }

  let string = `\n${indentCurrentString}${currentSign}${signToKeySpacerSign}${name}: `;

  if (!Object.prototype.hasOwnProperty.call(entry, 'nested')) {
    string += `${convertToString(value, level)}`;
  } else {
    const stringifiedNested = nested.map((nestedEntry) => stylish(nestedEntry));
    string += `{${stringifiedNested.join('')}\n${indentPreviousString}}`;
  }
  return string;
}

export default stylish;
