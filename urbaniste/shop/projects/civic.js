import {
  Shape,
  Resource,
  Building,
  Stage,
  ProjectType
} from '../../constants.js';

const projects = {
  [Building.TAXHOUSE]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 1, enemy: 2 },
    cost: { [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 5,
    victoryPoints: 2
  },
  [Building.CEMETARY]: {
    shape: Shape.V3,
    claims: { friendly: 1, enemy: 2, water: 0 },
    center: { enemy: true },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 2 },
    available: 5,
    victoryPoints: 2
  },
  [Building.SHIPYARD]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 1, enemy: 1, water: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.LABOR]: 3 },
    available: 5,
    victoryPoints: 2
  },
  [Building.MONUMENT]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 1 },
    available: 5,
    victoryPoints: 2,
    getNextStage: () => Stage.REPLACE
  },
  [Building.SEWERS]: {
    shape: Shape.LINE_3,
    claims: { friendly: 1, enemy: 1, unclaimed: 1, water: 0 },
    center: { enemy: true },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.LABOR]: 3 },
    available: 5,
    victoryPoints: 2
  }
};

export default Object.keys(projects).map(name => ({ name, type: ProjectType.CIVIC, ...projects[name] }));
