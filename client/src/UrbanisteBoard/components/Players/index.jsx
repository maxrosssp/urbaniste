import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { getPlayers } from '../../../../../urbaniste/players/selectors';
import Player from './Player';

function Players({
  G,
  playerId
}) {
  const players = getPlayers(G, playerId);
  return (
    <Row className="players">
      {players.map(player => (
        <Col key={player.id} sm={12 / players.length}>
          <Player player={player} playerId={playerId} />
        </Col>
      ))}
    </Row>
  );
}

export default Players;
