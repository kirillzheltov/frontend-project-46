import _ from 'lodash';

function compare(fileContent1, fileContent2, level = 1) {
  const mergedContent = { ...fileContent1, ...fileContent2 };
  const sortedContent = _.pick(mergedContent, Object.keys(mergedContent).sort());
  const comparedContent = [];

  Object.keys(sortedContent).forEach((key) => {
    const key1 = fileContent1[key];
    const key2 = fileContent2[key];

    const entry1stRow = {
      name: key,
      level,
    };

    const entry2ndRow = {
      name: key,
      level,
    };

    if (typeof key1 === 'object' && typeof key2 === 'object') {
      entry1stRow.nested = compare(key1, key2, level + 1);
    } else if (key1 === fileContent2[key]) {
      entry1stRow.type = 'unchanged';
      entry1stRow.value = key2;
    } else if (_.isUndefined(key1)) {
      entry1stRow.type = 'added';
      entry1stRow.value = key2;
    } else if (_.isUndefined(key2)) {
      entry1stRow.type = 'deleted';
      entry1stRow.value = key1;
    } else {
      entry1stRow.type = 'deleted';
      entry1stRow.value = key1;
      entry2ndRow.type = 'added';
      entry2ndRow.value = key2;
    }

    comparedContent.push(entry1stRow);
    if (Object.prototype.hasOwnProperty.call(entry2ndRow, 'type')) {
      comparedContent.push(entry2ndRow);
    }
  });

  return comparedContent;
}

export default compare;
