import {
  Resource,
  Building
} from '../constants';
import {
  getTile,
  getAdjacentTiles,
  positionsAreEqual
} from '../utils';
import {
  validateNoEnemyWatchtowerAdjacent
} from '../buildings/validation';

export const canTakeTileAtPosition = (state, playerId, position, validTilesToTake) => {
  if (!position) {
    return false;
  }

  const { resource, owner } = getTile(state, position);
  if (owner || resource === Resource.WATER) {
    return false;
  }

  const validPosition = validTilesToTake ?
    validTilesToTake.find(validTileToTake => positionsAreEqual(validTileToTake.position, position)) :
    getAdjacentTiles(state, position).some(tile => (
      tile.owner === playerId ||
      (tile.resource === Resource.WATER && getAdjacentTiles(state, tile.position).some(tile => tile.owner === playerId && tile.building === Building.LOCK)) ||
      getAdjacentTiles(state, tile.position).some(tile => tile.owner === playerId && tile.building === Building.LIGHTHOUSE)
    ));
  return validPosition && validateNoEnemyWatchtowerAdjacent(state, [position], playerId);
};

export const canReplaceTileAtPosition = (state, playerId, position, validTilesToReplace) => {
  if (!position) {
    return false;
  }
  const { resource, owner } = getTile(state, position);
  if (owner === playerId || resource === Resource.WATER) {
    return false;
  }
  return validTilesToReplace.find(validTileToReplace => positionsAreEqual(validTileToReplace.position, position));
};
