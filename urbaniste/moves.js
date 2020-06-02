import {
  initializeGame,
  selectProject,
  buildProject,
  takeTile,
  buildOnTile,
  undoTakeTile,
  addPlayerResources,
  removePlayerResources
} from './actions';
import game from './reducers';
import { getTile, getStartPositions } from './utils';
import { getSelectedProjectName } from './shop/selectors';
import { getPlayerLastTake } from './players/selectors';

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
  steal: (state, playerId, fromPlayer, resources) => game(game(state, addPlayerResources(playerId, resources)), removePlayerResources(fromPlayer, resources)),
  addResources: (state, playerId, resources) => game(state, addPlayerResources(playerId, resources))
};
