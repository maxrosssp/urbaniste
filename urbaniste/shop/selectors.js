import { Resource } from '../constants';
import {
  getProject
} from './projects';
import {
  validateShape,
  validateNoBuildingOverlap,
  getAllPositionsForShapeContainingPosition
} from '../buildings/validation';
import {
  isPositionOnBoard
} from '../utils';
import {
  getAllPlayerTiles
} from '../tiles/selectors';

const canAfford = (playerResources, cost) => {
  const remainingCost = { ...cost };
  Object.keys(playerResources).forEach(resource => {
    remainingCost[resource] = (remainingCost[resource] || 0) - playerResources[resource];
    if (remainingCost[Resource.ANY] && remainingCost[resource] < 0) {
      remainingCost[Resource.ANY] = remainingCost[Resource.ANY] + remainingCost[resource];
    }
  });
  return Object.values(remainingCost).every(remaining => remaining <= 0);
};
const getAvailable = (project) => project.available - project.count;
export const getCost = (project, state, playerId, positions) => (project && typeof project.cost === 'function') ? project.cost(state, playerId, positions) : (project || {}).cost;
const getVictoryPoints = (project, state, playerId, positions) => (typeof project.victoryPoints === 'function') ? project.victoryPoints(state, playerId, positions) : project.victoryPoints;

export const canBuildProjectInPositions = (project, state, playerId, positions) => getAvailable(project) > 0 && canAfford(state.players[playerId].resources, getCost(project, state, playerId, positions));

const canBuildProjectAtPosition = (project, state, playerId, position) => getAllPositionsForShapeContainingPosition(position, project.shape).some(positions => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  return validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
    canBuildProjectInPositions(project, state, playerId, positionsOnBoard) &&
    project.validator(state, playerId, positionsOnBoard);
});
export const canBuild = (project, state, playerId) => getAllPlayerTiles(state, playerId).filter(tile => !tile.building).some(tile => canBuildProjectAtPosition(project, state, playerId, tile.position));

const getFullProject = (state, projectName) => ({ ...state.shop.projects[projectName], ...getProject(projectName) });

export const getProjects = (state, playerId) => Object.values(state.shop.projects).map(projectInShop => {
  const project = { ...projectInShop, ...getProject(projectInShop.name) };
  return {
    ...project,
    canBuild: canBuild(project, state, playerId),
    ...getCost(project, state, playerId),
    available: getAvailable(project),
    vp: getVictoryPoints(project, state, playerId)
  };
});

export const getSelectedProjectName = (state, playerId) => state.players[playerId].selectedProject;
export const getSelectedProject = (state, playerId) => getFullProject(state, getSelectedProjectName(state, playerId));
export const isSelectedProjectVariableCost = (state, playerId, positions) => getCost(getSelectedProject(state, playerId), state, playerId, positions)[Resource.ANY] > 0;
export const getSelectedProjectCost = (state, playerId, positions) => getCost(getSelectedProject(state, playerId), state, playerId, positions);
