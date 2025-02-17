import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { HexGrid, Layout } from 'react-hexgrid';
import { positionsAreEqual } from '../../../../../../urbaniste/utils';
import Tile from './Tile';
import ResourcesModal from '../ResourcesModal';
import './Board.scss';

const KEY_ROTATIONS = {
  ArrowLeft: -1,
  ArrowDown: -1,
  ArrowRight: 1,
  ArrowUp: 1
};

function Board({
  state,
  moves,
  playerId,
  tiles,
  setPositionUnderMouse,
  positionsToBuild,
  valid,
  onRotate,
  selectedProjectName,
  canAct,
  getValueToInclude,
  onTileClick,
  drag
}) {
  const board = useRef(null);
  const [toInclude, setToInclude] = useState(null);

  const isHighlighted = (position) => positionsToBuild.some(positionToHilight => positionsAreEqual(positionToHilight, position));
  const onKeyDown = ({key}) => KEY_ROTATIONS[key] && onRotate(KEY_ROTATIONS[key]);
  const onHover = (position) => {
    const x = window.scrollX;
    const y = window.scrollY;
    board.current.focus();
    window.scrollTo(x, y);
    
    setPositionUnderMouse(position);
  };
  
  const onClickTile = () => {
    if (onTileClick || getValueToInclude) {
      const valueToInclude = getValueToInclude && getValueToInclude(state, playerId, selectedProjectName, positionsToBuild);
      (valid && valueToInclude) ? setToInclude(valueToInclude) : onTileClick(moves, positionsToBuild, selectedProjectName);
    }
  };

  const onPayResources = (resources) => {
    setToInclude(null);
    onTileClick && onTileClick(moves, positionsToBuild, selectedProjectName, resources);
  };

  return (
    <>
      <div
        className={classNames({
          board: true,
          'board-active': canAct,
          valid: valid,
          invalid: !valid
        })}
        tabIndex="0"
        ref={board}
        onKeyDown={onKeyDown}
      >
        <HexGrid width={'100%'} height={'100%'} viewBox="-7 -7 150 150">
          <Layout flat={false} size={{ x: 6.5, y: 6.5 }} spacing={1.025}>
            {tiles.map(tile => (
              <Tile
                key={tile.position.row + '' + tile.position.col}
                moves={moves}
                tile={tile}
                playerId={playerId}
                onHover={onHover}
                highlighted={canAct && isHighlighted(tile.position)}
                onTileClick={onClickTile}
                drag={drag}
              />
            ))}
          </Layout>
        </HexGrid>
      </div>

      {toInclude && toInclude.name === 'payResources' && (
        <ResourcesModal
          moves={moves}
          title="Pay Resources"
          buttonText="Pay"
          resources={toInclude.playerResources}
          validSelections={toInclude.validPayments}
          onClose={(_, resources) => onPayResources(resources)}
          onDismiss={() => setToInclude(null)}
          canCancel={true}
        />
      )}
    </>
  );
}

export default Board;
