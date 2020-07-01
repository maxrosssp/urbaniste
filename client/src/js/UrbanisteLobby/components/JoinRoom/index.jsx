import React, { useState } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';
import './JoinRoom.scss';

function JoinRoom({
  room,
  onSubmit
}) {
  const playerID = (room.players.find(({ name }) => name === undefined) || {}).id;
  const [playerName, setPlayerName] = useState(null);

  return (
    <>
      {`Room: ${room.name}`}

      <Form className="join-room-form">
        <Form.Group controlId="playerName">
          <Form.Label>Your Name:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Player Name"
            onChange={event => setPlayerName(event.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Button
            className="join-room-button"
            variant="primary"
            type="button"
            onClick={() => onSubmit(playerID, playerName, room.gameID)}
          >
            Join
          </Button>
        </Form.Group>
      </Form>`
    </>
  );
}

export default JoinRoom;