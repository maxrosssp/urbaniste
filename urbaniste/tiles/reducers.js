import initialize from './initialize';
import {
  INITIALIZE_GAME,
  SET_TILE_OWNER,
  BUILD_ON_TILE,
  TAKE_TILE,
  UNDO_TAKE_TILE
} from '../actions';

function col(state = {}, action) {
  switch (action.type) {
    case BUILD_ON_TILE:
      return {
        ...state,
        owner: action.playerId,
        building: action.name
      };
    case SET_TILE_OWNER:
    case TAKE_TILE:
      return {
        ...state,
        owner: action.playerId
      };
    case UNDO_TAKE_TILE:
      return {
        ...state,
        owner: undefined
      };
    default:
      return state;
  }
}

function row(state = {}, action) {
  if (action.col === undefined) {
    return state;
  }

  return {
    ...state,
    [action.col]: col(state[action.col], action)
  };
}

function tile(state = {}, action) {
  if (action.row === undefined) {
    return state;
  }

  return {
    ...state,
    [action.row]: row(state[action.row], action)
  }
}

export default function tiles(state = {}, action) {
  if (action.type === INITIALIZE_GAME) {
    return initialize(action.boardConfig, action.playerConfigs);
  }

  return tile(state, action);
}
