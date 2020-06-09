export const getTiles = (state) => Object.values(state.tiles).map(col => Object.values(col)).flat();
