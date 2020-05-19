import { ProjectType } from '../../constants.js';
import aquatic from './aquatic.js';
import civic from './civic.js';
import commercial from './commercial.js';
import cultural from './cultural.js';
import defaultProjects from './default.js';
import infrastructure from './infrastructure.js';

export const projectsByType = {
  [ProjectType.AQUATIC]: aquatic,
  [ProjectType.CIVIC]: civic,
  [ProjectType.COMMERCIAL]: commercial,
  [ProjectType.CULTURAL]: cultural,
  [ProjectType.DEFAULT]: defaultProjects,
  [ProjectType.INFRASTRUCTURE]: infrastructure
};

export const projects = Object.values(projectsByType).reduce((projects, projectType) => ({ ...projects, ...projectType }), {});

export const getProject = (name) => projects[name];
