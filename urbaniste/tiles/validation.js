import {
  Resource
} from '../constants';
import {
  getTile,
  getAdjacentTiles
} from '../utils';
import {
  isAcrossFromPlayerLock,
  inViewOfPlayerLighthouse,
  validateNoEnemyWatchtowerAdjacent
} from '../buildings/validation';
import {
  getTiles
} from './selectors';

const getTileIfExists = (state, position) => {
  return position && getTile(state, position);
} 

export const isPositionOpenToTake = (state, position) => {
  const tile = getTileIfExists(state, position);
  return tile && !tile.owner && tile.resource !== Resource.WATER;
};

export const isPositionClaimedByEnemy = (state, playerId, position) => {
  const tile = getTileIfExists(state, position);
  return tile && tile.owner !== playerId;
};

export const isPositionBuiltOn = (state, position) => {
  const tile = getTileIfExists(state, position);
  return tile && tile.building;
};

export const canTakeTileAtPosition = (state, playerId, position) => (
  isPositionOpenToTake(state, position) && (
    getAdjacentTiles(state, position).some(tile => tile.owner === playerId) || 
    isAcrossFromPlayerLock(state, playerId, position) ||
    inViewOfPlayerLighthouse(state, playerId, position)
  ) && validateNoEnemyWatchtowerAdjacent(state, [position], playerId)
);

export const canPlayerExpand = (state, playerId) => getTiles(state)
  .filter(tile => !tile.owner && tile.resource !== Resource.WATER)
  .some(tile => canTakeTileAtPosition(state, playerId, tile.position));
