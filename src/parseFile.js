import yaml from 'js-yaml';

function parseFile(file, fileExtention) {
  switch (fileExtention) {
    case '.json':
      return JSON.parse(file);
    case '.yaml':
    case '.yml':
      return yaml.load(file);
    default:
      throw new Error(`Unknown file extention: '${fileExtention}'!`);
  }
}

export default parseFile;
