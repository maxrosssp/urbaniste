import React, { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { HexGrid, Layout } from 'react-hexgrid';
import {
  positionsAreEqual,
  getAllAdjacentTiles
} from '../../../../../urbaniste/utils';
import {
  getTiles,
  getPositionsForShapeAtPosition
} from '../../../../../urbaniste/tiles/selectors';
import {
  getProjectCost,
  isProjectVariableCost
} from '../../../../../urbaniste/shop/selectors';
import { getPlayerResources, getEnemyPlayerId } from '../../../../../urbaniste/players/selectors';
import { canTakeTileAtPosition } from '../../../../../urbaniste/tiles/validation';
import { canBuildInPositions } from '../../../../../urbaniste/buildings/validation';
import Tile from './Tile';
import ResourcesModal from '../ResourcesModal';
import ResourceSelectModal from '../ResourceSelectModal';
import './Board.scss';
import { Resource, Building } from '../../../../../urbaniste/constants';

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
  playerId,
  selectedProjectName
}) {
  const board = useRef(null);
  const [mouseOver, setMouseOver] = useState(undefined);
  const [shape, setShape] = useState([]);
  const [rotation, setRotation] = useState(0);
  const [validAtPosition, setValidAtPosition] = useState(true);
  const [showPayModal, setShowPayModal] = useState(false);
  const [showStealModal, setShowStealModal] = useState(false);
  const [hasStolen, setHasStolen] = useState(false);
  const [ferryOptions, setFerryOptions] = useState(undefined);
  const [showResourceSelectModal, setShowResourceSelectModal] = useState(false);

  const isInShape = (position) => shape.some(shapePosition => positionsAreEqual(shapePosition, position));
  const onKeyDown = ({key}) => setRotation(rotation + (KEY_ROTATIONS[key] || 0));
  const onHover = (position) => board.current.focus() || setMouseOver(position);

  const buildProject = (resources) => {
    if (selectedProjectName) {
      moves.BuildProject(selectedProjectName, shape, resources);
      setShowPayModal(false);
    }
  };

  const stealResources = (resources) => {
    moves.StealResources(resources);
    setShowStealModal(false);
    setHasStolen(true);
  };

  const getLoan = (resourceType) => {
    moves.RecieveLoan(resourceType);
    setShowResourceSelectModal(false);
  };

  const attemptBuild = () => {
    if (validAtPosition) {
      if (isProjectVariableCost(G, playerId, selectedProjectName, shape)) {
        setShowPayModal(true);
      } else {
        if (selectedProjectName === Building.FERRY) {
          setFerryOptions(getAllAdjacentTiles(G, getAllAdjacentTiles(G, shape).filter(tile => tile.resource === Resource.WATER).map(tile => tile.position)));
        }
        buildProject(getProjectCost(G, playerId, selectedProjectName, shape)[0]);
      }
    }
  };

  const onTileClick = (position) => {
    if (validAtPosition) {
      if (stage === 'build') {
        attemptBuild();
      } else if (stage === 'ferry') {
        moves.Ferry(position, ferryOptions);
      } else {
        moves.TakeTile(position);
      }
    }
  };

  useEffect(() => {
    if (stage === 'expand' || stage === 'ferry') {
      setShape([mouseOver]);
      setValidAtPosition(canTakeTileAtPosition(G, playerId, mouseOver, stage === 'ferry' && ferryOptions));
      setHasStolen(false);
    } else if (!hasStolen && stage === 'steal') {
      setShowStealModal(true);
    } else if (stage === 'loan') {
      setShowResourceSelectModal(true);
    } else {
      const positions = getPositionsForShapeAtPosition(mouseOver, rotation, selectedProjectName);
      setShape(positions);
      setValidAtPosition(canBuildInPositions(G, playerId, positions, selectedProjectName));
    }
  }, [mouseOver, rotation]);

  return (
    <div
      className={classNames({
        board: true, 
        valid: validAtPosition && (stage === 'expand' || stage === 'ferry' || selectedProjectName), 
        invalid: !validAtPosition && (stage === 'expand' || stage === 'ferry' || selectedProjectName)
      })}
      tabIndex="0"
      ref={board}
      onKeyDown={onKeyDown}
    >
      <HexGrid width={'100%'} height={'100%'} viewBox="-7 -7 150 150">
        <Layout flat={false} size={{ x: 6.5, y: 6.5 }} spacing={1.025}>
          {getTiles(G).map(tile => (
            <Tile
              key={tile.position.row + '' + tile.position.col} 
              tile={tile}
              playerId={playerId}
              onHover={onHover}
              highlighted={isInShape(tile.position)}
              onTileClick={onTileClick}
            />
          ))}
        </Layout>
      </HexGrid>

      {showPayModal && (
        <ResourcesModal
          title="Pay Resources"
          buttonText="Pay"
          resources={getPlayerResources(G, playerId)}
          validSelections={getProjectCost(G, playerId, selectedProjectName, shape)}
          onClose={buildProject}
          onDismiss={() => setShowPayModal(false)}
          canCancel={true}
        />
      )}

      {showStealModal && (
        <ResourcesModal
          title="Steal Resources"
          buttonText="Steal"
          resources={getPlayerResources(G, getEnemyPlayerId(G, playerId))}
          validSelections={[{ [Resource.ANY]: 0 }, { [Resource.ANY]: 1 }, { [Resource.ANY]: 2 }]}
          onClose={stealResources}
          canCancel={false}
        />
      )}

      {showResourceSelectModal && (
        <ResourceSelectModal
          title="Select Resource"
          description="Choose resource to be loaned:"
          canCancel={false}
          onClose={getLoan}
        />
      )}
    </div>
  );
}

export default Board;
