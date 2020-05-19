import {
  Resource
} from '../constants';
import {
  getTile,
  getAdjacentTiles
} from '../utils';

export const canTakeTileAtPosition = (state, playerId, position) => {
  if (!position) {
    return false;
  }
  const { resource, owner } = getTile(state, position); 
  return !owner && resource !== Resource.WATER && getAdjacentTiles(state, position).some(tile => tile.owner === playerId);
};
