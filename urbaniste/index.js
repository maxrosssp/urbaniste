import { INVALID_MOVE } from 'boardgame.io/core';
import moves from './moves';
import { Resource, Stage, Move } from './constants';
import { getStage } from './stages';
import {
  canPlayerExpand,
  canTakeTileAtPosition
} from './tiles/validation';
import {
  canBuildInPositions
} from './buildings/validation';
import {
  getLastPlayerBuildingBuilt,
  getLastFerryValidLandingPositions,
  getLastMonumentValidReplacePositions,
  getLastTunnelValidLandingPositions,
  getLastTramwayAdjacentTiles,
  getStingRemainingPositionOptions
} from './buildings/selectors';
import {
  isStingComplete
} from './misc/selectors';
import {
  getProjects
} from './shop/selectors';
import {
  getPlayerVictoryPoints
} from './players/selectors';
import {
  getProjectConfig
} from './shop/projects';
import {
  isPositionInList
} from './utils';

const getPlayerConfigs = (playerCount) => [...Array(playerCount).keys()].map(id => ({ id: id + '', name: 'Player ' + (id + 1) }));

const TakeTile = (G, ctx, position) => {
  if (canTakeTileAtPosition(G, ctx.currentPlayer, position)) {
    return moves.take(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const UndoTakeTile = {
  move: (G, ctx) => {
    ctx.events.setActivePlayers({ currentPlayer: Stage.EXPAND });
    return moves.undoTake(G, ctx.currentPlayer);
  },
  noLimit: true
};
const BuildProject = (G, ctx, projectName, positions, resources) => {
  if (canBuildInPositions(G, ctx.currentPlayer, positions, projectName)) {
    return moves.build(G, ctx.currentPlayer, projectName, positions, resources);
  }
  return INVALID_MOVE;
}
const EndTurn = {
  move: (_, ctx) => ctx.events.endTurn(),
  noLimit: true
};
const StealResources = (G, ctx, resources) => {
  return moves.steal(G, ctx.currentPlayer, resources);
};
const Ferry = (G, ctx, position) => {
  if (isPositionInList(position, getLastFerryValidLandingPositions(G, ctx.currentPlayer))) {
    return moves.take(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const ReplaceEnemy = (G, ctx, position) => {
  if (isPositionInList(position, getLastMonumentValidReplacePositions(G, ctx.currentPlayer))) {
    return moves.setOwner(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const Tunnel = (G, ctx, position) => {
  if (isPositionInList(position, getLastTunnelValidLandingPositions(G, ctx.currentPlayer))) {
    return moves.setOwner(G, ctx.currentPlayer, position);
  }
  return INVALID_MOVE;
};
const Tram = (G, ctx, fromPosition, toPosition) => {
  const tramwayAdjacentTiles = getLastTramwayAdjacentTiles(G, ctx.currentPlayer);
  if (isPositionInList(fromPosition, tramwayAdjacentTiles.filter(tile => tile.owner && !tile.building).map(tile => tile.position)) 
      && isPositionInList(toPosition, tramwayAdjacentTiles.filter(tile => !tile.owner).map(tile => tile.position))) {
    return moves.moveTile(G, fromPosition, toPosition);
  }
  return INVALID_MOVE;
};
const RecieveLoan = (G, ctx, resourceType) => {
  if ([Resource.BUILDING_MATERIAL, Resource.COIN, Resource.LABOR].indexOf(resourceType) !== -1) {
    return moves.addResources(G, ctx.currentPlayer, { [resourceType]: 3 });
  }
  return INVALID_MOVE;
};
const SetGuildPoints = (G, ctx, resourceType) => {
  return moves.setGuildPoints(G, ctx.currentPlayer, resourceType);
};
const Arrest = (G, ctx, position) => {
  if (isPositionInList(position, getStingRemainingPositionOptions(G))) {
    return moves.arrest(G, position);
  }
  return INVALID_MOVE;
};

export const Urbaniste = {
  name: 'Urbaniste',
  setup: (ctx, setupData = {}) => moves.initialize(setupData.name, getPlayerConfigs(ctx.numPlayers), setupData.boardConfig, setupData.shopConfig),
  turn: {
    activePlayers: { currentPlayer: Stage.EXPAND },
    endIf: (G, ctx) => {
      const stage = ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer];
      if (stage === Stage.EXPAND) {
        return !getProjects(G, ctx.currentPlayer).some(project => project.canBuild);
      }
      if (stage === Stage.STING) {
        return isStingComplete(G);
      }
      if (stage === Stage.BUILD) {
        return false;
      }
      return true;
    },
    onMove: (G, ctx) => {
      const stage = ctx.activePlayers && ctx.activePlayers[ctx.currentPlayer];
      if (stage === Stage.EXPAND) {
        ctx.events.endStage();
      } else if (stage === Stage.BUILD) {
        if (ctx._activePlayersNumMoves[ctx.currentPlayer] === 1) {
          const lastBuildingBuilt = getLastPlayerBuildingBuilt(G, ctx.currentPlayer);
          if (lastBuildingBuilt) {
            const { name, positions } = lastBuildingBuilt;
            const { getNextStage } = getProjectConfig(name);
            const nextStage = getNextStage && getNextStage(G, ctx.currentPlayer, positions);
            nextStage ? ctx.events.setStage(nextStage) : ctx.events.endTurn();
          } else {
            ctx.events.endTurn();
          }
        }
      }
    },
    stages: {
      [Stage.EXPAND]: {
        moves: { 
          [Move.TAKE_TILE]: TakeTile, 
          [Move.END_TURN]: EndTurn 
        },
        next: Stage.BUILD
      },
      [Stage.BUILD]: {
        moves: { 
          [Move.UNDO_TAKE_TILE]: UndoTakeTile, 
          [Move.BUILD_PROJECT]: BuildProject, 
          [Move.END_TURN]: EndTurn 
        }
      },
      [Stage.STEAL]: {
        moves: { 
          [Move.STEAL_RESOURCES]: StealResources 
        }
      },
      [Stage.FERRY]: {
        moves: { 
          [Move.FERRY]: Ferry, 
          [Move.END_TURN]: EndTurn 
        }
      },
      [Stage.REPLACE]: {
        moves: { 
          [Move.REPLACE_ENEMY]: ReplaceEnemy, 
          [Move.END_TURN]: EndTurn 
        }
      },
      [Stage.LOAN]: {
        moves: { 
          [Move.RECIEVE_LOAN]: RecieveLoan 
        }
      },
      [Stage.SET_GUILD]: {
        moves: { 
          [Move.SET_GUILD_POINTS]: SetGuildPoints 
        }
      },
      [Stage.STING]: {
        moves: { 
          [Move.ARREST]: Arrest, 
          [Move.END_TURN]: EndTurn 
        }
      },
      [Stage.TUNNEL]: {
        moves: { 
          [Move.TUNNEL]: Tunnel, 
          [Move.END_TURN]: EndTurn 
        }
      },
      [Stage.TRAM]: {
        moves: { 
          [Move.TRAM]: Tram, 
          [Move.END_TURN]: EndTurn 
        }
      }
    }
  },
  endIf: (G, ctx) => {
    const playersWithMovesLeft = ctx.playOrder.filter(playerId => canPlayerExpand(G, playerId) ||
      getProjects(G, playerId).some(project => project.canBuild));

    if (playersWithMovesLeft.length === 0) {
      var highestScore = 0;
      var winners = [];
      ctx.playOrder.forEach(playerId => {
        const score = getPlayerVictoryPoints(G, playerId);
        if (score > highestScore) {
          highestScore = score;
          winners = [playerId];
        } else if (score === highestScore) {
          winners = winners.concat(playerId);
        }
      });

      return { winners };
    }

    if (playersWithMovesLeft.length === 1) {
      const remainingPlayer = playersWithMovesLeft[0];
      const remainingPlayerVictoryPoints = getPlayerVictoryPoints(G, remainingPlayer);
      const isRemainingPlayerWinning = ctx.playOrder.filter(playerId => playerId !== remainingPlayer)
        .every(playerId => getPlayerVictoryPoints(G, playerId) < remainingPlayerVictoryPoints);
      if (isRemainingPlayerWinning) {
        return { winners: [remainingPlayer] };
      }
    }
  },
  minPlayers: 1,
  maxPlayers: 2,
  ai: {
    enumerate: (G, ctx) => {
      const stage = ctx.activePlayers && getStage(ctx.activePlayers[ctx.currentPlayer]);
      return (stage && stage.getPossibleMoves) ? stage.getPossibleMoves(G, ctx.currentPlayer) : [{ move: Move.END_TURN }];
    }
  }
};
