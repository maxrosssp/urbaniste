import {
  INITIALIZE_GAME,
  BUILD_PROJECT
} from '../actions';

const compareRows = ({ row }, position) => row - position.row;
const compareCols = ({ col }, position) => col - position.col;
const sortByRows = (positions) => positions.sort(compareRows);
const sortByCols = (positions) => positions.sort(compareCols);
const sortPositions = (positions) => sortByRows(sortByCols([...positions]));
const getBuildingId = (name, positions) => name + '-' + sortPositions(positions).map(({ row, col }) => row + '' + col).join('');

export default function buildings(state = [], action) {
  switch (action.type) {
    case INITIALIZE_GAME:
      return state;
    case BUILD_PROJECT:
      const { name, playerId, positions } = action;
      return state.concat({
        id: getBuildingId(name, positions),
        name: name,
        owner: playerId,
        positions: positions
      });
    default:
      return state;
  }
}
