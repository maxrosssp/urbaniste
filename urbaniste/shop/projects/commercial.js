import {
  Shape,
  Resource,
  Building,
  Stage
} from '../../constants.js';
import {
  getPlayerBuildingsOfType,
  getAllAdjacentBuildings,
  getAllAdjacentTiles
} from '../../utils';

export default {
  [Building.TENEMENT]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 3 },
    cost: (state, playerId) => ({
      [Resource.ANY]: Math.max(5 - getPlayerBuildingsOfType(state, playerId, Building.TENEMENT).length, 0)
    }),
    available: 5,
    victoryPoints: 3
  },
  [Building.BAZAAR]: {
    shape: Shape.V3,
    claims: { friendly: 3 },
    cost: (state, _, positions) => ({
      [Resource.ANY]: Math.max(6 - getAllAdjacentBuildings(state, positions).length, 0)
    }),
    available: 5,
    victoryPoints: 3
  },
  [Building.REFINERY]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.ANY]: 3 },
    allowedPayments: [{ [Resource.BUILDING_MATERIAL]: 3 }, { [Resource.COIN]: 3 }, { [Resource.LABOR]: 3 }],
    available: 5,
    victoryPoints: 1
  },
  [Building.WATCHTOWER]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.COIN]: 2, [Resource.LABOR]: 3 },
    available: 5,
    victoryPoints: 3
  },
  [Building.LOAN_OFFICE]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 3 },
    cost: { [Resource.ANY]: 2 },
    available: 5,
    victoryPoints: -1,
    getNextStage: () => Stage.LOAN
  },
  [Building.CASINO]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 3 },
    cost: { [Resource.ANY]: 4 },
    available: 5,
    victoryPoints: 0,
    getNextStage: (state, playerId, positions) => {
      if (getAllAdjacentTiles(state, positions).some(tile => tile.owner && tile.owner !== playerId)) {
        return Stage.STEAL;
      }
    }
  }
};
