import moves from './moves';

const getPlayerConfigs = (playerCount) => [...Array(playerCount).keys()].map(id => ({ id: id + '', name: 'Player ' + (id + 1) }));

const TakeTile = (G, ctx, position) => {
  ctx.events.setActivePlayers({ currentPlayer: 'build', moveLimit: 1 });
  return moves.take(G, ctx.currentPlayer, position);;
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
  ctx.events.endTurn();
  return moves.build(G, ctx.currentPlayer, tiles, resources);
}
const EndTurn = {
  move: (_, ctx) => ctx.events.endTurn(),
  noLimit: true
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
      }
    }
  },
  minPlayers: 2,
  maxPlayers: 2
};
