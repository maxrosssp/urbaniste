import {
  SET_BUILDING_POINTS,
  PLAN_STING,
  ARREST
} from '../actions';

function buildingPoints(state = {}, action) {
  switch (action.type) {
    case SET_BUILDING_POINTS:
      return { ...state, [action.buildingName]: action.points };
    default:
      return state;
  }
}

function arrested(state = [], action) {
  switch (action.type) {
    case PLAN_STING:
      return [];
    case ARREST:
      return [{ row: action.row, col: action.col }].concat(state);
    default:
      return state;
  }
}

function prisons(state = [], action) {
  switch (action.type) {
    case PLAN_STING:
      return [...action.prisons];
    default:
      return state;
  }
}

function sting(state = {}, action) {
  return {
    ...state,
    prisons: prisons(state.prisons, action),
    arrested: arrested(state.arrested, action)
  };
}

export default function misc(state = {}, action) {
  return {
    ...state,
    buildingPoints: buildingPoints(state.buildingPoints, action),
    sting: sting(state.sting, action)
  };
}
