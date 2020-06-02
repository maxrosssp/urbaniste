import moves from './moves';
import { Building } from './constants';
import { getSelectedProject } from './shop/selectors';
import { canTakeTileAtPosition, canReplaceTileAtPosition } from './tiles/validation';

const getPlayerConfigs = (playerCount) => [...Array(playerCount).keys()].map(id => ({ id: id + '', name: 'Player ' + (id + 1) }));

const TakeTile = (G, ctx, position) => {
  ctx.events.setActivePlayers({ currentPlayer: 'build', moveLimit: 1 });
  return moves.take(G, ctx.currentPlayer, position);
};
const UndoTakeTile = {
  move: (G, ctx) => {
    ctx.events.setActivePlayers({ currentPlayer: 'expand', moveLimit: 1 });
    return moves.undoTake(G, ctx.currentPlayer);
  },
  noLimit: true
};
const SelectProject = {
  move: (G, ctx, name) => moves.selectProject(G, ctx.currentPlayer, name),
  noLimit: true,
  undoable: true
};
const BuildProject = (G, ctx, tiles, resources) => {
  const selectedProject = getSelectedProject(G, ctx.currentPlayer);
  switch (selectedProject.name) {
    case Building.CASINO:
      ctx.events.setActivePlayers({ currentPlayer: 'steal', moveLimit: 1 });
      break;
    case Building.FERRY:
      ctx.events.setActivePlayers({ currentPlayer: 'ferry', moveLimit: 1 });
      break;
    case Building.FOUNDRY:
      ctx.events.setActivePlayers({ currentPlayer: 'expand', moveLimit: 1 });
      break;
    case Building.LOAN_OFFICE:
      ctx.events.setActivePlayers({ currentPlayer: 'loan', moveLimit: 1 });
      break;
    case Building.MONUMENT:
      ctx.events.setActivePlayers({ currentPlayer: 'replace', moveLimit: 1 });
      break;
    default:
      ctx.events.endTurn();
  }
  return moves.build(G, ctx.currentPlayer, tiles, resources);
}
const EndTurn = {
  move: (_, ctx) => ctx.events.endTurn(),
  noLimit: true
};
const StealResources = (G, ctx, resources) => {
  ctx.events.endTurn();
  return moves.steal(G, ctx.currentPlayer, resources);
};
const Ferry = (G, ctx, position, ferryOptions) => {
  if (canTakeTileAtPosition(G, ctx.currentPlayer, position, ferryOptions)) {
    ctx.events.endTurn();
    return moves.take(G, ctx.currentPlayer, position);
  }
  return G;
};
const RecieveLoan = (G, ctx, resourceType) => {
  ctx.events.endTurn();
  return moves.addResources(G, ctx.currentPlayer, { [resourceType]: 3 });
};
const ReplaceTile = (G, ctx, position, tileOptions) => {
  if (canReplaceTileAtPosition(G, ctx.currentPlayer, position, tileOptions)) {
    ctx.events.endTurn();
    return moves.replaceTile(G, ctx.currentPlayer, position);
  }
  return G;
};

export const Urbaniste = {
  name: 'Urbaniste',
  setup: (ctx, setupData = {}) => moves.initialize(setupData.name, getPlayerConfigs(ctx.numPlayers), setupData.boardConfig, setupData.shopConfig),
  turn: {
    activePlayers: { currentPlayer: 'expand', moveLimit: 1 },
    stages: {
      expand: {
        moves: {
          TakeTile,
          EndTurn
        },
        next: 'build'
      },
      build: {
        moves: {
          UndoTakeTile,
          SelectProject,
          BuildProject,
          EndTurn
        }
      },
      steal: {
        moves: {
          StealResources
        }
      },
      ferry: {
        moves: {
          Ferry,
          EndTurn
        }
      },
      loan: {
        moves: {
          RecieveLoan
        }
      },
      replace: {
        moves: {
          ReplaceTile,
          EndTurn
        }
      }
    }
  },
  minPlayers: 2,
  maxPlayers: 2
};
