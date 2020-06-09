import {
  getAdjacentTiles,
  isPositionInList
} from '../utils';

export const getBuildingPoints = (state, buildingName) => state.misc.buildingPoints[buildingName];

const getPossiblePrisons = (prisons, arrested) => {
  return prisons.filter(prison => arrested.filter(position => isPositionInList(position, getAdjacentTiles(state, prison.positions).map(tile => tile.position))).length > 0);
};

export const getStingRemainingPrisons = (state) => {
  const { prisons, arrested } = state.misc.sting;
  return prisons.filter(prison => {
    const possibleArrests = arrested.filter(position => isPositionInList(position, getAdjacentTiles(state, prison.positions).map(tile => tile.position)));
    return possibleArrests.length !== 1 && (possibleArrests.length === 0 || (getPossiblePrisons(prisons, possibleArrests).length === possibleArrests.length));
  });
}

export const isStingComplete = (state) => {
  const { prisons, arrested } = state.misc.sting;
  return prisons.length === arrested.length;
}
