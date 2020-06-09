import initialize from './initialize';
import {
  INITIALIZE_GAME,
  ADD_PLAYER_RESOURCE,
  ADD_PLAYER_RESOURCES,
  REMOVE_PLAYER_RESOURCES,
  TAKE_TILE,
  UNDO_TAKE_TILE,
  SET_TILE_OWNER,
  REMOVE_TILE_OWNER,
  ARREST,
  BUILD_PROJECT
} from '../actions';

function resources(state = {}, action) {
  switch (action.type) {
    case TAKE_TILE:
    case ADD_PLAYER_RESOURCE:
      return {
        ...state,
        [action.resource]: state[action.resource] + (action.count || 1)
      };
    case ADD_PLAYER_RESOURCES:
      return {
        ...state,
        ...Object.keys(action.resources)
          .reduce((updatedResources, resource) => ({
            ...updatedResources,
            [resource]: state[resource] + action.resources[resource]
          }), {})
      };
    case UNDO_TAKE_TILE:
      return {
        ...state,
        [action.resource]: state[action.resource] - 1
      };
    case BUILD_PROJECT:
    case REMOVE_PLAYER_RESOURCES:
      return {
        ...state,
        ...Object.keys(action.resources)
          .reduce((updatedResources, resource) => ({
            ...updatedResources,
            [resource]: state[resource] - action.resources[resource]
          }), {})
      };
    default:
      return state;
  }
}

function taken(state = [], action) {
  switch (action.type) {
    case SET_TILE_OWNER:
      return [{ position: { row: action.row, col: action.col } }].concat(state);
    case TAKE_TILE:
      return [{ position: { row: action.row, col: action.col }, resource: action.resource }].concat(state);
    case UNDO_TAKE_TILE:
      return state.slice(1);
    default:
      return state;
  }
}

function player(state = {}, action) {
  return {
    ...state,
    resources: resources(state.resources, action),
    taken: taken(state.taken, action)
  };
}

export default function players(state = {}, action) {
  if (action.type === INITIALIZE_GAME) {
    return initialize(action.playerConfigs);
  }
  
  if (action.playerId === undefined) {
    return state;
  }

  var nextState = state;
  if (action.type === SET_TILE_OWNER || action.type === ARREST || action.type === REMOVE_TILE_OWNER) {
    nextState = Object.keys(state).reduce((filteredPlayers, playerId) => ({
      ...filteredPlayers,
      [playerId]: {
        ...state[playerId],
        taken: state[playerId].taken.filter(tile => tile.position.row !== action.row && tile.position.col !== action.col)
      }
    }), nextState);
  }

  return {
    ...nextState,
    [action.playerId]: player(nextState[action.playerId], action)
  };
}
