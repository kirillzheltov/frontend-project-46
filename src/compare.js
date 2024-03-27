import _ from 'lodash';

function compare(fileContent1, fileContent2, previousPath = null, level = 1) {
  const mergedContent = { ...fileContent1, ...fileContent2 };
  const sortedContent = _.pick(mergedContent, Object.keys(mergedContent).sort());
  const comparedContent = [];

  Object.keys(sortedContent).forEach((key) => {
    const currentsPath = previousPath === null ? key : `${previousPath}.${key}`;

    const entry = {
      name: key,
      path: currentsPath,
      level,
      type: 'unknown',
      oldValue: fileContent1[key] ?? null,
      newValue: fileContent2[key] ?? null,
      nested: null,
    };

    if (typeof fileContent1[key] === 'object' && typeof fileContent2[key] === 'object') {
      entry.nested = compare(fileContent1[key], fileContent2[key], entry.path, level + 1);
      delete entry.type;
      delete entry.oldValue;
      delete entry.newValue;
    } else if (fileContent1[key] === fileContent2[key]) {
      entry.type = 'unchanged';
    } else if (_.isUndefined(fileContent1[key])) {
      entry.type = 'added';
    } else if (_.isUndefined(fileContent2[key])) {
      entry.type = 'deleted';
    } else {
      entry.type = 'changed';
    }

    comparedContent.push(entry);
  });

  return comparedContent;
}

export default compare;
