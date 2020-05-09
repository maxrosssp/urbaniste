import Project from '../../Project.js';
import { Shape, Resource, ProjectType, Building } from '../../constants.js';
import { validateShape, sortByRows, sortByCols } from '../shapeUtils.js';
import { validateResourceTypes, validateFriendlyAdjacent, getFriendlyCount } from '../buildValidation.js';

const BRIDGE = Project(Building.BRIDGE, ProjectType.AQUATIC, Shape.LINE_3, {[Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1}, 5, (_, player, tiles, shape) => {
  return validateShape(tiles, shape)
    && sortByCols(sortByRows(tiles))[1].getResource() === Resource.WATER
    && getFriendlyCount(tiles, player) === 1;
});

const HARBOR = Project(Building.HARBOR, ProjectType.AQUATIC, Shape.SINGLE, {[Resource.COIN]: 2, [Resource.LABOR]: 1}, 5, (board, player, tiles, shape) => {
  return validateShape(tiles, shape)
    && validateResourceTypes(tiles, { [Resource.WATER]: 1 }) 
    && validateFriendlyAdjacent(board, player, tiles);
});

export default [
  BRIDGE,
  HARBOR
];