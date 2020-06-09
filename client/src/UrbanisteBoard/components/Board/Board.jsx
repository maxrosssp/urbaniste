import React, { useRef, useState } from 'react';
import classNames from 'classnames';
import { HexGrid, Layout } from 'react-hexgrid';
import { positionsAreEqual } from '../../../../../urbaniste/utils';
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
  playerId,
  tiles,
  setPositionUnderMouse,
  positionsToBuild,
  valid,
  onRotate,
  selectedProjectName,
  canAct,
  getValueToInclude,
  onAction
}) {
  const board = useRef(null);
  const [toInclude, setToInclude] = useState(null);

  const isHighlighted = (position) => positionsToBuild.some(positionToHilight => positionsAreEqual(positionToHilight, position));
  const onHover = (position) => board.current.focus() || setPositionUnderMouse(position);
  const onKeyDown = ({key}) => KEY_ROTATIONS[key] && onRotate(KEY_ROTATIONS[key]);
  
  const onTileClick = () => {
    const valueToInclude = getValueToInclude && getValueToInclude(state, playerId, selectedProjectName, positionsToBuild);
    (valid && valueToInclude) ? setToInclude(valueToInclude) : onAction();
  };

  const onPayResources = (resources) => {
    setToInclude(null);
    onAction(resources);
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
                tile={tile}
                playerId={playerId}
                onHover={onHover}
                highlighted={canAct && isHighlighted(tile.position)}
                onTileClick={onTileClick}
              />
            ))}
          </Layout>
        </HexGrid>
      </div>

      {toInclude && toInclude.name === 'payResources' && (
        <ResourcesModal
          title="Pay Resources"
          buttonText="Pay"
          resources={toInclude.playerResources}
          validSelections={toInclude.validPayments}
          onClose={onPayResources}
          onDismiss={() => setToInclude(null)}
          canCancel={true}
        />
      )}
    </>
  );
}

export default Board;
