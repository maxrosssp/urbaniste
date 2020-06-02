import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getAllAdjacentTiles
} from '../../utils';
import {
  getSortedTiles,
  validateClaims,
  validateResourceTypes,
  validateFriendlyAdjacent
} from '../validation';

export default {
  [Building.BRIDGE]: {
    shape: Shape.LINE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getSortedTiles(state, positions)[1].resource === Resource.WATER &&
      validateClaims(state, positions, playerId, { friendly: 1, unclaimed: 1 })
    ),
    victoryPoints: 3
  },
  [Building.HARBOR]: {
    shape: Shape.SINGLE,
    cost: { [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateResourceTypes(state, positions, { [Resource.WATER]: 1 }) &&
      validateFriendlyAdjacent(state, positions, playerId)
    ),
    victoryPoints: 2
  },
  [Building.CANAL]: {
    shape: Shape.CANE,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateResourceTypes(state, positions, {[Resource.WATER]: 2 }) &&
      validateClaims(state, positions, playerId, { friendly: 2, unclaimed: 2 })
    ),
    victoryPoints: 2
  },
  [Building.FERRY]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER) &&
      validateClaims(state, positions, playerId, { friendly: 1 })
    ),
    victoryPoints: 3
  },
  [Building.LIGHTHOUSE]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER) &&
      validateClaims(state, positions, playerId, { friendly: 1 })
    ),
    victoryPoints: 2
  },
  [Building.LOCK]: {
    shape: Shape.DIAMOND,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4 })
    ),
    victoryPoints: 2
  }
};
