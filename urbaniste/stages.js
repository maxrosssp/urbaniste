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
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ TakeTile }, { positionsToBuild }) => TakeTile(positionsToBuild[0])
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
        })
      };
    },
    buttons: ['undoExpand', 'endTurn'],
    action: ({ BuildProject }, { positionsToBuild }, projectName, valuesToInclude) => BuildProject(projectName, positionsToBuild, valuesToInclude)
  },
  [Stage.FERRY]: {
    stageName: Stage.FERRY,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastFerryValidLandingPositions(state, playerId)),
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ Ferry }, { positionsToBuild }) => Ferry(positionsToBuild[0])
  },
  [Stage.REPLACE]: {
    stageName: Stage.REPLACE,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastMonumentValidReplacePositions(state, playerId)),
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ ReplaceEnemy }, { positionsToBuild }) => ReplaceEnemy(positionsToBuild[0])
  },
  [Stage.TUNNEL]: {
    stageName: Stage.TUNNEL,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastTunnelValidLandingPositions(state, playerId)),
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ Tunnel }, { positionsToBuild }) => Tunnel(positionsToBuild[0])
  },
  [Stage.TRAM]: {
    stageName: Stage.TRAM,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getLastTunnelValidLandingPositions(state, playerId)),
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ Tunnel }, { positionsToBuild }) => Tunnel(positionsToBuild[0])
  }
  [Stage.STING]: {
    stageName: Stage.STING,
    getBoardState: (state, playerId, position) => ({
      positionsToBuild: [position],
      valid: isPositionInList(position, getStingRemainingOptions(state)),
      canAct: true
    }),
    buttons: ['endTurn'],
    action: ({ Arrest }, { positionsToBuild }) => Arrest(positionsToBuild[0])
  },
  [Stage.STEAL]: {
    stageName: Stage.STEAL,
    getResourcesModal: (state, playerId) => ({
      title: 'Steal Resources',
      buttonText: 'Steal',
      resources: getEnemyResources(state, playerId),
      validSelections: [{ [Resource.ANY]: 0 }, { [Resource.ANY]: 1 }, { [Resource.ANY]: 2 }],
      canCancel: false
    }),
    action: ({ StealResources }, resources) => StealResources(resources)
  },
  [Stage.LOAN]: {
    stageName: Stage.LOAN,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: 'Choose resource to be loaned:',
      canCancel: false
    }),
    action: ({ RecieveLoan }, resourceType) => RecieveLoan(resourceType)
  },
  [Stage.SET_GUILD]: {
    stageName: Stage.SET_GUILD,
    getResourceSelectModal: () => ({
      title: 'Select Resource',
      description: '+1 Victory Point for every adjacent tile with the selected resource:',
      canCancel: false
    }),
    action: ({ SetGuildPoints }, resourceType) => SetGuildPoints(resourceType)
  }
};

export const getStage = (stageName) => Stages[stageName] || Stages[Stage.EXPAND];
