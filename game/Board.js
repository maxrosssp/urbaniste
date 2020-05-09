import { Resource } from './constants.js';
import { shuffle } from './utils.js';
import {
  moveInDirection,
  tilesAreEqual
} from './projects/shapeUtils.js';
import Tile from './Tile.js';

const BOARD_SIZES = {
  default: {groupRows: 3, groupCols: 4}
};

const DIRECTIONS = [[0, 1], [1, 0], [0, -1], [-1, 0], [1, -1], [-1, 1]];

const GROUP_SIZE = {rows: 3, cols: 3};
const GROUP_POSITIONS = [[0, 0], [0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2], [1, 3], [2, 0], [2, 1], [2, 2], [2, 3]];
const TILE_GROUPS = [
  [Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN],
  [Resource.COIN, Resource.LABOR, Resource.COIN, Resource.WATER, Resource.WATER, Resource.WATER, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.COIN],
  [Resource.COIN, Resource.WATER, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.WATER, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.LABOR, Resource.COIN, Resource.WATER, Resource.LABOR, Resource.LABOR, Resource.LABOR],
  [Resource.WATER, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.WATER, Resource.COIN, Resource.LABOR, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.LABOR],
  [Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.LABOR, Resource.WATER, Resource.WATER, Resource.WATER],
  [Resource.COIN, Resource.WATER, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.WATER, Resource.LABOR, Resource.COIN],
  [Resource.LABOR, Resource.LABOR, Resource.WATER, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.WATER, Resource.BUILDING_MATERIAL],
  [Resource.BUILDING_MATERIAL, Resource.COIN, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.WATER],
  [Resource.WATER, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.COIN, Resource.LABOR, Resource.WATER, Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.BUILDING_MATERIAL],
  [Resource.BUILDING_MATERIAL, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.BUILDING_MATERIAL, Resource.COIN, Resource.COIN, Resource.COIN, Resource.WATER, Resource.LABOR],
  [Resource.BUILDING_MATERIAL, Resource.LABOR, Resource.LABOR, Resource.WATER, Resource.LABOR, Resource.COIN, Resource.LABOR, Resource.LABOR, Resource.COIN]
];

const TILE_POSITIONS = [[0, 0], [0, 1], [0, 2], [1, 0], [1, 1], [1, 2], [2, 0], [2, 1], [2, 2]];

const offsetToAxial = ({row, col}) => ({row, col: col - Math.floor(row / 2)});

const getGroupTiles = (
  {groupRow, groupCol},
  resources
) => (groupRow % 2 === 0 ? resources : [...resources].reverse()).map((resource, index) => Tile(offsetToAxial({
  row: TILE_POSITIONS[index][0] + (groupRow * GROUP_SIZE.rows),
  col: TILE_POSITIONS[index][1] + (groupCol * GROUP_SIZE.cols)
}), resource));

const setupTiles = function(positions = shuffle([...Array(12).keys()]), boardSize = BOARD_SIZES.default) {
  const tiles = {};
  positions.map((position, index) => getGroupTiles({
    groupRow: GROUP_POSITIONS[index][0],
    groupCol: GROUP_POSITIONS[index][1]
  }, TILE_GROUPS[position])).flat().forEach(tile => {
    tiles[tile.position.row] = tiles[tile.position.row] || {};
    tiles[tile.position.row][tile.position.col] = tile;
  });
  return tiles;
}

export default function(tileGroupPositions) {
  const tiles = setupTiles(tileGroupPositions);

  const getTile = (row, col) => tiles[row][col];
  const getAdjacentTiles = (tile) => DIRECTIONS.map(direction => getTile(...moveInDirection(tile.coordinates, direction)));
  const getAllAdjacentTiles = (tiles) => [...new Set(tiles.map(tile => getAdjacentTiles(tile)).flat())].filter(adjacentTile => !tiles.find(tile => tilesAreEqual(tile, adjacentTile)));

  return {
    tiles,
    getTile,
    takeTile: (row, col, player) => getTile(row, col).take(player),
    getAdjacentTiles,
    getAllAdjacentTiles
  };
}