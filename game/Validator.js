import {
  coordinatesAreEqual,
  moveInDirection
} from './building/shapeUtils.js';

const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, -1], [-1, 1]];

export default function(board) {
  const isSameTile = (tileA, tileB) => coordinatesAreEqual(tileA.coordinates, tileB.coordinates);
  const getAdjacentTiles = (tile) => DIRECTIONS.map(direction => board.getTile(...moveInDirection(tile.coordinates, direction)));
  const areAdjacent = (tileA, tileB) => Boolean(getAdjacentTiles(tileA).find(tile => isSameTile(tile, tileB)));

  return {
    getAdjacentTiles,
    areAdjacent
  }
}
