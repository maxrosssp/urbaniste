import {
  Resource,
  Building,
  ShapePositions
} from '../constants';
import {
  getProjectConfig
} from './projects';
import {
  validateShape,
  validateNoBuildingOverlap,
  getAllPositionsForShapeContainingPosition,
  validateNoEnemyWatchtowerAdjacent,
  validateNoAdjacentBuildingType
} from '../buildings/validation';
import {
  isPositionOnBoard
} from '../utils';
import {
  getPlayerPossibleBuildTiles
} from '../tiles/selectors';
import {
  getBuildingPoints
} from '../misc/selectors';
import {
  validateClaims,
  validateWaterCount,
  validateCenter,
  getSortedPositions
} from './validation';

const canAffordPayment = (playerResources, payment) => {
  const remainingCost = { ...payment };
  Object.keys(playerResources).forEach(resource => {
    remainingCost[resource] = (remainingCost[resource] || 0) - playerResources[resource];
    if (remainingCost[Resource.ANY] && remainingCost[resource] < 0) {
      remainingCost[Resource.ANY] = remainingCost[Resource.ANY] + remainingCost[resource];
    }
  });
  return Object.values(remainingCost).every(remaining => remaining <= 0);
};
const canAfford = (playerResources, allowedPayments) => allowedPayments.some(payment => canAffordPayment(playerResources, payment));
const getAvailable = (project) => project.available - project.count;
export const getCost = (project, state, playerId, positions) => (project && typeof project.cost === 'function') ? project.cost(state, playerId, positions) : (project || {}).cost;
export const getVictoryPoints = (project, state, playerId, positions = []) => getBuildingPoints(state, project.name) || (typeof project.victoryPoints === 'function' ? project.victoryPoints(state, positions, playerId) : project.victoryPoints);

export const canBuildProjectInPositions = (project, state, playerId, positions) => getAvailable(project) > 0 && canAfford(state.players[playerId].resources, project.allowedPayments || [getCost(project, state, playerId, positions)]);

const canBuildProjectAtPosition = (project, state, playerId, position) => getAllPositionsForShapeContainingPosition(position, project.shape).some(positions => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  return validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
    validateNoEnemyWatchtowerAdjacent(state, positionsOnBoard, playerId) &&
    validateNoAdjacentBuildingType(state, positionsOnBoard, Building.CATHEDRAL) &&
    canBuildProjectInPositions(project, state, playerId, positionsOnBoard) &&
    (!project.claims || validateClaims(state, positionsOnBoard, playerId, project.claims)) &&
    (!project.center || validateCenter(state, positionsOnBoard, playerId, project.center)) &&
    (!project.validator || project.validator(state, positionsOnBoard, playerId));
});
export const canBuild = (project, state, playerId) => getPlayerPossibleBuildTiles(state, playerId).some(tile => canBuildProjectAtPosition(project, state, playerId, tile.position));

export const getProject = (state, projectName) => ({ ...state.shop.projects[projectName], ...getProjectConfig(projectName) });

const getVictoryPointsDisplay = (state, project) => getBuildingPoints(state, project.name) || (typeof project.victoryPoints === 'function' ? '?' : project.victoryPoints);

export const getProjects = (state, playerId) => Object.values(state.shop.projects).map(({ name }) => {
  const project = getProject(state, name);
  return {
    ...project,
    canBuild: canBuild(project, state, playerId),
    ...getCost(project, state, playerId),
    available: getAvailable(project),
    vp: getVictoryPointsDisplay(state, project)
  };
});

export const isProjectVariableCost = (state, playerId, projectName, positions) => {
  const project = getProject(state, projectName);
  return project.allowedPayments !== undefined || getCost(project, state, playerId, positions)[Resource.ANY] > 0;
};
export const getProjectCost = (state, playerId, projectName, positions) => {
  const project = getProject(state, projectName);
  return project.allowedPayments || [getCost(project, state, playerId, positions)];
};

export const getProjectShapeDisplay = (projectName) => {
  const { shape, claims, center } = getProjectConfig(projectName);
  const positions = getSortedPositions(ShapePositions[shape][0]);

  var properties;
  if (projectName === Building.BOULEVARD) {
    properties = [
      { unclaimed: true },
      { friendly: true },
      { friendly: true, unclaimed: true }
    ];
  } else if (projectName === Building.CANAL) {
    properties = [
      { friendly: true },
      { friendly: true, water: true },
      { water: true }
    ];
  } else if (projectName === Building.SHIPYARD) {
    properties = [
      { friendly: true, enemy: true, water: true },
      { friendly: true, enemy: true, water: true },
      { friendly: true, enemy: true, water: true }
    ];
  } else if (projectName === Building.GRAND_CANAL) {
    properties = [
      { friendly: true, unclaimed: true, water: true },
      { friendly: true, unclaimed: true, water: true },
      { friendly: true, unclaimed: true, water: true },
      { friendly: true, unclaimed: true, water: true },
      { friendly: true, unclaimed: true, water: true }
    ];
  } else {
    properties = positions.map(() => ({ water: false, friendly: false, enemy: false, unclaimed: false }));
    var remainingClaims = { ...(claims instanceof Array ? claims[0] : claims) };
    if (center) {
      const centerIndex = Math.floor(positions.length / 2);
      properties[centerIndex] = { ...properties[centerIndex], ...center };
      if (center.water) {
        remainingClaims.water = (remainingClaims.water || 0) - 1;
      } else if (center.unclaimed) {
        remainingClaims.unclaimed = (remainingClaims.unclaimed || 0) - 1;
      } else if (center.enemy) {
        remainingClaims.enemy = (remainingClaims.enemy || 0) - 1;
      } else if (center.friendly) {
        remainingClaims.friendly = (remainingClaims.friendly || 0) - 1;
      }
    }

    const hasProperty = (properties) => Object.values(properties).some(property => property);
    var index = 0;
    while (index < properties.length) {
      if (!hasProperty(properties[index])) {
        if (remainingClaims.unclaimed > 0) {
          properties[index].unclaimed = true;
          remainingClaims.unclaimed = (remainingClaims.unclaimed || 0) - 1;
        } else if (remainingClaims.friendly > 0) {
          properties[index].friendly = true;
          remainingClaims.friendly = (remainingClaims.friendly || 0) - 1;
        } else if (remainingClaims.enemy > 0) {
          properties[index].enemy = true;
          remainingClaims.enemy = (remainingClaims.enemy || 0) - 1;
        }
      }
      index += 1;
    }
  }

  return positions.map((position, index) => ({ position, properties: properties[index] }));
};
