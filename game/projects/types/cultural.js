import Project from '../../Project.js';
import { Shape, Resource, ProjectType, Building } from '../../constants.js';
import { validateShape } from '../shapeUtils.js';

const PLACE_DE_CHARLES_GAULLE = Project(Building.PLACE_DE_CHARLES_GAULLE, ProjectType.CULTURAL, Shape.STAR, {[Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 2}, 5, (_, player, tiles, shape) => {
  return validateShape(tiles, shape);
});

export default [
  PLACE_DE_CHARLES_GAULLE
];
