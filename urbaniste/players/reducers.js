import initialize from './initialize';
import {
  INITIALIZE_GAME,
  ADD_PLAYER_RESOURCE,
  ADD_PLAYER_RESOURCES,
  REMOVE_PLAYER_RESOURCES,
  TAKE_TILE,
  UNDO_TAKE_TILE,
  SELECT_PROJECT,
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

function selectedProject(state = undefined, action) {
  switch (action.type) {
    case SELECT_PROJECT:
      return state === action.name ? undefined : action.name;
    case BUILD_PROJECT:
    case UNDO_TAKE_TILE:
      return undefined;
    default:
      return state;
  }
}

function taken(state = [], action) {
  switch (action.type) {
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
    selectedProject: selectedProject(state.selectedProject, action),
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

  return {
    ...state,
    [action.playerId]: player(state[action.playerId], action)
  };
}
