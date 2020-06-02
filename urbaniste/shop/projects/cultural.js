import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getTilesAdjacentToAll,
  getAllAdjacentTiles
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
  },
  [Building.BOIS_VINCENNES]: {
    shape: Shape.LINE_2,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.DOCKS]: {
    shape: Shape.CANE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.GUILD_HALL]: {
    shape: Shape.TRIANGLE_6,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 6, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.LE_HAVRE]: {
    shape: Shape.Y,
    cost: { [Resource.COIN]: 3, [Resource.LABOR]: 3 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.MUSEE_LOUVRE]: {
    shape: Shape.TRIANGLE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.MUSEE_DORSAY]: {
    shape: Shape.LINE_2,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.WATERWORKS]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 0, unclaimed: 0 }) &&
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER)
    ),
    victoryPoints: 1
  }
};