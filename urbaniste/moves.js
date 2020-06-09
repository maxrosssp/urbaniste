import {
  initializeGame,
  selectProject,
  buildProject,
  takeTile,
  buildOnTile,
  undoTakeTile,
  addPlayerResources,
  removePlayerResources,
  setTileOwner,
  removeTileOwner,
  setBuildingPoints,
  planSting,
  arrest
} from './actions';
import game from './reducers';
import {
  getTile,
  getStartPositions,
  getResources
} from './utils';
import {
  getPlayerLastTake,
  getEnemyPlayerId
} from './players/selectors';
import {
  getPlayerBuildingsOfType,
  getLastGuildHallAdjacentTiles
} from './buildings/selectors';
import {
  getProjectCost
} from './shop/selectors';
import { Building } from './constants';

const doActionAtPositions = (state, positions, getAction) => positions.reduce((state, position) => game(state, getAction(state, position)), state);

export default {
  initialize: (name, playerConfigs, boardConfig, shopConfig) => getStartPositions(boardConfig, playerConfigs).reduce(
    (state, positions, index) => doActionAtPositions(state, positions,(state, position) => takeTile(playerConfigs[index].id, position, getTile(state, position).resource)),
    game({ name }, initializeGame(playerConfigs, boardConfig, shopConfig))
  ),
  take: (state, playerId, position) => {
    return game(state, takeTile(playerId, position, getTile(state, position).resource))
  },
  undoTake: (state, playerId) => {
    const { position, resource } = getPlayerLastTake(state, playerId);
    return game(state, undoTakeTile(playerId, position, resource));
  },
  build: (state, playerId, projectName, positions, resources) => {
    const nextState = doActionAtPositions(game(state, buildProject(playerId, projectName, positions, resources || getProjectCost(state, playerId, projectName, positions)[0])), positions, (_, position) => buildOnTile(playerId, position, projectName));
    if (projectName === Building.REFINERY) {
      return game(nextState, addPlayerResources(playerId, getResources(nextState, positions)));
    }
    if (projectName === Building.PRISON) {
      return game(nextState, planSting(getPlayerBuildingsOfType(nextState, playerId, Building.PRISON)));
    }
    return nextState;
  },
  selectProject: (state, playerId, name) => game(state, selectProject(playerId, name)),
  steal: (state, playerId, resources) => game(game(state, addPlayerResources(playerId, resources)), removePlayerResources(getEnemyPlayerId(state, playerId), resources)),
  addResources: (state, playerId, resources) => game(state, addPlayerResources(playerId, resources)),
  setOwner: (state, playerId, position) => game(state, setTileOwner(playerId, position)),
  setGuildPoints: (state, playerId, resourceType) => {
    return game(state, setBuildingPoints(Building.GUILD_HALL, getLastGuildHallAdjacentTiles(state, playerId).filter(tile => !tile.building && tile.resource === resourceType).length))
  },
  arrest: (state, position) => game(state, arrest(position)),
  moveTile: (state, fromPosition, toPosition) => {
    const { position, owner } = getTile(state, fromPosition);
    return game(game(state, setTileOwner(owner, toPosition)), removeTileOwner(position));
  }
};
