import { ShapePositions, Resource } from '../constants';
import { getProjectConfig } from '../shop/projects';
import {
  normalize,
  getAllAdjacentTiles
} from '../utils';

export const getTiles = (state) => Object.values(state.tiles).map(col => Object.values(col)).flat();

export const getAllPlayerTiles = (state, playerId) => getTiles(state).filter(tile => tile.owner === playerId);

export const getPlayerPossibleBuildTiles = (state, playerId) => {
  const playerTiles = getAllPlayerTiles(state, playerId);
  return playerTiles.concat(getAllAdjacentTiles(state, playerTiles.map(tile => tile.position)).filter(tile => tile.resource === Resource.WATER))
    .filter(tile => !tile.building);
};

const rotationIndex = (rotation, rotationsCount) => ((rotation % rotationsCount) + rotationsCount) % rotationsCount;
const getShapeAtPosition = (shape, position, rotation = 0) => normalize(position, ShapePositions[shape][rotationIndex(rotation, ShapePositions[shape].length)]);

export const getPositionsForShapeAtPosition = (position, rotation, projectName) =>
  position ? (projectName ? getShapeAtPosition(getProjectConfig(projectName).shape, position, rotation) : [position]) : [];
