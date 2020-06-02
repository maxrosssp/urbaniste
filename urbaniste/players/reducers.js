import { Resource } from '../constants';
import initialize from './initialize';
import {
  INITIALIZE_GAME,
  ADD_PLAYER_RESOURCE,
  ADD_PLAYER_RESOURCES,
  REMOVE_PLAYER_RESOURCES,
  SET_TILE_OWNER,
  REMOVE_TILE_OWNER,
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
      console.log(action);
      const resources = {
        ...state,
        [Resource.BUILDING_MATERIAL]: state[Resource.BUILDING_MATERIAL] + (action.resources[Resource.BUILDING_MATERIAL] || 0),
        [Resource.COIN]: state[Resource.COIN] + (action.resources[Resource.COIN] || 0),
        [Resource.LABOR]: state[Resource.LABOR] + (action.resources[Resource.LABOR] || 0)
      };
      console.log(resources);
      return resources;
      // return {
      //   [Resource.BUILDING_MATERIAL]: state[Resource.BUILDING_MATERIAL] + (action.resources[Resource.BUILDING_MATERIAL] || 0),
      //   [Resource.COIN]: state[Resource.COIN] + (action.resources[Resource.COIN] || 0),
      //   [Resource.LABOR]: state[Resource.LABOR] + (action.resources[Resource.LABOR] || 0)
      // };
      // return {
      //   ...state,
      //   ...Object.keys(action.resources)
      //     .reduce((updatedResources, resource) => ({
      //       ...updatedResources,
      //       [resource]: state[resource] + (action.resources[resource] || 0)
      //     }), {})
      // };
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
            [resource]: (state[resource] || 0) - (action.resources[resource] || 0)
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
    case REMOVE_TILE_OWNER:
      return state.filter(tile => !(tile.position.row === action.row && tile.position.col === action.col));
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
