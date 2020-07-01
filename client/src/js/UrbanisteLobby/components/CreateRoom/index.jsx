import React, { useState, useEffect } from 'react';
import { Form, Accordion, ButtonGroup, Button } from 'react-bootstrap';
import ProjectSelect from './ProjectSelect';
import { ShopProjectTypeCount } from '../../../../../../urbaniste/constants';

function CreateRoom({
  onSubmit
}) {
  const [playerName, setPlayerName] = useState(null);
  const [roomName, setRoomName] = useState(null);
  const [isProjecstManual, setIsProjectsManual] = useState(false);
  const [shopConfig, setShopConfig] = useState(undefined);
  const [isFormComplete, setIsFormComplete] = useState(false);

  const onProjectsUpdate = (projectList) => setShopConfig({ projectList });
  const onClickProjectsManual = () => setIsProjectsManual(true);
  const onClickProjectsRandom = () => setIsProjectsManual(false);

  useEffect(() => {
    setIsFormComplete(playerName && roomName && (!isProjecstManual || (isProjecstManual && shopConfig && shopConfig.projectList)));
  }, [playerName, roomName, isProjecstManual, shopConfig]);

  const onClickSubmit = () => {
    const shopConfigToSend = isProjecstManual ? shopConfig : undefined;
    onSubmit(playerName, roomName, shopConfigToSend);
  };

  return (
    <Form className="create-room-form">
      <Form.Group controlId="playerName">
        <Form.Label>Your Name:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Player Name"
          onChange={event => setPlayerName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="roomName">
        <Form.Label>Room:</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter Room Name"
          onChange={event => setRoomName(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="projects">
        <Form.Label>Projects:</Form.Label>
        <Accordion>
          <ButtonGroup>
            <Accordion.Toggle 
              as={Button}
              variant={isProjecstManual ? 'outline-secondary' : 'secondary'}
              onClick={onClickProjectsRandom}
              eventKey="0"
            >
              Random
            </Accordion.Toggle>

            <Accordion.Toggle 
              as={Button}
              disabled={isProjecstManual}
              variant={!isProjecstManual ? 'outline-secondary' : 'secondary'}
              onClick={onClickProjectsManual}
              eventKey="1"
            >
              Manual
            </Accordion.Toggle>
          </ButtonGroup>
          <Accordion.Collapse eventKey="1">
            <ProjectSelect projectTypeCount={ShopProjectTypeCount} onUpdate={onProjectsUpdate} />
          </Accordion.Collapse>
        </Accordion>
      </Form.Group>

      <Form.Group>
        <Button
          className="create-room-button"
          variant="primary"
          type="button"
          disabled={!isFormComplete}
          onClick={onClickSubmit}
        >
          Create
        </Button>
      </Form.Group>
    </Form>
  );
}

export default CreateRoom;
