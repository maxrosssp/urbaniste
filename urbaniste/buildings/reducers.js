import {
  INITIALIZE_GAME,
  BUILD_PROJECT
} from '../actions';

export default function buildings(state = [], action) {
  switch (action.type) {
    case INITIALIZE_GAME:
      return state;
    case BUILD_PROJECT:
      return state.concat({
        name: action.name,
        owner: action.playerId,
        positions: action.positions
      });
    default:
      return state;
  }
}
