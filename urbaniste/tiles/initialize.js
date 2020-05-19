import {
  BoardSize,
  TileGroupSize,
  TileGroups
} from '../constants';
import { shuffle } from '../utils';

const getGroupPositions = (boardSize) => {
  const { groupRows, groupCols } = (BoardSize[boardSize] || BoardSize.classic).size;
  
  const groupPositions = [];
  const cols = [...Array(groupCols).keys()];
  [...Array(groupRows).keys()].forEach(row => cols.forEach(col => groupPositions.push([row, col])));

  return groupPositions;
};

const offsetToAxial = ({ row, col }) => ({ row, col: col - Math.floor(row / 2) });

const getTileGroups = ({ groupRow, groupCol }, resources) => {
  const groupResources = groupRow % 2 === 0 ? resources : [...resources].reverse();
  const groupStart = { row: groupRow * TileGroupSize.rows, col: groupCol * TileGroupSize.cols};
  const cols = [...Array(TileGroupSize.cols).keys()];

  const tileGroup = [];
  [...Array(TileGroupSize.rows).keys()].forEach(row => cols.forEach(col => {
    const index = (row * TileGroupSize.cols) + col;
    tileGroup.push({
      position: offsetToAxial({ row: groupStart.row + row, col: groupStart.col + col }),
      resource: groupResources[index]
    });
  }));
  return tileGroup;
};

export default function initialize({
  tileGroupPositions,
  boardSize = 'classic'
} = {}) {
  const tiles = {};
  const groupPositions = getGroupPositions(boardSize);
  tileGroupPositions = tileGroupPositions || shuffle([...Array(groupPositions.length).keys()]);
  tileGroupPositions.map((position, index) => getTileGroups({
    groupRow: groupPositions[index][0],
    groupCol: groupPositions[index][1]
  }, TileGroups[position % TileGroups.length])).flat().forEach(tile => {
    tiles[tile.position.row] = tiles[tile.position.row] || {};
    tiles[tile.position.row][tile.position.col] = tile;
  });
  return tiles;
}
