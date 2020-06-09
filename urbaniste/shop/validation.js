import {
  Resource,
  Building
} from '../constants';
import {
  getTiles,
  getAllAdjacentTiles
} from '../utils';

const getResourceTypes = (tiles) => Object.values(Resource).reduce((resources, type) => ({ ...resources, [type]: tiles.filter(tile => tile.resource === type).length }), {});

export const validateResourceTypes = (state, positions, resources) => {
  const resourceTypes = getResourceTypes(getTiles(state, positions));
  return Object.keys(resources).every(type => resourceTypes[type] === resources[type]);
}

export const validateFriendlyAdjacent = (state, positions, playerId) => getAllAdjacentTiles(state, positions).find(tile => tile.owner === playerId);

export const getClaims = (state, positions, playerId) => {
  const claims = { friendly: [], enemy: [], unclaimed: [] };
  getTiles(state, positions).forEach(tile => {
    claims[tile.owner ? (tile.owner === playerId ? 'friendly' : 'enemy') : 'unclaimed'].push(tile);
  });
  return claims;
};

export const validateClaims = (state, positions, playerId, claims) => {
  const claimTypes = getClaims(state, positions, playerId);
  return Object.keys(claims).every(claim => claims[claim] === claimTypes[claim].length);
};

const compareRows = ({ row }, position) => row - position.row;
const compareCols = ({ col }, position) => col - position.col;
const sortByRows = (positions) => [...positions].sort(compareRows);
const sortByCols = (positions) => [...positions].sort(compareCols);
const sortPositions = (positions) => sortByRows(sortByCols(positions));
const uniqueRows = (positions) => [...new Set(positions.map(position => position.row))].length === positions.length;
const uniqueCols = (positions) => [...new Set(positions.map(position => position.col))].length === positions.length;

export const getSortedTiles = (state, positions) => getTiles(state,
  uniqueRows(positions) ? sortByRows(positions)
    : (uniqueCols(positions) ? sortByCols(positions)
      : sortPositions(positions)));
