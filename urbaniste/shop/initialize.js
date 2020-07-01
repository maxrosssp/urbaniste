import { ShopProjectTypeCount } from '../constants';
import { shuffle } from '../utils.js';
import {
  projectsByType
} from './projects';

const getShuffledProjects = () => {
  return Object.keys(projectsByType).reduce((shuffledProjects, projectType) => ({ ...shuffledProjects, [projectType]: shuffle(projectsByType[projectType].map(project => project.name)) }), {});
};

const getShopProjectTypeList = (projectTypeCount) => {
  const projectTypeList = [];
  Object.keys(projectTypeCount).forEach(projectType => [...Array(projectTypeCount[projectType]).keys()].forEach(_ => projectTypeList.push(projectType)));
  return projectTypeList;
};

const getRandomProjectListOfProjectTypeCount = (projectTypeCount = ShopProjectTypeCount) => {
  const shuffledProjects = getShuffledProjects();
  return getShopProjectTypeList(projectTypeCount).map(type => shuffledProjects[type].pop());
};

const initialize = ({ projectList, projectTypeCount } = {}) => (projectList || getRandomProjectListOfProjectTypeCount(projectTypeCount))
  .reduce((projects, name) => ({ ...projects, [name]: { name, count: 0 } }), {});

export default initialize;
