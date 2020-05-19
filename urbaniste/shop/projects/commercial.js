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
  [Building.TENEMENT]: {
    shape: Shape.TRIANGLE_3,
    cost: (state, playerId) => ({
      [Resource.ANY]: Math.max(4 - getPlayerBuildingsOfType(state, playerId, Building.TENEMENT).length, 0)
    }),
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  },
  [Building.BAZAAR]: {
    shape: Shape.V3,
    cost: (state, _, positions) => ({
      [Resource.ANY]: Math.max(6 - getAllAdjacentBuildings(state, positions).length, 0)
    }),
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  }
};
