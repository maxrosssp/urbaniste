import React, { useState, useEffect } from 'react';
import { useParams, Redirect } from "react-router-dom";
import { Container, Button, Navbar, Spinner } from 'react-bootstrap';
import { Client } from 'boardgame.io/react';
import { SocketIO } from 'boardgame.io/multiplayer';
import UrbanisteBoard from './UrbanisteBoard/UrbanisteBoard';
import { Urbaniste } from '../../urbaniste';
import { getRoom, leaveRoom } from './services/lobby';

const UrbanisteClient = Client({
  game: Urbaniste,
  board: UrbanisteBoard,
  multiplayer: SocketIO({ server: `https://${window.location.hostname}:8000` }),
});

function UrbanisteGame() {
  const { gameID, playerID, credentials } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [name, setName] = useState(undefined);
  const [isWaitingForMorePlayers, setIsWaitingForMorePlayers] = useState(undefined);
  const [hasLeftGame, setHasLeftGame] = useState(false);

  const leave = () => leaveRoom(gameID, playerID, credentials).then(() => setHasLeftGame(true));

  useEffect(() => {
    getRoom(gameID).then(({ name, status }) => {
      setName(name);
      setIsWaitingForMorePlayers(status.negative === undefined);
    }).catch(() => setHasLeftGame(true)).finally(() => setIsLoading(false));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isWaitingForMorePlayers) {
        getRoom(gameID).then(({ status }) => setIsWaitingForMorePlayers(status.negative === undefined));
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isWaitingForMorePlayers]);

  if (hasLeftGame) {
    return <Redirect to="/" />;
  }

  if (isLoading) {
    return (
      <div>
        <Spinner animation="border" />
      </div>
    );
  }

  return (
    <Container fluid={true}>
      <Navbar>
        <Navbar.Brand>{name}</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Button type="button" onClick={leave}>Leave Game</Button>
        </Navbar.Collapse>
      </Navbar>

      {isLoading === false && isWaitingForMorePlayers && (
        <div className="waiting-for-players">
          Waiting For Another Player To Join<br/>
          <Spinner animation="grow" />
        </div>
      )}

      {isLoading === false && isWaitingForMorePlayers === false && (
        <UrbanisteClient gameID={gameID} playerID={playerID} credentials={credentials} />
      )}
    </Container>
  );
}

export default UrbanisteGame;
