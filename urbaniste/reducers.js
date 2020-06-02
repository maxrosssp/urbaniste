import players from './players/reducers';
import tiles from './tiles/reducers';
import shop from './shop/reducers';
import buildings from './buildings/reducers';
import misc from './misc/reducers';

export default function game(state = {}, action) {
  return {
    ...state,
    players: players(state.players, action),
    tiles: tiles(state.tiles, action),
    shop: shop(state.shop, action),
    buildings: buildings(state.buildings, action),
    misc: misc(state.misc, action)
  };
}
