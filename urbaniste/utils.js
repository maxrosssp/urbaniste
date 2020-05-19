import {
  BoardSize,
  Directions
} from './constants';

export const shuffle = (initArray) => {
  const array = [...initArray];
  var currentIndex = array.length
  var temporaryValue
  var randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

export const getStartPositions = ({ boardSize = 'classic' } = {}, playerConfigs = []) => (BoardSize[boardSize] || BoardSize.classic).start[playerConfigs.length];

export const moveInDirection = ({ row, col }, direction) => ({ row: row + direction.row, col: col + direction.col });
export const normalize = ({ row, col }, positions) => positions.map(position => moveInDirection({ row, col }, position));
export const positionsAreEqual = (positionA, positionB) => positionA && positionB && positionA.row === positionB.row && positionA.col === positionB.col;

export const isPositionOnBoard = (state, { row, col }) => state.tiles[row] && state.tiles[row][col];
export const getTile = (state, { row, col }) => state.tiles[row][col];
export const getTiles = (state, positions) => (positions || []).filter(position => isPositionOnBoard(state, position)).map(position => getTile(state, position));
export const getAdjacentTiles = (state, position) => getTiles(state, Directions.map(direction => moveInDirection(position, direction)));
export const getAllAdjacentTiles = (state, positions) => [...new Set(positions.map(position => getAdjacentTiles(state, position)).flat())].filter(adjacentTile => !positions.find(position => positionsAreEqual(position, adjacentTile.position)));
export const getTilesAdjacentToAll = (state, positions) => {
  var adjacentTilesByTiles = positions.map(position => getAdjacentTiles(state, position));
  return getAllAdjacentTiles(state, positions).filter(adjacentTile => adjacentTilesByTiles.every(adjacentTiles => adjacentTiles.some(tile => positionsAreEqual(tile.position, adjacentTile.position))));
};

export function getAllAdjacentBuildings(state, positions) {
  if (!positions) {
    return [];
  }
  const adjacentPositions = getAllAdjacentTiles(state, positions).map(tile => tile.position);
  return state.buildings.filter(building => building.positions.some(position => adjacentPositions.some(adjacentPosition => positionsAreEqual(adjacentPosition, position))));
}

export const getPlayerBuildingsOfType = (state, playerId, type) => state.buildings.filter(building => building.owner === playerId && building.name === type);
