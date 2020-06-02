import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import { Form, Row, Col, Table, Button, Spinner } from 'react-bootstrap';
import { getRooms } from '../../../services/lobby';
import './CurrentRooms.scss';

const MIN_TABLE_ROWS = 10;

function CurrentRooms({
  onSelect,
  onClickCreate,
  selected
}) {
  const selectedID = selected ? selected.gameID : undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [rooms, setRooms] = useState(undefined);
  const [searchValue, setSearchValue] = useState(undefined);
  const [sortBy, setSortBy] = useState({ field: 'status', reverse: false });

  const compareRooms = (room1, room2) => {
    const reverseMultiplier = sortBy.reverse ? -1 : 1;
    switch (sortBy.field) {
      case 'name':
        return (room1.name > room2.name ? 1 : -1) * reverseMultiplier;
      case 'status':
        return ((room2.status.negative ? 1 : 0) - (room1.status.negative ? 0 : 1)) * reverseMultiplier;
      default:
        return reverseMultiplier;
    }
  };

  const updateRooms = () => getRooms().then(setRooms);

  useEffect(() => {
    setIsLoading(true);
    updateRooms().finally(() => setIsLoading(false));

    const interval = setInterval(() => {
      updateRooms();
    }, 1500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Form>
        <Form.Group as={Row} controlId="search">
          <Form.Label column sm="1">
            Search: 
          </Form.Label>
          <Col sm="11">
            <Form.Control
              type="text" 
              placeholder="Name"
              onChange={event => setSearchValue(event.target.value)}
            />
          </Col>
        </Form.Group>
      </Form>

      <Table className="rooms table-fixed" striped borderless hover size="sm">
        <caption>
          <Button type="button" onClick={onClickCreate}>Create New Room</Button>
        </caption>

        <thead>
          <tr>
            <th scope="col" className="col-1 status text-center">
              <Button variant="link" onClick={() => setSortBy({ field: 'status', reverse: false })}>
                <status-indicator></status-indicator>
              </Button>
            </th>
            <th scope="col" className="col-5 name">
              <Button variant="link" onClick={() => setSortBy({ field: 'name', reverse: sortBy.field === 'name' ? !sortBy.reverse : false })}>
                {`Name${sortBy.field === 'name' ? (sortBy.reverse ? ' ▲' : ' ▼') : ''}`}
              </Button>
            </th>
            <th scope="col" className="col-5 players">Players</th>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td className="text-center" colSpan="3"><Spinner animation="border" /></td>
            </tr>
          )}

          {!isLoading && rooms && rooms.length === 0 && (
            <tr>
              <td className="text-center" colSpan="3">No Rooms Found</td>
            </tr>
          )}

          {rooms && rooms.length > 0 && rooms.filter(room => (!searchValue || room.name.indexOf(searchValue) !== -1)).sort(compareRooms).map(room => (
            <tr 
              key={room.gameID}
              className={classNames({ 'selected': room.gameID === selectedID, 'disabled': room.status.negative })}
              onClick={() => !room.status.negative && onSelect(room.gameID === selectedID ? undefined : room)}
              disabled={room.status.negative}
            >
              <th scope="row" className="col-1 text-center"><status-indicator { ...room.status }></status-indicator></th>
              <td className="col-5">{room.name}</td>
              <td className="col-6">{room.players.map(player => player.name).filter(name => name).join(', ')}</td>
            </tr>
          ))}

          {rooms && (MIN_TABLE_ROWS - rooms.length) > 0 && [...Array(MIN_TABLE_ROWS - rooms.length).keys()].map(key => (
            <tr key={`empty-${key}`}>
              <th>{' '}</th>
              <td>{' '}</td>
              <td>{' '}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}

export default CurrentRooms;