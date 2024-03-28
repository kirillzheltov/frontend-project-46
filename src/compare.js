import _ from 'lodash';
import { getType } from './utils.js';

function compare(fileContent1, fileContent2, previousPath = null, level = 1) {
  const mergedContent = { ...fileContent1, ...fileContent2 };
  const comparedContent = Object.keys(mergedContent).flatMap((key) => {
    const currentPath = previousPath === null ? key : `${previousPath}.${key}`;
    const oldValue = fileContent1[key];
    const newValue = fileContent2[key];
    const areObjects = (typeof oldValue === 'object' && typeof newValue === 'object');
    const nested = areObjects ? compare(oldValue, newValue, currentPath, level + 1) : null;
    const newEntry1 = {
      name: key,
      path: currentPath,
      level,
      type: getType(oldValue, newValue),
    };
    const newEntry2 = {
      oldValue: oldValue ?? null,
      newValue: newValue ?? null,
    };
    const newEntry3 = {
      nested,
    };

    if (newEntry1.type === 'nested') {
      return { ...newEntry1, ...newEntry3 };
    }

    return { ...newEntry1, ...newEntry2, ...newEntry3 };
  });

  return _.sortBy(comparedContent, ['name']);
}

export default compare;
