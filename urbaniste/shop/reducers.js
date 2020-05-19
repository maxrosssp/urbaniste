import initialize from './initialize';
import {
  INITIALIZE_GAME,
  BUILD_PROJECT
} from '../actions';

function project(state = {}, action) {
  switch (action.type) {
    case BUILD_PROJECT:
      return {
        ...state,
        count: state.count + 1
      };
    default:
      return state;
  }
}

function projects(state = {}, action) {
  return {
    ...state,
    [action.name]: project(state[action.name], action)
  };
}

export default function shop(state = {}, action) {
  if (action.type === INITIALIZE_GAME) {
    return {
      projects: initialize(action.shopConfig)
    }
  }

  if (!action.name) {
    return state;
  }

  return {
    projects: projects(state.projects, action)
  };
}
