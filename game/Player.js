import { Resource } from './constants.js';

export default function(id, name) {
  var resources = {
    [Resource.BUILDING_MATERIAL]: 0,
    [Resource.COIN]: 0,
    [Resource.LABOR]: 0
  };
  var tiles = [];
  var buildings = [];

  return {
    getId: () => id,
    getName: () => name,
    addResource: (type, amount = 1) => resources[type] = resources[type] + amount,
    getResources: () => resources,
    getResource: (type) => resources[type],
    buildProject: (building) => buildings.push(building),
    takeTile: (tile) => {
      tiles.push(tile);
      tile.take(id);
    }
  };
}
