import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getSortedTiles,
  getClaims,
  validateResourceTypes,
  validateClaims
} from '../validation';
import {
  getAllAdjacentBuildings
} from '../../utils';

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
    victoryPoints: 2
  },
  [Building.PLAZA]: {
    shape: Shape.LINE_2,
    cost: { [Resource.LABOR]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.PRISON]: {
    shape: Shape.LINE_2,
    cost: { [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 2
  },
  [Building.TUNNEL]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 1, [Resource.LABOR]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 0, unclaimed: 0 }) &&
      getAllAdjacentBuildings(state, positions).filter(building => building.owner !== playerId).length === 1
    ),
    victoryPoints: 3
  },
  [Building.TRAMWAY]: {
    shape: Shape.LINE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 2
  }
};
