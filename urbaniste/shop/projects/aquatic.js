import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getTiles,
  getTilesAdjacentToAll
} from '../../utils';
import {
  getSortedTiles,
  validateClaims,
  validateResourceTypes,
  validateFriendlyAdjacent
} from '../validation';
import {
  validateNoAdjacentBuildingType
} from '../../buildings/validation';

export default {
  [Building.BRIDGE]: {
    shape: Shape.LINE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getSortedTiles(state, positions)[1].resource === Resource.WATER &&
      validateClaims(state, positions, playerId, { friendly: 1 })
    ),
    victoryPoints: 1
  },
  [Building.HARBOR]: {
    shape: Shape.SINGLE,
    cost: { [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateResourceTypes(state, positions, { [Resource.WATER]: 1 }) &&
      validateFriendlyAdjacent(state, positions, playerId)
    ),
    victoryPoints: 1
  },
  [Building.CANAL]: {
    shape: Shape.CANE,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateResourceTypes(state, positions, {[Resource.WATER]: 2 }) &&
      validateClaims(state, positions, playerId, { friendly: 2, unclaimed: 2 })
    ),
    victoryPoints: 1
  },
  [Building.FERRY]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getTilesAdjacentToAll(state, positions).some(tile => tile.resource === Resource.WATER) &&
      validateClaims(state, positions, playerId, { friendly: 1 })
    ),
    victoryPoints: 1
  },
  [Building.LIGHTHOUSE]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, playerId, positions) => (
      getTilesAdjacentToAll(state, getTiles(state, positions).concat(getTilesAdjacentToAll(state, positions))).some(tile => tile.resource === Resource.WATER) &&
      validateClaims(state, positions, playerId, { friendly: 1 })
    ),
    victoryPoints: 1
  },
  [Building.LOCK]: {
    shape: Shape.DIAMOND,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4 })
    ),
    victoryPoints: 1
  },
  [Building.MARINA]: {
    shape: Shape.V3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3 }) &&
      validateNoAdjacentBuildingType(state, positions, Building.MARINA) &&
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 1
  }
};
