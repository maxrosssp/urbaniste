import { Stage, Resource } from './constants';
import {
  getPositionsForShapeAtPosition
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
  getStingRemainingOptions
} from './buildings/selectors';
import {
  getProjectCost,
  isProjectVariableCost
} from './shop/selectors';
import {
  getPlayerResources,
  getEnemyResources
} from './players/selectors';
import {
  isPositionInList
} from './utils';

const Stages = {
  [Stage.EXPAND]: {
    stageName: Stage.EXPAND,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: canTakeTileAtPosition(state, playerId, position),
      canAct: true,
      onTileClick: ({ TakeTile }, positionsToBuild) => TakeTile(positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker to expand your control. Valid locations are highlighted in green.',
    buttons: ['endTurn']
  },
  [Stage.BUILD]: {
    stageName: Stage.BUILD,
    getBoardState: (state, playerId, position, rotation, projectName) => {
      const positions = getPositionsForShapeAtPosition(position, rotation, projectName);
      return {
        positionsToBuild: positions,
        valid: canBuildInPositions(state, playerId, positions, projectName),
        canAct: Boolean(projectName),
        getValueToInclude: (state, playerId, projectName, positionsToBuild) => projectName && isProjectVariableCost(state, playerId, projectName, positionsToBuild) && ({
          name: 'payResources',
          playerResources: getPlayerResources(state, playerId),
          validPayments: getProjectCost(state, playerId, projectName, positionsToBuild)
        }),
        onTileClick: ({ BuildProject }, positionsToBuild, projectName, valuesToInclude) => BuildProject(projectName, positionsToBuild, valuesToInclude)
      };
    },
    displayMessage: (projectName) => projectName ?
      'Use the arrow keys to rotate the project blueprint. Valid build locations are highlighted in green.' :
      'Select a structure to build, or end your turn. (Projects you are able to build are highlighted in yellow.)',
    buttons: ['undoExpand', 'endTurn']
  },
  [Stage.FERRY]: {
    stageName: Stage.FERRY,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastFerryValidLandingPositions(state, playerId)),
      canAct: true,
      onTileClick: ({ Ferry }, positionsToBuild) => Ferry(positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker adjacent to the body of water that the ferry is touching.',
    buttons: ['endTurn']
  },
  [Stage.REPLACE]: {
    stageName: Stage.REPLACE,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastMonumentValidReplacePositions(state, playerId)),
      canAct: true,
      onTileClick: ({ ReplaceEnemy }, positionsToBuild) => ReplaceEnemy(positionsToBuild[0])
    }),
    displayMessage: () => 'Select an enemy marker within two tiles of the monument to replace with one of yours.',
    buttons: ['endTurn']
  },
  [Stage.TUNNEL]: {
    stageName: Stage.TUNNEL,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastTunnelValidLandingPositions(state, playerId)),
      canAct: true,
      onTileClick: ({ Tunnel }, positionsToBuild) => Tunnel(positionsToBuild[0])
    }),
    displayMessage: () => 'Place a marker adjacent to the enemy structure that the tunnel is touching.',
    buttons: ['endTurn']
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
          onDrop: ({ Tram }, fromPosition, toPosition) => Tram(fromPosition, toPosition)
        }
      };
    },
    displayMessage: () => 'Drag and drop a friendly or enemy marker adjacent to the tramway to an unclaimed tile also adjacent to the tramway.',
    buttons: ['endTurn']
  },
  [Stage.STING]: {
    stageName: Stage.STING,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getStingRemainingOptions(state)),
      canAct: true,
      onTileClick: ({ Arrest }, positionsToBuild) => Arrest(positionsToBuild[0])
    }),
    displayMessage: () => 'For each of the prisons you control, select an adjacent friendly or enemy marker to remove.',
    buttons: ['endTurn']
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
        onClose: ({ StealResources }, resources) => StealResources(resources)
      };
    },
    displayMessage: () => 'Steal up to two enemy resources.'
  },
  [Stage.LOAN]: {
    stageName: Stage.LOAN,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: [
        'Choose resource to be loaned:'
      ],
      canCancel: false,
      onClose: ({ RecieveLoan }, resourceType) => RecieveLoan(resourceType)
    }),
    displayMessage: () => 'Select a resource for your loan.'
  },
  [Stage.SET_GUILD]: {
    stageName: Stage.SET_GUILD,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: [
        '+1 Victory Point for every adjacent tile with the selected resource:'
      ],
      canCancel: false,
      onClose: ({ SetGuildPoints }, resourceType) => SetGuildPoints(resourceType)
    }),
    displayMessage: () => 'Select a resource for your guild.'
  }
};

export const getStage = (stageName) => Stages[stageName] || Stages[Stage.EXPAND];
