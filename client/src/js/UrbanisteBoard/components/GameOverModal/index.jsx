import React from 'react';
import {
  Modal,
  Button
} from 'react-bootstrap';

function GameOverModal({
  isWinner,
  isTieGame,
  onPlayAgain,
  onLeaveRoom
}) {
  return (
    <Modal show={true} onHide={onLeaveRoom} backdrop="static">
      <Modal.Header closeButton={false}>
        {isTieGame && <Modal.Title>Draw</Modal.Title>}
        {!isTieGame && <Modal.Title>{isWinner ? 'Congratulations' : 'Game Over'}</Modal.Title>}
      </Modal.Header>

      <Modal.Body>
        {isTieGame && <p className="description">The game ended in a tie.</p>}
        {!isTieGame && <p className="description">{isWinner ? 'You won the game!' : 'Unfortunately, you lost the game.'}</p>}

        <p>
          Please select an option below.
        </p>
      </Modal.Body>

      <Modal.Footer>
        {onPlayAgain && <Button variant="primary" onClick={onPlayAgain}>Play Again</Button>}
        <Button variant="primary" onClick={onLeaveRoom}>Leave Room</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default GameOverModal;
