import React, { useState } from 'react';
import {
  Form,
  Button
} from 'react-bootstrap';

function CreateRoom({
  onSubmit
}) {
  const [playerName, setPlayerName] = useState(null);
  const [roomName, setRoomName] = useState(null);

  return (
    <Form className="create-room-form">
      <Form.Group controlId="roomName">
        <Form.Label>Room:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Room Name"
          onChange={event => setRoomName(event.target.value)}
        />
      </Form.Group>

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
          className="create-room-button"
          variant="primary"
          type="button"
          onClick={() => onSubmit(playerName, roomName)}
        >
          Create
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CreateRoom;
