import { ShapePositions } from '../constants';
import { getProject } from '../shop/projects';
import { normalize } from '../utils';

export const getTiles = (state) => Object.values(state.tiles).map(col => Object.values(col)).flat();

export const getAllPlayerTiles = (state, playerId) => getTiles(state).filter(tile => tile.owner === playerId);

const rotationIndex = (rotation, rotationsCount) => ((rotation % rotationsCount) + rotationsCount) % rotationsCount;
const getShapeAtPosition = (shape, position, rotation = 0) => normalize(position, ShapePositions[shape][rotationIndex(rotation, ShapePositions[shape].length)]);

export const getPositionsForShapeAtPosition = (state, playerId, position, rotation) => {
  if (!position) {
    return [];
  }
  const { selectedProject } = state.players[playerId];
  return selectedProject ? getShapeAtPosition(getProject(selectedProject).shape, position, rotation) : [position];
};
