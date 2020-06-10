import {
  Shape,
  Resource,
  Building,
  Stage
} from '../../constants.js';
import {
  getTiles,
  getTilesAdjacentToAll,
  getAllAdjacentTiles,
  getAllAdjacentBuildings
} from '../../utils';
import {
  getProjects
} from '../selectors';
import {
  validateNoAdjacentBuildingType,
  getContiguousFriendlyBuildings
} from '../../buildings/validation';

export default {
  [Building.PLACE_CHARLES_DE_GAULLE]: {
    shape: Shape.STAR,
    claims: { friendly: 7 },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: 8
  },
  [Building.PARC_DE_BUTTES_CHAUMONT]: {
    shape: Shape.U,
    claims: { friendly: 5 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 3 },
    available: 1,
    validator: (state, positions) => (
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 7
  },
  [Building.RUE_DE_RIVOLI]: {
    shape: Shape.LINE_6,
    claims: { friendly: 6 },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 1,
    victoryPoints: 6
  },
  [Building.CITY_HALL]: {
    shape: Shape.V5,
    claims: { friendly: 5 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentBuildings(state, positions).length
  },
  [Building.EMBASSY]: {
    shape: Shape.V3,
    claims: { friendly: 3 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentBuildings(state, positions).filter(building => building.name !== Building.EMBASSY).length
  },
  [Building.TOUR_EIFFEL]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 1, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, positions) => (
      getAllAdjacentTiles(state, positions).every(tile => tile.building)
    ),
    victoryPoints: 6
  },
  [Building.BOIS_VINCENNES]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentTiles(state, positions).filter(tile => !tile.owner).length * 2
  },
  [Building.DOCKS]: {
    shape: Shape.CANE,
    claims: { friendly: 4 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === Resource.WATER).length
  },
  [Building.GUILD_HALL]: {
    shape: Shape.TRIANGLE_6,
    claims: { friendly: 6 },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === state.misc.guildResource).length,
    getNextStage: () => Stage.SET_GUILD
  },
  [Building.LE_HAVRE]: {
    shape: Shape.Y,
    claims: { friendly: 4 },
    cost: { [Resource.COIN]: 3, [Resource.LABOR]: 3 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === Resource.WATER).length * 2
  },
  [Building.MUSEE_LOUVRE]: {
    shape: Shape.TRIANGLE_3,
    claims: { friendly: 3 },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    victoryPoints: (state, _, playerId) => {
      const projects = getProjects(state, playerId);
      if (!project) {
        return 0;
      }
      return ((new Set(projects.map(project => project.type))).size - (new Set(state.buildings.filter(building => building.owner === playerId)
        .map(building => projects.find(project => project.name === building.name).type))).size) * 5;
    }
  },
  [Building.MUSEE_DORSAY]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getAllAdjacentTiles(state, positions).filter(tile => !tile.building && tile.resource !== Resource.WATER).length * 2
  },
  [Building.WATERWORKS]: {
    shape: Shape.SINGLE,
    claims: { friendly: 1 },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, positions) => (
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER)
    ),
    victoryPoints: (state, positions, playerId) => getContiguousFriendlyBuildings(state, playerId, positions).length
  },
  [Building.MARINA]: {
    shape: Shape.V3,
    claims: { friendly: 3 },
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3 },
    available: 5,
    validator: (state, positions) => (
      validateNoAdjacentBuildingType(state, positions, Building.MARINA) &&
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 6
  },
  [Building.OPERA_GARNIER]: {
    shape: Shape.LINE_2,
    claims: { friendly: 2 },
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: 2
  },
  [Building.CATHEDRAL]: {
    shape: Shape.V3,
    claims: { friendly: 3 },
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, positions, playerId) => (
      getAllAdjacentTiles(state, positions).every(tile => tile.owner !== playerId || !tile.building)
    ),
    victoryPoints: 6
  },
  [Building.GRAND_CANAL]: {
    shape: Shape.V5,
    claims: [
      { friendly: 1, water: 1, unclaimed: 3 },
      { friendly: 1, water: 2, unclaimed: 2 },
      { friendly: 1, water: 3, unclaimed: 1 },
      { friendly: 1, water: 4, unclaimed: 0 },
      { friendly: 2, water: 1, unclaimed: 2 },
      { friendly: 2, water: 2, unclaimed: 1 },
      { friendly: 2, water: 3, unclaimed: 0 },
      { friendly: 3, water: 1, unclaimed: 1 },
      { friendly: 3, water: 2, unclaimed: 0 },
      { friendly: 4, water: 1, unclaimed: 0 }
    ],
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 1,
    victoryPoints: (state, positions) => getTiles(state, positions).filter(tile => tile.resource === Resource.WATER).length * 2
  }
};