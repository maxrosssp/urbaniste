import { ProjectType } from '../constants.js';
import aquatic from './types/aquatic.js';
import civic from './types/civic.js';
import commercial from './types/commercial.js';
import cultural from './types/cultural.js';
import infrastructure from './types/infrastructure.js';

const projects = {
  [ProjectType.AQUATIC]: aquatic,
  [ProjectType.CIVIC]: civic,
  [ProjectType.COMMERCIAL]: commercial,
  [ProjectType.CULTURAL]: cultural,
  [ProjectType.INFRASTRUCTURE]: infrastructure,
};

const getProjectOfType = (type, index = 0) => {
  return projects[type][index];
};

export {
  getProjectOfType
};