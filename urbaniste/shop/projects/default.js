import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  validateClaims
} from '../validation';

export default {
  [Building.HOUSING_UNIT]: {
    shape: Shape.LINE_2,
    cost: { [Resource.ANY]: 3 },
    available: 10,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 1
  }
};
