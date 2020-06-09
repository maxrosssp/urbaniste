import { Resource, Building } from '../constants';
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
export const getVictoryPoints = (project, state, playerId, positions = []) => getBuildingPoints(state, project.name) || (typeof project.victoryPoints === 'function' ? project.victoryPoints(state, playerId, positions) : project.victoryPoints);

export const canBuildProjectInPositions = (project, state, playerId, positions) => getAvailable(project) > 0 && canAfford(state.players[playerId].resources, project.allowedPayments || [getCost(project, state, playerId, positions)]);

const canBuildProjectAtPosition = (project, state, playerId, position) => getAllPositionsForShapeContainingPosition(position, project.shape).some(positions => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  return validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
    validateNoEnemyWatchtowerAdjacent(state, positionsOnBoard, playerId) &&
    validateNoAdjacentBuildingType(state, positionsOnBoard, Building.CATHEDRAL) &&
    canBuildProjectInPositions(project, state, playerId, positionsOnBoard) &&
    project.validator(state, playerId, positionsOnBoard);
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
