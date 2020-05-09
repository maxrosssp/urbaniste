import Project from '../../Project.js';
import { Shape, Resource, ProjectType, Building } from '../../constants.js';
import { validateShape } from '../shapeUtils.js';

const TENEMENT = Project(Building.TENEMENT, ProjectType.COMMERCIAL, Shape.DIAMOND, () => {
  return { any: 4 };
}, 5, (_, player, tiles, shape) => {
  return validateShape(tiles, shape);
});

export default [
  TENEMENT
];