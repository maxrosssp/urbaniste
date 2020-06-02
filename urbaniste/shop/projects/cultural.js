import {
  Shape,
  Resource,
  Building
} from '../../constants.js';
import {
  getTilesAdjacentToAll,
  getAllAdjacentTiles,
  getAllAdjacentBuildings
} from '../../utils';
import {
  validateClaims
} from '../validation';
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
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 7, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 8
  },
  [Building.PARC_DE_BUTTES_CHAUMONT]: {
    shape: Shape.U,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 3 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 5, enemy: 0, unclaimed: 0 }) &&
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 7
  },
  [Building.RUE_DE_RIVOLI]: {
    shape: Shape.LINE_6,
    cost: { [Resource.BUILDING_MATERIAL]: 3, [Resource.COIN]: 2, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 6, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: 6
  },
  [Building.CITY_HALL]: {
    shape: Shape.V5,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 5, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentBuildings(state, positions).length
  },
  [Building.EMBASSY]: {
    shape: Shape.V3,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentBuildings(state, positions).filter(building => building.name !== Building.EMBASSY).length
  },
  [Building.BOIS_VINCENNES]: {
    shape: Shape.LINE_2,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentTiles(state, positions).filter(tile => !tile.owner).length * 2
  },
  [Building.DOCKS]: {
    shape: Shape.CANE,
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === Resource.WATER).length
  },
  //NEEDS STAGE
  [Building.GUILD_HALL]: {
    shape: Shape.TRIANGLE_6,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 1, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 6, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === state.misc.guildResource).length
  },
  [Building.LE_HAVRE]: {
    shape: Shape.Y,
    cost: { [Resource.COIN]: 3, [Resource.LABOR]: 3 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 4, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentTiles(state, positions).filter(tile => tile.resource === Resource.WATER).length * 2
  },
  [Building.MUSEE_LOUVRE]: {
    shape: Shape.TRIANGLE_3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 1 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, playerId) => {
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
    cost: { [Resource.BUILDING_MATERIAL]: 1, [Resource.COIN]: 2, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 2, enemy: 0, unclaimed: 0 })
    ),
    victoryPoints: (state, _, positions) => getAllAdjacentTiles(state, positions).filter(tile => !tile.building && tile.resource !== Resource.WATER).length * 2
  },
  [Building.WATERWORKS]: {
    shape: Shape.SINGLE,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3, [Resource.LABOR]: 2 },
    available: 1,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 1, enemy: 0, unclaimed: 0 }) &&
      getAllAdjacentTiles(state, positions).some(tile => tile.resource === Resource.WATER)
    ),
    victoryPoints: (state, playerId, positions) => getContiguousFriendlyBuildings(state, playerId, positions).length - 1
  },
  [Building.MARINA]: {
    shape: Shape.V3,
    cost: { [Resource.BUILDING_MATERIAL]: 2, [Resource.COIN]: 3 },
    available: 5,
    validator: (state, playerId, positions) => (
      validateClaims(state, positions, playerId, { friendly: 3 }) &&
      validateNoAdjacentBuildingType(state, positions, Building.MARINA) &&
      getTilesAdjacentToAll(state, positions)[0].resource === Resource.WATER
    ),
    victoryPoints: 6
  }
};
