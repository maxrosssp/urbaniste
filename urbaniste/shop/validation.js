import {
  Resource
} from '../constants';
import {
  getTiles,
  getAllAdjacentTiles
} from '../utils';

const getResourceTypes = (tiles) => Object.values(Resource).reduce((resources, type) => ({ ...resources, [type]: tiles.filter(tile => tile.resource === type).length }));

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

const compareRows = (tileA, tileB) => tileA.position.row - tileB.position.row;
const compareCols = (tileA, tileB) => tileA.position.col - tileB.position.col;
const sortByRows = (tiles) => tiles.sort(compareRows);
const sortByCols = (tiles) => tiles.sort(compareCols);
export const getSortedTiles = (state, positions) => sortByCols(sortByRows(getTiles(state, positions)));
