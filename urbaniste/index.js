import { INVALID_MOVE } from 'boardgame.io/core';
import moves from './moves';
import { Resource, Building, Stage } from './constants';
import {
  canTakeTileAtPosition
} from './tiles/validation';
import {
  canBuildInPositions
} from './buildings/validation';
import {
  getPlayerBuildingsOfType,
  getLastFerryValidLandingPositions,
  getLastMonumentValidReplacePositions,
  getLastTunnelValidLandingPositions,
  getStingRemainingOptions
} from './buildings/selectors';
import {
  isStingComplete
} from './misc/selectors';
import {
  isPositionInList
} from './utils';

const getPlayerConfigs = (playerCount) => [...Array(playerCount).keys()].map(id => ({ id: id + '', name: 'Player ' + (id + 1) }));

const TakeTile = (G, ctx, position) => {
  if (canTakeTileAtPosition(G, ctx.currentPlayer, position)) {
    ctx.events.setActivePlayers({ currentPlayer: Stage.BUILD, moveLimit: 1 });
    return moves.take(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const UndoTakeTile = {
  move: (G, ctx) => {
    ctx.events.setActivePlayers({ currentPlayer: Stage.EXPAND, moveLimit: 1 });
    return moves.undoTake(G, ctx.currentPlayer);
  },
  noLimit: true
};
const SelectProject = {
  move: (G, ctx, name) => moves.selectProject(G, ctx.currentPlayer, name),
  noLimit: true,
  undoable: true
};
const BuildProject = (G, ctx, projectName, positions, resources) => {
  if (canBuildInPositions(G, ctx.currentPlayer, positions, projectName)) {
    switch (projectName) {
      case Building.CASINO:
        ctx.events.setActivePlayers({ currentPlayer: Stage.STEAL, moveLimit: 1 });
        break;
      case Building.FERRY:
        ctx.events.setActivePlayers({ currentPlayer: Stage.FERRY, moveLimit: 1 });
        break;
      case Building.MONUMENT:
        ctx.events.setActivePlayers({ currentPlayer: Stage.REPLACE, moveLimit: 1 });
        break;
      case Building.FOUNDRY:
        ctx.events.setActivePlayers({ currentPlayer: Stage.EXPAND, moveLimit: 1 });
        break;
      case Building.LOAN_OFFICE:
        ctx.events.setActivePlayers({ currentPlayer: Stage.LOAN, moveLimit: 1 });
        break;
      case Building.GUILD_HALL:
        ctx.events.setActivePlayers({ currentPlayer: Stage.SET_GUILD, moveLimit: 1 });
        break;
      case Building.PRISON:
        ctx.events.setActivePlayers({ currentPlayer: Stage.STING, moveLimit: 1 });
        break;
      case Building.TUNNEL:
        ctx.events.setActivePlayers({ currentPlayer: Stage.TUNNEL, moveLimit: 1 });
        break;
      default:
        ctx.events.endTurn();
    }
    return moves.build(G, ctx.currentPlayer, projectName, positions, resources);
  }
  return INVALID_MOVE;
}
const EndTurn = {
  move: (_, ctx) => ctx.events.endTurn(),
  noLimit: true
};
const StealResources = (G, ctx, resources) => {
  ctx.events.endTurn();
  return moves.steal(G, ctx.currentPlayer, resources);
};
const Ferry = (G, ctx, position) => {
  if (isPositionInList(position, getLastFerryValidLandingPositions(G, ctx.currentPlayer))) {
    ctx.events.endTurn();
    return moves.take(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const ReplaceEnemy = (G, ctx, position) => {
  if (isPositionInList(position, getLastMonumentValidReplacePositions(G, ctx.currentPlayer))) {
    ctx.events.endTurn();
    return moves.setOwner(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const Tunnel = (G, ctx, position) => {
  if (isPositionInList(position, getLastTunnelValidLandingPositions(G, ctx.currentPlayer))) {
    ctx.events.endTurn();
    return moves.setOwner(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const RecieveLoan = (G, ctx, resourceType) => {
  if ([Resource.BUILDING_MATERIAL, Resource.COIN, Resource.LABOR].indexOf(resourceType) !== -1) {
    ctx.events.endTurn();
    return moves.addResources(G, ctx.currentPlayer, { [resourceType]: 3 });
  }
  return INVALID_MOVE;
};
const SetGuildPoints = (G, ctx, resourceType) => {
  ctx.events.endTurn();
  return moves.setGuildPoints(G, ctx.currentPlayer, resourceType);
};
const Arrest = (G, ctx, position) => {
  if (isPositionInList(position, getStingRemainingOptions(G))) {
    ctx.events.setActivePlayers({ currentPlayer: Stage.STING, moveLimit: 3 + getPlayerBuildingsOfType(G, ctx.currentPlayer, Building.PRISON).length });
    return moves.arrest(G, position);
  }
  return INVALID_MOVE;
};

export const Urbaniste = {
  name: 'Urbaniste',
  setup: (ctx, setupData = {}) => moves.initialize(setupData.name, getPlayerConfigs(ctx.numPlayers), setupData.boardConfig, setupData.shopConfig),
  turn: {
    activePlayers: { currentPlayer: Stage.EXPAND, moveLimit: 1 },
    endIf: (G, ctx) => {
      const stage = ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer];
      if (stage === Stage.STING) {
        return isStingComplete(G);
      }
    },
    onEnd: (G, ctx) => ctx.events.setActivePlayers({ currentPlayer: Stage.EXPAND, moveLimit: 1 }),
    stages: {
      [Stage.EXPAND]: {
        moves: {
          TakeTile,
          EndTurn
        },
        next: Stage.BUILD
      },
      [Stage.BUILD]: {
        moves: {
          UndoTakeTile,
          SelectProject,
          BuildProject,
          EndTurn
        }
      },
      [Stage.STEAL]: {
        moves: {
          StealResources
        }
      },
      [Stage.FERRY]: {
        moves: {
          Ferry,
          EndTurn
        }
      },
      [Stage.REPLACE]: {
        moves: {
          ReplaceEnemy,
          EndTurn
        }
      },
      [Stage.LOAN]: {
        moves: {
          RecieveLoan
        }
      },
      [Stage.SET_GUILD]: {
        moves: {
          SetGuildPoints
        }
      },
      [Stage.STING]: {
        moves: {
          Arrest,
          EndTurn
        }
      },
      [Stage.TUNNEL]: {
        moves: {
          Tunnel,
          EndTurn
        }
      }
    }
  },
  minPlayers: 2,
  maxPlayers: 2
};
