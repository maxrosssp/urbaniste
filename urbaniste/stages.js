import { 
  Stage, 
  Resource, 
  Move, 
  ShapePositions 
} from './constants';
import {
  getPositionsForShapeAtPosition,
  getTiles
} from './tiles/selectors';
import {
  canTakeTileAtPosition
} from './tiles/validation';
import {
  canBuildInPositions
} from './buildings/validation';
import {
  getLastFerryValidLandingPositions,
  getLastMonumentValidReplacePositions,
  getLastTunnelValidLandingPositions,
  getLastTramwayAdjacentTiles,
  getStingRemainingPositionOptions
} from './buildings/selectors';
import {
  getProjects,
  getProjectCost,
  isProjectVariableCost
} from './shop/selectors';
import {
  getPlayerResources,
  getEnemyResources
} from './players/selectors';
import {
  isPositionInList,
  positionsAreEqual,
  getAllValidStealOptions
} from './utils';

const getValueToInclude = (state, playerId, projectName, positionsToBuild) => projectName && isProjectVariableCost(state, playerId, projectName, positionsToBuild) && ({
  name: 'payResources',
  playerResources: getPlayerResources(state, playerId),
  validPayments: getProjectCost(state, playerId, projectName, positionsToBuild)
});

const Stages = {
  [Stage.EXPAND]: {
    stageName: Stage.EXPAND,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: canTakeTileAtPosition(state, playerId, position),
      canAct: true,
      onTileClick: (moves, positionsToBuild) => moves[Move.TAKE_TILE](positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker to expand your control. Valid locations are highlighted in green.',
    buttons: ['endTurn'],
    getPossibleMoves: (state, playerId) => getTiles(state)
      .filter(({ position }) => canTakeTileAtPosition(state, playerId, position))
      .map(({ position }) => ({ move: Move.TAKE_TILE, args: [position] }))
      .concat({ move: Move.END_TURN })
  },
  [Stage.BUILD]: {
    stageName: Stage.BUILD,
    getBoardState: (state, playerId, position, rotation, projectName) => {
      const positions = getPositionsForShapeAtPosition(position, rotation, projectName);
      return {
        positionsToBuild: positions,
        valid: canBuildInPositions(state, playerId, positions, projectName),
        canAct: Boolean(projectName),
        getValueToInclude,
        onTileClick: (moves, positionsToBuild, projectName, valuesToInclude) => moves[Move.BUILD_PROJECT](projectName, positionsToBuild, valuesToInclude)
      };
    },
    displayMessage: (projectName) => projectName ?
      'Use the arrow keys to rotate the project blueprint. Valid build locations are highlighted in green.' :
      'Select a structure to build, or end your turn. (Projects you are able to build are highlighted in yellow.)',
    buttons: ['undoExpand', 'endTurn'],
    getPossibleMoves: (state, playerId) => {
      // const possibleProjects = getProjects(state, playerId).filter(({ canBuild }) => canBuild);
      // const emptyTiles = getTiles(state).filter(({ owner }) => !owner);
      // emptyTiles.reduce((possibleMoves, currentTile) => {
      //   const possibleMovesAtTile = possibleProjects.reduce((validMovesAtTile, project) => {
      //     const numberOfRotations = ShapePositions[project.shape].length;
      //     const validProjectMovesAtTile = [...Array(numberOfRotations).keys()]
      //       .map(rotation => getPositionsForShapeAtPosition(currentTile.position, rotation, project.name))
      //       .filter(positions => canBuildInPositions(state, playerId, positions, project.name))
      //       .map(positions => ({ move: Move.BUILD_PROJECT, args: [project.name, positions, getValueToInclude(state, playerId, project.name, positions)] }))
      //     return validMovesAtTile.concat(validProjectMovesAtTile);
      //   }, []);
      //   return possibleMoves.concat(possibleMovesAtTile);
      // }, []);
      const possibleProjects = getProjects(state, playerId).filter(({ canBuild }) => canBuild);
      return getTiles(state).filter(({ owner }) => !owner).reduce((possibleMoves, currentTile) => possibleMoves.concat(possibleProjects.reduce((validMovesAtTile, project) => validMovesAtTile.concat([...Array(ShapePositions[project.shape].length).keys()]
          .map(rotation => getPositionsForShapeAtPosition(currentTile.position, rotation, project.name))
          .filter(positions => canBuildInPositions(state, playerId, positions, project.name))
          .map(positions => ({ move: Move.BUILD_PROJECT, args: [project.name, positions, getValueToInclude(state, playerId, project.name, positions)] }))), [])), [])
          .concat({ move: Move.END_TURN });
    }
  },
  [Stage.FERRY]: {
    stageName: Stage.FERRY,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastFerryValidLandingPositions(state, playerId)),
      canAct: true,
      onTileClick: (moves, positionsToBuild) => moves[Move.FERRY](positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker adjacent to the body of water that the ferry is touching.',
    buttons: ['endTurn'],
    getPossibleMoves: (state, playerId) => getLastFerryValidLandingPositions(state, playerId).map(position => ({ move: Move.FERRY, args: [position] })).concat({ move: Move.END_TURN })
  },
  [Stage.REPLACE]: {
    stageName: Stage.REPLACE,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastMonumentValidReplacePositions(state, playerId)),
      canAct: true,
      onTileClick: (moves, positionsToBuild) => moves[Move.REPLACE_ENEMY](positionsToBuild[0])
    }),
    displayMessage: () => 'Select an enemy marker within two tiles of the monument to replace with one of yours.',
    buttons: ['endTurn'],
    getPossibleMoves: (state, playerId) => getLastMonumentValidReplacePositions(state, playerId).map(position => ({ move: Move.REPLACE_ENEMY, args: [position] })).concat({ move: Move.END_TURN })
  },
  [Stage.TUNNEL]: {
    stageName: Stage.TUNNEL,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastTunnelValidLandingPositions(state, playerId)),
      canAct: true,
      onTileClick: (moves, positionsToBuild) => moves[Move.TUNNEL](positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker adjacent to the enemy structure that the tunnel is touching.',
    buttons: ['endTurn'],
    getPossibleMoves: (state, playerId) => getLastTunnelValidLandingPositions(state, playerId).map(position => ({ move: Move.TUNNEL, args: [position] })).concat({ move: Move.END_TURN })
  },
  [Stage.TRAM]: {
    stageName: Stage.TRAM,
    getBoardState: (state, playerId, position) => {
      const tramwayAdjacentTiles = getLastTramwayAdjacentTiles(state, playerId);
      const valid = isPositionInList(position, tramwayAdjacentTiles.filter(tile => tile.owner && !tile.building).map(tile => tile.position));
      return {
        positionsToBuild: [position],
        valid,
        canAct: true,
        drag: {
          canDrag: () => valid,
          canDrop: (position) => isPositionInList(position, tramwayAdjacentTiles.filter(tile => !tile.owner && tile.resource !== Resource.WATER).map(tile => tile.position)),
          onDrop: (moves, fromPosition, toPosition) => moves[Move.TRAM](fromPosition, toPosition)
        }
      };
    },
    displayMessage: () => 'Drag and drop a friendly or enemy marker adjacent to the tramway to an unclaimed tile also adjacent to the tramway.',
    buttons: ['endTurn'],
    getPossibleMoves: (state, playerId) => {
      const tramwayAdjacentTiles = getLastTramwayAdjacentTiles(state, playerId);
      const validFromPositions = tramwayAdjacentTiles.filter(tile => tile.owner && !tile.building).map(tile => tile.position);
      const validToPositions = tramwayAdjacentTiles.filter(tile => !tile.owner && tile.resource !== Resource.WATER).map(tile => tile.position);
      return validFromPositions.reduce((validTramMoves, fromPosition) => {
        // const validMovesFromPosition = [];
        // validToPositions.forEach(toPosition => {
        //   if (!positionsAreEqual(fromPosition, toPosition)) {
        //     validMovesFromPosition.push({ move: Move.TRAM, args: [fromPosition, toPosition] })
        //   }
        // });
        // return validTramMoves.concat(validMovesFromPosition);

        return validTramMoves.concat(validToPositions.filter(toPosition => !positionsAreEqual(fromPosition, toPosition)).map(toPosition => ({ move: Move.TRAM, args: [fromPosition, toPosition] })));
      }, []).concat({ move: Move.END_TURN });
    }
  },
  [Stage.STING]: {
    stageName: Stage.STING,
    getBoardState: (state, _, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getStingRemainingPositionOptions(state)),
      canAct: true,
      onTileClick: (moves, positionsToBuild) => moves[Move.ARREST](positionsToBuild[0])
    }),
    displayMessage: () => 'For each of the prisons you control, select an adjacent friendly or enemy marker to remove.',
    buttons: ['endTurn'],
    getPossibleMoves: (state) => getStingRemainingPositionOptions(state).map(position => ({ move: Move.ARREST, args: [position] })).concat({ move: Move.END_TURN })
  },
  [Stage.STEAL]: {
    stageName: Stage.STEAL,
    getResourcesModal: (state, playerId) => {
      const enemyResources = getEnemyResources(state, playerId);
      return {
        title: 'Steal Resources',
        description: [
          'Steal up to two enemy resources.'
        ],
        buttonText: 'Steal',
        resources: enemyResources,
        validSelections: [{ [Resource.ANY]: 0 }, { [Resource.ANY]: 1 }, { [Resource.ANY]: 2 }],
        canCancel: false,
        onClose: (moves, resources) => moves[Move.STEAL_RESOURCES](resources)
      };
    },
    displayMessage: () => 'Steal up to two enemy resources.',
    getPossibleMoves: (state, playerId) => getAllValidStealOptions(getEnemyResources(state, playerId), 2).map(stealOption => ({ move: Move.STEAL_RESOURCES, args: [stealOption] }))
  },
  [Stage.LOAN]: {
    stageName: Stage.LOAN,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: [
        'Choose resource to be loaned:'
      ],
      canCancel: false,
      onClose: (moves, resourceType) => moves[Move.RECIEVE_LOAN](resourceType)
    }),
    displayMessage: () => 'Select a resource for your loan.',
    getPossibleMoves: () => [{ move: Move.RECIEVE_LOAN, args: [Resource.BUILDING_MATERIAL] }, { move: Move.RECIEVE_LOAN, args: [Resource.COIN] }, { move: Move.RECIEVE_LOAN, args: [Resource.LABOR] }]
  },
  [Stage.SET_GUILD]: {
    stageName: Stage.SET_GUILD,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: [
        '+1 Victory Point for every adjacent tile with the selected resource:'
      ],
      canCancel: false,
      onClose: (moves, resourceType) => moves[Move.SET_GUILD_POINTS](resourceType)
    }),
    displayMessage: () => 'Select a resource for your guild.',
    getPossibleMoves: () => [{ move: Move.SET_GUILD_POINTS, args: [Resource.BUILDING_MATERIAL] }, { move: Move.SET_GUILD_POINTS, args: [Resource.COIN] }, { move: Move.SET_GUILD_POINTS, args: [Resource.LABOR] }]
  }
};

export const getStage = (stageName) => Stages[stageName] || Stages[Stage.EXPAND];
