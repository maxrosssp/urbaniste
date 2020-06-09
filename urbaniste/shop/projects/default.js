import {
  Shape,
  Resource,
  Building
} from '../../constants.js';

export default {
  [Building.HOUSING_UNIT]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.ANY]: 3 },
    available: 10,
    victoryPoints: 1
  }
};
