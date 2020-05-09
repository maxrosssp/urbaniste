import { ProjectType } from './constants.js';
import { getProjectOfType } from './projects/projects.js';

export default function() {
  var projects = [
    getProjectOfType(ProjectType.INFRASTRUCTURE),
    getProjectOfType(ProjectType.AQUATIC),
    getProjectOfType(ProjectType.COMMERCIAL),
    getProjectOfType(ProjectType.CIVIC),
    getProjectOfType(ProjectType.CULTURAL),
  ];

  return {
    getProjects: () => projects
  }
}
