import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { HexGrid, Layout } from 'react-hexgrid';
import { positionsAreEqual } from '../../../../../urbaniste/utils';
import {
  getTiles,
  getPositionsForShapeAtPosition
} from '../../../../../urbaniste/tiles/selectors';
import {
  getSelectedProjectCost,
  getSelectedProjectName,
  isSelectedProjectVariableCost
} from '../../../../../urbaniste/shop/selectors';
import { getPlayerResources } from '../../../../../urbaniste/players/selectors';
import { canTakeTileAtPosition } from '../../../../../urbaniste/tiles/validation';
import { canBuildInPositions } from '../../../../../urbaniste/buildings/validation';
import Tile from './Tile/Tile';
import PayResources from './PayResources/PayResources';
import './Board.scss';

const KEY_ROTATIONS = {
  ArrowLeft: -1,
  ArrowDown: -1,
  ArrowRight: 1,
  ArrowUp: 1
};

function Board({
  G,
  stage,
  moves,
  playerId
}) {
  const selectedProject = getSelectedProjectName(G, playerId);
  const board = useRef(null);
  const [mouseOver, setMouseOver] = useState(undefined);
  const [shape, setShape] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [validAtPosition, setValidAtPosition] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);

  const isInShape = (position) => shape.some(shapePosition => positionsAreEqual(shapePosition, position));
  const onKeyDown = ({key}) => setRotation(rotation + (KEY_ROTATIONS[key] || 0));
  const onHover = (position) => board.current.focus() || setMouseOver(position);

  const buildProject = (resources) => {
    moves.BuildProject(shape, resources);
    setShowPayModal(false);
  };

  const attemptBuild = () => {
    if (validAtPosition) {
      if (isSelectedProjectVariableCost(G, playerId, shape)) {
        setShowPayModal(true);
      } else {
        buildProject(getSelectedProjectCost(G, playerId, shape));
      }
    }
  }

  const onTileClick = (position) => {
    if (validAtPosition) {
      if (stage === 'build') {
        attemptBuild();
      } else {
        moves.TakeTile(position);
      }
    }
  };

  useEffect(() => {
    if (stage === 'expand') {
      setShape([mouseOver]);
      setValidAtPosition(canTakeTileAtPosition(G, playerId, mouseOver));
    } else {
      const positions = getPositionsForShapeAtPosition(G, playerId, mouseOver, rotation);
      setShape(positions);
      setValidAtPosition(canBuildInPositions(G, playerId, positions));
    }
  }, [mouseOver, rotation]);

  return (
    <div
      className={classNames({
        board: true, 
        valid: validAtPosition && (stage === 'expand' || selectedProject), 
        invalid: !validAtPosition && (stage === 'expand' || selectedProject)
      })}
      tabIndex="0"
      ref={board}
      onKeyDown={onKeyDown}
    >
      <HexGrid width={'100%'} viewBox="-7 -7 150 150">
        <Layout flat={false} size={{ x: 6.5, y: 6.5 }} spacing={1.025}>
          {getTiles(G).map(tile => (
            <Tile
              key={tile.position.row + '' + tile.position.col} 
              tile={tile}
              playerId={playerId}
              onHover={onHover}
              inShape={isInShape(tile.position)}
              onTileClick={onTileClick}
            />
          ))}
        </Layout>
      </HexGrid>

      {showPayModal && (
        <PayResources
          resources={getPlayerResources(G, playerId)}
          cost={getSelectedProjectCost(G, playerId, shape)}
          onClose={pay => buildProject(pay)}
          onDismiss={() => setShowPayModal(false)}
        />)}
    </div>
  );
}

export default Board;
