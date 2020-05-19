import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import Players from './components/Players/Players';
import Shop from './components/Shop/Shop';
import Board from './components/Board/Board';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../style/main.scss';

function Urbaniste({
  G,
  ctx,
  moves,
  events,
  playerID,
  isActive
}) {
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
        <Col className="col players-col" sm={2}>
          <Row>
            <Col sm={12}>
              <Players G={G} playerId={playerID} />
            </Col>

            <Col sm={12}>
              <div className="message-prompt">{isTurn ? 'Your Turn' : 'Waiting for opponent.'}</div>
            </Col>

            <Col sm={12}>
              {stage === 'build' && <Button type="button" onClick={undoExpand}>Undo</Button>}
              <Button type="button" onClick={() => moves.EndTurn()}>End Turn</Button>
            </Col>
          </Row>
        </Col>

        <Col className="col board-col" sm={5}>
          <Board G={G} stage={stage} moves={moves} events={events} isActive={isActive} playerId={playerID} />
        </Col>
        
        <Col className="col shop-col" sm={{ span: 5 }}>
          <Shop G={G} stage={stage} moves={moves} events={events} isActive={isActive} playerId={playerID} />
        </Col>
      </Row>
    </Container>
  );
}

export default Urbaniste;
