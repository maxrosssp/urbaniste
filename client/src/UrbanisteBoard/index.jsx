import React, { useState } from 'react';
import { Container, Row, Col, Button, Navbar } from 'react-bootstrap';
import Players from './components/Players';
import Shop from './components/Shop';
import Board from './components/Board';

function UrbanisteBoard({
  G,
  ctx,
  moves,
  events,
  playerID,
  isActive
}) {
  const [selectedProjectName, setSelectedProjectName] = useState(null);

  const isTurn = ctx.currentPlayer === playerID;
  const stage = ctx.activePlayers === null ? 'expand' : ctx.activePlayers[playerID];
  const undoExpand = () => {
    moves.UndoTakeTile();
  };

  if (!playerID) {
    return <></>;
  }

  return (
    <Container className={`${ctx.playOrder.indexOf(playerID) === 0 ? 'first' : 'second'} urbaniste`} fluid={true}>
      <Row>
        <Col className="col shop-col" sm={5}>
          <Row>
            <Col sm={12}>
              <Players G={G} playerId={playerID} />
            </Col>

            <Col sm={12}>
              <Shop
                G={G}
                playerId={playerID}
                selectedProjectName={selectedProjectName}
                onProjectSelect={setSelectedProjectName}
                isBuildStage={stage === 'build'}
              />
            </Col>

            <Col sm={12}>
              <div className="message-prompt">{isTurn ? 'Your Turn' : 'Waiting for opponent.'}</div>
            </Col>

            {isTurn && (
              <Col sm={12}>
                {stage === 'build' && <Button type="button" onClick={undoExpand}>Undo</Button>}
                <Button type="button" onClick={() => moves.EndTurn()}>End Turn</Button>
              </Col>
            )}
          </Row>
        </Col>

        <Col className="col board-col" sm={7}>
          <Board
            G={G}
            stage={stage}
            moves={moves}
            events={events}
            isActive={isActive}
            playerId={playerID}
            selectedProjectName={selectedProjectName}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default UrbanisteBoard;
