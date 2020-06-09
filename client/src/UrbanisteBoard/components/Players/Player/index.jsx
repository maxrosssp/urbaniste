import React from 'react';
import classNames from 'classnames';
import { Table } from 'react-bootstrap';
import Resources from '../../../constants/Resources.constant';
import './Player.scss';

function Player({
  player,
  playerId
}) {
  return (
    <Table
      borderless
      striped
      className={classNames({
        player: true,
        ['player-' + playerId]: true,
        mine: playerId === player.id,
        enemy: playerId !== player.id
      })} 
      size="sm"
    >
      <thead>
        <tr>
          <th className="table-header">
            {playerId === player.id ? 'My Resources' : 'Enemy Resources'}
          </th>

          <th>
            {`VP: ${player.victoryPoints}`}
          </th>
        </tr>
      </thead>

      <tbody>
        {Object.keys(player.resources).map(resource => Resources[resource]).map(resource => (
          <tr key={resource.name} className={resource.class}>
            <td>{resource.label}</td>
            
            <td>{player.resources[resource.name]}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default Player;