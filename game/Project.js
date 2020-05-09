import Building from './projects/Building.js';
import ErrorHandler from './ErrorHandler.js';

export default function(buildingType, type, shape, cost, available, validator) {
  var remaining = available;

  const getAvailable = () => remaining;

  return {
    getName: () => name,
    getType: () => type,
    getShape: () => shape,
    getCost: (player) => typeof cost === 'function' ? cost(player) : cost,
    getAvailable,
    build: (board, player, tiles) => {
      if (getAvailable() > 0 && validator(board, player, tiles, shape)) {
        player.buildProject(Building(buildingType, tiles));
        remaining = remaining - 1;
      } else {
        ErrorHandler.display('Could not place building here.');
      }
    }
  };
}