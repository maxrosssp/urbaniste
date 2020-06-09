import {
  Resource
} from '../constants';
import {
  getTiles,
  getAllAdjacentTiles
} from '../utils';

const getResourceTypes = (tiles) => Object.values(Resource).reduce((resources, type) => ({ ...resources, [type]: tiles.filter(tile => tile.resource === type).length }), {});

export const validateResourceTypes = (state, positions, resources) => {
  const resourceTypes = getResourceTypes(getTiles(state, positions));
  return Object.keys(resources).every(type => resourceTypes[type] === resources[type]);
};

export const validateWaterCount = (state, positions, count) => getResourceTypes(getTiles(state, positions))[Resource.WATER] === count;

export const validateFriendlyAdjacent = (state, positions, playerId) => getAllAdjacentTiles(state, positions).find(tile => tile.owner === playerId);

export const getClaims = (state, positions, playerId) => {
  const claims = { friendly: [], enemy: [], unclaimed: [], water: [] };
  getTiles(state, positions).forEach(tile => {
    claims[(tile.owner ? (tile.owner === playerId ? 'friendly' : 'enemy') : (tile.resource === Resource.WATER ? 'water' : 'unclaimed'))].push(tile);
  });
  return claims;
};

export const validateClaims = (state, positions, playerId, claims) => {
  const claimTypes = getClaims(state, positions, playerId);
  return (claims instanceof Array ? claims : [claims]).some(claimOption =>
    Object.keys(claimOption).every(claim => claimOption[claim] === claimTypes[claim].length));
};

const compareRows = ({ row }, position) => row - position.row;
const compareCols = ({ col }, position) => col - position.col;
const sortByRows = (positions) => [...positions].sort(compareRows);
const sortByCols = (positions) => [...positions].sort(compareCols);
const sortPositions = (positions) => sortByRows(sortByCols(positions));
const uniqueRows = (positions) => [...new Set(positions.map(position => position.row))].length === positions.length;
const uniqueCols = (positions) => [...new Set(positions.map(position => position.col))].length === positions.length;

export const getSortedPositions = (positions) => uniqueRows(positions) ? sortByRows(positions)
  : (uniqueCols(positions) ? sortByCols(positions) : sortPositions(positions));

export const validateCenter = (state, positions, playerId, claims) => {
  const { owner, resource } = getTiles(state, getSortedPositions(positions))[1];
  return (
    (claims.enemy && owner && owner !== playerId) ||
    (claims.friendly && owner && owner === playerId) ||
    (claims.unclaimed && !owner) ||
    (claims.water && resource === Resource.WATER)
  );
};
