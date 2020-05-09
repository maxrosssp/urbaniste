import Project from '../../Project.js';
import { Shape, Resource, ProjectType, Building } from '../../constants.js';
import { validateShape } from '../shapeUtils.js';
import { validateClaims } from '../buildValidation.js';

const TAXHOUSE = Project(Building.TAXHOUSE, ProjectType.CIVIC, Shape.TRIANGLE_3, {[Resource.COIN]: 3, [Resource.LABOR]: 2}, 5, (_, player, tiles, shape) => {
  return validateShape(tiles, shape)
    && validateClaims(tiles, player, { friendly: 1, unclaimed: 2 });
});

export default [
  TAXHOUSE
];
