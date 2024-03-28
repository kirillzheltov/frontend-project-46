import _ from 'lodash';

function getType(entry1, entry2) {
  const areObjects = (typeof entry1 === 'object' && typeof entry2 === 'object');

  if (areObjects) {
    return null;
  }

  if (entry1 === entry2) {
    return 'unchanged';
  }

  if (_.isUndefined(entry1)) {
    return 'added';
  }

  if (_.isUndefined(entry2)) {
    return 'deleted';
  }

  return 'changed';
}

export default getType;
