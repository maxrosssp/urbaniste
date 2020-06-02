import {
  BoardSize,
  Directions,
  Resource
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

export const getPlayerBuildings = (state, playerId) => state.buildings.filter(building => building.owner === playerId);
export const getPlayerBuildingsOfType = (state, playerId, type) => state.buildings.filter(building => building.owner === playerId && building.name === type);

const getPossibleSelectionsForTotal = (total, count) => {
  if (count === 1) {
    return [total];
  }
  return [...Array(total + 1).keys()].reverse().map(prefix => getPossibleSelectionsForTotal(total - prefix, count - 1).flat()
    .map(output => output.length ? [prefix, ...output] : [prefix, output]));
};

const getPossibleResourceSelectionsForTotal = (validSelection) => {
  return getPossibleSelectionsForTotal(validSelection[Resource.ANY], 3).flat().map(([bm, c, l]) => ({
    [Resource.BUILDING_MATERIAL]: bm + (validSelection[Resource.BUILDING_MATERIAL] || 0),
    [Resource.COIN]: c + (validSelection[Resource.COIN] || 0),
    [Resource.LABOR]: l + (validSelection[Resource.LABOR] || 0)
  }));
};

const canAffordSelection = (selection, resources) => (
  resources[Resource.BUILDING_MATERIAL] >= selection[Resource.BUILDING_MATERIAL] &&
  resources[Resource.COIN] >= selection[Resource.COIN] &&
  resources[Resource.LABOR] >= selection[Resource.LABOR]
);

export const selectionsAreEqual = (selection1, selection2) => (
  selection1[Resource.BUILDING_MATERIAL] === selection2[Resource.BUILDING_MATERIAL] &&
  selection1[Resource.COIN] === selection2[Resource.COIN] &&
  selection1[Resource.LABOR] === selection2[Resource.LABOR]
);

const subtractSelectionFromResources = (resources, selection) => ({
  [Resource.BUILDING_MATERIAL]: (resources[Resource.BUILDING_MATERIAL] || 0) - (selection[Resource.BUILDING_MATERIAL] || 0),
  [Resource.COIN]: (resources[Resource.COIN] || 0) - (selection[Resource.COIN] || 0),
  [Resource.LABOR]: (resources[Resource.LABOR] || 0) - (selection[Resource.LABOR] || 0)
});

const getFullSelection = (selection) => ({
  [Resource.BUILDING_MATERIAL]: selection[Resource.BUILDING_MATERIAL] || 0,
  [Resource.COIN]: selection[Resource.COIN] || 0,
  [Resource.LABOR]: selection[Resource.LABOR] || 0
});

const getPossibleResourceSelections = (validSelection, resources) => validSelection[Resource.ANY] === undefined ? [getFullSelection(validSelection)] :
  getPossibleResourceSelectionsForTotal(validSelection).filter(selection => canAffordSelection(selection, resources));

const getPossibleSelections = (validSelections, resources) => validSelections.map(validSelection => getPossibleResourceSelections(validSelection, resources)).flat();

export const getResourceSelectionValues = (validSelections, resources, selection) => {
  const possibleSelections = getPossibleSelections(validSelections, resources);
  const nextValidSelections = possibleSelections.map(possibleSelection => subtractSelectionFromResources(possibleSelection, selection));
  const maxes = possibleSelections.reduce((maxes, selection) => ({
    [Resource.BUILDING_MATERIAL]: Math.max(maxes[Resource.BUILDING_MATERIAL], selection[Resource.BUILDING_MATERIAL]),
    [Resource.COIN]: Math.max(maxes[Resource.COIN], selection[Resource.COIN]),
    [Resource.LABOR]: Math.max(maxes[Resource.LABOR], selection[Resource.LABOR]),
  }), possibleSelections[0]);
  return {
    min: possibleSelections.reduce((mins, selection) => ({
      [Resource.BUILDING_MATERIAL]: Math.min(mins[Resource.BUILDING_MATERIAL], selection[Resource.BUILDING_MATERIAL]),
      [Resource.COIN]: Math.min(mins[Resource.COIN], selection[Resource.COIN]),
      [Resource.LABOR]: Math.min(mins[Resource.LABOR], selection[Resource.LABOR]),
    }), possibleSelections[0]),
    max: {
      [Resource.BUILDING_MATERIAL]: Math.min(maxes[Resource.BUILDING_MATERIAL], resources[Resource.BUILDING_MATERIAL]),
      [Resource.COIN]: Math.min(maxes[Resource.COIN], resources[Resource.COIN]),
      [Resource.LABOR]: Math.min(maxes[Resource.LABOR], resources[Resource.LABOR]),
    },
    isValid: possibleSelections.some(possibleSelection => selectionsAreEqual(possibleSelection, selection)),
    canAdd: {
      [Resource.BUILDING_MATERIAL]: resources[Resource.BUILDING_MATERIAL] > selection[Resource.BUILDING_MATERIAL] && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.BUILDING_MATERIAL] > 0),
      [Resource.COIN]: resources[Resource.COIN] > selection[Resource.COIN] && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.COIN] > 0),
      [Resource.LABOR]: resources[Resource.LABOR] > selection[Resource.LABOR] && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.LABOR] > 0)
    },
    canSubtract: {
      [Resource.BUILDING_MATERIAL]: selection[Resource.BUILDING_MATERIAL] > 0 && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.BUILDING_MATERIAL] < 0),
      [Resource.COIN]: selection[Resource.COIN] > 0 && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.COIN] < 0),
      [Resource.LABOR]: selection[Resource.LABOR] > 0 && nextValidSelections.some(nextValidSelection => nextValidSelection[Resource.LABOR] < 0)
    }
  };
};
