import {
  getPlayerBuildings
} from '../utils';
import {
  getProjectConfig
} from '../shop/projects';
import {
  getVictoryPoints
} from '../shop/selectors';

export const getPlayerVictoryPoints = (state, playerId) => getPlayerBuildings(state, playerId).reduce((total, { name, positions }) => total + getVictoryPoints({ ...getProjectConfig(name), name }, state, playerId, positions), 0);

export const getPlayers = (state, playerId) => [state.players[playerId]]
  .concat(Object.values(state.players).filter(player => player.id != playerId))
  .map(player => ({
    ...player,
    victoryPoints: getPlayerVictoryPoints(state, player.id)
  }));

export const getPlayerResources = (state, playerId) => state.players[playerId].resources;

export const getPlayerLastTake = (state, playerId) => ({ ...state.players[playerId].taken[0] });

export const getEnemyPlayerId = (state, playerId) => Object.values(state.players).find(player => player.id != playerId).id;

export const getEnemyResources = (state, playerId) => getPlayerResources(state, getEnemyPlayerId(state, playerId));
