import {
  initializeGame,
  selectProject,
  buildProject,
  takeTile,
  buildOnTile,
  undoTakeTile,
  addPlayerResources,
  removePlayerResources,
  setGuildResource,
  removeTileOwner,
  setTileOwner
} from './actions';
import game from './reducers';
import { getTile, getStartPositions, getResourcesAtPositions } from './utils';
import { getSelectedProjectName } from './shop/selectors';
import { getPlayerLastTake, getEnemyPlayerId } from './players/selectors';

const doActionAtPositions = (state, positions, getAction) => positions.reduce((state, position) => game(state, getAction(state, position)), state);

export default {
  initialize: (name, playerConfigs, boardConfig, shopConfig) => getStartPositions(boardConfig, playerConfigs).reduce(
    (state, positions, index) => doActionAtPositions(state, positions,(state, position) => takeTile(playerConfigs[index].id, position, getTile(state, position).resource)),
    game({ name }, initializeGame(playerConfigs, boardConfig, shopConfig))
  ),
  take: (state, playerId, position) => game(state, takeTile(playerId, position, getTile(state, position).resource)),
  undoTake: (state, playerId) => {
    const { position, resource } = getPlayerLastTake(state, playerId);
    return game(state, undoTakeTile(playerId, position, resource));
  },
  build: (state, playerId, positions, resources) => {
    const name = getSelectedProjectName(state, playerId);
    return doActionAtPositions(game(state, buildProject(playerId, name, positions, resources)), positions, (_, position) => buildOnTile(playerId, position, name));
  },
  selectProject: (state, playerId, name) => game(state, selectProject(playerId, name)),
  steal: (state, playerId, resources) => game(game(state, addPlayerResources(playerId, resources)), removePlayerResources(getEnemyPlayerId(state, playerId), resources)),
  addResources: (state, playerId, resources) => game(state, addPlayerResources(playerId, resources)),
  // addResourcesAtPosition: (state, playerId, positions) => game(state, addPlayerResources(playerId, getResourcesAtPositions(state, positions))),
  setGuildResource: (state, resource) => game(state, setGuildResource(resource)),
  replaceTile: (state, playerId, position) => game(game(state, removeTileOwner(getEnemyPlayerId(state, playerId), position)), setTileOwner(playerId, position))
};
