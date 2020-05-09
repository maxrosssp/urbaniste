import Project from '../../Project.js';
import { Shape, Resource, ProjectType, Building } from '../../constants.js';
import { validateShape } from '../shapeUtils.js';
import { validateClaims } from '../buildValidation.js';

const BOULEVARD = Project(Building.BOULEVARD, ProjectType.INFRASTRUCTURE, Shape.CANE, {[Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2}, 5, (_, player, tiles, shape) => {
  return validateShape(tiles, shape)
    && validateClaims(tiles, player, { unclaimed: 2 });
});

export default [
  BOULEVARD
];
