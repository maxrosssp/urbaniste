
import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getSortedTiles,
  getClaims,
  validateResourceTypes
} from '../validation';

export default {
  [Building.BOULEVARD]: {
    shape: Shape.LINE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2 },
    available: 5,
    validator: (state, playerId, positions) => {
      const claims = getClaims(state, positions, playerId);
      return validateResourceTypes(state, positions, { [Resource.WATER]: 0 }) &&
        getSortedTiles(state, positions)[1].owner === playerId &&
        (claims.friendly.length === 1 || claims.friendly.length === 2) &&
        ((positions.length - claims.friendly.length) === claims.unclaimed.length) &&
        (claims.enemy.length === 0);
    },
    victoryPoints: 1
  }
};
