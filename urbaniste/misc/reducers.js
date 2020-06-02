import {
  SET_GUILD_RESOURCE
} from '../actions';

export default function misc(state = {}, action) {
  switch (action.type) {
    case SET_GUILD_RESOURCE:
      return { ...state, guildResource: action.resource };
    default:
      return state;
  }
}
