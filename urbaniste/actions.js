export const ADD_PLAYER_RESOURCE = 'ADD_PLAYER_RESOURCE';
export const ADD_PLAYER_RESOURCES = 'ADD_PLAYER_RESOURCES';
export const REMOVE_PLAYER_RESOURCES = 'REMOVE_PLAYER_RESOURCES';

export const SELECT_PROJECT = 'SELECT_PROJECT';
export const BUILD_PROJECT = 'BUILD_PROJECT';

export const SET_TILE_OWNER = 'SET_TILE_OWNER';
export const REMOVE_TILE_OWNER = 'REMOVE_TILE_OWNER';
export const TAKE_TILE = 'TAKE_TILE';
export const BUILD_ON_TILE = 'BUILD_ON_TILE';
export const UNDO_TAKE_TILE = 'UNDO_TAKE_TILE';
export const TAKE_TILES = 'TAKE_TILES';

export const STEAL_RESOURCES = 'STEAL_RESOURCES';

export const INITIALIZE_GAME = 'INITIALIZE_GAME';

export const SET_GUILD_RESOURCE = 'SET_GUILD_RESOURCE';

export function addPlayerResource(playerId, resource, count) {
  return { type: ADD_PLAYER_RESOURCE, playerId, resource, count };
}

export function addPlayerResources(playerId, resources) {
  return { type: ADD_PLAYER_RESOURCES, playerId, resources };
}

export function removePlayerResources(playerId, resources) {
  return { type: REMOVE_PLAYER_RESOURCES, playerId, resources };
}

export function selectProject(playerId, name) {
  return { type: SELECT_PROJECT, playerId, name };
}

export function buildProject(playerId, name, positions, resources) {
  return { type: BUILD_PROJECT, playerId, name, positions, resources };
}

export function buildOnTile(playerId, {row, col}, name) {
  return { type: BUILD_ON_TILE, playerId, row, col, name };
}

export function takeTile(playerId, { row, col }, resource) {
  return { type: TAKE_TILE, playerId, row, col, resource };
}

export function setTileOwner(playerId, { row, col }) {
  return { type: SET_TILE_OWNER, playerId, row, col };
}

export function removeTileOwner(playerId, { row, col }) {
  return { type: REMOVE_TILE_OWNER, playerId, row, col };
}

export function undoTakeTile(playerId, { row, col }, resource) {
  return { type: UNDO_TAKE_TILE, playerId, row, col, resource };
}

export function stealResources(playerId, fromPlayer, resources) {
  return { type: STEAL_RESOURCES, playerId, fromPlayer, resources };
}

export function initializeGame(playerConfigs, boardConfig, shopConfig) {
  return { type: INITIALIZE_GAME, playerConfigs, boardConfig, shopConfig };
}

export function setGuildResource(resource) {
  return { type: SET_GUILD_RESOURCE, resource };
}
