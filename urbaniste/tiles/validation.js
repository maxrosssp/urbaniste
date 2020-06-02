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
  const validPosition = validTilesToTake ?
    validTilesToTake.find(validTileToTake => positionsAreEqual(validTileToTake.position, position)) :
    getAdjacentTiles(state, position).some(tile => tile.owner === playerId ||
      (tile.resource === Resource.WATER && getAdjacentTiles(state, tile.position).some(tile => tile.owner === playerId && tile.building === Building.LOCK)));

  return (
    !owner && resource !== Resource.WATER && validPosition &&
    validateNoEnemyWatchtowerAdjacent(state, [position], playerId)
  );
};
