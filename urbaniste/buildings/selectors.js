import {
  Building,
  Resource
} from '../constants';
import {
  getAllAdjacentTiles,
  getAllAdjacentBuildings
} from '../utils';
import {
  getStingRemainingPrisons
} from '../misc/selectors';

export const getPlayerBuildingsOfType = (state, playerId, type) => state.buildings.filter(building => building.owner === playerId && building.name === type);

export const getLastPlayerBuildingBuilt = (state, playerId) => {
  const playerBuildings = state.buildings.filter(building => building.owner === playerId);
  return playerBuildings[playerBuildings.length - 1];
}

export const getLastPlayerBuildingBuiltOfType = (state, playerId, type) => {
  const buildingsOfType = getPlayerBuildingsOfType(state, playerId, type);
  return buildingsOfType[buildingsOfType.length - 1];
};

export const getLastFerryValidLandingPositions = (state, playerId) => getAllAdjacentTiles(state,
  getAllAdjacentTiles(state, getLastPlayerBuildingBuiltOfType(state, playerId, Building.FERRY).positions)
    .filter(tile => tile.resource === Resource.WATER).map(tile => tile.position))
    .filter(tile => !tile.owner && tile.resource !== Resource.WATER).map(tile => tile.position);

export const getLastMonumentValidReplacePositions = (state, playerId) => {
  const lastMonumentPositions = getLastPlayerBuildingBuiltOfType(state, playerId, Building.MONUMENT).positions;
  const monumentAdjacentTiles = getAllAdjacentTiles(state, lastMonumentPositions);
  return monumentAdjacentTiles.concat(getAllAdjacentTiles(state, monumentAdjacentTiles.map(tile => tile.position)))
    .filter(tile => tile.owner && tile.owner !== playerId && !tile.building).map(tile => tile.position);
};

export const getLastTunnelValidLandingPositions = (state, playerId) => getAllAdjacentBuildings(state, 
  getLastPlayerBuildingBuiltOfType(state, playerId, Building.TUNNEL).positions)
    .filter(building => building.owner !== playerId).map(building => getAllAdjacentTiles(state, building.positions)
    .filter(tile => !tile.owner && tile.resource !== Resource.WATER).map(tile => tile.position)).flat();

export const getLastTramwayAdjacentTiles = (state, playerId) => getAllAdjacentTiles(state, getLastPlayerBuildingBuiltOfType(state, playerId, Building.TRAMWAY).positions);

export const getLastGuildHallAdjacentTiles = (state, playerId) => getAllAdjacentTiles(state, getLastPlayerBuildingBuiltOfType(state, playerId, Building.GUILD_HALL).positions);

export const getStingRemainingPositionOptions = (state) => getAllAdjacentTiles(state, getStingRemainingPrisons(state).map(prison => prison.positions).flat()).filter(tile => tile.owner && !tile.building).map(tile => tile.position);
