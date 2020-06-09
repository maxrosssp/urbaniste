import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Players from './components/Players';
import Shop from './components/Shop';
import Board from './components/Board/Board';
import ResourcesModal from './components/ResourcesModal';
import ResourceSelectModal from './components/ResourceSelectModal';
import { Stage } from '../../../urbaniste/constants';
import { getStage } from '../../../urbaniste/stages';
import { getProjects } from '../../../urbaniste/shop/selectors';
import { getTiles } from '../../../urbaniste/tiles/selectors';

function UrbanisteBoard({
  G,
  ctx,
  moves,
  events,
  playerID,
  isActive
}) {
  const {
    stageName,
    getBoardState,
    getResourcesModal,
    getResourceSelectModal,
    buttons
  } = getStage(ctx.activePlayers !== null && ctx.activePlayers[playerID]) || {};
  const isTurn = ctx.currentPlayer === playerID;

  const [projects, setProjects] = useState([]);
  const [tiles, setTiles] = useState([]);
  const [positionUnderMouse, setPositionUnderMouse] = useState(null);
  const [rotation, setRotation] = useState(0);
  const [selectedProjectName, setSelectedProjectName] = useState(null);
  const [boardState, setBoardState] = useState({ positionsToBuild: [], valid: false, canAct: false });

  useEffect(() => {
    const boardState = getBoardState ? getBoardState(G, playerID, positionUnderMouse, rotation, selectedProjectName)
      : { positionsToBuild: [], valid: false, canAct: false };
    setBoardState(boardState);
  }, [positionUnderMouse, rotation]);

  useEffect(() => {
    setProjects(getProjects(G, playerID));
    setTiles(getTiles(G));
  }, [ctx]);

  useEffect(() => {
    setSelectedProjectName(null);
  }, [stageName]);

  const undoExpand = () => {
    moves.UndoTakeTile();
  };

  if (!playerID) {
    return <></>;
  }

  return (
    <Container
      className={classNames(ctx.playOrder.indexOf(playerID) === 0 ? 'first' : 'second', 'urbaniste', {
        'player-active': isActive,
        'player-turn': isTurn
      })}
      fluid={true}
    >
      <Row>
        <Col className="col shop-col" sm={5}>
          <Row>
            <Col sm={12}>
              <Players G={G} playerId={playerID} />
            </Col>

            <Col sm={12}>
              <Shop
                projects={projects}
                selectedProjectName={selectedProjectName}
                onProjectSelect={setSelectedProjectName}
                isBuildStage={stageName === Stage.BUILD}
              />
            </Col>

            <Col sm={12}>
              <div className="message-prompt">{isTurn ? 'Your Turn' : 'Waiting for opponent.'}</div>
            </Col>

            {isTurn && buttons && (
              <Col sm={12} className="move-buttons">
                {buttons.indexOf('undoExpand') !== -1 && <Button type="button" onClick={undoExpand}>Undo</Button>}
                {buttons.indexOf('endTurn') !== -1 && <Button type="button" onClick={() => moves.EndTurn()}>End Turn</Button>}
              </Col>
            )}
          </Row>
        </Col>

        <Col className="col board-col" sm={7}>
          <Board
            state={G}
            moves={moves}
            playerId={playerID}
            tiles={tiles}
            setPositionUnderMouse={setPositionUnderMouse}
            onRotate={(direction) => setRotation(rotation + direction)}
            selectedProjectName={selectedProjectName}
            { ...boardState }
          />
        </Col>
      </Row>

      {getResourcesModal && (
        <ResourcesModal
          moves={moves}
          { ...getResourcesModal(G, playerID) }
        />
      )}

      {getResourceSelectModal && (
        <ResourceSelectModal
          moves={moves}
          { ...getResourceSelectModal() }
        />
      )}
    </Container>
  );
}

export default UrbanisteBoard;
