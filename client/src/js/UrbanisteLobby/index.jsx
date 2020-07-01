import React, { useState } from 'react';
import { Redirect } from "react-router-dom";
import { Container, Row, Col, Button } from 'react-bootstrap';
import CurrentRooms from './components/CurrentRooms';
import CreateRoom from './components/CreateRoom';
import JoinRoom from './components/JoinRoom';
import { createRoom, joinRoom } from '../services/lobby';

function UrbanisteLobby({
}) {
  const [isCreatingRoom, setIsCreatingRoom] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(undefined);
  const [roomToJoin, setRoomToJoin] = useState(undefined);

  const onRoomSelect = (room) => {
    setIsCreatingRoom(false);
    setSelectedRoom(room);
  };

  const clickCreateRoom = () => {
    setIsCreatingRoom(true);
    setSelectedRoom(undefined);
  };

  const onCreateRoom = (playerName, roomName, shopConfig) => {
    createRoom(playerName, roomName, shopConfig).then(setRoomToJoin);
  };

  const onJoinRoom = (playerID, playerName, gameID) => {
    joinRoom(playerID, playerName, gameID).then(setRoomToJoin);
  };

  if (roomToJoin) {
    return <Redirect to={`/game/${roomToJoin.gameID}/${roomToJoin.playerID}/${roomToJoin.credentials}`} />;
  }

  return (
    <Container className="urbaniste-lobby" fluid={true}>
      <Row>
        <Col sm={12}>
          <h2>Urbaniste Rooms</h2>
        </Col>
      </Row>

      <Row className="rooms">
        <Col className="current table-responsive" sm={6}>
          <CurrentRooms className="current-rooms" onSelect={onRoomSelect} selected={selectedRoom} onClickCreate={clickCreateRoom} />
        </Col>

        <Col sm={6}>
          {isCreatingRoom && <CreateRoom onSubmit={onCreateRoom} />}

          {selectedRoom && <JoinRoom room={selectedRoom} onSubmit={onJoinRoom} />}
        </Col>
      </Row>
    </Container>
  );
}

export default UrbanisteLobby;
