import { Resource } from '../constants';

const createPlayer = ({ id, name }) => ({
  id,
  name,
  resources: {
    [Resource.BUILDING_MATERIAL]: 0,
    [Resource.COIN]: 0,
    [Resource.LABOR]: 0
  },
  taken: []
});

export default function initialize(playerConfigs = []) {
  return playerConfigs.reduce((players, playerConfig) => ({
    ...players,
    [playerConfig.id]: createPlayer(playerConfig)
  }), {});
}
