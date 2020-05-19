import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getTilesAdjacentToAll
} from '../../utils';
import {
  validateClaims
} from '../validation';

export default {
  [Building.PLACE_CHARLES_DE_GAULLE]: {
    shape: Shape.STAR,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 7, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.PARC_DE_BUTTES_CHAUMONT]: {
    shape: Shape.U,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 3 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 5, enemy: 0, unclaimed: 0 }) &&
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 1
  },
  [Building.RUE_DE_RIVOLI]: {
    shape: Shape.LINE_6,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 6, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.CITY_HALL]: {
    shape: Shape.V5,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 5, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.EMBASSY]: {
    shape: Shape.V3,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  }
};