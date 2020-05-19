import {
  ShapePositions
} from '../constants';
import {
  isPositionOnBoard,
  normalize,
  getTiles,
  positionsAreEqual
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

export const canBuildInPositions = (state, playerId, positions = []) => {
  const positionsOnBoard = positions.filter(position => isPositionOnBoard(state, position));
  const project = getSelectedProject(state, playerId);
  return project && project.name &&
    validateNoBuildingOverlap(state, positionsOnBoard) &&
    validateShape(positionsOnBoard, project.shape) &&
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
