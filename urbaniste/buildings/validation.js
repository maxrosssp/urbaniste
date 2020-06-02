import {
  Building,
  ShapePositions
} from '../constants';
import {
  isPositionOnBoard,
  normalize,
  getTiles,
  positionsAreEqual,
  getAllAdjacentBuildings
} from '../utils';
import {
  canBuildProjectInPositions,
  getSelectedProject
} from '../shop/selectors';

const shapesAreEqual = (positionsA, positionsB) => positionsA.length === positionsB.length && !positionsA.some(positionA => !positionsB.some(positionB => positionsAreEqual(positionA, positionB)));
const validatePositionsShape = (positions, shape) => positions.some(({ row, col }) => (ShapePositions[shape].some(shapePositions => shapesAreEqual(normalize({ row: row * -1, col: col * -1 }, positions), shapePositions))));

const validateSize = (positions, shape) => positions.length === ShapePositions[shape][0].length
export const validateShape = (positions, shape) => validateSize(positions, shape) && validatePositionsShape(positions, shape);

export const validateNoBuildingOverlap = (state, positions) => !getTiles(state, positions).some(tile => tile.building);

export const validateNoAdjacentBuildingType = (state, positions, buildingName) => !getAllAdjacentBuildings(state, positions).some(building => building.name === buildingName);
export const validateNoEnemyWatchtowerAdjacent = (state, positions, playerId) => !getAllAdjacentBuildings(state, positions).some(building => building.name === Building.WATCHTOWER && building.owner !== playerId);

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

export const canBuildInPositions = (state, playerId, positions = []) => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  const project = getSelectedProject(state, playerId);
  return project && project.name &&
    validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
    validateNoEnemyWatchtowerAdjacent(state, positionsOnBoard, playerId) &&
    validateNoAdjacentBuildingType(state, positionsOnBoard, Building.CATHEDRAL) &&
    canBuildProjectInPositions(project, state, playerId, positionsOnBoard) &&
    project.validator(state, playerId, positionsOnBoard);
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
