import { Shape } from '../constants.js';

const shapeOptions = {
  [Shape.SINGLE]: [
    [0, 0]
  ],
  [Shape.LINE_2]: [
    [[0, 0], [1, 0]],
    [[0, 0], [0, 1]],
    [[0, 0], [-1, 1]]
  ],
  [Shape.LINE_3]: [
    [[-1, 0], [0, 0], [1, 0]],
    [[-1, 1], [0, 0], [1, -1]],
    [[0, -1], [0, 0], [0, 1]]
  ],
  [Shape.TRIANGLE_3]: [
    [[0, 0], [-1, 0], [-1, 1]],
    [[0, 0], [1, -1], [1, 0]]
  ],
  [Shape.V3]: [
    [[-1, 0], [0, 0], [0, 1]],
    [[-1, 1], [0, 0], [1, 0]],
    [[0, 1], [0, 0], [1, -1]],
    [[1, 0], [0, 0], [0, -1]],
    [[1, -1], [0, 0], [-1, 0]],
    [[0, -1], [0, 0], [-1, 1]]
  ],
  [Shape.DIAMOND]: [
    [[0, 0], [-1, 1], [0, 1], [1, 0]]
  ],
  [Shape.CANE]: [
    [[-1, 0], [0, 0], [0, 1], [0, 2]],
    [[-1, 1], [0, 0], [1, 0], [2, 0]],
    [[0, 1], [0, 0], [1, -1], [2, -2]],
    [[1, 0], [0, 0], [0, -1], [0, -2]],
    [[1, -1], [0, 0], [-1, 0], [-2, 0]],
    [[0, -1], [0, 0], [-1, 1], [-2, 2]]
  ],
  [Shape.V5]: [
    [[-2, 0], [-1, 0], [0, 0], [0, 1], [0, 2]],
    [[-2, 2], [-1, 1], [0, 0], [1, 0], [2, 0]],
    [[0, 2],  [0, 1],  [0, 0], [1, -1], [2, -2]],
    [[2, 0],  [1, 0],  [0, 0], [0, -1], [0, -2]],
    [[2, -2], [1, -1], [0, 0], [-1, 0], [-2, 0]],
    [[0, -2], [0, -1], [0, 0], [-1, 1], [-2, 2]]
  ],
  [Shape.U]: [
    [[-2, 1], [-1, 0], [0, 0],  [0, 1], [-1, 2]],
    [[-1, 2], [-1, 1], [0, 0],  [1, 0], [1, 1]],
    [[1, 1], [0, 1], [0, 0],  [1, -1], [2, -1]],
    [[2, -1], [1, 0], [0, 0],  [0, -1], [1, -2]],
    [[1, -2], [1, -1], [0, 0], [-1, 0], [-1, -1]],
    [[-1, -1], [0, -1], [0, 0], [-1, 1], [-2, 1]]
  ],
  [Shape.LINE_6]: [
    [[-3, 0], [-2, 0], [-1, 0], [0, 0], [1, 0], [2, 0]],
    [[-3, 3], [-2, 2], [-1, 1], [0, 0], [1, -1], [2, -2]],
    [[0, -3], [0, -2], [0, -1], [0, 0], [0, 1], [0, 2]]
  ],
  [Shape.STAR]: [
    [[0, 0], [-1, 0], [-1, 1], [0, 1], [1, 0], [1, -1], [0, -1]]
  ],
  [Shape.TRIANGLE_6]: [
    [[0, 0], [-1, 0], [-1, 1], [-2, 0], [-2, 1], [-2, 2]],
    [[0, 0], [1, -1], [1, 0], [2, -2], [2, 0], [2, -1]]
  ]
};

const moveInDirection = ([x_s, y_x], [x_d, y_d]) => [x_s + x_d, y_x + y_d];
const normalize = ([x, y], coordinates) => coordinates.map(coordinate => moveInDirection(coordinate, [x * -1, y * -1]));

const coordinatesAreEqual = ([x_1, y_1], [x_2, y_2]) => x_1 === x_2 && y_1 === y_2;
const shapesAreEqual = (coordinates1, coordinates2) => coordinates1.length === coordinates2.length &&
  !coordinates1.find(coordinate1 => !coordinates2.find(coordinate2 => coordinatesAreEqual(coordinate1, coordinate2)));
const tilesAreEqual = (tileA, tileB) => coordinatesAreEqual(tileA.coordinates, tileB.coordinates);

const validateShapeOfCoordinates = (coordinates, shape) => coordinates.find(coordinate => shapeOptions[shape]
  .find(shapeOption => shapesAreEqual(normalize(coordinate, coordinates), shapeOption)));

const validateSize = (tiles, shape) => tiles.length === shapeOptions[shape][0].length

const validateShape = (tiles, shape) => validateSize(tiles, shape) && validateShapeOfCoordinates(tiles.map(tile => tile.coordinates), shape);

const compareRows = (tileA, tileB) => tileA.position.row - tileB.position.row;
const compareCols = (tileA, tileB) => tileA.position.col - tileB.position.col;

const sortByRows = (tiles) => tiles.sort(compareRows);
const sortByCols = (tiles) => tiles.sort(compareCols);

export {
  coordinatesAreEqual,
  tilesAreEqual,
  moveInDirection,
  validateShape,
  sortByRows,
  sortByCols
};