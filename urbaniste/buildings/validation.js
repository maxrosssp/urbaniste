import {
  Building,
  Resource,
  ShapePositions
} from '../constants';
import {
  isPositionOnBoard,
  normalize,
  getTiles,
  getAdjacentTiles,
  positionsAreEqual,
  getAllAdjacentBuildings
} from '../utils';
import {
  canBuildProjectInPositions,
  getProject
} from '../shop/selectors';
import {
  validateClaims,
  validateWaterCount,
  validateCenter
} from '../shop/validation';

const shapesAreEqual = (positionsA, positionsB) => positionsA.length === positionsB.length && !positionsA.some(positionA => !positionsB.some(positionB => positionsAreEqual(positionA, positionB)));
const validatePositionsShape = (positions, shape) => positions.some(({ row, col }) => (ShapePositions[shape].some(shapePositions => shapesAreEqual(normalize({ row: row * -1, col: col * -1 }, positions), shapePositions))));

const validateSize = (positions, shape) => positions.length === ShapePositions[shape][0].length
export const validateShape = (positions, shape) => validateSize(positions, shape) && validatePositionsShape(positions, shape);

export const validateNoBuildingOverlap = (state, positions) => !getTiles(state, positions).some(tile => tile.building);

export const validateNoAdjacentBuildingType = (state, positions, buildingName) => !getAllAdjacentBuildings(state, positions).some(building => building.name === buildingName);
export const validateNoEnemyWatchtowerAdjacent = (state, positions, playerId) => !getAllAdjacentBuildings(state, positions).some(building => building.name === Building.WATCHTOWER && building.owner !== playerId);

export const isAcrossFromPlayerLock = (state, playerId, position) => getAdjacentTiles(state, position).some(tile => (
  tile.resource === Resource.WATER &&
  getAdjacentTiles(state, tile.position).some(tile => tile.owner === playerId && tile.building === Building.LOCK)
));

export const canBuildInPositions = (state, playerId, positions = [], projectName) => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  const project = getProject(state, projectName);
  return project && project.name &&
    validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
    validateNoEnemyWatchtowerAdjacent(state, positionsOnBoard, playerId) &&
    validateNoAdjacentBuildingType(state, positionsOnBoard, Building.CATHEDRAL) &&
    canBuildProjectInPositions(project, state, playerId, positionsOnBoard) &&
    (!project.claims || validateClaims(state, positionsOnBoard, playerId, project.claims)) &&
    (!project.center || validateCenter(state, positionsOnBoard, playerId, project.center)) &&
    (!project.validator || project.validator(state, positionsOnBoard, playerId));
};

const shapeRotations = {};
const getAllRotationsForShape = (shape) => {
  if (shapeRotations[shape]) {
    return shapeRotations[shape];
  }
  const rotations = [];
  ShapePositions[shape].forEach(positions => positions.forEach(({ row, col }) => {
    const newRotation = normalize({ row: row * -1, col: col * -1}, positions);
    if (!rotations.some(rotation => shapesAreEqual(rotation, newRotation))) {
      rotations.push(newRotation);
    }
  }));
  shapeRotations[shape] = rotations;
  return rotations;
};

export const getAllPositionsForShapeContainingPosition = (position, shape) => {
  return getAllRotationsForShape(shape).map(rotation => normalize(position, rotation));
};

const buildingsAreEqual = (buildingA, buildingB) => (
  buildingA.name === buildingB.name && 
  buildingA.owner === buildingB.owner && 
  shapesAreEqual(buildingA.positions, buildingB.positions)
);

const getAdjacentFriendlyBuildings = (state, playerId, positions) => getAllAdjacentBuildings(state, positions).filter(building => building.owner === playerId);

const isBuildingInList = (building, buildingList) => buildingList.some(buildingFromList => buildingsAreEqual(building, buildingFromList));

const getContiguousFriendlyBuildingsRec = (state, playerId, buildings, contiguous = []) => {
  if (buildings.length === 0) {
    return contiguous;
  }
  const adjacentFriendlyBuildings = buildings.map(building => getAdjacentFriendlyBuildings(state, playerId, building.positions)).flat().filter(building => !isBuildingInList(building, contiguous));
  return getContiguousFriendlyBuildingsRec(state, playerId, adjacentFriendlyBuildings, adjacentFriendlyBuildings.concat(contiguous));
};

export const getContiguousFriendlyBuildings = (state, playerId, positions) => {
  return getContiguousFriendlyBuildingsRec(state, playerId, [{ positions }]);
};
