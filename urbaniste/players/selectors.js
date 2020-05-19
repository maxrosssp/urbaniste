export const getPlayers = (state, playerId) => [state.players[playerId]].concat(Object.values(state.players).filter(player => player.id != playerId));

export const getPlayerResources = (state, playerId) => state.players[playerId].resources;

export const getPlayerLastTake = (state, playerId) => ({ ...state.players[playerId].taken[0] });
