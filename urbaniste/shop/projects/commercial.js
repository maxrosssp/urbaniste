import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getPlayerBuildingsOfType,
  getAllAdjacentBuildings
} from '../../utils';
import {
  validateClaims
} from '../validation';

export default {
  // [Building.TENEMENT]: {
  //   shape: Shape.TRIANGLE_3,
  //   cost: (state, playerId) => ({
  //     [Resource.ANY]: Math.max(4 - getPlayerBuildingsOfType(state, playerId, Building.TENEMENT).length, 0)
  //   }),
  //   available: 5,
  //   validator: (state, playerId, positions) => (
  //     validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
  //   ),
  //   victoryPoints: 3
  // },
  // [Building.BAZAAR]: {
  //   shape: Shape.V3,
  //   cost: (state, _, positions) => ({
  //     [Resource.ANY]: Math.max(6 - getAllAdjacentBuildings(state, positions).length, 0)
  //   }),
  //   available: 5,
  //   validator: (state, playerId, positions) => (
  //     validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
  //   ),
  //   victoryPoints: 3
  // },
  //NEEDS ADDITIONAL ACTION
  [Building.REFINERY]: {
    shape: Shape.LINE_2,
    cost: { [Resource.ANY]: 3 },
    allowedPayments: [{ [Resource.BUILDING_MATERIAL]: 3 }, { [Resource.COIN]: 3 }, { [Resource.LABOR]: 3 }],
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  // [Building.CASINO]: {
  //   shape: Shape.TRIANGLE_3,
  //   cost: { [Resource.ANY]: 4 },
  //   available: 5,
  //   validator: (state, playerId, positions) => (
  //     validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
  //   ),
  //   victoryPoints: 0
  // },
  // [Building.WATCHTOWER]: {
  //   shape: Shape.SINGLE,
  //   cost: { [Resource.COIN]: 2, [Resource.LABOR]: 3 },
  //   available: 5,
  //   validator: (state, playerId, positions) => (
  //     validateClaims(state, positions, playerId, { friendly: 1, enemy: 0, unclaimed: 0 })
  //   ),
  //   victoryPoints: 3
  // },
  // [Building.LOAN_OFFICE]: {
  //   shape: Shape.TRIANGLE_3,
  //   cost: { [Resource.ANY]: 2 },
  //   available: 5,
  //   validator: (state, playerId, positions) => (
  //     validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
  //   ),
  //   victoryPoints: -1
  // }
};
