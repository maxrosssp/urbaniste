import { DefaultShopProjectTypes } from '../constants';
import { shuffle } from '../utils.js';
import {
  getProject,
  projectsByType
} from './projects';

const getShuffledProjects = () => {
  return Object.keys(projectsByType).reduce((shuffledProjects, projectType) => ({ ...shuffledProjects, [projectType]: shuffle(Object.keys(projectsByType[projectType])) }), {});
};

export default function initialize({
  projectTypes = DefaultShopProjectTypes
} = {}) {
  const shuffledProjects = getShuffledProjects();

  return projectTypes.reduce((projects, type) => {
    const name = shuffledProjects[type].pop();
    return { ...projects, [name]: { name, type, count: 0 } };
  }, {});
};
