import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  validateResourceTypes,
  validateClaims,
  getSortedTiles
} from '../validation';

export default {
  [Building.TAXHOUSE]: {
    shape: Shape.TRIANGLE_3,
    cost: { [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 2 })
    ),
    victoryPoints: 2
  },
  [Building.CEMETARY]: {
    shape: Shape.V3,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 2 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 2 }) &&
      validateResourceTypes(state, positions, { [Resource.WATER]: 0 }) &&
      getSortedTiles(state, positions)[1].owner !== playerId
    ),
    victoryPoints: 2
  },
  [Building.SHIPYARD]: {
    shape: Shape.TRIANGLE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.LABOR]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 1, unclaimed: 1 }) &&
      validateResourceTypes(state, positions, { [Resource.WATER]: 1 })
    ),
    victoryPoints: 2
  },
  [Building.MONUMENT]: {
    shape: Shape.LINE_2,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2 })
    ),
    victoryPoints: 2
  },
  [Building.SEWERS]: {
    shape: Shape.LINE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.LABOR]: 3 },
    available: 5,
    validator: (state, playerId, positions) => {
      const { owner } = getSortedTiles(state, positions)[1];
      return (
        validateClaims(state, positions, playerId, { friendly: 1, enemy: 1, unclaimed: 1 }) &&
        validateResourceTypes(state, positions, { [Resource.WATER]: 0 }) &&
        owner && owner !== playerId
      );
    },
    victoryPoints: 2
  }
};
