import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getAllAdjacentBuildings
} from '../../utils';

export default {
  [Building.BOULEVARD]: {
    shape: Shape.LINE_3,
    claims: [{ friendly: 1, unclaimed: 2, water: 0 }, { friendly: 2, unclaimed: 1, water: 0 }],
    center: { friendly: true },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 2 },
    available: 5,
    victoryPoints: 2
  },
  [Building.PLAZA]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.LABOR]: 3 },
    available: 5,
    victoryPoints: 1
  },
  [Building.PRISON]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 5,
    victoryPoints: 2
  },
  [Building.TUNNEL]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 1, [Resource.LABOR]: 3 },
    available: 5,
    validator: (state, positions, playerId) => (
      getAllAdjacentBuildings(state, positions).filter(building => building.owner !== playerId).length === 1
    ),
    victoryPoints: 3
  },
  [Building.TRAMWAY]: {
    shape: Shape.LINE_3,
    claims: { friendly: 3 },
    cost: { [Resource.BUILDING_MATERIAL]: 3 },
    available: 5,
    victoryPoints: 2
  }
};
