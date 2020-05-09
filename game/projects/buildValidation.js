const getResourceTypes = (tiles) => Object.values(Resource)
  .reduce((resources, type) => ({ ...resources, [type]: tiles.filter(tile => tile.getResource() === type).length }));

const validateResourceTypes = (tiles, resources) => {
  const resourceTypes = getResourceTypes(tiles);
  return Object.keys(resources).every(type => resourceTypes[type] === resources[type]);
}

const validateFriendlyAdjacent = (board, player, tiles) => board.getAllAdjacentTiles(tiles).find(tile => tile.getOwner() === player.getId());

const sortByClaims = (tiles, player) => {
  const claims = { friendly: [], enemy: [], unclaimed: [] };
  tiles.forEach(tile => {
    var owner = tile.getOwner();
    claims[owner ? (owner === player.getId() ? 'friendly' : 'enemy') : 'unclaimed'].push(tile);
  });
  return claims;
};

const validateClaims = (tiles, player, claims) => {
  const claimTypes = sortByClaims(tiles, player);
  return Object.keys(claims).every(claim => claims[claim] === claimTypes[claim].length);
};

const getFriendlyCount = (tiles, player) => tiles.filter(tile => tile.getOwner() === player.getId()).length;

export {
  validateResourceTypes,
  validateFriendlyAdjacent,
  validateClaims,
  getFriendlyCount
};