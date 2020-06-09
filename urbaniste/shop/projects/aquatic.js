import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getAllAdjacentTiles
} from '../../utils';
import {
  validateFriendlyAdjacent
} from '../validation';

export default {
  [Building.BRIDGE]: {
    shape: Shape.LINE_3,
    claims: { friendly: 1, unclaimed: 1, water: 1 },
    center: { water: true },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1 },
    available: 5,
    victoryPoints: 3
  },
  [Building.HARBOR]: {
    shape: Shape.SINGLE,
    claims: { water: 1 },
    cost: { [Resource.COIN]: 3 },
    available: 5,
    validator: (state, positions, playerId) => (
      validateFriendlyAdjacent(state, positions, playerId)
    ),
    victoryPoints: 2
  },
  [Building.CANAL]: {
    shape: Shape.V3,
    claims: [{ friendly: 1, water: 2 }, { friendly: 2, water: 1 }],
    center: { friendly: true, water: true },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 5,
    victoryPoints: 2
  },
  [Building.FERRY]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, positions) => (
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER)
    ),
    victoryPoints: 3
  },
  [Building.LIGHTHOUSE]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 5,
    validator: (state, positions) => (
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER)
    ),
    victoryPoints: 2
  },
  [Building.LOCK]: {
    shape: Shape.DIAMOND,
    claims: { friendly: 4 },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2 },
    available: 5,
    victoryPoints: 2
  }
};
